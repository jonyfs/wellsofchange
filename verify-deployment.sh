#!/bin/bash

# Comprehensive deployment verification script
# Tests that the build is ready for GitHub Pages

set -e

echo "🔍 Comprehensive Deployment Verification"
echo "========================================"
echo ""

# Check build exists
if [ ! -d "dist/public" ]; then
    echo "❌ Build not found! Run: ./build-github-pages.sh"
    exit 1
fi

echo "✅ Build directory exists"
echo ""

# Test 1: Required files
echo "📋 Test 1: Required Files"
echo "-------------------------"
files=("index.html" "404.html" "favicon.png" ".nojekyll")
for file in "${files[@]}"; do
    if [ -f "dist/public/$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file MISSING!"
        exit 1
    fi
done
echo ""

# Test 2: Asset paths in index.html
echo "🔗 Test 2: Asset Paths in HTML"
echo "-------------------------------"

# Check CSS path
css_path=$(grep -o 'href="/wellsofchange/assets/[^"]*\.css"' dist/public/index.html | head -1)
if [ -n "$css_path" ]; then
    echo "  ✅ CSS: $css_path"
else
    echo "  ❌ CSS path incorrect or missing!"
    exit 1
fi

# Check JS path
js_path=$(grep -o 'src="/wellsofchange/assets/[^"]*\.js"' dist/public/index.html | head -1)
if [ -n "$js_path" ]; then
    echo "  ✅ JS: $js_path"
else
    echo "  ❌ JS path incorrect or missing!"
    exit 1
fi

# Check favicon
if grep -q 'href="/wellsofchange/favicon.png"' dist/public/index.html; then
    echo "  ✅ Favicon: /wellsofchange/favicon.png"
else
    echo "  ❌ Favicon path incorrect!"
    exit 1
fi
echo ""

# Test 3: Image paths in JS bundle
echo "🖼️  Test 3: Image Paths in JS Bundle"
echo "------------------------------------"

js_file=$(ls dist/public/assets/*.js | head -1)
if [ -f "$js_file" ]; then
    image_count=$(node -e "const fs = require('fs'); const content = fs.readFileSync('$js_file', 'utf8'); const matches = content.match(/\"\/wellsofchange\/assets\/[^\"]*\.(jpg|png)\"/g); console.log(matches ? matches.length : 0)" 2>/dev/null || echo "0")
    
    if [ "$image_count" -gt 0 ]; then
        echo "  ✅ Found $image_count images with correct /wellsofchange/ base"
        echo ""
        echo "  Sample paths:"
        node -e "const fs = require('fs'); const content = fs.readFileSync('$js_file', 'utf8'); const matches = content.match(/\"\/wellsofchange\/assets\/[^\"]*\.(jpg|png)\"/g); if(matches) matches.slice(0,3).forEach((m,i) => console.log('    ' + (i+1) + '. ' + m))" 2>/dev/null
    else
        echo "  ⚠️  No images found - may be using data URLs or external images"
    fi
else
    echo "  ❌ JS bundle not found!"
    exit 1
fi
echo ""

# Test 4: Assets directory
echo "📦 Test 4: Assets Directory"
echo "---------------------------"
if [ -d "dist/public/assets" ]; then
    js_count=$(ls dist/public/assets/*.js 2>/dev/null | wc -l)
    css_count=$(ls dist/public/assets/*.css 2>/dev/null | wc -l)
    img_count=$(ls dist/public/assets/*.{jpg,png,jpeg} 2>/dev/null | wc -l)
    
    echo "  ✅ Assets directory exists"
    echo "    - JavaScript files: $js_count"
    echo "    - CSS files: $css_count"
    echo "    - Images: $img_count"
else
    echo "  ❌ Assets directory missing!"
    exit 1
fi
echo ""

# Test 5: File sizes
echo "📊 Test 5: Build Sizes"
echo "----------------------"
total_size=$(du -sh dist/public 2>/dev/null | cut -f1)
echo "  Total: $total_size"

if [ -f "$js_file" ]; then
    js_size=$(ls -lh "$js_file" | awk '{print $5}')
    echo "  JavaScript: $js_size"
fi

css_file=$(ls dist/public/assets/*.css 2>/dev/null | head -1)
if [ -f "$css_file" ]; then
    css_size=$(ls -lh "$css_file" | awk '{print $5}')
    echo "  CSS: $css_size"
fi
echo ""

# Test 6: GitHub Pages specific
echo "🌐 Test 6: GitHub Pages Compatibility"
echo "-------------------------------------"

# Check .nojekyll
if [ -f "dist/public/.nojekyll" ]; then
    echo "  ✅ .nojekyll file present (Jekyll disabled)"
else
    echo "  ❌ .nojekyll file missing!"
    exit 1
fi

# Check 404.html for SPA routing
if [ -f "dist/public/404.html" ]; then
    if diff -q dist/public/index.html dist/public/404.html > /dev/null; then
        echo "  ✅ 404.html matches index.html (SPA routing enabled)"
    else
        echo "  ⚠️  404.html differs from index.html (may not support all routes)"
    fi
else
    echo "  ❌ 404.html missing!"
    exit 1
fi
echo ""

# Final summary
echo "========================================"
echo "✅ ALL TESTS PASSED!"
echo "========================================"
echo ""
echo "📊 Summary:"
echo "  - All required files present"
echo "  - All paths use /wellsofchange/ base"
echo "  - $img_count images in bundle"
echo "  - Build size: $total_size"
echo "  - GitHub Pages compatible"
echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "  1. Configure GitHub Pages:"
echo "     Settings → Pages → Source: 'GitHub Actions'"
echo ""
echo "  2. Set workflow permissions:"
echo "     Settings → Actions → General → 'Read and write permissions'"
echo ""
echo "  3. Deploy:"
echo "     git add . && git commit -m 'Deploy' && git push origin main"
echo ""
echo "  4. Site will be live at:"
echo "     https://jonyfs.github.io/wellsofchange/"
echo ""
echo "  5. If assets don't load:"
echo "     - Clear browser cache: Ctrl+Shift+R"
echo "     - Wait 5 minutes for CDN"
echo "     - Check Actions tab for errors"
echo ""
