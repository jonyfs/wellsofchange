# Wells of Change - NGO Website

🌊 **Static multilingual website for Wells of Change NGO**

Clean water solutions through solar-powered wells with real-time monitoring.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

Visit: **http://localhost:5000**

### Production Build
```bash
npm run build
```

Output: `dist/public/` (~19MB) ready for GitHub Pages

## 🌐 Deploy to GitHub Pages

**Current configuration**: https://jonyfs.github.io/wellsofchange/

**Important**: If your repository name is **not** "wellsofchange", update the base URL in `.github/workflows/deploy.yml`:
```yaml
run: npx vite build --base=/YOUR-REPO-NAME/
```

**Steps:**
1. Push to GitHub: `git push origin main`
2. Enable GitHub Pages: Settings → Pages → Source: **GitHub Actions**
3. Done! Site deploys automatically

## 📚 Documentation

All documentation has been moved to the `docs/` folder:

- 📘 [Quick Start Guide](./docs/QUICK_START.md)
- 📗 [GitHub Pages Setup](./docs/GITHUB_PAGES_SETUP.md)
- 📕 [Deployment Guide (PT-BR)](./docs/DEPLOY_GITHUB_PAGES.pt-BR.md)
- 🔧 [GitHub Pages Fix](./docs/GITHUB_PAGES_FIX.md)
- 📊 [Deployment Summary](./docs/DEPLOYMENT_SUMMARY.md)
- 📋 [What Was Fixed](./docs/WHAT_WAS_FIXED.md)
- 📖 [Static Site Guide](./docs/STATIC_SITE_GUIDE.md)
- 📝 [Fix Summary](./docs/FIX_SUMMARY.md)
- 🎨 [Design Guidelines](./docs/design_guidelines.md)

## 🎯 Features

- ✅ **4 Languages**: English, Portuguese (BR), Spanish, French
- ✅ **Static Site**: No backend required - perfect for GitHub Pages
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **9 Real Photos**: From Campo Formoso, Bahia project
- ✅ **Partners Section**: Intelie, 2Solve, Viasat, Vale do Sol
- ✅ **FAB Navigation**: Language selector + Donation button
- ✅ **Auto Deploy**: GitHub Actions workflow included

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: Wouter (client-side)
- **i18n**: Custom React Context
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📂 Project Structure

```
├── client/               # Frontend React application
│   ├── public/          # Static assets (favicon, 404.html)
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       └── lib/         # i18n and utilities
├── attached_assets/     # Project images
├── .github/workflows/   # GitHub Actions
├── docs/               # Documentation
└── dist/public/        # Build output
```

## 🌍 Live Site

**Deployed at**: https://jonyfs.github.io/wellsofchange/

## 📧 Contact

**Email**: wellsofchange@gmail.com  
**Location**: Rio de Janeiro, Brazil

## 📝 License

Copyright © 2024 Wells of Change NGO

---

**Built with ❤️ to bring clean water to communities in need** 🌊
