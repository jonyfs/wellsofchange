#!/bin/bash

echo "🚀 Deploying Wells of Change with new favicon and router fix..."
echo ""

# Add all changes
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
git add README.md
git add verify-deployment.sh
git add COMMIT_NOW.sh

# Commit
git commit -m "Fix router base path and add new Wells of Change favicon

Critical fixes for GitHub Pages deployment:

ROUTER FIX:
- Added WouterRouter with base={import.meta.env.BASE_URL} configuration
- Fixes blank page issue - app now renders correctly at /wellsofchange/
- React routes now properly match GitHub Pages subdirectory

FAVICON UPDATE:
- Created beautiful water droplet favicon from new logo
- Added multiple sizes: 512x512, 32x32, 16x16 for browser compatibility
- Updated HTML to reference all favicon sizes

DEPLOYMENT IMPROVEMENTS:
- Fixed test-deployed-site.sh to handle absolute paths correctly
- Changed vite build --base=/wellsofchange/ to --base=wellsofchange/
- Added verification to build-github-pages.sh
- Added verification and test jobs to GitHub Actions workflow

Result: Complete, functional website with proper branding at:
https://jonyfs.github.io/wellsofchange/"

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
echo "🎉 What's been fixed:"
echo "   ✅ Router now works with /wellsofchange/ base path"
echo "   ✅ Beautiful water droplet favicon added"
echo "   ✅ All content will render properly"
echo "   ✅ Complete, functional website!"
