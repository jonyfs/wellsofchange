import { useLanguage } from "@/lib/i18n";
import intelieLogo from "@assets/Logo_Intelie-BzVPvjOp_1762540076118.png";
import twoSolveLogo from "@assets/2solve_1762540601387.png";
import viasatLogo from "@assets/Screenshot from 2025-11-07 16-31-48_1762543923111.png";
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
      website: "https://www.2solve.com/",
      logo: twoSolveLogo,
    },
    { 
      name: "Viasat", 
      website: "https://www.viasat.com/",
      logo: viasatLogo,
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
      align: "center",
      skipSnaps: false,
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <section id="parceiros" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-partners-title">
            {t("partners.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-partners-subtitle">
            {t("partners.subtitle")}
          </p>
        </div>

        <div className="overflow-hidden max-w-5xl mx-auto" ref={emblaRef}>
          <div className="flex gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex-grow-0 basis-[90%] sm:basis-[70%] md:basis-[45%] lg:basis-[380px]"
              >
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-10 rounded-md bg-slate-800 dark:bg-slate-700 border border-slate-700 dark:border-slate-600 hover-elevate active-elevate-2 transition-all h-40 w-full"
                  data-testid={`link-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-16 w-auto max-w-full object-contain"
                      data-testid={`img-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  ) : (
                    <span className="text-center font-semibold text-lg text-white">
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
