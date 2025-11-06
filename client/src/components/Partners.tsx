import { useLanguage } from "@/lib/i18n";

export default function Partners() {
  const { t } = useLanguage();

  const partners = [
    { name: "Intelie", website: "https://intelie.com" },
    { name: "2Solve", website: "https://2solve.com.br" },
    { name: "Viasat", website: "https://viasat.com" },
    { name: "Vale do Sol Engenharia", website: "#" },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 rounded-md bg-background border hover-elevate active-elevate-2 transition-all w-full h-32"
              data-testid={`partner-${index}`}
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center font-semibold text-foreground hover:text-primary transition-colors"
              >
                {partner.name}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12" data-testid="text-partners-thanks">
          {t("partners.thanks")}
        </p>
      </div>
    </section>
  );
}
