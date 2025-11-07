import { useLanguage } from "@/lib/i18n";
import intelieLogo from "@assets/Logo_Intelie-BzVPvjOp_1762540076118.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

export default function Partners() {
  const { t } = useLanguage();

  const partners = [
    { 
      name: "Intelie", 
      website: "http://www.intelie.ai/",
      logo: intelieLogo,
    },
    { 
      name: "2Solve", 
      website: "https://2solve.com.br",
      logo: null,
    },
    { 
      name: "Viasat", 
      website: "https://viasat.com",
      logo: null,
    },
    { 
      name: "Vale do Sol Engenharia", 
      website: "#",
      logo: null,
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <section id="parceiros" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-partners-title">
            {t("partners.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-partners-subtitle">
            {t("partners.subtitle")}
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex-grow-0 basis-[280px] md:basis-[320px]"
              >
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-8 rounded-md bg-card border hover-elevate active-elevate-2 transition-all h-32"
                  data-testid={`link-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-12 w-auto object-contain"
                      data-testid={`img-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  ) : (
                    <span className="text-center font-semibold text-foreground">
                      {partner.name}
                    </span>
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12" data-testid="text-partners-thanks">
          {t("partners.thanks")}
        </p>
      </div>
    </section>
  );
}
