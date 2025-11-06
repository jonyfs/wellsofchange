# 🚀 Deploy com gh-pages

## ✅ Configuração Completa

A dependência `gh-pages` foi instalada com sucesso!

```json
"dependencies": {
  "gh-pages": "^6.3.0"
}
```

---

## 📋 Como Usar

### Método 1: Script de Deploy (Recomendado) ⭐

Execute o script:
```bash
./deploy.sh
```

Este script irá:
1. ✅ Construir o site com `--base=/wellsofchange/`
2. ✅ Fazer deploy para a branch `gh-pages`
3. ✅ Publicar em: https://jonyfs.github.io/wellsofchange/

### Método 2: Comando Manual

```bash
# 1. Build
npx vite build --base=/wellsofchange/

# 2. Deploy
npx gh-pages --dist dist/public --branch gh-pages
```

---

## 🔧 Configuração do gh-pages

### Comando Completo

```bash
npx gh-pages --dist dist/public --branch gh-pages
```

**Parâmetros**:
- `--dist dist/public` → Pasta com os arquivos estáticos
- `--branch gh-pages` → Branch onde será feito o deploy

### Equivalente ao Script no package.json

O comando que você mencionou seria:
```json
{
  "scripts": {
    "deploy": "gh-pages --dist dist/public --branch gh-pages"
  }
}
```

**Nota**: Como não podemos editar `package.json` diretamente no Replit, criamos o script `deploy.sh` que faz exatamente a mesma coisa!

---

## 🌐 Configurar GitHub Pages

Após executar o deploy, configure o GitHub Pages:

### 1️⃣ Acesse as Configurações

Vá para: https://github.com/jonyfs/wellsofchange/settings/pages

### 2️⃣ Configure a Source

- **Branch**: Selecione `gh-pages`
- **Folder**: Selecione `/ (root)`

### 3️⃣ Salve

Clique em **Save**

---

## 📊 Comparação: gh-pages vs GitHub Actions

| Aspecto | gh-pages | GitHub Actions |
|---------|----------|----------------|
| **Setup** | Mais simples | Requer workflow file |
| **Deploy** | Manual (`./deploy.sh`) | Automático (on push) |
| **Controle** | Total (você decide quando) | Automático (sempre que push) |
| **Build Local** | Sim (na sua máquina) | Não (no servidor GitHub) |
| **Velocidade** | Depende da internet | ~2-5 minutos |
| **Ideal para** | Deploy sob demanda | CI/CD automático |

---

## 🎯 Workflow Recomendado

### Desenvolvimento
```bash
npm run dev
# Desenvolva e teste localmente
```

### Preview
```bash
./preview-build.sh
# Veja como ficará no GitHub Pages
```

### Deploy
```bash
./deploy.sh
# Faz deploy para GitHub Pages
```

---

## ✅ Passos Completos para Primeiro Deploy

### 1. Certifique-se que tem git configurado

```bash
git remote -v
# Deve mostrar: origin  https://github.com/jonyfs/wellsofchange.git
```

### 2. Execute o deploy

```bash
./deploy.sh
```

### 3. Configure GitHub Pages

1. Vá para: Settings → Pages
2. Source: Branch `gh-pages`, folder `/ (root)`
3. Save

### 4. Aguarde

Leva 1-2 minutos para o site ficar disponível em:
**https://jonyfs.github.io/wellsofchange/**

---

## 🔍 O Que Acontece Durante o Deploy

### 1️⃣ Build
```
vite build --base=/wellsofchange/
```
- Compila o React
- Otimiza assets
- Gera `dist/public/`

### 2️⃣ Deploy
```
gh-pages --dist dist/public --branch gh-pages
```
- Cria/atualiza a branch `gh-pages`
- Copia todos os arquivos de `dist/public/`
- Faz commit e push automático

### 3️⃣ GitHub Pages
- Detecta mudanças na branch `gh-pages`
- Publica os arquivos
- Site fica disponível no URL

---

## 📂 Estrutura da Branch gh-pages

Após o deploy, a branch `gh-pages` terá:

```
gh-pages (branch)
├── index.html
├── 404.html
├── favicon.png
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── [images].jpg/png
```

---

## 🆘 Troubleshooting

### Erro: "Failed to get remote"

**Causa**: Sem acesso ao repositório

**Solução**:
```bash
git remote -v
# Configure se necessário:
git remote add origin https://github.com/jonyfs/wellsofchange.git
```

### Erro: "Not found dist/public"

**Causa**: Build não foi executado

**Solução**:
```bash
npx vite build --base=/wellsofchange/
```

### Site não aparece

**Causa**: GitHub Pages não configurado

**Solução**:
1. Settings → Pages
2. Source: `gh-pages` branch
3. Save

### Mudanças não aparecem

**Causa**: Cache do navegador

**Solução**:
- Hard refresh: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
- Aguarde 1-2 minutos

---

## 📊 Vantagens do gh-pages

✅ **Simples**: Um comando para fazer deploy  
✅ **Controle**: Você decide quando fazer deploy  
✅ **Rápido**: Deploy direto sem CI/CD  
✅ **Histórico**: Mantém histórico na branch gh-pages  
✅ **Flexível**: Pode fazer deploy de qualquer pasta  

---

## 🔄 Atualizações Futuras

Para fazer deploy de novas mudanças:

```bash
# 1. Faça suas alterações no código
# 2. Execute o deploy
./deploy.sh

# Pronto! ✅
```

---

## 📝 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| **Dev** | `npm run dev` | Servidor de desenvolvimento |
| **Preview** | `./preview-build.sh` | Preview local do build |
| **Deploy** | `./deploy.sh` | Deploy para GitHub Pages |

---

## 🎯 Resumo

✅ **Instalado**: `gh-pages` v6.3.0  
✅ **Script criado**: `deploy.sh`  
✅ **Comando**: `./deploy.sh`  
✅ **Deploy para**: Branch `gh-pages`  
✅ **URL**: https://jonyfs.github.io/wellsofchange/  

---

## 🚀 Pronto para Deploy!

Execute agora:
```bash
./deploy.sh
```

E em 1-2 minutos seu site estará online! 🌊💙

---

## 📚 Documentação Adicional

- [gh-pages npm package](https://www.npmjs.com/package/gh-pages)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- Ver também: `docs/DEPLOYMENT_INSTRUCTIONS.md`

---

**O deploy com gh-pages está configurado e pronto para usar!** 🎉
