#!/bin/bash

# Deploy to GitHub Pages using gh-pages
# This script builds the site and deploys it to the gh-pages branch

echo "🔨 Building the static site for GitHub Pages..."
echo ""

# Build and move to root
./build-to-root.sh --github

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "📦 Deploying to GitHub Pages..."
echo ""

# Deploy from root directory
npx gh-pages --dist . --branch gh-pages --src '{index.html,404.html,favicon.png,.nojekyll,assets/**/*}'

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deploy completed successfully!"
    echo ""
    echo "🌐 Your site will be live at:"
    echo "   👉 https://jonyfs.github.io/wellsofchange/"
    echo ""
    echo "⏱️  It may take 1-2 minutes for changes to appear"
    echo ""
else
    echo ""
    echo "❌ Deploy failed!"
    echo ""
    exit 1
fi
