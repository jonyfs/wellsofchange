# Configure Hostinger Domain for GitHub Pages

This guide explains how to configure your custom domain `wellsofchange.com` purchased from Hostinger to work with GitHub Pages.

---

## Prerequisites

- Domain registered with Hostinger: `wellsofchange.com`
- GitHub repository: `wellsofchange/wellsofchange`
- GitHub Pages enabled on your repository

---

## Step 1: Configure DNS Records in Hostinger

### Access DNS Zone Editor

1. Log into your [Hostinger Control Panel](https://hpanel.hostinger.com/)
2. Navigate to **Domains** → Select `wellsofchange.com`
3. Click on **DNS / Name Servers** or **DNS Zone Editor**

### Add A Records (for apex domain)

Add **four A records** pointing to GitHub's IP addresses:

| Type | Name | Points To (Value) | TTL |
|------|------|-------------------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**Note:** `@` represents your root domain (wellsofchange.com)

### Add CNAME Record (for www subdomain)

Add **one CNAME record** for the www subdomain:

| Type | Name | Points To (Value) | TTL |
|------|------|-------------------|-----|
| CNAME | www | wellsofchange.github.io. | 3600 |

**Important:** Include the trailing dot (`.`) after `github.io.`

### Remove Conflicting Records

- Delete any existing A or CNAME records that point to Hostinger's servers for `@` or `www`
- Keep only the GitHub Pages DNS records

---

## Step 2: Configure GitHub Repository

### Create CNAME File

Create a file named `CNAME` (no extension) in your repository root with the following content:

```
wellsofchange.com
```

Commit and push this file to your repository.

### Configure GitHub Pages Settings

1. Go to your repository on GitHub: `https://github.com/wellsofchange/wellsofchange`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, ensure your branch is selected (usually `main` or `gh-pages`)
4. Under **Custom domain**, enter: `wellsofchange.com`
5. Click **Save**
6. Wait for DNS check to complete (may show "DNS check in progress")
7. Once verified, check **Enforce HTTPS**

---

## Step 3: Update Build Configuration (if applicable)

If you're using a build tool (Vite, Webpack, etc.), ensure the `CNAME` file is preserved:

### For Vite Projects

Add `CNAME` file to your `public/` directory:

```
public/
  CNAME
```

The file will be copied to the build output automatically.

### Verify vite.config.ts

Ensure your base path is configured correctly:

```typescript
export default defineConfig({
  base: '/', // Root path for custom domain
  // ... other config
});
```

---

## Step 4: Wait for DNS Propagation

DNS changes typically take:
- **Minimum:** 15 minutes - 2 hours
- **Maximum:** 24-48 hours

### Check DNS Propagation

Use these tools to verify your DNS records have propagated:

- [WhatsMyDNS.net](https://www.whatsmydns.net/)
- [DNS Checker](https://dnschecker.org/)

Search for `wellsofchange.com` and verify:
- A records point to GitHub's IPs
- CNAME for `www` points to `wellsofchange.github.io`

---

## Step 5: Verify Your Setup

Once DNS has propagated, test your domain:

### Test URLs

1. **Apex domain:** https://wellsofchange.com
2. **WWW subdomain:** https://www.wellsofchange.com

Both should:
- Load your GitHub Pages site
- Show a valid SSL certificate (green padlock)
- Redirect to HTTPS automatically

### Troubleshooting

If your site doesn't load:

1. **Check DNS propagation** - May need to wait longer
2. **Verify CNAME file** - Must exist in repository root
3. **Check GitHub Pages settings** - Custom domain should show as verified
4. **Clear browser cache** - Try incognito/private mode
5. **Check A records** - All four IPs must be configured

---

## Common Issues & Solutions

### Issue: "DNS check unsuccessful"

**Solution:**
- Wait for DNS propagation (up to 48 hours)
- Verify all four A records are correct
- Ensure CNAME record has trailing dot: `wellsofchange.github.io.`

### Issue: "CNAME file deleted after deployment"

**Solution:**
- Move CNAME file to `public/` directory (for Vite/Webpack)
- Ensure build process preserves the file

### Issue: "Site loads but shows 404"

**Solution:**
- Check GitHub Pages source branch is correct
- Verify deployment workflow completed successfully
- Ensure `index.html` exists in deployment output

### Issue: "HTTPS not working"

**Solution:**
- Wait 24 hours after DNS propagation
- Uncheck and re-check "Enforce HTTPS" in GitHub settings
- Clear browser cache

---

## DNS Record Summary

For quick reference, here are all required DNS records:

```
Type    Name    Value                   TTL
----    ----    -----                   ---
A       @       185.199.108.153        3600
A       @       185.199.109.153        3600
A       @       185.199.110.153        3600
A       @       185.199.111.153        3600
CNAME   www     wellsofchange.github.io.  3600
```

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Configuring Custom Domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Hostinger DNS Management Guide](https://support.hostinger.com/en/articles/1583227-how-to-manage-dns-records)

---

**Last Updated:** November 13, 2025  
**Domain:** wellsofchange.com  
**Repository:** wellsofchange/wellsofchange
