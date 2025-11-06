# 🚀 GitHub Pages Deployment Guide - Wells of Change

Este guia explica como configurar e fazer deploy do site da Wells of Change no GitHub Pages.

## 📋 Pré-requisitos

- Repositório no GitHub
- Node.js 20+ instalado localmente (para desenvolvimento)

## ⚙️ Configuração Inicial

### 1. **Configure o Repositório no GitHub**

1. Crie um novo repositório no GitHub (se ainda não existir)
2. Faça push do código para o repositório:

```bash
git init
git add .
git commit -m "Initial commit: Wells of Change website"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

### 2. **Ative o GitHub Pages**

1. Vá para as configurações do repositório: `https://github.com/SEU-USUARIO/SEU-REPOSITORIO/settings/pages`
2. Em **Source** (Origem), selecione: **GitHub Actions**
3. Clique em **Save** (Salvar)

### 3. **Configure a Base URL (Se necessário)**

Se o seu repositório **NÃO** for um repositório de usuário/organização (username.github.io), você precisará ajustar a base URL:

**Opção A: Repositório de Usuário/Organização** (username.github.io)
- URL final: `https://username.github.io/`
- **Não precisa** de configuração adicional ✅

**Opção B: Repositório de Projeto** (username.github.io/repositorio)
- URL final: `https://username.github.io/repositorio/`
- **Configure a variável de ambiente** no workflow:

Edite `.github/workflows/deploy.yml` e adicione a base URL:

```yaml
- name: Build frontend
  run: npx vite build --base=/SEU-REPOSITORIO/
  env:
    NODE_ENV: production
```

Substitua `SEU-REPOSITORIO` pelo nome real do seu repositório.

## 🚀 Deploy Automático

O deploy acontece **automaticamente** quando você faz push para a branch `main`:

```bash
git add .
git commit -m "Update content"
git push origin main
```

### Acompanhe o Deploy

1. Vá para: `https://github.com/SEU-USUARIO/SEU-REPOSITORIO/actions`
2. Clique no workflow em execução para ver o progresso
3. Aguarde a conclusão (geralmente 2-5 minutos)
4. Acesse seu site em: `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`

## 🔧 Deploy Manual

Se quiser fazer deploy manual sem esperar por um push:

1. Vá para: `https://github.com/SEU-USUARIO/SEU-REPOSITORIO/actions`
2. Clique em "Deploy to GitHub Pages" na lista de workflows
3. Clique em "Run workflow" → "Run workflow"

## 📝 Estrutura do Workflow

O arquivo `.github/workflows/deploy.yml` contém a configuração do GitHub Actions:

```yaml
name: Deploy to GitHub Pages

# Triggers (quando executar)
on:
  push:
    branches: [main]  # Executa ao fazer push na branch main
  workflow_dispatch:   # Permite execução manual

# Permissões necessárias
permissions:
  contents: read
  pages: write
  id-token: write

# Jobs (tarefas)
jobs:
  build:  # Compilar o projeto
    - Checkout do código
    - Instalar Node.js 20
    - Instalar dependências
    - Build do frontend
    - Upload dos arquivos

  deploy: # Fazer deploy
    - Deploy para GitHub Pages
```

## 🌐 URLs de Acesso

Após o deploy bem-sucedido, o site estará disponível em:

- **Repositório de usuário**: `https://username.github.io/`
- **Repositório de projeto**: `https://username.github.io/repositorio/`

## 🔍 Resolução de Problemas

### Página em branco após deploy

**Problema**: O site carrega mas aparece uma página em branco.

**Solução**: Verifique se configurou a base URL corretamente (veja seção "Configure a Base URL").

### Erro 404 nos assets (CSS/JS/imagens)

**Problema**: Os arquivos não são encontrados.

**Solução**: Configure a base URL no build:

```yaml
- name: Build frontend
  run: npx vite build --base=/SEU-REPOSITORIO/
```

### Build falha no GitHub Actions

**Problema**: O workflow falha durante o build.

**Solução**: 
1. Verifique os logs do Actions
2. Teste o build localmente: `npm ci && npx vite build`
3. Certifique-se que todas as dependências estão no `package.json`

### Deploy não inicia automaticamente

**Problema**: O workflow não executa após push.

**Solução**:
1. Verifique se o workflow está habilitado em Actions
2. Confirme que fez push para a branch `main`
3. Verifique as permissões do repositório

## 📚 Recursos Adicionais

- [Documentação oficial do GitHub Pages](https://docs.github.com/pages)
- [Documentação do Vite](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions para Pages](https://github.com/actions/deploy-pages)

## 🎨 Customização do Domínio

Para usar um domínio customizado (ex: `www.wellsofchange.org`):

1. Adicione o arquivo `CNAME` na raiz com seu domínio:
   ```
   www.wellsofchange.org
   ```

2. Configure os DNS records no seu provedor de domínio:
   ```
   CNAME www username.github.io
   ```

3. Aguarde a propagação do DNS (pode levar até 48h)

## 💡 Dicas

- ✅ O build gera arquivos estáticos otimizados
- ✅ Todos os assets são automaticamente versionados
- ✅ Deploy é gratuito e ilimitado
- ✅ HTTPS é ativado automaticamente
- ✅ Site funciona em todas as 4 línguas (EN, PT-BR, ES, FR)

## 📞 Suporte

Se encontrar problemas, verifique:
1. Logs do GitHub Actions
2. Console do navegador (F12)
3. Issues no repositório do Vite

---

**Desenvolvido com ❤️ para Wells of Change**
🌊 Transformando vidas através da água potável
