#!/bin/bash

# Build the site and move assets to root directory
# This combines vite build + move-to-root in one command

echo "🔨 Building static site for GitHub Pages..."
echo ""

# Build with the specified base URL
if [ "$1" == "--local" ]; then
    echo "📍 Building with relative paths (--base=./)"
    npx vite build --base=./
elif [ "$1" == "--github" ] || [ -z "$1" ]; then
    echo "📍 Building with GitHub Pages base (--base=/wellsofchange/)"
    npx vite build --base=/wellsofchange/
else
    echo "📍 Building with custom base: $1"
    npx vite build --base="$1"
fi

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "✅ Build completed!"
echo ""

# Move assets to root
./move-to-root.sh

if [ $? -eq 0 ]; then
    echo "🎉 Build assets are now in the root directory!"
    echo ""
    echo "Ready for GitHub Pages deployment:"
    echo "  - index.html"
    echo "  - 404.html"
    echo "  - favicon.png"
    echo "  - .nojekyll"
    echo "  - assets/"
    echo ""
else
    echo "❌ Failed to move assets to root!"
    exit 1
fi
