#!/bin/bash

# Build the static site with relative paths for local viewing
echo "🔨 Building static site..."
./build-to-root.sh --local

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Start a local web server
echo ""
echo "🌐 Starting local server..."
echo "📂 Serving from: root directory"
echo ""
echo "✅ Open your browser and visit:"
echo "   👉 http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8080
