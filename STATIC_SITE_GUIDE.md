# 🌐 Static Site Configuration - Wells of Change

## Overview

This project is configured as a **static landing page** that can be deployed to GitHub Pages without requiring a backend server.

## 🏗️ Architecture

### What Makes This Static?

- ✅ **Pure Frontend**: React SPA with no API calls
- ✅ **Client-Side Routing**: Wouter handles navigation in the browser
- ✅ **No Database**: All content is hardcoded in components
- ✅ **i18n in Frontend**: Language switching happens client-side
- ✅ **Static Assets**: All images bundled at build time

### Development vs Production

| Environment | Setup | Purpose |
|------------|-------|---------|
| **Development (Replit)** | Express + Vite | Hot reload, dev tooling |
| **Production (GitHub Pages)** | Static HTML/CSS/JS | No server needed |

## 📁 Build Output Structure

When you run `npx vite build`, it creates:

```
dist/public/
├── index.html          # Main HTML file
├── .nojekyll          # Tells GitHub Pages to serve all files
├── favicon.png
└── assets/
    ├── index-[hash].js    # Bundled JavaScript
    ├── index-[hash].css   # Bundled CSS
    └── [images]           # All project images
```

## 🔧 How It Works

### 1. Development (Replit)

In Replit, we use the Express server for convenience:
- Serves the Vite dev server
- Provides hot module replacement
- **This is NOT deployed to GitHub Pages**

### 2. Build Process

```bash
npx vite build
```

This:
- Compiles React to vanilla JavaScript
- Bundles all components into a single JS file
- Optimizes images and assets
- Generates static HTML
- Outputs to `dist/public/`

### 3. GitHub Pages Deployment

The GitHub Actions workflow:
1. Checks out code
2. Installs dependencies
3. Runs `npx vite build`
4. Uploads `dist/public/` to GitHub Pages
5. GitHub Pages serves the static files

## 🚀 Local Testing

### Option 1: Vite Dev Server
```bash
npx vite
```
- Hot reload enabled
- Fast development

### Option 2: Preview Production Build
```bash
npx vite build
npx vite preview
```
- Tests production build locally
- No hot reload (as it would be on GitHub Pages)

### Option 3: Simple HTTP Server
```bash
npx vite build
cd dist/public
python3 -m http.server 8080
```
Visit: `http://localhost:8080`

## 📊 Current vs Ideal Setup

### Current Setup (Hybrid)
```
Development (Replit):    Express + Vite ⚡
Production (GitHub):     Static Files   🌐
```

### Why Express in Development?

The Replit environment was originally configured with Express, which is fine because:
- It doesn't affect production build
- Provides development features
- GitHub Actions bypasses it entirely

### Build Command Analysis

**package.json script:**
```json
"build": "vite build && esbuild server/index.ts ..."
```
❌ Builds backend (not needed for GitHub Pages)

**GitHub Actions workflow:**
```yaml
- run: npx vite build
```
✅ Only builds frontend (perfect for static site)

## 🎯 What Gets Deployed

### Included ✅
- All React components
- Tailwind CSS styles
- Images from `attached_assets/`
- Client-side routing
- Language switching logic
- All 4 language translations

### Not Included ❌
- Express server
- Database code
- Backend API routes
- Server-side storage

## 🔍 Verifying Static Nature

### Check for API Calls

```bash
# Search for API calls in components
grep -r "useQuery\|useMutation\|fetch\|apiRequest" client/src/components
```

Result: **None found** ✅

The app uses QueryClientProvider but doesn't make actual API calls.

## 📝 Best Practices

### ✅ Do's
- Keep all content in components
- Use client-side state management
- Bundle assets at build time
- Use environment variables with `VITE_` prefix

### ❌ Don'ts
- Don't add backend API calls
- Don't rely on server-side logic
- Don't use Node.js APIs in frontend code
- Don't expect database connections

## 🌍 Multi-Language Support

Languages work purely client-side:
- All translations in `client/src/lib/i18n.tsx`
- Language state in localStorage
- No server-side rendering needed

## 🔗 Routing on GitHub Pages

Uses `wouter` for client-side routing:
- All routes handled in browser
- No server configuration needed
- Works perfectly on GitHub Pages

## 📞 Contact Forms

Current setup:
- Contact email displayed: `wellsofchange@gmail.com`
- No form submission backend

To add working contact form:
1. Use a service like Formspree, Google Forms, or Netlify Forms
2. Or add `mailto:` links (simple but not ideal)
3. Or integrate with Zapier webhooks

## 🎨 Image Optimization

All 9 project images are:
- Imported at build time
- Optimized by Vite
- Served as static assets
- **Total size: ~20MB** (consider optimization)

### Recommendation
```bash
# Install image optimization
npm install -D vite-plugin-image-optimizer

# Add to vite.config.ts plugins
```

## 🚀 Deployment Checklist

Before deploying to GitHub Pages:

- [x] Build succeeds locally (`npx vite build`)
- [x] GitHub Actions workflow configured
- [x] Output path set to `dist/public`
- [x] `.nojekyll` file created
- [x] No API calls to backend
- [x] All routes work client-side
- [x] Images load correctly

## 📚 Resources

- [Vite Static Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [React Router on GitHub Pages](https://github.com/rafgraph/spa-github-pages)

---

**Summary**: This project is a true static site ready for GitHub Pages. The Express server is only used for local development in Replit and is completely bypassed during production builds.
