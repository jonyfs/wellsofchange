#!/bin/bash

# Build the static site with relative paths for local viewing
echo "🔨 Building static site..."
npm run build:local

# Start a local web server
echo "🌐 Starting local server..."
echo "📂 Serving from: dist/public/"
echo ""
echo "✅ Open your browser and visit:"
echo "   👉 http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd dist/public && python3 -m http.server 8080
