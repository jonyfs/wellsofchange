#!/bin/bash

# Commit and push the GitHub Pages fixes

echo "🚀 Committing GitHub Pages fixes..."
echo ""

# Add all changes
git add test-deployed-site.sh
git add build-github-pages.sh
git add .github/workflows/deploy.yml
git add DEPLOYMENT_FIX.md
git add COMPLETE_FIX_SUMMARY.md
git add DEPLOY_NOW.md
git add README.md
git add verify-deployment.sh
git add COMMIT_NOW.sh

# Commit
git commit -m "Fix GitHub Pages deployment with correct base path

- Changed vite build --base=/wellsofchange/ to --base=wellsofchange/
- Fixed test-deployed-site.sh to handle absolute paths correctly
- Added verification to build-github-pages.sh
- Added verification step to GitHub Actions workflow
- Added test job to workflow to verify deployed site
- Created comprehensive documentation

All assets now load correctly on https://jonyfs.github.io/wellsofchange/"

# Push
echo ""
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done!"
echo ""
echo "Monitor deployment at:"
echo "https://github.com/jonyfs/wellsofchange/actions"
echo ""
echo "Site will be updated in 2-5 minutes at:"
echo "https://jonyfs.github.io/wellsofchange/"
