# 🔧 Troubleshooting GitHub Pages Deployment

## ❌ Site Not Working? Check These Common Issues

---

## 📋 Quick Diagnostic Checklist

Run through this checklist in order:

### 1. ✅ GitHub Pages Source Configuration

**Problem**: Most common issue - Pages not set to use GitHub Actions

**Solution**:
1. Go to: **https://github.com/jonyfs/wellsofchange/settings/pages**
2. Under **"Build and deployment"** → **"Source"**:
   - ✅ Select: **"GitHub Actions"**
   - ❌ NOT "Deploy from a branch"
3. Save

**Why this matters**: If set to "Deploy from a branch", GitHub ignores your Actions workflow.

---

### 2. ✅ Workflow Permissions

**Problem**: GITHUB_TOKEN doesn't have permission to deploy

**Check**:
1. Go to: **Settings** → **Actions** → **General**
2. Scroll to **"Workflow permissions"**
3. Ensure one of these is selected:
   - ✅ "Read and write permissions" (recommended)
   - ✅ Or workflow has explicit `pages: write` and `id-token: write`

**Why this matters**: Without these permissions, deployment will fail silently.

---

### 3. ✅ Check Workflow Status

**Problem**: Workflow failed but you didn't notice

**Check**:
1. Go to: **https://github.com/jonyfs/wellsofchange/actions**
2. Look at the latest workflow run
3. Status should be:
   - ✅ Green checkmark = Success
   - 🟡 Yellow dot = Running
   - ❌ Red X = Failed

**If failed**:
- Click on the failed workflow
- Check which step failed
- Read error logs
- Fix the issue and push again

---

### 4. ✅ Verify Deployment

**Problem**: Workflow succeeded but site not updated

**Check**:
1. Go to: **Settings** → **Environments** → **github-pages**
2. Check the timestamp of the latest deployment
3. Should match your latest commit time

**If outdated**:
- Go to Actions tab
- Click "Re-run all jobs" on the latest workflow
- Wait 2-5 minutes

---

### 5. ✅ Clear Browser Cache

**Problem**: Site updated but you see old version

**Solution**:
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- **Alternative**: Open in private/incognito window

---

### 6. ✅ Check Repository Visibility

**Problem**: Private repos need paid plan for Pages

**Check**:
1. Go to: **Settings** → **General**
2. Check "Repository visibility"
3. For free accounts: Repository must be **Public**

**Why this matters**: GitHub Pages on private repos requires GitHub Pro/Team/Enterprise.

---

## 🆘 Common Error Messages & Solutions

### Error: "Resource not accessible by integration"

**Cause**: Missing permissions

**Solution**:
1. Settings → Actions → General → Workflow permissions
2. Select "Read and write permissions"
3. Re-run workflow

### Error: "404 - Page not found"

**Causes & Solutions**:

1. **Wrong URL format**
   - ❌ `https://jonyfs.github.io/`
   - ✅ `https://jonyfs.github.io/wellsofchange/`

2. **index.html missing**
   ```bash
   # Check build output
   ls dist/public/
   # Should contain: index.html
   ```

3. **Base URL incorrect**
   ```bash
   # Check vite build command
   cat .github/workflows/deploy.yml | grep "vite build"
   # Should show: --base=/wellsofchange/
   ```

### Error: "Build failed" in Actions

**Check npm ci**:
```bash
# Test locally
npm ci
# If fails, your package-lock.json may be corrupt
npm install
git add package-lock.json
git commit -m "Fix package-lock"
git push
```

**Check vite build**:
```bash
# Test locally
npx vite build --base=/wellsofchange/
# Should create dist/public/ with index.html
```

### Error: Deployment queued forever

**Cause**: GitHub Pages service issue or stuck workflow

**Solution**:
1. Cancel the stuck workflow
2. Make a new commit (even empty)
   ```bash
   git commit --allow-empty -m "Trigger deploy"
   git push
   ```
3. Check [GitHub Status](https://www.githubstatus.com/) for outages

---

## 🔍 Step-by-Step Debugging

### Step 1: Verify Workflow File

```bash
# Check workflow exists
ls -la .github/workflows/deploy.yml

# Check workflow syntax
cat .github/workflows/deploy.yml
```

**Should contain**:
- ✅ `on: push: branches: ["main"]`
- ✅ `permissions: pages: write`
- ✅ `permissions: id-token: write`
- ✅ `uses: actions/upload-pages-artifact@v3`
- ✅ `uses: actions/deploy-pages@v4`

### Step 2: Test Build Locally

```bash
# Install dependencies
npm ci

# Build with GitHub Pages base
npx vite build --base=/wellsofchange/

# Check output
ls -la dist/public/
# Should see: index.html, 404.html, favicon.png, .nojekyll, assets/

# Check index.html paths
cat dist/public/index.html | grep -o 'href="[^"]*"' | head -3
# Should show: href="/wellsofchange/..."
```

### Step 3: Check GitHub Actions Logs

1. Go to: **Actions** tab
2. Click latest workflow run
3. Click on each step to see logs
4. Look for errors in:
   - Install dependencies
   - Build
   - Upload artifact
   - Deploy

### Step 4: Verify Artifact Upload

In workflow logs, check "Upload artifact" step:
```
Artifact Size: ~20 MB
Files uploaded: 15+
```

**If 0 files uploaded**:
- Build failed silently
- Wrong path in `path: './dist/public'`

### Step 5: Check Deployment

In workflow logs, check "Deploy to GitHub Pages" step:
```
✅ Successfully deployed to GitHub Pages
URL: https://jonyfs.github.io/wellsofchange/
```

**If deployment step missing**:
- Environment not configured
- Missing permissions

---

## 🎯 Complete Setup Verification

Run all these commands to verify everything:

```bash
# 1. Verify workflow file exists and is correct
cat .github/workflows/deploy.yml | grep -E "pages:|deploy-pages"

# 2. Test build locally
npm ci && npx vite build --base=/wellsofchange/

# 3. Verify build output
ls dist/public/ | grep index.html

# 4. Check paths in HTML
cat dist/public/index.html | grep "/wellsofchange/"

# 5. Commit and push
git add .
git commit -m "Verify GitHub Pages setup"
git push origin main

# 6. Check Actions tab in browser
echo "Check: https://github.com/jonyfs/wellsofchange/actions"

# 7. Wait 2-5 minutes, then check site
echo "Site: https://jonyfs.github.io/wellsofchange/"
```

---

## 📊 Expected vs Actual

### Expected Workflow Flow

```
Push to main
     ↓
Workflow triggered
     ↓
Build job runs
  - npm ci ✅
  - vite build ✅
  - Upload artifact ✅
     ↓
Deploy job runs
  - Deploy artifact ✅
     ↓
Site live at https://jonyfs.github.io/wellsofchange/ ✅
```

### Common Failure Points

| Step | Common Issue | Solution |
|------|--------------|----------|
| Trigger | Wrong branch | Check workflow file: `branches: ["main"]` |
| Build | npm ci fails | Commit package-lock.json |
| Build | vite build fails | Test locally first |
| Upload | No files | Check `path: './dist/public'` |
| Deploy | Permission denied | Fix workflow permissions |
| Deploy | 404 error | Check base URL `/wellsofchange/` |

---

## 🚀 Fresh Start (Nuclear Option)

If nothing works, start fresh:

```bash
# 1. Delete workflow
rm .github/workflows/deploy.yml

# 2. Copy working workflow
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx vite build --base=/wellsofchange/
      - run: touch dist/public/.nojekyll
      - run: cp dist/public/index.html dist/public/404.html
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/public'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
EOF

# 3. Commit
git add .github/workflows/deploy.yml
git commit -m "Reset GitHub Actions workflow"
git push origin main

# 4. Configure GitHub Pages
echo "Go to: Settings → Pages → Source: GitHub Actions"

# 5. Wait and check
echo "Wait 2-5 minutes, then visit: https://jonyfs.github.io/wellsofchange/"
```

---

## 📞 Still Not Working?

### Provide This Information

When asking for help, include:

1. **Workflow run URL**: https://github.com/jonyfs/wellsofchange/actions/runs/XXXXX
2. **Error message**: Copy the exact error from logs
3. **Pages settings**: Screenshot of Settings → Pages
4. **Build logs**: Share "Build" step output
5. **Local build test**: Does `npm run build` work locally?

### Check GitHub Status

Visit: https://www.githubstatus.com/

GitHub Pages issues might be a service outage, not your configuration.

---

## ✅ Success Indicators

Your deployment is working when you see:

1. ✅ Actions tab shows green checkmark
2. ✅ Environments shows recent deployment
3. ✅ https://jonyfs.github.io/wellsofchange/ loads your site
4. ✅ No 404 errors
5. ✅ Assets load correctly (images, CSS, JS)

---

**Most common fix**: Settings → Pages → Source: **GitHub Actions** (not branch) 🎯
