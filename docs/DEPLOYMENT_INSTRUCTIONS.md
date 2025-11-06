# 🚀 Complete Deployment Instructions

## 🎯 Quick Summary

This is a **static landing page** that:
- ✅ Works perfectly on GitHub Pages
- ✅ Can be viewed locally with a simple server
- ✅ Uses relative paths for portability
- ✅ Auto-deploys via GitHub Actions

---

## 🏠 Local Development & Testing

### Development Mode (Hot Reload)
```bash
npm run dev
```
Visit: **http://localhost:5000**

### Preview Static Build
```bash
./preview-build.sh
```
Visit: **http://localhost:8080**

---

## 🌐 GitHub Pages Deployment

### Current Configuration

- **Repository**: `jonyfs/wellsofchange`
- **Live URL**: https://jonyfs.github.io/wellsofchange/
- **Base Path**: `/wellsofchange/`
- **Auto Deploy**: On push to `main` branch

### Step-by-Step Deployment

#### 1. **Commit Your Changes**
```bash
git add .
git commit -m "Update Wells of Change website"
```

#### 2. **Push to GitHub**
```bash
git push origin main
```

#### 3. **Wait for Deployment** (2-5 minutes)

GitHub Actions will automatically:
1. ✅ Build the site with `--base=/wellsofchange/`
2. ✅ Create `.nojekyll` file
3. ✅ Generate `404.html` for SPA routing
4. ✅ Deploy to GitHub Pages

#### 4. **Verify Deployment**

1. Go to: https://github.com/jonyfs/wellsofchange/actions
2. Check that the latest workflow succeeded (green checkmark ✅)
3. Visit: https://jonyfs.github.io/wellsofchange/

---

## 🔧 Configuration Details

### GitHub Actions Workflow

Location: `.github/workflows/deploy.yml`

```yaml
- name: Build frontend for GitHub Pages
  run: npx vite build --base=/wellsofchange/
```

### Build Scripts

**For GitHub Pages:**
```bash
npm run build:github
```
- Uses absolute paths: `/wellsofchange/assets/...`
- Perfect for GitHub Pages deployment

**For Local Testing:**
```bash
npm run build:local
```
- Uses relative paths: `./assets/...`
- Can be served from any directory

---

## 📂 Project Structure

```
wellsofchange/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions workflow
├── client/
│   ├── public/
│   │   ├── favicon.png
│   │   └── 404.html           ← SPA routing support
│   ├── src/
│   │   ├── components/        ← React components
│   │   ├── pages/             ← Page components
│   │   └── lib/               ← i18n and utilities
│   └── index.html             ← HTML template
├── dist/public/               ← Build output (after npm run build)
│   ├── index.html            ← Static entry point
│   ├── 404.html
│   └── assets/               ← Bundled JS, CSS, images
├── docs/                     ← Documentation
├── preview-build.sh          ← Local preview script
└── README.md
```

---

## 🌍 Multi-Language Support

The site includes 4 languages:
- 🇬🇧 English
- 🇧🇷 Portuguese (Brazil) - Default
- 🇪🇸 Spanish
- 🇫🇷 French

Language selector is in the bottom-right FAB button.

---

## 🖼️ Assets Included

### Images (9 total)
All real photos from Campo Formoso, Bahia project:
- Wells and solar panels
- Community impact
- Water infrastructure
- Agricultural projects

### Total Build Size
**~19MB** (optimized for web)

---

## ✅ Pre-Deployment Checklist

Before deploying, verify:

- [ ] All images load correctly
- [ ] All 4 languages work
- [ ] Partners section displays correctly
- [ ] FAB buttons functional (language selector + donation)
- [ ] Responsive design works on mobile
- [ ] No console errors in browser DevTools
- [ ] GitHub Actions workflow file exists
- [ ] Base URL matches repository name

---

## 🔄 Updating Content

### Update Text Content

Edit files in `client/src/lib/i18n.tsx`:
```typescript
export const translations = {
  en: { /* English */ },
  pt: { /* Portuguese */ },
  es: { /* Spanish */ },
  fr: { /* French */ }
}
```

### Update Images

1. Add images to `attached_assets/`
2. Import in components:
```typescript
import myImage from '@assets/my-image.jpg'
```

### Update Partners

Edit `client/src/components/Partners.tsx`

### Test Locally
```bash
npm run dev
# Verify changes at http://localhost:5000
```

### Deploy
```bash
git add .
git commit -m "Update content"
git push origin main
```

---

## 🆘 Troubleshooting

### Site Not Loading on GitHub Pages?

1. **Check GitHub Actions**: https://github.com/jonyfs/wellsofchange/actions
   - Look for failed builds (red X)
   - Check error logs

2. **Verify GitHub Pages Settings**:
   - Go to: Settings → Pages
   - Source should be: **GitHub Actions**

3. **Check Base URL**:
   ```bash
   # Should match your repository name
   cat .github/workflows/deploy.yml | grep "base="
   # Should show: --base=/wellsofchange/
   ```

4. **Browser Console**:
   - Press F12
   - Look for 404 errors on assets
   - Check if paths are correct

### Assets Not Loading Locally?

Make sure you built with relative paths:
```bash
npm run build:local
./preview-build.sh
```

### Different Repository Name?

If you rename the repository, update the base URL:

`.github/workflows/deploy.yml`:
```yaml
run: npx vite build --base=/NEW-REPO-NAME/
```

---

## 📊 Deployment Timeline

| Step | Time | Status Check |
|------|------|--------------|
| Push to GitHub | Instant | - |
| GitHub Actions triggered | ~10 seconds | Actions tab |
| Dependencies install | ~30 seconds | Workflow logs |
| Build process | ~15 seconds | Workflow logs |
| Deploy to GitHub Pages | ~1-2 minutes | - |
| DNS propagation | ~1-2 minutes | - |
| **Total** | **~2-5 minutes** | Visit live URL |

---

## 🎯 Expected Result

After successful deployment:

✅ **URL**: https://jonyfs.github.io/wellsofchange/  
✅ **Status**: Live and accessible  
✅ **Languages**: All 4 work correctly  
✅ **Images**: All 9 display properly  
✅ **Navigation**: FAB buttons functional  
✅ **Responsive**: Mobile and desktop  
✅ **Performance**: Fast load times  
✅ **SEO**: Meta tags configured  

---

## 📞 Support

**Email**: wellsofchange@gmail.com  
**Location**: Rio de Janeiro, Brazil

---

## 📝 Additional Documentation

See the `docs/` folder for:
- Quick start guide
- Troubleshooting tips
- Technical details
- Design guidelines

---

**Everything is configured and ready for deployment!** 🚀🌊

Just commit and push to see your site live on GitHub Pages!
