# 🌊 Wells of Change - NGO Website

**Static multilingual landing page for Wells of Change NGO** - Bringing clean water and sustainable technology to underserved communities.

> 📌 **This is a static site** optimized for GitHub Pages deployment. No backend required!

## 🌍 Available in 4 Languages

- 🇺🇸 English
- 🇧🇷 Português (Brasil)
- 🇪🇸 Español
- 🇫🇷 Français

## 🚀 Quick Start (Development)

```bash
# Install dependencies
npm install

# Start development server
npx vite --port 5000
```

The site will be available at `http://localhost:5000`

## 📦 Build for Production

```bash
# Build static files for deployment
npx vite build

# Preview production build locally
npx vite preview
```

Built files will be in `dist/public/` (~19MB) ready for GitHub Pages deployment.

## 🌐 Deploy to GitHub Pages (3 Steps)

**Important**: If your repository name is **not** "wellsofchange", update the base URL in `.github/workflows/deploy.yml`:
```yaml
run: npx vite build --base=/YOUR-REPO-NAME/
```

**1. Push to GitHub:**
```bash
git add .
git commit -m "Wells of Change website"
git push origin main
```

**2. Enable GitHub Pages:**
- Go to: Repository → Settings → Pages
- Source: Select **"GitHub Actions"**

**3. Done!** Site deploys automatically to: `https://USERNAME.github.io/REPO/`

Current configuration: **https://jonyfs.github.io/wellsofchange/**

📚 See [QUICK_START.md](./QUICK_START.md) for detailed instructions.  
🔧 Having issues? See [GITHUB_PAGES_FIX.md](./GITHUB_PAGES_FIX.md) for troubleshooting.

## 🎯 Features

- ✅ **Static Landing Page**: No backend required - perfect for GitHub Pages
- ✅ **Multilingual Support**: Complete translations in 4 languages
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Modern Stack**: React + Vite + TypeScript
- ✅ **Interactive Components**: Donation and language selector FABs
- ✅ **Real Project Photos**: 9 unique images from Campo Formoso, Bahia
- ✅ **Partners Section**: Showcasing Intelie, 2Solve, Viasat, and Vale do Sol Engenharia
- ✅ **GitHub Pages Ready**: Automated deployment via GitHub Actions

## 📦 Deployment to GitHub Pages

### Automated Deployment

Every push to the `main` branch automatically deploys to GitHub Pages via GitHub Actions.

**Setup Instructions:**

1. **Enable GitHub Pages in Repository Settings**
   - Go to: Settings → Pages
   - Source: **GitHub Actions**

2. **Push to Main Branch**
   ```bash
   git push origin main
   ```

3. **Access Your Site**
   - User/Org repo: `https://username.github.io/`
   - Project repo: `https://username.github.io/repository-name/`

For detailed deployment instructions, see [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)

## 🏗️ Project Structure

```
wells-of-change/
├── client/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # i18n and utilities
│   │   └── App.tsx         # Main app component
│   └── public/             # Static assets
├── attached_assets/        # Project images
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
└── package.json
```

## 🎨 Key Sections

- **Hero**: Introduction with project imagery
- **Mission Statement**: Core values and objectives
- **Our Story**: Journey from Campo Formoso to future expansion in Senegal
- **What We Do**: 4 pillars of impact + technology showcase
- **Our Commitment**: Project statistics and guarantees
- **Who We Are**: Team presentation
- **Partners**: Supporting organizations
- **Code of Ethics**: Transparency and non-partisanship declaration
- **Together for Change**: Call to action

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **Routing**: Wouter (client-side)
- **i18n**: Custom hook with localStorage
- **Icons**: Lucide React
- **Deployment**: GitHub Actions → GitHub Pages

## 📖 Documentation

- 📘 [Quick Start Guide](./QUICK_START.md) - Get started in 3 steps
- 📗 [GitHub Pages Setup](./GITHUB_PAGES_SETUP.md) - Full deployment guide
- 📕 [Guia em Português](./DEPLOY_GITHUB_PAGES.pt-BR.md) - Instruções em português
- 📙 [Static Site Architecture](./STATIC_SITE_GUIDE.md) - How it works

## 📞 Contact

- **Email**: wellsofchange@gmail.com
- **Headquarters**: Rio de Janeiro, Brazil

## 🤝 Partners

- **Intelie** - Technology and data analytics
- **2Solve** - Technology solutions
- **Viasat** - Satellite communications
- **Vale do Sol Engenharia** - Engineering and infrastructure

## 📄 License

MIT

---

**Built with ❤️ for communities in need**

🌊 Transforming lives, one well at a time.
