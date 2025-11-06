import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Droplet } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1"
            data-testid="button-logo"
          >
            <Droplet className="w-7 h-7 text-primary" />
            <span className="font-display font-bold text-lg">Wells of Change</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("historia")}
              data-testid="button-nav-historia"
            >
              {t("nav.ourStory")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("fazemos")}
              data-testid="button-nav-fazemos"
            >
              {t("nav.whatWeDo")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("compromisso")}
              data-testid="button-nav-compromisso"
            >
              {t("nav.ourCommitment")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("etica")}
              data-testid="button-nav-etica"
            >
              {t("nav.ethics")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("mudanca")}
              data-testid="button-nav-mudanca"
            >
              {t("nav.joinUs")}
            </Button>
            <LanguageSelector />
            <Button
              variant="default"
              onClick={() => scrollToSection("mudanca")}
              className="ml-2"
              data-testid="button-doar"
            >
              {t("nav.donate")}
            </Button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() => scrollToSection("historia")}
                className="justify-start"
                data-testid="button-mobile-historia"
              >
                {t("nav.ourStory")}
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("fazemos")}
                className="justify-start"
                data-testid="button-mobile-fazemos"
              >
                {t("nav.whatWeDo")}
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("compromisso")}
                className="justify-start"
                data-testid="button-mobile-compromisso"
              >
                {t("nav.ourCommitment")}
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("etica")}
                className="justify-start"
                data-testid="button-mobile-etica"
              >
                {t("nav.ethics")}
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("mudanca")}
                className="justify-start"
                data-testid="button-mobile-mudanca"
              >
                {t("nav.joinUs")}
              </Button>
              <Button
                variant="default"
                onClick={() => scrollToSection("mudanca")}
                className="justify-start"
                data-testid="button-mobile-doar"
              >
                {t("nav.donate")}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
