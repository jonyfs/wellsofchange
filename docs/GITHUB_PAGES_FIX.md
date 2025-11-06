# 🔧 GitHub Pages Fix - Base URL Configuration

## Problem Identified

The site at **https://jonyfs.github.io/wellsofchange/** was showing a blank page or not loading correctly.

## Root Cause

When deploying to GitHub Pages on a **project repository** (not a user/org site), the site is served at:
```
https://USERNAME.github.io/REPO-NAME/
```

But Vite was building assets with paths like:
```html
<script src="/assets/index.js"></script>
<link href="/assets/index.css">
```

These absolute paths (`/assets/...`) point to:
```
https://jonyfs.github.io/assets/index.js  ❌ Wrong!
```

Instead of:
```
https://jonyfs.github.io/wellsofchange/assets/index.js  ✅ Correct!
```

## Solution Applied

### 1. Updated GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

**Changed**:
```yaml
- name: Build frontend
  run: npx vite build --base=/wellsofchange/
```

This tells Vite to prefix all asset paths with `/wellsofchange/`.

### 2. Build Output Now Generates Correct Paths

**Before** (broken):
```html
<link rel="icon" href="/favicon.png" />
<script src="/assets/index.js"></script>
```

**After** (fixed):
```html
<link rel="icon" href="/wellsofchange/favicon.png" />
<script src="/wellsofchange/assets/index.js"></script>
```

### 3. Created 404.html for Client-Side Routing

**File**: `client/public/404.html`

This handles client-side routing on GitHub Pages, ensuring that routes like `/wellsofchange/nossa-historia` work correctly.

## Verification

### Test Build Locally
```bash
# Build with correct base URL
npx vite build --base=/wellsofchange/

# Check generated index.html
cat dist/public/index.html | grep -E "href=|src="
```

**Expected Output**:
```html
<link rel="icon" href="/wellsofchange/favicon.png" />
<script src="/wellsofchange/assets/index-[hash].js"></script>
<link href="/wellsofchange/assets/index-[hash].css">
```

## Next Deployment

When you push to GitHub now, the workflow will:
1. Build with `--base=/wellsofchange/`
2. Generate correct asset paths
3. Deploy to GitHub Pages
4. ✅ Site will work at https://jonyfs.github.io/wellsofchange/

## For Different Repository Names

If deploying to a different repository, update the workflow:

```yaml
- name: Build frontend
  run: npx vite build --base=/YOUR-REPO-NAME/
```

Replace `YOUR-REPO-NAME` with your actual repository name.

## For User/Organization Sites

If deploying to **username.github.io** (not a project repo), use:

```yaml
- name: Build frontend
  run: npx vite build --base=/
```

Or simply:
```yaml
- name: Build frontend
  run: npx vite build
```

## Common Mistakes to Avoid

### ❌ Wrong
```yaml
run: npx vite build --base=wellsofchange/    # Missing leading slash
run: npx vite build --base=/wellsofchange    # Missing trailing slash
run: npx vite build                           # No base URL for project repos
```

### ✅ Correct
```yaml
run: npx vite build --base=/wellsofchange/   # Perfect!
```

## Testing Before Deploy

### 1. Build Locally
```bash
npx vite build --base=/wellsofchange/
```

### 2. Preview with Correct Base
```bash
npx vite preview --base=/wellsofchange/
```

### 3. Or Use Simple Server
```bash
cd dist/public
python3 -m http.server 8080
# Visit: http://localhost:8080/wellsofchange/
```

Note: For the Python server to work with the base URL, you'll need to manually navigate to `/wellsofchange/` in the browser.

## Debugging Tips

### Blank Page on GitHub Pages?

1. **Check Browser Console** (F12):
   - Look for 404 errors on assets
   - Check if paths are correct

2. **Inspect HTML Source**:
   - View page source
   - Check `<script>` and `<link>` tags
   - Verify paths include `/wellsofchange/`

3. **Verify GitHub Actions**:
   - Go to Actions tab
   - Check if build succeeded
   - Look at build logs for errors

### Assets Not Loading?

**Symptom**: Blank page, console shows 404 for .js/.css files

**Solution**: Base URL not configured correctly
```yaml
# Fix in .github/workflows/deploy.yml
run: npx vite build --base=/REPO-NAME/
```

### Routing Not Working?

**Symptom**: Home page works, but navigating to other routes shows 404

**Solution**: Ensure `404.html` exists in `client/public/`

## Summary of Changes

| File | Change | Purpose |
|------|--------|---------|
| `.github/workflows/deploy.yml` | Added `--base=/wellsofchange/` | Fix asset paths |
| `client/public/404.html` | Created file | Handle SPA routing |
| Documentation | Multiple guides updated | Help users deploy correctly |

## Status

✅ **Fixed**: Asset paths now include `/wellsofchange/` prefix  
✅ **Tested**: Build generates correct HTML  
✅ **Ready**: Next push will deploy working site  

## Next Steps

1. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Fix: Configure base URL for GitHub Pages"
   git push origin main
   ```

2. **Wait for Deployment**:
   - Check Actions tab
   - Wait 2-5 minutes

3. **Test Live Site**:
   - Visit: https://jonyfs.github.io/wellsofchange/
   - Check browser console (should be no errors)
   - Test language switching
   - Verify all images load

## Expected Result

✅ Site loads correctly  
✅ All assets (JS, CSS, images) load  
✅ No 404 errors in console  
✅ Language switching works  
✅ All sections visible  
✅ FAB buttons functional  

---

**The site is now properly configured for GitHub Pages deployment at https://jonyfs.github.io/wellsofchange/**! 🎉
