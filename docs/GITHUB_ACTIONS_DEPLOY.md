# 🚀 GitHub Actions - Automatic Deployment

## ✅ Workflow Configurado

O GitHub Actions está configurado para **build e deploy automático** do site estático.

---

## 🎯 Como Funciona

### Trigger Automático

O workflow é executado automaticamente quando você:
- ✅ Faz push para a branch `main`
- ✅ Dispara manualmente via GitHub Actions UI

### Processo de Deploy

```
Push to main
     ↓
GitHub Actions trigger
     ↓
Install dependencies (npm ci)
     ↓
Build static site (vite build)
     ↓
Create .nojekyll file
     ↓
Copy 404.html
     ↓
Upload artifact (dist/public/)
     ↓
Deploy to GitHub Pages
     ↓
Site live! 🎉
```

---

## 📋 Configuração do GitHub Pages

### Passo 1: Configurar Source

1. Vá para: **https://github.com/jonyfs/wellsofchange/settings/pages**
2. Em **"Source"**, selecione:
   - **GitHub Actions** (não "Deploy from a branch")
3. Salve (se necessário)

### Passo 2: Push para Main

```bash
git add .
git commit -m "Update website"
git push origin main
```

### Passo 3: Aguardar Deploy

1. Vá para: **https://github.com/jonyfs/wellsofchange/actions**
2. Veja o workflow "Deploy Static Site to GitHub Pages" em execução
3. Aguarde 2-5 minutos
4. Site estará em: **https://jonyfs.github.io/wellsofchange/**

---

## 🔍 Workflow Details

### Nome do Workflow
```yaml
name: Deploy Static Site to GitHub Pages
```

### Jobs

#### build-and-deploy
```yaml
steps:
  1. Checkout repository
  2. Setup Node.js 20
  3. Install dependencies (npm ci)
  4. Build static site (vite build)
  5. Create .nojekyll file
  6. Copy 404.html for SPA routing
  7. Setup Pages
  8. Upload artifact (dist/public/)
  9. Deploy to GitHub Pages
```

### Build Output

O build gera arquivos em `dist/public/`:
```
dist/public/
├── index.html           ← Página principal
├── 404.html             ← Fallback SPA
├── favicon.png          ← Ícone
├── .nojekyll            ← Desabilita Jekyll
└── assets/              ← JS, CSS, imagens
    ├── index-[hash].js  (345 KB)
    ├── index-[hash].css (73 KB)
    └── [imagens].jpg    (~19 MB)
```

### Artifact Upload

O workflow faz upload de `dist/public/` para GitHub Pages:
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./dist/public
```

---

## 📊 Comparação: GitHub Actions vs Manual

| Aspecto | GitHub Actions | Manual (gh-pages) |
|---------|----------------|-------------------|
| **Trigger** | Automático (on push) | Manual (./deploy.sh) |
| **Build** | No servidor GitHub | Local |
| **Setup** | Configuração inicial | Instalação gh-pages |
| **Controle** | Menos controle | Total controle |
| **Velocidade** | 2-5 minutos | 1-2 minutos |
| **Ideal para** | CI/CD, deploy contínuo | Deploy sob demanda |

---

## ✅ Vantagens do GitHub Actions

✅ **Totalmente automático** - Push e esqueça  
✅ **Sem build local** - Build no servidor  
✅ **CI/CD integrado** - Deploy a cada mudança  
✅ **Histórico completo** - Logs de todos os deploys  
✅ **Rollback fácil** - Pode reverter pelo GitHub  

---

## 🎯 Workflow de Desenvolvimento

### Desenvolvimento Local
```bash
npm run dev
# Desenvolva normalmente
```

### Fazer Mudanças
```bash
# 1. Edite arquivos em client/src/
# 2. Teste localmente
npm run dev

# 3. Commit
git add .
git commit -m "Update feature X"

# 4. Push
git push origin main

# 5. GitHub Actions faz deploy automaticamente!
# Aguarde 2-5 minutos
```

---

## 🔍 Monitorar Deploy

### Ver Progresso

1. Vá para: **https://github.com/jonyfs/wellsofchange/actions**
2. Clique no último workflow run
3. Veja os steps em tempo real:
   - ⏳ Running (amarelo)
   - ✅ Success (verde)
   - ❌ Failed (vermelho)

### Logs Detalhados

Clique em cada step para ver logs:
- Install dependencies
- Build static site
- Deploy to GitHub Pages

---

## 🆘 Troubleshooting

### Workflow Falha

**Erro**: `npm ci` falha

**Solução**:
```bash
# Verifique package-lock.json
git status
git add package-lock.json
git commit -m "Update package-lock"
git push origin main
```

**Erro**: Build falha

**Solução**:
```bash
# Teste build localmente
npx vite build --base=/wellsofchange/

# Se funcionar local, verifique Node version no workflow
# Deve ser Node 20
```

**Erro**: Deploy falha

**Solução**:
1. Verifique Settings → Pages
2. Source deve ser "GitHub Actions"
3. Verifique permissions no workflow (pages: write)

### Site Não Atualiza

**Causa**: Cache do navegador

**Solução**:
```bash
# Hard refresh
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)

# Ou aguarde 5 minutos
```

---

## 📝 Arquivo do Workflow

**Location**: `.github/workflows/deploy.yml`

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

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      
      - run: npx vite build --base=/wellsofchange/
        env:
          NODE_ENV: production
      
      - run: touch dist/public/.nojekyll
      
      - run: cp dist/public/index.html dist/public/404.html
      
      - uses: actions/configure-pages@v4
      
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist/public
      
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🎉 Status

✅ **Workflow configurado**  
✅ **Build automático** (vite build)  
✅ **Deploy automático** (GitHub Pages)  
✅ **index.html gerado** em dist/public/  
✅ **Pronto para uso**  

---

## 🚀 Próximos Passos

### 1. Configure GitHub Pages Source

Settings → Pages → Source: **GitHub Actions**

### 2. Push para Main

```bash
git push origin main
```

### 3. Aguarde Deploy

- Vá para Actions tab
- Veja workflow executando
- Aguarde 2-5 minutos
- ✅ Site online!

---

**Deploy automático configurado!** 🎉

Agora todo push para `main` faz deploy automaticamente! 🚀
