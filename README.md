# Wells of Change - Static Landing Page 🌊

**Multilingual NGO website** bringing clean water to underserved communities through solar-powered wells.

---

## 🚀 Quick Start

### View in Development (with Hot Reload)
```bash
npm install
npm run dev
```
Visit: **http://localhost:5000**

### Build to Root (Generate Assets)
```bash
./build-to-root.sh --github   # For GitHub Pages
./build-to-root.sh --local    # For local testing
```
**Builds and moves assets to root**: index.html, 404.html, favicon.png, assets/

### View Static Build (Production Preview)
```bash
./preview-build.sh
```
Visit: **http://localhost:8080** (served from root directory)

---

## 📺 **IMPORTANT: How to View the Website**

If you're seeing a **markdown file** instead of the website in Replit:

1. Click the **"Webview"** tab at the top
2. Or click **"Open in new tab"** button
3. The website is running at **http://localhost:5000**

**You should see**: Hero image, language selector, donation button, all sections styled beautifully!

📖 **More help**: See [docs/HOW_TO_VIEW_THE_WEBSITE.md](./docs/HOW_TO_VIEW_THE_WEBSITE.md)

---

## 🌐 GitHub Pages Deployment

**Live Site**: https://jonyfs.github.io/wellsofchange/

### ✅ FIXED: Asset Loading Issue

**Previous Issue**: Assets (CSS, JS, images) were not loading (404 errors)  
**Root Cause**: Missing `/wellsofchange/` base path in build  
**Status**: ✅ **FIXED** with 4-layer verification system

### ⭐ Deploy Automático com GitHub Actions (Recomendado)

**IMPORTANTE - Configure primeiro** (apenas uma vez):
1. Vá para: **https://github.com/jonyfs/wellsofchange/settings/pages**
2. Em **"Source"**, selecione: **"GitHub Actions"** (não "Deploy from a branch")
3. Em **Settings → Actions → General** → **Workflow permissions**: **"Read and write permissions"**

Depois, para fazer deploy:

```bash
git add .
git commit -m "Fix GitHub Pages asset paths"
git push origin main

# GitHub Actions agora tem verificação automática:
# ✅ Build → Verificação → Deploy → Teste → Site online!
```

**Novo**: Workflow agora **testa automaticamente** se todos os assets carregam!

### 🛠️ Build e Testes Locais

```bash
# Build para GitHub Pages (com verificação automática)
./build-github-pages.sh
# ✅ Base path verified: /wellsofchange/

# Testar build local
./verify-deployment.sh

# Testar site deployado (após push)
./test-deployed-site.sh
```

### 🧪 Verificações Implementadas

| Quando | O Que | Arquivo |
|--------|-------|---------|
| **Build Local** | Verifica base path | `build-github-pages.sh` |
| **GitHub Actions - Build** | Verifica antes de deploy | `.github/workflows/deploy.yml` |
| **GitHub Actions - Deploy** | Testa site ao vivo | `test-deployed-site.sh` |
| **Manual** | Verificação completa | `verify-deployment.sh` |

**Se qualquer verificação falhar**, o deploy é bloqueado! 🛡️

### 📚 Documentação

🔧 **Fix Applied**: [DEPLOYMENT_FIX.md](./DEPLOYMENT_FIX.md) - O que foi corrigido  
⚡ **Quick Start**: [docs/QUICK_START.md](./docs/QUICK_START.md)  
📖 **Guia Completo**: [docs/GITHUB_PAGES_DEPLOYMENT_GUIDE.md](./docs/GITHUB_PAGES_DEPLOYMENT_GUIDE.md)  
🔧 **Troubleshooting**: [docs/TROUBLESHOOTING_GITHUB_PAGES.md](./docs/TROUBLESHOOTING_GITHUB_PAGES.md)  
✅ **Checklist**: [docs/CHECK_GITHUB_PAGES.md](./docs/CHECK_GITHUB_PAGES.md)

### Opção 2: Deploy Manual com Build Local

```bash
# 1. Build para raiz
./build-to-root.sh --github

# 2. Commit e push
git add index.html 404.html favicon.png .nojekyll assets/
git commit -m "Deploy static site"
git push origin main
```

📖 **Guia**: [docs/GITHUB_PAGES_STATIC_SETUP.md](./docs/GITHUB_PAGES_STATIC_SETUP.md)

---

## 🎯 Features

✅ **4 Languages**: English, Portuguese (BR), Spanish, French  
✅ **Static Site**: No backend - perfect for GitHub Pages  
✅ **Responsive**: Mobile-first design  
✅ **9 Real Photos**: From Campo Formoso, Bahia project  
✅ **Partners**: Intelie, 2Solve, Viasat, Vale do Sol  
✅ **SEO Optimized**: Meta tags and Open Graph  
✅ **Auto Deploy**: GitHub Actions workflow  

---

## 📂 Project Structure

```
wellsofchange/
├── client/              # React frontend
│   ├── public/         # Static assets
│   └── src/            # Components, pages, i18n
├── dist/public/        # Build output (static files)
├── docs/               # Documentation
├── .github/workflows/  # Auto-deployment
└── preview-build.sh    # Local preview script
```

---

## 🛠️ Build Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run dev` | Development with hot reload | http://localhost:5000 |
| `npm run build:local` | Build for local preview | `dist/public/` with relative paths |
| `npm run build:github` | Build for GitHub Pages | `dist/public/` with `/wellsofchange/` base |
| `npm run preview` | Preview built site | http://localhost:4173 |

---

## 📚 Documentation

All documentation is in the `docs/` folder:

- 📘 [How to View the Website](./docs/HOW_TO_VIEW_THE_WEBSITE.md)
- 🚀 [Deployment Instructions](./docs/DEPLOYMENT_INSTRUCTIONS.md)
- 📗 [View Static Site Guide](./docs/VIEW_STATIC_SITE.md)
- 📕 [Quick Start Guide](./docs/QUICK_START.md)
- 🔧 [GitHub Pages Fix](./docs/GITHUB_PAGES_FIX.md)
- 📊 [Deployment Summary](./docs/DEPLOYMENT_SUMMARY.md)
- 📖 [Static Site Guide](./docs/STATIC_SITE_GUIDE.md)
- 📝 [What Was Fixed](./docs/WHAT_WAS_FIXED.md)
- 🎨 [Design Guidelines](./docs/design_guidelines.md)

---

## 🌍 Live Site

**Production**: https://jonyfs.github.io/wellsofchange/

The site automatically deploys when you push to the `main` branch.

---

## 🔧 Technical Stack

- **Frontend**: React 18 + TypeScript
- **Build**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: Wouter (client-side)
- **i18n**: Custom React Context
- **Deployment**: GitHub Pages via GitHub Actions

---

## 📧 Contact

**Email**: wellsofchange@gmail.com  
**Location**: Rio de Janeiro, Brazil

---

## 🎨 What You'll See

When you open the website (either locally or on GitHub Pages):

✅ **Hero Section** - Stunning background with water project imagery  
✅ **Our Story** - Mission and vision of Wells of Change  
✅ **Impact Stats** - Lives changed, wells built, water provided  
✅ **Projects** - Campo Formoso (Brazil) and future expansion to Senegal  
✅ **Partners** - Technology and engineering partners  
✅ **Language Selector** - Switch between 4 languages (bottom-right)  
✅ **Donation Button** - Support the cause (bottom-right)  

---

## 📊 Static Site Details

The built static site (`dist/public/`):

- **Size**: ~19MB (optimized)
- **Files**: 1 HTML, 1 CSS, 1 JS + images
- **Paths**: Relative (`./ `) for local, absolute (`/wellsofchange/`) for GitHub Pages
- **Routing**: Client-side with 404.html fallback
- **Browsers**: All modern browsers supported

---

## ✅ Deployment Status

Current configuration:
- ✅ GitHub Actions workflow configured
- ✅ Base URL set to `/wellsofchange/`
- ✅ 404.html for SPA routing
- ✅ .nojekyll file created
- ✅ All assets optimized
- ✅ Ready for production

---

**Built with ❤️ to bring clean water to communities in need** 🌊💙

---

## 🆘 Need Help?

- **Can't see the website?** → [How to View Guide](./docs/HOW_TO_VIEW_THE_WEBSITE.md)
- **Want to deploy?** → [Deployment Instructions](./docs/DEPLOYMENT_INSTRUCTIONS.md)
- **Issues with static build?** → [View Static Site Guide](./docs/VIEW_STATIC_SITE.md)
