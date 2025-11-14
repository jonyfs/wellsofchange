# Redirect wellsofchange.org to wellsofchange.com

This guide explains how to configure Hostinger to redirect `www.wellsofchange.org` to show `www.wellsofchange.com` content.

---

## Method 1: Using Hostinger's Domain Redirect Feature (Recommended)

This is the cleanest, fastest, and most SEO-friendly approach.

### Step 1: Access Hostinger Control Panel

1. Log into [Hostinger Control Panel](https://hpanel.hostinger.com/)
2. Navigate to **Domains** → Select `wellsofchange.org`

### Step 2: Set Up Domain Redirect

1. Find the **"Redirects"** or **"Domain Forwarding"** section in the domain management area
2. Click **"Create Redirect"** or **"Add Redirect"**

### Step 3: Configure Redirect Settings

| Setting | Value |
|---------|-------|
| **Source/From** | `wellsofchange.org` |
| **Destination/To** | `https://wellsofchange.com` |
| **Redirect Type** | `301 Permanent Redirect` |
| **Include www** | ✅ Enable/Check (redirects www.wellsofchange.org too) |
| **Include path** | ✅ Enable (preserves URL paths) |

4. Click **Save** or **Create**

### What This Accomplishes

- ✅ `wellsofchange.org` → `https://wellsofchange.com`
- ✅ `www.wellsofchange.org` → `https://wellsofchange.com`
- ✅ `wellsofchange.org/about` → `https://wellsofchange.com/about` (path preserved)
- ✅ 301 redirect (SEO-friendly permanent redirect)
- ✅ Search engines recognize .com as primary domain
- ✅ No duplicate content issues

### Benefits of 301 Redirect

- **SEO-Friendly**: Passes link equity to your primary domain
- **Clean URLs**: Browser shows the final .com address
- **User-Friendly**: Clear indication of your main domain
- **Fast**: Works at the DNS/server level
- **Automatic**: No code changes needed in your application

---

## Method 2: Using DNS Configuration (Alternative)

Use this method if the redirect feature is not available in your Hostinger plan.

### Step 1: Configure DNS for wellsofchange.org

Add the same GitHub Pages DNS records:

| Type | Name | Points To (Value) | TTL |
|------|------|-------------------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | wellsofchange.github.io. | 3600 |

**Note:** This makes both domains point to the same GitHub Pages site.

### Step 2: Add Client-Side Redirect

Add this JavaScript code to your website's main file (e.g., `src/main.tsx` or `src/App.tsx`):

```javascript
// Redirect .org domain to .com
if (window.location.hostname === 'www.wellsofchange.org' || 
    window.location.hostname === 'wellsofchange.org') {
  const newUrl = 'https://wellsofchange.com' + window.location.pathname + window.location.search;
  window.location.replace(newUrl);
}
```

Or in React `App.tsx`:

```typescript
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Redirect .org to .com
    if (window.location.hostname.endsWith('.org')) {
      const newUrl = 'https://wellsofchange.com' + 
                     window.location.pathname + 
                     window.location.search;
      window.location.replace(newUrl);
    }
  }, []);

  // ... rest of your app
}
```

### Drawbacks of This Method

- ⚠️ Redirect happens in the browser (after page loads)
- ⚠️ Brief flash of .org URL before redirect
- ⚠️ Not as SEO-friendly as server-side 301 redirect
- ⚠️ Requires code changes in your application

---

## Method 3: HTML Meta Refresh (Last Resort)

If other methods don't work, use HTML meta refresh.

### Step 1: Create Landing Page

Create a simple HTML page for wellsofchange.org:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0;url=https://wellsofchange.com">
  <link rel="canonical" href="https://wellsofchange.com">
  <title>Redirecting to Wells of Change</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .redirect-message {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="redirect-message">
    <h1>Redirecting...</h1>
    <p>If you are not redirected automatically, please visit:</p>
    <a href="https://wellsofchange.com">wellsofchange.com</a>
  </div>
  <script>
    window.location.replace('https://wellsofchange.com');
  </script>
</body>
</html>
```

### Step 2: Host This Page

Upload this HTML file to wellsofchange.org's hosting.

---

## Verification Steps

After configuring the redirect (wait 15-30 minutes for propagation):

### Test the Redirect

1. Open a browser (or incognito/private mode)
2. Type `www.wellsofchange.org` in the address bar
3. Press Enter

### Expected Result

- ✅ You should be automatically redirected to `wellsofchange.com`
- ✅ The URL bar should show `wellsofchange.com` (not .org)
- ✅ Your GitHub Pages site should load normally
- ✅ HTTPS (green padlock) should be active

### Check Redirect Type

Use these tools to verify it's a 301 redirect:

1. **Browser Developer Tools:**
   - Open DevTools (F12)
   - Go to Network tab
   - Visit `wellsofchange.org`
   - Look for status code `301` in the redirect

2. **Online Tools:**
   - [Redirect Checker](https://www.redirect-checker.org/)
   - [HTTP Status Checker](https://httpstatus.io/)
   - Enter `wellsofchange.org` to verify 301 redirect

---

## Troubleshooting

### Issue: Redirect Not Working

**Solutions:**
- Wait 15-30 minutes for DNS/redirect propagation
- Clear browser cache and cookies
- Try incognito/private browsing mode
- Verify redirect settings in Hostinger are saved
- Check that DNS is not overriding the redirect

### Issue: Redirect Shows Wrong URL

**Solutions:**
- Double-check destination URL is exactly: `https://wellsofchange.com`
- Ensure "Include path" option is enabled to preserve URLs
- Verify no typos in the redirect configuration

### Issue: Certificate Error on .org Domain

**Solutions:**
- This is normal if using Method 1 (redirect happens before SSL)
- For Methods 2-3, ensure both domains have valid SSL certificates
- Wait 24-48 hours for SSL provisioning

### Issue: Search Engines Still Showing .org

**Solutions:**
- 301 redirects tell search engines to update (takes time)
- Submit updated sitemap with .com URLs only
- Use Google Search Console to verify both domains
- Request re-indexing in Search Console

---

## SEO Best Practices

### After Setting Up Redirect

1. **Update Your Marketing Materials:**
   - Use .com in all new materials
   - Update email signatures
   - Update social media profiles

2. **Search Engine Optimization:**
   - Submit sitemap with .com URLs to Google Search Console
   - Verify both .org and .com in Search Console
   - Monitor for 301 redirect confirmation
   - Request re-crawl if needed

3. **Canonical URLs:**
   - Ensure all pages specify canonical URL
   - Example: `<link rel="canonical" href="https://wellsofchange.com/page">`

4. **Analytics:**
   - Update tracking to recognize .com as primary
   - Create filters to group .org and .com traffic if needed

---

## Comparison of Methods

| Feature | Method 1 (Hostinger Redirect) | Method 2 (DNS + JS) | Method 3 (HTML Meta) |
|---------|-------------------------------|---------------------|----------------------|
| **SEO-Friendly** | ✅ Excellent (301) | ⚠️ Fair | ⚠️ Fair |
| **Speed** | ✅ Instant | ⚠️ Slight delay | ⚠️ Slight delay |
| **Code Changes** | ✅ None needed | ⚠️ Required | ⚠️ Separate page needed |
| **Maintenance** | ✅ Easy | ⚠️ Medium | ⚠️ Medium |
| **Path Preservation** | ✅ Automatic | ✅ With code | ✅ With code |
| **Setup Difficulty** | ✅ Easy | ⚠️ Medium | ⚠️ Medium |

**Recommendation:** Use **Method 1** (Hostinger's Domain Redirect) for the best results.

---

## DNS Configuration Summary

### For wellsofchange.com (Primary Domain)

```
Type    Name    Value                       TTL
----    ----    -----                       ---
A       @       185.199.108.153            3600
A       @       185.199.109.153            3600
A       @       185.199.110.153            3600
A       @       185.199.111.153            3600
CNAME   www     wellsofchange.github.io.   3600
```

### For wellsofchange.org (Redirect Domain)

**Option A: Using Hostinger Redirect (Recommended)**
- No DNS changes needed
- Configure redirect in Hostinger control panel
- Type: 301 Permanent Redirect
- From: `wellsofchange.org` and `www.wellsofchange.org`
- To: `https://wellsofchange.com`

**Option B: Using DNS Mirror + JavaScript**
```
Type    Name    Value                       TTL
----    ----    -----                       ---
A       @       185.199.108.153            3600
A       @       185.199.109.153            3600
A       @       185.199.110.153            3600
A       @       185.199.111.153            3600
CNAME   www     wellsofchange.github.io.   3600
```
Plus JavaScript redirect in application code.

---

## Additional Resources

- [Hostinger Domain Redirect Guide](https://support.hostinger.com/en/articles/1583246-how-to-redirect-a-domain)
- [Understanding 301 Redirects](https://en.wikipedia.org/wiki/HTTP_301)
- [Google's Guide to Site Moves](https://developers.google.com/search/docs/advanced/crawling/site-move-with-url-changes)
- [Redirect Checker Tool](https://www.redirect-checker.org/)
- [HTTP Status Code Reference](https://httpstatuses.com/301)

---

## Quick Reference

### Steps to Redirect .org to .com

1. **Log in** to Hostinger Control Panel
2. **Select** wellsofchange.org domain
3. **Find** Redirects or Domain Forwarding section
4. **Create** 301 Permanent Redirect
5. **From:** `wellsofchange.org`
6. **To:** `https://wellsofchange.com`
7. **Enable** "Include www" option
8. **Save** and wait 15-30 minutes
9. **Test** by visiting www.wellsofchange.org
10. **Verify** URL changes to wellsofchange.com

---

**Last Updated:** November 13, 2025  
**Primary Domain:** wellsofchange.com  
**Redirect Domain:** wellsofchange.org  
**Recommended Method:** Hostinger 301 Permanent Redirect
