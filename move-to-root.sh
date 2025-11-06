#!/bin/bash

# Move build assets from dist/public to root directory
# This script runs after vite build to relocate assets

echo "📦 Moving build assets to root directory..."
echo ""

# Check if dist/public exists
if [ ! -d "dist/public" ]; then
    echo "❌ Error: dist/public directory not found!"
    echo "   Run 'npx vite build' first"
    exit 1
fi

# Remove old build artifacts from root (if any)
echo "🗑️  Cleaning old build artifacts from root..."
rm -f index.html 404.html favicon.png .nojekyll
rm -rf assets

# Move files from dist/public to root
echo "📂 Moving files from dist/public/ to root..."
mv dist/public/index.html ./ 2>/dev/null
mv dist/public/404.html ./ 2>/dev/null
mv dist/public/favicon.png ./ 2>/dev/null
mv dist/public/.nojekyll ./ 2>/dev/null
mv dist/public/assets ./assets 2>/dev/null

# Remove empty dist directory
echo "🗑️  Cleaning up dist directory..."
rm -rf dist

echo ""
echo "✅ Build assets successfully moved to root!"
echo ""
echo "📂 Files in root:"
ls -lh index.html 404.html favicon.png .nojekyll 2>/dev/null
echo ""
echo "📂 Assets folder:"
ls -lh assets/ | head -5
echo ""
