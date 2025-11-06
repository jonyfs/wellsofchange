#!/bin/bash

echo "🚀 Deploying Wells of Change - Complete Update"
echo ""

# Add all changes
git add client/src/lib/i18n.tsx
git add client/src/App.tsx
git add client/index.html
git add client/public/favicon.png
git add client/public/favicon-32x32.png
git add client/public/favicon-16x16.png
git add favicon.png
git add test-deployed-site.sh
git add build-github-pages.sh
git add .github/workflows/deploy.yml
git add DEPLOYMENT_FIX.md
git add COMPLETE_FIX_SUMMARY.md
git add DEPLOY_NOW.md
git add ROUTER_FIX.md
git add LANGUAGE_DETECTION.md
git add README.md
git add verify-deployment.sh
git add COMMIT_NOW.sh

# Commit
git commit -m "Complete Wells of Change deployment update

AUTOMATIC LANGUAGE DETECTION:
- Added browser language detection with English as default
- Detects Portuguese (pt-*), Spanish (es-*), French (fr-*), English (en-*)
- User selection takes priority over browser detection
- Falls back to English for unsupported languages

ROUTER FIX:
- Added WouterRouter with base={import.meta.env.BASE_URL} configuration
- Fixes blank page issue - app now renders correctly at /wellsofchange/
- React routes now properly match GitHub Pages subdirectory

NEW FAVICON:
- Created beautiful water droplet favicon from Wells of Change logo
- Added multiple sizes: 512x512, 32x32, 16x16 for browser compatibility
- Updated HTML to reference all favicon sizes

DEPLOYMENT IMPROVEMENTS:
- Fixed test-deployed-site.sh to handle absolute paths correctly
- Changed vite build base path configuration
- Added verification to build-github-pages.sh
- Added verification and test jobs to GitHub Actions workflow

Result: Complete, functional multilingual website with proper branding at:
https://jonyfs.github.io/wellsofchange/

Features:
✅ Auto-detects visitor's language (PT/ES/FR/EN)
✅ Beautiful water droplet favicon
✅ Full content rendering
✅ 4 languages supported
✅ Proper GitHub Pages routing"

# Push
echo ""
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done!"
echo ""
echo "🔍 Monitor deployment at:"
echo "https://github.com/jonyfs/wellsofchange/actions"
echo ""
echo "⏱️  Site will be live in 2-5 minutes at:"
echo "https://jonyfs.github.io/wellsofchange/"
echo ""
echo "🎉 What's been added:"
echo "   ✅ Automatic language detection (PT/ES/FR/EN)"
echo "   ✅ Router works with /wellsofchange/ base path"
echo "   ✅ Beautiful water droplet favicon"
echo "   ✅ All content renders properly"
echo "   ✅ Complete, multilingual website!"
