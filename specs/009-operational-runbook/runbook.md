# Runbook: apex certificate and Bing verification

Two tasks, both outside this repository. Each step says where to go, what to change, and how to
check it worked. Times are what to expect, not promises.

The GitHub Pages settings for this domain live in the **`wellsofchange` account**, not in
`jonyfs/wellsofchange`. Part 1, step 2 has to be done there.

## Part 1: make https://wellsofchange.com stop showing a certificate warning

### What is wrong

The apex answers on IPv4 from GitHub Pages and on IPv6 from Hostinger's CDN. Certificate issuance
validates over whichever address answers, so the mismatched IPv6 record blocks it.

```
wellsofchange.com     A     185.199.108.153  185.199.109.153  185.199.110.153  185.199.111.153
wellsofchange.com     AAAA  2a02:4780:84::32          <- Hostinger CDN, has to go
www.wellsofchange.com CNAME wellsofchange.github.io
```

### Step 1, in the Hostinger DNS panel

https://hpanel.hostinger.com/ then Domains, `wellsofchange.com`, DNS / Nameservers.

Delete the `AAAA` record for `@` (the apex) whose value is `2a02:4780:84::32`.

Either leave it deleted, which sends IPv6 visitors over IPv4, or add GitHub's four addresses, which
is the more complete fix:

| Type | Name | Value | TTL |
|---|---|---|---|
| AAAA | @ | `2606:50c0:8000::153` | 3600 |
| AAAA | @ | `2606:50c0:8001::153` | 3600 |
| AAAA | @ | `2606:50c0:8002::153` | 3600 |
| AAAA | @ | `2606:50c0:8003::153` | 3600 |

Leave the four `A` records and the `www` CNAME exactly as they are.

Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

### Step 2, in the GitHub repository that serves the domain

Settings, then Pages, in the `wellsofchange` account.

Remove the custom domain, save, put it back, save again. That forces GitHub to request certificates
for the domain now that DNS is consistent. Then tick **Enforce HTTPS** once it becomes available;
GitHub says that can take up to 24 hours.

### Step 3, check it

Wait for the DNS change to propagate, usually under an hour with a 3600 TTL, then run:

```bash
dig +short wellsofchange.com AAAA          # empty, or 2606:50c0:800x::153
curl -sI https://wellsofchange.com/        # 301 to https://www.wellsofchange.com/
curl -s -o /dev/null -w '%{ssl_verify_result}\n' https://wellsofchange.com/   # 0 means the certificate is valid
```

Or open `https://wellsofchange.com` in a browser and confirm there is no warning.

## Part 2: verify the site in Bing

Google Search Console is already verified for this site, through `googlea0d834dab3e06773.html` in
the site root. Bing can import that, which avoids adding any DNS record or file.

### The quick path, about five minutes

1. https://www.bing.com/webmasters/ and sign in.
2. Choose **Import from Google Search Console** on the add-site screen.
3. Sign in with the Google account that owns the Search Console property and grant access.
4. Pick `www.wellsofchange.com` from the list and import it. The property arrives verified, with the
   sitemap Google already knows about.

### If the import is not offered

Add the site manually as `https://www.wellsofchange.com` and choose the XML file method. Bing gives
you a file named `BingSiteAuth.xml` containing a token:

```xml
<?xml version="1.0"?>
<users>
  <user>PASTE_THE_TOKEN_BING_GIVES_YOU</user>
</users>
```

Send it to whoever maintains the repository, or commit it yourself to `client/public/BingSiteAuth.xml`.
Everything in that folder is published at the site root, so it becomes
`https://www.wellsofchange.com/BingSiteAuth.xml` on the next deploy. Then press Verify in Bing.

The third method, a DNS TXT record, also works and is done in the same Hostinger panel as Part 1.

### After verifying

Submit the sitemap under Sitemaps: `https://www.wellsofchange.com/sitemap.xml`

Then check Bing has the page:

```
https://www.bing.com/search?q=site%3Awellsofchange.com
```

## Links, collected

| What | Where |
|---|---|
| Hostinger DNS panel | https://hpanel.hostinger.com/ |
| GitHub Pages docs, custom domain | https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site |
| Bing Webmaster Tools | https://www.bing.com/webmasters/ |
| Bing, import from Search Console | https://www.bing.com/webmasters/gsc-import |
| Google Search Console | https://search.google.com/search-console |
| Check what Bing has indexed | https://www.bing.com/search?q=site%3Awellsofchange.com |
| Check the certificate | https://www.ssllabs.com/ssltest/analyze.html?d=wellsofchange.com |
