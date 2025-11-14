import { useLanguage } from "@/lib/i18n";
import intelieLogo from "@assets/Logo_Intelie-BzVPvjOp_1762540076118.png";
import twoSolveLogo from "@assets/2solve_1762540601387.png";
import viasatLogo from "@assets/viasatlogo_1762898117962.png";
import valeDoSolLogo from "@assets/valedosol_1762896624544.png";

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
      name: "Vale do Sol", 
      website: "https://www.valedosol.eng.br/",
      logo: valeDoSolLogo,
    },
  ];

  return (
    <section id="parceiros" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-4" data-testid="text-partners-title">
            {t("partners.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-partners-subtitle">
            {t("partners.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-8 rounded-md border border-blue-300 hover-elevate active-elevate-2 transition-all h-40"
              style={{ backgroundColor: 'rgb(135, 185, 220)' }}
              data-testid={`link-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {partner.logo ? (
                <div className="flex items-center justify-center w-full h-full">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-h-20 max-w-full object-contain"
                    data-testid={`img-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                </div>
              ) : (
                <span className="text-center font-semibold text-lg">
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
