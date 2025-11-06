#!/bin/bash

# Build script for GitHub Pages deployment
# This script builds the static site with the correct base path for GitHub Pages

set -e

echo "🚀 Building for GitHub Pages..."
echo ""

# Build for GitHub Pages
echo "📦 Running vite build..."
npx vite build

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
echo ""
echo "⚠️  IMPORTANT: Base path removed!"
echo "   This build uses root-relative paths (/assets/...)"
echo ""
echo "✅ Compatible with:"
echo "   - Custom domains (wellsofchange.org)"
echo "   - User sites (jonyfs.github.io repository)"
echo ""
echo "❌ NOT compatible with:"
echo "   - Project sites (jonyfs.github.io/wellsofchange/)"
echo ""
echo "To preview locally:"
echo "  npx serve dist/public -p 3000"
echo "  Open: http://localhost:3000/"
echo ""
echo "See DEPLOYMENT_UPDATE.md for deployment options"
echo ""
