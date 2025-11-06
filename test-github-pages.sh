#!/bin/bash

# Test script to verify GitHub Pages build is correct

set -e

echo "🧪 Testing GitHub Pages Build..."
echo ""

# Check if dist/public exists
if [ ! -d "dist/public" ]; then
    echo "❌ dist/public directory not found!"
    echo "Run ./build-github-pages.sh first"
    exit 1
fi

echo "✅ Build directory exists"

# Check for required files
echo ""
echo "📋 Checking required files:"

files=("index.html" "404.html" "favicon.png" ".nojekyll")
all_found=true

for file in "${files[@]}"; do
    if [ -f "dist/public/$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file missing!"
        all_found=false
    fi
done

if [ ! -d "dist/public/assets" ]; then
    echo "  ❌ assets/ directory missing!"
    all_found=false
else
    echo "  ✅ assets/ directory"
fi

if [ "$all_found" = false ]; then
    echo ""
    echo "❌ Some required files are missing!"
    exit 1
fi

# Check paths in index.html
echo ""
echo "🔍 Checking paths in index.html:"

if grep -q 'href="/wellsofchange/' dist/public/index.html; then
    echo "  ✅ CSS path uses /wellsofchange/ base"
else
    echo "  ❌ CSS path doesn't use /wellsofchange/ base!"
    all_found=false
fi

if grep -q 'src="/wellsofchange/' dist/public/index.html; then
    echo "  ✅ JS path uses /wellsofchange/ base"
else
    echo "  ❌ JS path doesn't use /wellsofchange/ base!"
    all_found=false
fi

if grep -q 'href="/wellsofchange/favicon.png"' dist/public/index.html; then
    echo "  ✅ Favicon path uses /wellsofchange/ base"
else
    echo "  ❌ Favicon path doesn't use /wellsofchange/ base!"
    all_found=false
fi

# Display paths
echo ""
echo "📝 Asset paths in index.html:"
echo "  CSS:"
grep -o 'href="/wellsofchange/[^"]*\.css"' dist/public/index.html | head -1
echo "  JS:"
grep -o 'src="/wellsofchange/[^"]*\.js"' dist/public/index.html | head -1
echo "  Favicon:"
grep -o 'href="/wellsofchange/favicon.png"' dist/public/index.html

# Check file sizes
echo ""
echo "📊 Build size:"
total_size=$(du -sh dist/public | cut -f1)
echo "  Total: $total_size"
js_size=$(ls -lh dist/public/assets/*.js 2>/dev/null | awk '{print $5}' | head -1)
css_size=$(ls -lh dist/public/assets/*.css 2>/dev/null | awk '{print $5}' | head -1)
echo "  JS: ${js_size:-N/A}"
echo "  CSS: ${css_size:-N/A}"

if [ "$all_found" = true ]; then
    echo ""
    echo "✅ All tests passed!"
    echo ""
    echo "🚀 Build is ready for GitHub Pages deployment!"
    echo ""
    echo "To preview locally:"
    echo "  npx serve dist/public -p 3000"
    echo "  Then open: http://localhost:3000/wellsofchange/"
    echo ""
    echo "To deploy:"
    echo "  git add ."
    echo "  git commit -m \"Update site\""
    echo "  git push origin main"
    echo ""
else
    echo ""
    echo "❌ Some tests failed!"
    echo "Please check the build configuration."
    exit 1
fi
