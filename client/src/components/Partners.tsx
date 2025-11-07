import { useLanguage } from "@/lib/i18n";
import intelieLogo from "@assets/Logo_Intelie-BzVPvjOp_1762540076118.png";

export default function Partners() {
  const { t } = useLanguage();

  const partners = [
    { 
      name: "Intelie", 
      website: "http://www.intelie.ai/",
      logo: intelieLogo,
    },
  ];

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

        <div className="flex flex-wrap gap-8 items-center justify-center">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-8 rounded-md bg-background border hover-elevate active-elevate-2 transition-all"
              data-testid={`link-partner-${partner.name.toLowerCase()}`}
            >
              {partner.logo ? (
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-12 w-auto object-contain"
                  data-testid={`img-partner-${partner.name.toLowerCase()}`}
                />
              ) : (
                <span className="text-center font-semibold text-foreground">
                  {partner.name}
                </span>
              )}
            </a>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12" data-testid="text-partners-thanks">
          {t("partners.thanks")}
        </p>
      </div>
    </section>
  );
}
