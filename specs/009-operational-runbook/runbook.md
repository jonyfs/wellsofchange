# Runbook: apex certificate and Bing verification

Two tasks, both outside this repository. Each step says where to go, what to change, and how to
check it worked. Times are what to expect, not promises.

Both were completed on 2026-09-07. The steps stay because each failure can return, and because the
check in Part 1 is worth running whenever the certificate renews.

The GitHub Pages settings for this domain live in the **`wellsofchange` account**, not in
`jonyfs/wellsofchange`. Part 1, step 2 has to be done there.

## Part 1: make https://wellsofchange.com stop showing a certificate warning

**Done on 2026-09-07.** The steps below are kept because the same failure can return whenever the
apex DNS changes, and because the check in step 3 is worth running when a certificate is due to
renew. What the fix looked like, measured before and after:

```
before   AAAA  2a02:4780:84::32                    Hostinger CDN, refused connections on 443
         cert  CN=*.github.io                      no certificate existed for the apex

after    AAAA  2606:50c0:8000::153 .8001 .8002 .8003
         cert  CN=www.wellsofchange.com, SAN: wellsofchange.com, www.wellsofchange.com
               issued 2026-09-07, valid to 2026-12-06
         https://wellsofchange.com   301 to www, over IPv4 and IPv6, certificate validates
```

Enforce HTTPS in the Pages settings is the one thing left, and it belongs to the account that serves
the domain.

### What was wrong

The apex answered on IPv4 from GitHub Pages and on IPv6 from Hostinger's CDN, at an address that
refused connections on port 443. Let's Encrypt tries the IPv6 address when an AAAA record exists, so
validation for the apex failed and only `www` ever got a certificate.

```
wellsofchange.com     A     185.199.108.153  185.199.109.153  185.199.110.153  185.199.111.153
wellsofchange.com     AAAA  2a02:4780:84::32          <- Hostinger CDN, had to go
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

Wait for the DNS change to propagate, usually under an hour with a 3600 TTL, then run the script
next to this file:

```bash
bash specs/009-operational-runbook/check-apex.sh
```

It checks both record sets, reads the names on the certificate the apex actually serves, confirms a
browser would accept it, and confirms the redirect to `www`. Five checks; anything short of five is
printed with what to fix. It reads DNS and makes HTTP requests and changes nothing.

Read the certificate's names, not its subject. A certificate issued for `www.wellsofchange.com`
contains `wellsofchange.com` inside its own subject, so a substring test passes on a certificate
that does not cover the apex at all. The script compares whole entries in the subject alternative
names.

## Part 2: verify the site in Bing

**Done on 2026-09-07**, through the Search Console import. The steps are kept for whoever needs to
add another property or re-verify later.

Verification state is not visible from outside the account, so nothing here confirms it
independently. What can be watched is whether Bing starts returning the site:

```
https://www.bing.com/search?q=site%3Awellsofchange.com
```

Expect that to stay empty for a while. Verifying a property tells Bing the site exists; it does not
schedule a crawl.

Two things are worth confirming inside the account, since the import does not guarantee either:

- The sitemap is listed under Sitemaps as `https://www.wellsofchange.com/sitemap.xml`.
- The property is the `www` host, matching the canonical the site declares.

### Why the import was the right route

The other two verification methods put a file or a meta tag on the site, and neither can be done
from this repository. Everything in `client/public/` publishes to `jonyfs.github.io/wellsofchange/`,
not to `www.wellsofchange.com`, so a verification file committed here never reaches the host being
verified. `googlea0d834dab3e06773.html` answers on the live site because the other account published
it.

The DNS TXT method avoids that problem too, since it is done in the Hostinger panel rather than in
the site. The Search Console import avoids it and needs no token at all.

Google Search Console is verified for this site, through `googlea0d834dab3e06773.html` in the site
root. Bing imports that, which is why no DNS record or file was needed.

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

Indexing takes time and is not a sign the verification failed.

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
| The check script in this folder | `bash specs/009-operational-runbook/check-apex.sh` |
