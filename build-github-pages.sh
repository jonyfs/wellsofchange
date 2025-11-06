#!/bin/bash

# Build script for GitHub Pages deployment
# This script builds the static site with the correct base path for GitHub Pages

set -e

echo "🚀 Building for GitHub Pages..."
echo ""

# Build with GitHub Pages base path
echo "📦 Running vite build with base path /wellsofchange/..."
npx vite build --base=/wellsofchange/

# Create .nojekyll file to bypass Jekyll processing
echo "📝 Creating .nojekyll file..."
touch dist/public/.nojekyll

# Copy index.html to 404.html for SPA routing
echo "📋 Copying index.html to 404.html for SPA routing..."
cp dist/public/index.html dist/public/404.html

# Display build info
echo ""
echo "✅ Build complete!"
echo ""
echo "📊 Build output:"
ls -lh dist/public/ | grep -E "(index|404|nojekyll|favicon|assets)"
echo ""
echo "📁 Build directory: dist/public/"
echo "🌐 Ready for GitHub Pages deployment at: https://jonyfs.github.io/wellsofchange/"
echo ""
echo "To preview locally:"
echo "  npx serve dist/public -p 3000"
echo ""
echo "To deploy manually:"
echo "  npx gh-pages -d dist/public -t true"
echo ""
