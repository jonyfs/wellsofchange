import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage, LANGUAGES } from "@/lib/i18n";
import logoImage from "@assets/logo.png";
import DonationDialog from "./DonationDialog";
import DonateButton from "./DonateButton";
import { NAV_SECTIONS, goToSection, goToTop } from "@/lib/sections";

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);

  const currentLanguage = LANGUAGES.find((lang) => lang.code === language);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    goToSection(id);
    setIsMobileMenuOpen(false);
  };

  const handleDonateClick = () => {
    setDonationDialogOpen(true);
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
                goToTop();
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
                  width={400}
                  height={341}
                  fetchPriority="high"
                  decoding="async"
                />
              <span className="text-base sm:text-xl font-bold text-foreground">
                Wells of Change
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {NAV_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid={`button-nav-${section.id}`}
              >
                {t(section.labelKey)}
              </a>
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
                  aria-label={`${t("nav.changeLanguage")}: ${currentLanguage?.label}`}
                  data-testid="button-language-selector"
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span lang={currentLanguage?.code}>{currentLanguage?.label}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="min-h-11 gap-2"
                    lang={lang.code}
                    aria-current={lang.code === language}
                    data-testid={`button-lang-${lang.code}`}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Donate Button */}
            <DonateButton onClick={handleDonateClick} testId="button-donate" />
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
                  // The visible text has to appear in the accessible name, or someone driving the
                  // page by voice says what they can see and nothing happens.
                  aria-label={`${t("nav.changeLanguage")}: ${currentLanguage?.code.toUpperCase()}, ${currentLanguage?.label}`}
                  data-testid="button-language-selector-mobile"
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span className="text-xs font-semibold">{currentLanguage?.code.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="min-h-11 gap-2"
                    lang={lang.code}
                    aria-current={lang.code === language}
                    data-testid={`button-lang-mobile-dropdown-${lang.code}`}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={isMobileMenuOpen}
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
              {NAV_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                  }}
                  className="flex min-h-11 items-center px-4 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  data-testid={`button-nav-mobile-${section.id}`}
                >
                  {t(section.labelKey)}
                </a>
              ))}

              <div className="border-t border-border my-2" />

              {/* Mobile Donate Button */}
              <div className="px-4 pt-2">
                <DonateButton
                  onClick={handleDonateClick}
                  className="w-full"
                  testId="button-donate-mobile"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <DonationDialog open={donationDialogOpen} onOpenChange={setDonationDialogOpen} />
    </nav>
  );
}
