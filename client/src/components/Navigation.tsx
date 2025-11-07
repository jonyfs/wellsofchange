import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage, Language } from "@/lib/i18n";
import logoImage from "@assets/logo.png";

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "pt-BR", label: "Português", flag: "🇧🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const navLinks = [
    { key: "ourStory", href: "#our-story" },
    { key: "whatWeDo", href: "#what-we-do" },
    { key: "ourCommitment", href: "#our-commitment" },
    { key: "whoWeAre", href: "#who-we-are" },
    { key: "ethics", href: "#ethics" },
    { key: "joinUs", href: "#join-us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleDonateClick = () => {
    const element = document.querySelector("#join-us");
    if (element) {
      scrollToSection("#join-us");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3"
              data-testid="link-logo"
            >
              <img
                src={logoImage}
                alt="Wells of Change"
                className="h-12 w-auto"
                data-testid="img-logo"
              />
              <span className="text-base sm:text-xl font-bold text-foreground">
                Wells of Change
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid={`button-nav-${link.key}`}
              >
                {t(`nav.${link.key}`)}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  data-testid="button-language-selector"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden xl:inline">{currentLanguage?.label}</span>
                  <span className="xl:hidden text-base">{currentLanguage?.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="gap-2"
                    data-testid={`button-lang-${lang.code}`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Donate Button */}
            <Button
              onClick={handleDonateClick}
              className="bg-[hsl(var(--golden))] hover:bg-[hsl(var(--golden))] text-[hsl(var(--golden-foreground))] border border-[hsl(var(--golden-border))] font-semibold shadow-md hover-elevate active-elevate-2 no-default-hover-elevate no-default-active-elevate"
              data-testid="button-donate"
            >
              {t("nav.donate")}
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  data-testid="button-language-selector-mobile"
                >
                  <span className="text-base">{currentLanguage?.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="gap-2"
                    data-testid={`button-lang-mobile-dropdown-${lang.code}`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  data-testid={`button-nav-mobile-${link.key}`}
                >
                  {t(`nav.${link.key}`)}
                </button>
              ))}

              <div className="border-t border-border my-2" />

              {/* Mobile Donate Button */}
              <div className="px-4 pt-2">
                <Button
                  onClick={handleDonateClick}
                  className="w-full bg-[hsl(var(--golden))] hover:bg-[hsl(var(--golden))] text-[hsl(var(--golden-foreground))] border border-[hsl(var(--golden-border))] font-semibold shadow-md hover-elevate active-elevate-2 no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-donate-mobile"
                >
                  {t("nav.donate")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
