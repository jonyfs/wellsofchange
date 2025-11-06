# 📺 How to View the Static Landing Page

The Wells of Change website is now configured as a **static landing page** that works perfectly on GitHub Pages and can be viewed locally.

## 🎯 Two Build Modes

This project supports two different build configurations:

### 1️⃣ **GitHub Pages Build** (For Deployment)
```bash
npm run build:github
# or
vite build --base=/wellsofchange/
```

✅ **Use this for**: Deploying to GitHub Pages  
📍 **URL**: https://jonyfs.github.io/wellsofchange/  
🔗 **Paths**: Absolute paths with `/wellsofchange/` prefix  

### 2️⃣ **Local Build** (For Testing)
```bash
npm run build:local
# or
vite build --base=./
```

✅ **Use this for**: Local testing and preview  
📂 **Location**: `dist/public/index.html`  
🔗 **Paths**: Relative paths (`./assets/...`)  

---

## 🖥️ How to View Locally (3 Methods)

### Method 1: Run Preview Script (Recommended) ⭐

```bash
./preview-build.sh
```

This will:
1. Build the static site with relative paths
2. Start a local web server on port 8080
3. Open: **http://localhost:8080**

### Method 2: Manual Build + Server

```bash
# Build with relative paths
npm run build:local

# Start a web server
cd dist/public
python3 -m http.server 8080

# Visit: http://localhost:8080
```

### Method 3: Use Vite Preview

```bash
npm run preview
```

Opens: **http://localhost:4173**

---

## 🌐 View on GitHub Pages

After pushing to GitHub:

1. The GitHub Actions workflow automatically builds with `--base=/wellsofchange/`
2. Deploys to: **https://jonyfs.github.io/wellsofchange/**
3. Takes 2-5 minutes

---

## 📂 Understanding the Build Output

After running `npm run build:local`, you'll see:

```
dist/public/
├── index.html          ← Open this in browser
├── 404.html            ← For SPA routing
├── favicon.png
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── [images].jpg/png
```

### ✅ The `index.html` File

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Wells of Change</title>
    <link rel="icon" href="./favicon.png" />
    <script src="./assets/index-[hash].js"></script>
    <link href="./assets/index-[hash].css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Notice the **relative paths** (`./`) - this allows it to work when opened directly or served from any directory!

---

## 🔍 What You'll See

When viewing the static site (locally or on GitHub Pages), you'll see:

✅ **Hero Section** - Background image with overlay  
✅ **Our Story** - About Wells of Change  
✅ **Impact** - Statistics and achievements  
✅ **Projects** - Campo Formoso and future plans  
✅ **Partners** - Intelie, 2Solve, Viasat, Vale do Sol  
✅ **Language Selector** - Bottom-right FAB (4 languages)  
✅ **Donation Button** - Bottom-right FAB  
✅ **Responsive Design** - Works on mobile and desktop  

---

## 🚫 Why Not Just Double-Click index.html?

⚠️ **Opening `dist/public/index.html` directly in a browser (file:// protocol) may not work** because:

1. Modern browsers block loading modules from `file://` for security
2. CORS restrictions prevent loading assets
3. Some features require HTTP/HTTPS protocol

**Solution**: Always use a web server (even locally)

---

## 🛠️ Troubleshooting

### Build Files Missing?

```bash
# Clean and rebuild
rm -rf dist
npm run build:local
```

### Port 8080 Already in Use?

```bash
# Use a different port
cd dist/public
python3 -m http.server 9000
```

### Assets Not Loading?

Check that you built with the correct base:
- **Local testing**: `--base=./` (relative paths)
- **GitHub Pages**: `--base=/wellsofchange/` (absolute paths)

---

## 📊 Comparison: Dev vs Build

| Feature | Dev Mode (`npm run dev`) | Static Build (`npm run build:local`) |
|---------|--------------------------|--------------------------------------|
| Server | Express + Vite dev server | Simple HTTP server |
| Port | 5000 | 8080 (or any) |
| Hot Reload | ✅ Yes | ❌ No |
| Source Maps | ✅ Yes | ❌ No |
| File Size | Large (not bundled) | Small (~19MB optimized) |
| Use Case | Development | Production/Preview |

---

## ✅ Summary

**For Local Development:**
```bash
npm run dev
# Visit: http://localhost:5000
```

**For Local Testing (Static):**
```bash
./preview-build.sh
# Visit: http://localhost:8080
```

**For GitHub Pages Deployment:**
```bash
git push origin main
# Auto-deploys to: https://jonyfs.github.io/wellsofchange/
```

---

**The static landing page is fully configured and ready to deploy!** 🎉🌊
