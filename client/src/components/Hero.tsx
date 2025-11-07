import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import heroImage from "@assets/20201129_170751_1762441521443.jpg";

export default function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center py-32">
        <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6" data-testid="text-hero-title">
          {t("hero.title")}
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          {t("hero.subtitle")}
        </p>
        
        <p className="text-xl md:text-2xl text-white font-semibold mb-12" data-testid="text-hero-call">
          {t("hero.call")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("join-us")}
            className="bg-primary text-primary-foreground border border-primary-border text-lg px-8"
            data-testid="button-hero-doar"
          >
            {t("hero.donateButton")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("our-story")}
            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg px-8"
            data-testid="button-hero-historia"
          >
            {t("hero.storyButton")}
          </Button>
        </div>

        <button
          onClick={() => scrollToSection("our-story")}
          className="mt-20 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          data-testid="button-scroll-down"
        >
          <span className="text-sm uppercase tracking-wide">{t("hero.scrollDown")}</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
