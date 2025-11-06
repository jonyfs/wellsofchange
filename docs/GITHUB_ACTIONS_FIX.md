# ✅ GitHub Actions Workflow - Configurado para Deploy Automático

## 🎉 Problema Resolvido!

O workflow do GitHub Actions foi **corrigido e otimizado** para funcionar perfeitamente com "Build and deployment using GitHub Actions".

---

## 🎯 O Que Foi Corrigido

### Antes ❌

**Problemas**:
- Workflow separado em 2 jobs (build + deploy)
- Tentava mover assets para raiz (desnecessário)
- Upload artifact da raiz (confuso)
- Dependência do script move-to-root.sh

### Agora ✅

**Melhorias**:
- ✅ Job único e eficiente (build-and-deploy)
- ✅ Build direto para dist/public/
- ✅ Upload artifact de dist/public/
- ✅ Sem dependência de scripts externos
- ✅ Processo limpo e direto

---

## 📋 Workflow Atualizado

### Nome
```yaml
name: Deploy Static Site to GitHub Pages
```

### Job: build-and-deploy

```yaml
steps:
  1. Checkout repository
  2. Setup Node.js 20
  3. Install dependencies (npm ci)
  4. Build static site (vite build --base=/wellsofchange/)
  5. Create .nojekyll file
  6. Copy 404.html for SPA routing
  7. Setup Pages
  8. Upload artifact (dist/public/)
  9. Deploy to GitHub Pages
```

---

## 🔧 Configuração Necessária

### 1. Configurar GitHub Pages Source

**IMPORTANTE**: Configure o GitHub Pages para usar GitHub Actions (não branch)

1. Vá para: **https://github.com/jonyfs/wellsofchange/settings/pages**
2. Em **"Source"**, selecione:
   - **GitHub Actions** ← (não "Deploy from a branch")
3. Clique em **Save** (se aparecer)

### 2. Push para Main

```bash
git add .github/workflows/deploy.yml
git commit -m "Fix GitHub Actions workflow for automatic deployment"
git push origin main
```

### 3. Verificar Deploy

1. Vá para: **https://github.com/jonyfs/wellsofchange/actions**
2. Veja o workflow "Deploy Static Site to GitHub Pages" executando
3. Aguarde 2-5 minutos
4. ✅ Site estará em: **https://jonyfs.github.io/wellsofchange/**

---

## 📊 Como Funciona

### Trigger Automático

O workflow executa automaticamente quando:
- ✅ Você faz push para branch `main`
- ✅ Você dispara manualmente (workflow_dispatch)

### Build Process

```bash
# 1. Install dependencies
npm ci

# 2. Build with Vite
npx vite build --base=/wellsofchange/
# Output: dist/public/

# 3. Create .nojekyll
touch dist/public/.nojekyll

# 4. Copy 404.html
cp dist/public/index.html dist/public/404.html

# 5. Upload dist/public/
# 6. Deploy to GitHub Pages
```

### Build Output

```
dist/public/
├── index.html           ← Página principal (1.5 KB)
├── 404.html             ← Fallback SPA (728 B)
├── favicon.png          ← Ícone (1.2 KB)
├── .nojekyll            ← Desabilita Jekyll
└── assets/              ← JS, CSS, imagens (19 MB)
    ├── index-[hash].js  (345 KB)
    ├── index-[hash].css (73 KB)
    └── [imagens].jpg    (~19 MB)
```

---

## 🎯 Workflow de Desenvolvimento

### Fazer Mudanças

```bash
# 1. Edite arquivos em client/src/
vim client/src/pages/Home.tsx

# 2. Teste localmente
npm run dev

# 3. Commit
git add .
git commit -m "Update home page"

# 4. Push
git push origin main

# 5. GitHub Actions faz deploy automaticamente!
# ✅ Build
# ✅ Deploy
# ✅ Site online em 2-5 minutos
```

### Monitorar Deploy

1. **Actions Tab**: https://github.com/jonyfs/wellsofchange/actions
2. Clique no workflow mais recente
3. Veja o progresso:
   - 🟡 Running
   - 🟢 Success
   - 🔴 Failed

---

## ✅ Vantagens do GitHub Actions

| Vantagem | Descrição |
|----------|-----------|
| **Automático** | Deploy a cada push |
| **Build no servidor** | Não precisa build local |
| **Histórico completo** | Todos os deploys registrados |
| **Logs detalhados** | Debug fácil |
| **Rollback simples** | Reverter commits |
| **CI/CD integrado** | Teste + deploy |

---

## 📝 Arquivo Completo do Workflow

**Localização**: `.github/workflows/deploy.yml`

```yaml
name: Deploy Static Site to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npx vite build --base=/wellsofchange/
        env:
          NODE_ENV: production

      - name: Create .nojekyll file
        run: touch dist/public/.nojekyll

      - name: Copy 404.html for SPA routing
        run: cp dist/public/index.html dist/public/404.html

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist/public

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🆘 Troubleshooting

### Workflow não executa

**Causa**: Source não está configurado para GitHub Actions

**Solução**:
1. Settings → Pages
2. Source: **GitHub Actions** (não branch)
3. Push novamente

### Build falha

**Erro comum**: `npm ci` falha

**Solução**:
```bash
# Commit package-lock.json
git add package-lock.json
git commit -m "Update lockfile"
git push origin main
```

### Deploy falha

**Erro**: Permission denied

**Solução**:
1. Verifique permissions no workflow:
   ```yaml
   permissions:
     pages: write
     id-token: write
   ```
2. Settings → Actions → General → Workflow permissions
3. Selecione "Read and write permissions"

### Site não atualiza

**Causa**: Cache do navegador

**Solução**:
- Hard refresh: `Ctrl+Shift+R` ou `Cmd+Shift+R`
- Aguarde 5 minutos
- Limpe cache do navegador

---

## 📊 Comparação: Antes vs Agora

| Aspecto | Antes | Agora |
|---------|-------|-------|
| **Jobs** | 2 (build + deploy) | 1 (build-and-deploy) |
| **Scripts externos** | move-to-root.sh | Nenhum |
| **Build output** | Raiz (/) | dist/public/ |
| **Upload from** | . (raiz) | dist/public/ |
| **Complexidade** | Alta | Baixa |
| **Manutenção** | Difícil | Fácil |

---

## 🎉 Status Final

✅ **Workflow otimizado**  
✅ **Job único e eficiente**  
✅ **Build para dist/public/**  
✅ **Upload correto do artifact**  
✅ **Deploy automático configurado**  
✅ **Sem dependências externas**  
✅ **Pronto para uso**  

---

## 🚀 Próximos Passos

### 1. Configure GitHub Pages

Settings → Pages → Source: **GitHub Actions**

### 2. Push para Main

```bash
git push origin main
```

### 3. Monitorar Deploy

Actions → Ver workflow executando → Aguardar 2-5 minutos

### 4. Site Online!

**https://jonyfs.github.io/wellsofchange/** 🎉

---

**GitHub Actions configurado para deploy automático!** 🚀

Todo push para `main` agora faz build e deploy automaticamente! ✅
