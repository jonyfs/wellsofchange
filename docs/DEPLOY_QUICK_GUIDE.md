# 🚀 Guia Rápido de Deploy

## ✅ Dependência Instalada

```bash
✓ gh-pages@6.3.0 instalado com sucesso!
```

---

## 🎯 Dois Métodos de Deploy Disponíveis

### 1️⃣ Deploy com gh-pages (Sob Demanda) ⭐

**Use quando**: Quiser controlar exatamente quando fazer deploy

```bash
./deploy.sh
```

**O que acontece**:
1. Build do site com `--base=/wellsofchange/`
2. Deploy para branch `gh-pages`
3. Site atualizado em 1-2 minutos

**Equivalente a**:
```json
{
  "scripts": {
    "deploy": "gh-pages --dist dist/public --branch gh-pages"
  }
}
```

### 2️⃣ Deploy com GitHub Actions (Automático)

**Use quando**: Quiser deploy automático a cada mudança

```bash
git push origin main
```

**O que acontece**:
1. GitHub Actions detecta o push
2. Build automático no servidor
3. Deploy automático
4. Site atualizado em 2-5 minutos

---

## 📋 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento local (http://localhost:5000) |
| `./preview-build.sh` | Preview do site estático |
| `./deploy.sh` | Deploy para GitHub Pages via gh-pages |
| `git push origin main` | Deploy via GitHub Actions |

---

## 🔧 Primeira Configuração do GitHub Pages

### Para gh-pages (Método 1):

1. Execute: `./deploy.sh`
2. Vá para: https://github.com/jonyfs/wellsofchange/settings/pages
3. **Source**: Branch `gh-pages`, folder `/ (root)`
4. Clique em **Save**
5. Aguarde 1-2 minutos

### Para GitHub Actions (Método 2):

1. Execute: `git push origin main`
2. Vá para: https://github.com/jonyfs/wellsofchange/settings/pages
3. **Source**: `GitHub Actions`
4. Aguarde 2-5 minutos

---

## 🎯 Recomendação

**Para este projeto, recomendo usar gh-pages (`./deploy.sh`)** porque:

✅ Mais rápido (build local)  
✅ Mais controle (você decide quando)  
✅ Mais simples (um comando)  
✅ Menos uso de recursos do GitHub  

---

## 📚 Documentação Completa

- 📘 [Deploy com gh-pages](./docs/DEPLOY_WITH_GH_PAGES.md)
- 📗 [Deploy com GitHub Actions](./docs/DEPLOYMENT_INSTRUCTIONS.md)
- 📕 [Como visualizar o site](./docs/HOW_TO_VIEW_THE_WEBSITE.md)

---

## ✨ Scripts Criados

```bash
./deploy.sh          # Deploy com gh-pages
./preview-build.sh   # Preview local do build
./start-dev.sh       # Inicia servidor dev
```

---

**Tudo pronto para fazer deploy!** 🌊

Execute `./deploy.sh` para publicar seu site! 🚀
