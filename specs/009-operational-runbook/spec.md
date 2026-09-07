# Feature Specification: Apex Certificate and Bing Verification

**Feature Branch**: `009-operational-runbook`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "resolva as pendências operacionais do #18: verificação no Bing e certificado do apex, ajudando no processo e com os links que preciso preencher"

## Context

The audit in `005-discoverability-audit` left two items nobody could fix from the repository. Both
are still open, and both were diagnosed rather than guessed at.

**The apex certificate.** `https://wellsofchange.com` fails certificate verification. The cause is in
DNS, and it is specific: the apex has an IPv6 record pointing at Hostinger's CDN while its IPv4
records point at GitHub Pages.

```
wellsofchange.com   A      185.199.108.153, .109, .110, .111   GitHub Pages, correct
wellsofchange.com   AAAA   2a02:4780:84::32                    Hostinger CDN, wrong
www.wellsofchange.com CNAME wellsofchange.github.io            correct
```

GitHub documents four IPv6 addresses for apex domains, all under `2606:50c0:8000::/44`. The record
in place belongs to `HOSTINGER-CDN` in Lithuania. Certificate issuance for the apex validates over
whichever address answers, so an address that does not serve GitHub's challenge blocks it.

The nameservers are Hostinger's (`ns1.dns-parking.com`, `ns2.dns-parking.com`), so that is where the
record has to change. There are no CAA records, so nothing else is blocking issuance.

**Bing verification.** Google Search Console is verified, through `googlea0d834dab3e06773.html` in
the site root. Bing is not. Bing feeds Copilot and several answer engines, and Bing Webmaster Tools
can import a property straight from Search Console, which skips the DNS and file work entirely.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Someone typing the domain without www arrives (Priority: P1)

A donor types `wellsofchange.com`, their browser upgrades it to HTTPS, and the site loads. No
warning, no interstitial about an unsafe connection.

**Why this priority**: A certificate warning is the worst first impression an organization asking
for money can make, and browsers now default to HTTPS.

**Independent Test**: Request `https://wellsofchange.com` over both IPv4 and IPv6 and confirm the
certificate validates and the request redirects to the canonical host.

**Acceptance Scenarios**:

1. **Given** a visitor requesting `https://wellsofchange.com`, **When** the browser validates the
   certificate, **Then** it succeeds.
2. **Given** the same request, **When** it completes, **Then** it redirects to
   `https://www.wellsofchange.com/`.
3. **Given** a visitor on an IPv6-only network, **When** they request the apex, **Then** they reach
   GitHub Pages rather than an unrelated host.

---

### User Story 2 - Bing and the engines it feeds can see the site (Priority: P2)

The site is registered in Bing Webmaster Tools, so its pages are crawled, its sitemap is submitted,
and the coverage is visible to whoever runs the site.

**Why this priority**: Real, but Google already reaches the site and the apex certificate affects
every visitor, not only search.

**Acceptance Scenarios**:

1. **Given** the property in Bing Webmaster Tools, **When** its owner opens it, **Then** it is
   verified and the sitemap is submitted.

### Edge Cases

- The AAAA record is removed rather than corrected. IPv6 visitors then fall back to IPv4 and the
  site works, so removal is a valid fix, just a less complete one.
- The certificate takes time. GitHub states it can take up to 24 hours before HTTPS enforcement
  becomes available after DNS changes.
- Bing verification through Search Console import needs the same Google account that owns the
  Search Console property.

## Requirements *(mandatory)*

### Apex certificate

- **FR-001**: The apex `AAAA` record MUST stop pointing at a host that is not GitHub Pages. It is
  either removed, or replaced with GitHub's four documented addresses.
- **FR-002**: The apex `A` records MUST remain GitHub's four documented addresses. They are already
  correct and MUST NOT be changed while fixing the AAAA.
- **FR-003**: After DNS propagates, the GitHub Pages custom domain MUST be re-saved so a certificate
  is issued for the apex, and Enforce HTTPS MUST be enabled.
- **FR-004**: `https://wellsofchange.com` MUST validate and redirect to the canonical host, verified
  over both IPv4 and IPv6.

### Bing

- **FR-005**: The site MUST be a verified property in Bing Webmaster Tools.
- **FR-006**: Verification SHOULD use the Search Console import, since Google is already verified
  and the import needs no DNS record and no new file.
- **FR-007**: If the import is unavailable, verification falls back to the XML file method, which
  means committing `BingSiteAuth.xml` to `client/public/`. That file is the only part of this
  specification that touches the repository.
- **FR-008**: The sitemap at `https://www.wellsofchange.com/sitemap.xml` MUST be submitted once the
  property is verified.

## Success Criteria *(mandatory)*

- **SC-001**: `https://wellsofchange.com` returns a valid certificate over IPv4 and over IPv6.
- **SC-002**: The apex redirects to `https://www.wellsofchange.com/` with a 301.
- **SC-003**: The apex `AAAA` record either does not exist or resolves to a GitHub Pages address.
- **SC-004**: Bing Webmaster Tools shows the property as verified with the sitemap submitted.

## Assumptions

- The Hostinger account holds the DNS for `wellsofchange.com`, which the nameservers confirm.
- The GitHub Pages settings that serve the domain are in the `wellsofchange` account, not this one,
  as recorded in the constitution's `TODO(DOMAIN_OWNERSHIP)`.
- Whoever holds the Google account that verified Search Console can also sign in to Bing Webmaster
  Tools.

## Out of Scope

- Moving the domain onto this repository, which is a separate decision already recorded.
- IndexNow, Yandex, or other search engines.
- Anything about how the site ranks once it is crawled.

## Dependencies

- Access to the Hostinger DNS panel for `wellsofchange.com`.
- Access to the GitHub Pages settings of the repository serving the domain.
- The Google account that owns the Search Console property.
