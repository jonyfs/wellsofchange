# 🚀 Guia Rápido - Deploy no GitHub Pages

## ⚡ Início Rápido

### 1️⃣ Configure o Repositório GitHub

```bash
# Se ainda não inicializou o Git
git init
git add .
git commit -m "Site Wells of Change - versão inicial"
git branch -M main

# Adicione o repositório remoto (substitua com suas informações)
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# Envie para o GitHub
git push -u origin main
```

### 2️⃣ Ative GitHub Pages

1. Acesse: `https://github.com/SEU-USUARIO/SEU-REPOSITORIO/settings/pages`
2. Em **"Source"** (Origem), selecione: **GitHub Actions**
3. Clique em **"Save"**

### 3️⃣ Pronto! ✨

O deploy acontece automaticamente. Aguarde 2-5 minutos e acesse:

**`https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`**

---

## 🔧 Configuração Adicional (Se Necessário)

### Se o site estiver com página em branco:

O site está configurado para funcionar em qualquer URL. Se tiver problemas, edite `.github/workflows/deploy.yml`:

```yaml
- name: Build frontend
  run: npx vite build --base=/SEU-REPOSITORIO/
```

Substitua `SEU-REPOSITORIO` pelo nome real do repositório.

---

## 📝 Atualizações Futuras

Para atualizar o site, basta fazer push:

```bash
git add .
git commit -m "Atualização do conteúdo"
git push origin main
```

O site será automaticamente atualizado em poucos minutos!

---

## 🌐 Usando Domínio Personalizado

Para usar `www.wellsofchange.org` em vez de `username.github.io`:

1. Crie arquivo `client/public/CNAME` com:
   ```
   www.wellsofchange.org
   ```

2. Configure DNS no seu provedor:
   ```
   Tipo: CNAME
   Nome: www
   Valor: SEU-USUARIO.github.io
   ```

3. Em Settings → Pages, adicione o domínio customizado

---

## 📊 Acompanhamento

Veja o progresso do deploy em:
`https://github.com/SEU-USUARIO/SEU-REPOSITORIO/actions`

---

## ✅ O que já está configurado

- ✅ GitHub Actions workflow criado (`.github/workflows/deploy.yml`)
- ✅ Build otimizado do Vite
- ✅ Arquivo `.nojekyll` para GitHub Pages
- ✅ Deploy automático ao fazer push na branch `main`
- ✅ Suporte a deploy manual via GitHub Actions

---

## 📖 Documentação Completa

Para instruções detalhadas e resolução de problemas, veja:
**[GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)** (em inglês)

---

**Desenvolvido com 💙 para Wells of Change**
