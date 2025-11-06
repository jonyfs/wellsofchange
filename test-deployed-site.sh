#!/bin/bash

# Test script to verify deployed GitHub Pages site loads all assets correctly
# This script will FAIL if any asset returns 404

set -e

SITE_URL="${1:-https://jonyfs.github.io/wellsofchange/}"
FAIL_COUNT=0
TOTAL_TESTS=0

echo "🧪 Testing Deployed Site: $SITE_URL"
echo "=========================================="
echo ""

# Fetch the index.html
echo "📄 Fetching index.html..."
INDEX_HTML=$(curl -s -L "$SITE_URL" 2>&1)

if [ -z "$INDEX_HTML" ]; then
    echo "❌ FAILED: Could not fetch index.html from $SITE_URL"
    exit 1
fi

echo "✅ index.html fetched successfully"
echo ""

# Extract and test CSS files
echo "🎨 Testing CSS files..."
CSS_FILES=$(echo "$INDEX_HTML" | grep -o 'href="[^"]*\.css"' | sed 's/href="//g' | sed 's/"//g' || true)

if [ -z "$CSS_FILES" ]; then
    echo "⚠️  No CSS files found in index.html"
else
    for css in $CSS_FILES; do
        TOTAL_TESTS=$((TOTAL_TESTS + 1))
        # Handle both absolute and relative URLs
        if [[ $css == http* ]]; then
            CSS_URL="$css"
        elif [[ $css == /wellsofchange/* ]]; then
            # Path already includes base, use site root
            CSS_URL="https://jonyfs.github.io$css"
        else
            CSS_URL="${SITE_URL%/}$css"
        fi
        
        echo -n "  Testing: $css ... "
        STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$CSS_URL")
        
        if [ "$STATUS" = "200" ]; then
            echo "✅ OK"
        else
            echo "❌ FAILED (HTTP $STATUS)"
            echo "    URL: $CSS_URL"
            FAIL_COUNT=$((FAIL_COUNT + 1))
        fi
    done
fi
echo ""

# Extract and test JS files
echo "📦 Testing JavaScript files..."
JS_FILES=$(echo "$INDEX_HTML" | grep -o 'src="[^"]*\.js"' | sed 's/src="//g' | sed 's/"//g' || true)

if [ -z "$JS_FILES" ]; then
    echo "❌ FAILED: No JavaScript files found in index.html"
    FAIL_COUNT=$((FAIL_COUNT + 1))
else
    for js in $JS_FILES; do
        TOTAL_TESTS=$((TOTAL_TESTS + 1))
        # Handle both absolute and relative URLs
        if [[ $js == http* ]]; then
            JS_URL="$js"
        elif [[ $js == /wellsofchange/* ]]; then
            # Path already includes base, use site root
            JS_URL="https://jonyfs.github.io$js"
        else
            JS_URL="${SITE_URL%/}$js"
        fi
        
        echo -n "  Testing: $js ... "
        STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$JS_URL")
        
        if [ "$STATUS" = "200" ]; then
            echo "✅ OK"
        else
            echo "❌ FAILED (HTTP $STATUS)"
            echo "    URL: $JS_URL"
            FAIL_COUNT=$((FAIL_COUNT + 1))
        fi
    done
fi
echo ""

# Test favicon
echo "🎯 Testing favicon..."
FAVICON=$(echo "$INDEX_HTML" | grep -o 'href="[^"]*favicon[^"]*"' | sed 's/href="//g' | sed 's/"//g' | head -1 || true)

if [ -n "$FAVICON" ]; then
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    if [[ $FAVICON == http* ]]; then
        FAVICON_URL="$FAVICON"
    elif [[ $FAVICON == /wellsofchange/* ]]; then
        # Path already includes base, use site root
        FAVICON_URL="https://jonyfs.github.io$FAVICON"
    else
        FAVICON_URL="${SITE_URL%/}$FAVICON"
    fi
    
    echo -n "  Testing: $FAVICON ... "
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FAVICON_URL")
    
    if [ "$STATUS" = "200" ]; then
        echo "✅ OK"
    else
        echo "❌ FAILED (HTTP $STATUS)"
        echo "    URL: $FAVICON_URL"
        FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
else
    echo "⚠️  No favicon found"
fi
echo ""

# Check for correct base path
echo "🔍 Checking base path..."
if echo "$INDEX_HTML" | grep -q 'href="/wellsofchange/'; then
    echo "✅ Base path /wellsofchange/ found in HTML"
elif echo "$INDEX_HTML" | grep -q 'href="/assets/'; then
    echo "❌ FAILED: Found /assets/ instead of /wellsofchange/assets/"
    echo "   This means the site was built without --base=/wellsofchange/"
    FAIL_COUNT=$((FAIL_COUNT + 1))
else
    echo "⚠️  Could not determine base path"
fi
echo ""

# Summary
echo "=========================================="
echo "📊 Test Summary"
echo "=========================================="
echo "  Total tests: $TOTAL_TESTS"
echo "  Failed: $FAIL_COUNT"
echo "  Passed: $((TOTAL_TESTS - FAIL_COUNT))"
echo ""

if [ $FAIL_COUNT -gt 0 ]; then
    echo "❌ DEPLOYMENT TEST FAILED!"
    echo ""
    echo "🔧 How to fix:"
    echo "  1. Ensure vite build uses: --base=/wellsofchange/"
    echo "  2. Check .github/workflows/deploy.yml has correct build command"
    echo "  3. Rebuild and redeploy:"
    echo "     ./build-github-pages.sh"
    echo "     git add . && git commit -m 'Fix base path' && git push"
    echo ""
    exit 1
else
    echo "✅ ALL TESTS PASSED!"
    echo "   Site is deployed correctly and all assets load!"
    echo ""
    exit 0
fi
