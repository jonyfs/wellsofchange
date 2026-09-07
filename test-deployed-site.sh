#!/bin/bash

# Checks a deployed site: every asset the page references loads, the asset paths match the address
# the site is served from, and the page carries text without JavaScript.
#
#   ./test-deployed-site.sh                                  # production
#   ./test-deployed-site.sh https://user.github.io/project/   # any other deployment
#
# The expected asset prefix is taken from the URL being tested, so the same script works for a site
# at a domain root and for one under a project path.

set -uo pipefail

SITE_URL="${1:-https://www.wellsofchange.com/}"
[[ $SITE_URL == */ ]] || SITE_URL="$SITE_URL/"

ORIGIN=$(sed -E 's#^(https?://[^/]+).*#\1#' <<<"$SITE_URL")
BASE_PATH=${SITE_URL#"$ORIGIN"}

FAIL_COUNT=0
TOTAL_TESTS=0

echo "🧪 Testing Deployed Site: $SITE_URL"
echo "   Origin: $ORIGIN"
echo "   Expected asset prefix: $BASE_PATH"
echo "=========================================="
echo ""

# Resolves a URL found in the HTML against the site being tested.
resolve_url() {
    local path="$1"
    case "$path" in
        http*) echo "$path" ;;
        /*)    echo "${ORIGIN}${path}" ;;
        ./*)   echo "${SITE_URL}${path#./}" ;;
        *)     echo "${SITE_URL}${path}" ;;
    esac
}

check_asset() {
    local label="$1" path="$2"
    local url status
    url=$(resolve_url "$path")
    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    echo -n "  Testing: $path ... "
    status=$(curl -s -o /dev/null -w "%{http_code}" -L "$url")
    if [ "$status" = "200" ]; then
        echo "✅ OK"
    else
        echo "❌ FAILED (HTTP $status)"
        echo "    URL: $url"
        FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
}

echo "📄 Fetching index.html..."
INDEX_HTML=$(curl -s -L "$SITE_URL")

if [ -z "$INDEX_HTML" ]; then
    echo "❌ FAILED: Could not fetch index.html from $SITE_URL"
    exit 1
fi

echo "✅ index.html fetched successfully"
echo ""

echo "🎨 Testing CSS files..."
CSS_FILES=$(grep -o 'href="[^"]*\.css"' <<<"$INDEX_HTML" | sed 's/href="//;s/"$//' || true)
if [ -z "$CSS_FILES" ]; then
    echo "⚠️  No CSS files found in index.html"
else
    for css in $CSS_FILES; do check_asset "css" "$css"; done
fi
echo ""

echo "📦 Testing JavaScript files..."
JS_FILES=$(grep -o 'src="[^"]*\.js"' <<<"$INDEX_HTML" | sed 's/src="//;s/"$//' || true)
if [ -z "$JS_FILES" ]; then
    echo "❌ FAILED: No JavaScript files found in index.html"
    FAIL_COUNT=$((FAIL_COUNT + 1))
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
else
    for js in $JS_FILES; do check_asset "js" "$js"; done
fi
echo ""

echo "🎯 Testing favicon..."
FAVICON=$(grep -o 'href="[^"]*favicon[^"]*"' <<<"$INDEX_HTML" | sed 's/href="//;s/"$//' | head -1 || true)
if [ -n "$FAVICON" ]; then
    check_asset "favicon" "$FAVICON"
else
    echo "⚠️  No favicon found"
fi
echo ""

# The asset prefix has to match where the site is served from. A site at a domain root references
# /assets/; one under a project path references /project/assets/. Neither is right in the abstract.
echo "🔍 Checking asset paths against the site address..."
TOTAL_TESTS=$((TOTAL_TESTS + 1))
ROOTED_ASSETS=$(grep -oE '(href|src)="/[^"]*"' <<<"$INDEX_HTML" | sed -E 's/^(href|src)="//;s/"$//' | grep -v '^//' || true)
MISMATCHED=$(awk -v prefix="$BASE_PATH" '$0 !~ "^" prefix' <<<"$ROOTED_ASSETS" || true)

if [ -z "$ROOTED_ASSETS" ]; then
    echo "✅ No absolute asset paths; the build uses relative URLs, which work at any address"
elif [ -z "$MISMATCHED" ]; then
    echo "✅ Every absolute path starts with $BASE_PATH"
else
    echo "❌ FAILED: these paths do not start with $BASE_PATH and will 404:"
    sed 's/^/    /' <<<"$MISMATCHED"
    echo "   Rebuild with a base matching the address, or use a relative base."
    FAIL_COUNT=$((FAIL_COUNT + 1))
fi
echo ""

# The prerender is what crawlers that skip JavaScript receive. If it stops running, the page still
# looks right in a browser, so nothing else would catch it.
echo "🤖 Checking the page carries text without JavaScript..."
TOTAL_TESTS=$((TOTAL_TESTS + 1))
BODY_TEXT_CHARS=$(python3 -c '
import re, sys
html = sys.stdin.read()
body = re.search(r"<body[^>]*>(.*)</body>", html, re.S)
text = re.sub(r"<script.*?</script>", " ", body.group(1), flags=re.S) if body else ""
text = re.sub(r"<[^>]+>", " ", text)
print(len(re.sub(r"\s+", " ", text).strip()))
' <<<"$INDEX_HTML")

if [ "${BODY_TEXT_CHARS:-0}" -ge 500 ]; then
    echo "✅ $BODY_TEXT_CHARS characters of text in the served HTML"
else
    echo "❌ FAILED: only ${BODY_TEXT_CHARS:-0} characters of text in the served HTML"
    echo "   Crawlers that do not run JavaScript, including most AI crawlers, would see an empty page."
    FAIL_COUNT=$((FAIL_COUNT + 1))
fi
echo ""

echo "=========================================="
echo "📊 Test Summary"
echo "=========================================="
echo "  Total tests: $TOTAL_TESTS"
echo "  Failed: $FAIL_COUNT"
echo "  Passed: $((TOTAL_TESTS - FAIL_COUNT))"
echo ""

if [ "$FAIL_COUNT" -eq 0 ]; then
    echo "✅ ALL TESTS PASSED"
    exit 0
fi

echo "❌ DEPLOYMENT TEST FAILED"
exit 1
