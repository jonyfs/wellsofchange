# ⚡ Quick Start - Wells of Change

## 🎯 What Is This?

A **static multilingual landing page** for Wells of Change NGO. No backend required!

## 🚀 Run Locally (Development)

```bash
# Install dependencies
npm install

# Start development server
npx vite --port 5000
```

Visit: `http://localhost:5000`

## 📦 Build for Production

```bash
# Build static files
npx vite build

# Output will be in: dist/public/
```

## 🌐 Deploy to GitHub Pages

### Quick Deploy (3 Steps)

**1. Push to GitHub:**
```bash
git init
git add .
git commit -m "Wells of Change website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

**2. Enable GitHub Pages:**
- Go to: Repository Settings → Pages
- Source: Select **"GitHub Actions"**
- Save

**3. Done! 🎉**

Your site will be live at: `https://USERNAME.github.io/REPO/`

### Updates

Every push to `main` automatically deploys:
```bash
git add .
git commit -m "Update content"
git push
```

## 📝 What's Included?

✅ 4 languages (EN, PT-BR, ES, FR)  
✅ Responsive design  
✅ Real project photos from Campo Formoso  
✅ Partners section  
✅ Automated deployment  

## 🔧 Customization

### Change Base URL (IMPORTANT!)

**Current configuration**: `/wellsofchange/` (for repo "wellsofchange")

If your repository name is different, you MUST update this:

Edit `.github/workflows/deploy.yml`:
```yaml
- name: Build frontend
  run: npx vite build --base=/YOUR-REPO-NAME/
```

**Examples**:
- Repo: `my-ngo-site` → use `--base=/my-ngo-site/`
- Repo: `wells` → use `--base=/wells/`
- User site: `username.github.io` → use `--base=/` or omit --base

**Why this matters**: Without the correct base URL, assets (CSS, JS, images) won't load on GitHub Pages!

### Add Custom Domain

Create `client/public/CNAME`:
```
www.wellsofchange.org
```

Then configure DNS:
```
Type: CNAME
Name: www
Value: USERNAME.github.io
```

## 📚 More Info

- Full deployment guide: [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)
- Static site architecture: [STATIC_SITE_GUIDE.md](./STATIC_SITE_GUIDE.md)
- Portuguese guide: [DEPLOY_GITHUB_PAGES.pt-BR.md](./DEPLOY_GITHUB_PAGES.pt-BR.md)

---

**Built for communities in need** 🌊💙
