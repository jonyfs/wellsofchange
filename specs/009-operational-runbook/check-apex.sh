#!/usr/bin/env bash
# Checks whether the apex certificate problem is fixed.
# Run it after changing the AAAA record in Hostinger. Safe to run repeatedly.

D=wellsofchange.com
ok=0; bad=0
say() { printf '%-9s %s\n' "$1" "$2"; [ "$1" = "OK" ] && ok=$((ok+1)) || bad=$((bad+1)); }

echo "--- DNS ---"
a=$(dig +short $D A @1.1.1.1 2>/dev/null | grep -E '^[0-9.]+$' | sort | tr '\n' ' ')
# Some resolvers emit warning lines on the AAAA query; keep only lines that look like an address.
aaaa=$(dig +short $D AAAA @1.1.1.1 2>/dev/null | grep -E '^[0-9a-fA-F:]+$' | sort | tr '\n' ' ')
echo "A    : $a"
echo "AAAA : ${aaaa:-(none)}"

case "$a" in
  *185.199.108.153*185.199.109.153*185.199.110.153*185.199.111.153*) say OK "A records point at GitHub Pages." ;;
  *) say "PROBLEM" "A records are not GitHub's four addresses." ;;
esac

if [ -z "$aaaa" ]; then
  say OK "No AAAA record. IPv6 visitors fall back to IPv4."
elif printf '%s' "$aaaa" | grep -q '2606:50c0:800'; then
  say OK "AAAA points at GitHub Pages."
else
  say "PROBLEM" "AAAA still points somewhere else. This is what blocks the certificate."
fi

echo
echo "--- Certificate on the apex ---"
# The subject alone does not answer the question. A certificate issued for www.wellsofchange.com
# carries wellsofchange.com as a substring of its own name, so matching on the subject reports
# success for a certificate that does not cover the apex. The names that count are the SANs, and
# the apex has to appear there as a whole entry.
cert=$(echo | timeout 15 openssl s_client -connect $D:443 -servername $D 2>/dev/null \
       | openssl x509 -noout -subject -ext subjectAltName -enddate 2>/dev/null)
subject=$(printf '%s\n' "$cert" | sed -n 's/^subject=//p')
sans=$(printf '%s\n' "$cert" | grep -o 'DNS:[^,]*' | sed 's/DNS://' | tr -d ' ' | tr '\n' ' ')
echo "subject: ${subject:-(no certificate returned)}"
echo "names  : ${sans:-(none)}"

if printf '%s ' $sans | grep -q "^$D $\|^$D \| $D $\| $D "; then
  say OK "The certificate covers the apex."
elif printf '%s' "$subject" | grep -q 'github.io'; then
  say "PROBLEM" "Still serving the *.github.io certificate. No certificate exists for the apex yet."
else
  say "PROBLEM" "The certificate does not list $D among its names."
fi

verify=$(curl -s -o /dev/null -w '%{ssl_verify_result}' --max-time 15 https://$D/ 2>/dev/null)
[ "$verify" = "0" ] && say OK "Browsers will accept https://$D" || say "PROBLEM" "Certificate does not validate (code ${verify:-connect-failed})."

echo
echo "--- Redirect ---"
r=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' --max-time 15 http://$D/ 2>/dev/null)
echo "http://$D -> $r"
case "$r" in
  301*www.wellsofchange.com*) say OK "The apex redirects to www." ;;
  *) say "PROBLEM" "The apex does not redirect to www." ;;
esac

echo
echo "--- www, for comparison ---"
wsub=$(echo | timeout 15 openssl s_client -connect www.$D:443 -servername www.$D 2>/dev/null \
       | openssl x509 -noout -subject -enddate 2>/dev/null | tr '\n' ' ')
echo "$wsub"

echo
echo "$ok ok, $bad to fix"
[ "$bad" -eq 0 ] && echo "Done. Turn on Enforce HTTPS in the Pages settings if it is not on."
