# ⚠️ Important: Base Path Removed

## 🔄 What Changed

The build configuration has been updated to **remove the base path**.

### Before
```yaml
run: npx vite build --base=/wellsofchange/
```
Asset paths: `/wellsofchange/assets/...`

### After
```yaml
run: npx vite build
```
Asset paths: `/assets/...`

---

## 📍 Where This Site Will Work

### ✅ Will Work At:

1. **Custom Domain**
   - `https://wellsofchange.org/`
   - `https://www.wellsofchange.org/`

2. **GitHub User Site** (if repository is named `jonyfs.github.io`)
   - `https://jonyfs.github.io/`

### ❌ Will NOT Work At:

**Project Sites** (repository not named `username.github.io`)
- `https://jonyfs.github.io/wellsofchange/` ❌

**Why**: Assets will try to load from `https://jonyfs.github.io/assets/...` instead of `https://jonyfs.github.io/wellsofchange/assets/...`

---

## 🎯 Deployment Options

### Option 1: Use Custom Domain (Recommended)

**Setup**:

1. **Add CNAME file**:
```bash
echo "www.wellsofchange.org" > client/public/CNAME
git add client/public/CNAME
git commit -m "Add custom domain"
git push
```

2. **Configure DNS** (at your domain registrar):
```
Type: CNAME
Name: www
Value: jonyfs.github.io
TTL: 3600
```

3. **Enable in GitHub**:
   - Settings → Pages → Custom domain: `www.wellsofchange.org`
   - Wait for DNS check ✅
   - Enable "Enforce HTTPS"

**Result**: Site works at `https://www.wellsofchange.org/` ✅

---

### Option 2: Rename Repository to User Site

**Steps**:

1. **Rename repository**:
   - Go to: Settings → General
   - Repository name: Change to `jonyfs.github.io`
   - Click "Rename"

2. **Update remote** (locally):
```bash
git remote set-url origin https://github.com/jonyfs/jonyfs.github.io.git
```

3. **Push**:
```bash
git push origin main
```

**Result**: Site works at `https://jonyfs.github.io/` ✅

---

### Option 3: Restore Base Path (Keep as Project Site)

If you want to keep the site at `https://jonyfs.github.io/wellsofchange/`:

**Revert change**:

1. **Edit `.github/workflows/deploy.yml`**:
```yaml
- name: Build
  run: npx vite build --base=/wellsofchange/
```

2. **Edit `build-github-pages.sh`**:
```bash
npx vite build --base=/wellsofchange/
```

3. **Rebuild and deploy**:
```bash
./build-github-pages.sh
git add .
git commit -m "Restore base path"
git push origin main
```

**Result**: Site works at `https://jonyfs.github.io/wellsofchange/` ✅

---

## 🚀 Current Deployment Status

**Build Configuration**: ✅ No base path (root-relative paths)

**Compatible with**:
- ✅ Custom domains
- ✅ User sites (jonyfs.github.io repository)
- ❌ Project sites (wellsofchange repository)

**Next Steps**:

1. Choose deployment option above
2. Configure accordingly
3. Push to deploy

---

## 📋 Quick Reference

| Deployment Type | Repository Name | Base Path | Site URL |
|----------------|-----------------|-----------|----------|
| Project Site | `wellsofchange` | `--base=/wellsofchange/` | `jonyfs.github.io/wellsofchange/` |
| User Site | `jonyfs.github.io` | None (current) | `jonyfs.github.io/` |
| Custom Domain | Any | None (current) | `wellsofchange.org/` |

---

## ✅ Verification

After deployment, verify paths:

```bash
# Check index.html
curl https://YOUR-DOMAIN/ | grep -o 'href="[^"]*"' | head -5

# Should show:
href="/favicon.png"           ✅ (no /wellsofchange/)
href="/assets/index-*.css"    ✅ (no /wellsofchange/)
```

---

**Choose your deployment type and configure accordingly!** 🚀
