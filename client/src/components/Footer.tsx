import { Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";
import { NAV_SECTIONS, goToSection } from "@/lib/sections";
import logoImage from "@assets/download_1762440360234.png";

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: FaFacebook, url: "https://facebook.com/wellsofchange", label: "Facebook", testId: "link-facebook" },
    { icon: FaInstagram, url: "https://instagram.com/wellsofchange", label: "Instagram", testId: "link-instagram" },
    { icon: FaTiktok, url: "https://tiktok.com/@wellsofchange", label: "TikTok", testId: "link-tiktok" },
    { icon: FaYoutube, url: "https://www.youtube.com/@wellsofchange8833", label: "YouTube", testId: "link-youtube" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/company/wellsofchange/", label: "LinkedIn", testId: "link-linkedin" },
  ];

  return (
    <footer className="bg-muted/50 border-t py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImage}
                alt="Wells of Change"
                width={400}
                height={341}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto"
              />
              <span className="font-display font-bold text-lg">Wells of Change</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-footer-description">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-nav-title">{t("footer.navTitle")}</h3>
            <ul className="space-y-1 text-sm">
              {NAV_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(section.id);
                    }}
                    className="flex min-h-11 items-center text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${section.id}`}
                  >
                    {t(section.labelKey)}
                  </a>
                </li>
              ))}
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
                  href="mailto:wellsofchange@gmail.com"
                  className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-email"
                >
                  wellsofchange@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-social-title">{t("footer.socialTitle")}</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, url, label, testId }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={label}
                  data-testid={testId}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
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
