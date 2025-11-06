import { Droplet, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/50 border-t py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-lg">Wells of Change</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-footer-description">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-nav-title">{t("footer.navTitle")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => document.getElementById("historia")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-historia"
                >
                  {t("nav.ourStory")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("fazemos")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-fazemos"
                >
                  {t("nav.whatWeDo")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("compromisso")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-compromisso"
                >
                  {t("nav.ourCommitment")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("mudanca")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-mudanca"
                >
                  {t("nav.joinUs")}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-contact-title">{t("footer.contactTitle")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground" data-testid="text-footer-location">
                  {t("footer.location")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato@wellsofchange.org"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-email"
                >
                  contato@wellsofchange.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p data-testid="text-footer-copyright">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <p className="mt-2 text-xs" data-testid="text-footer-transparency">
            {t("footer.transparency")}
          </p>
        </div>
      </div>
    </footer>
  );
}
