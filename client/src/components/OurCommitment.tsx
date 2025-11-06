import StatCard from "./StatCard";
import { useLanguage } from "@/lib/i18n";
import waterTanksImage from "@assets/markus-spiske-sFydXGrt5OA-unsplash_1762442531909.jpg";
import techniciansImage from "@assets/20191002_125711_1762442531910.jpg";

export default function OurCommitment() {
  const { t } = useLanguage();

  return (
    <section id="compromisso" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-12 text-center" data-testid="text-commitment-title">
          {t("commitment.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-md overflow-hidden">
            <img
              src={waterTanksImage}
              alt="Community with water storage tanks in Campo Formoso"
              className="w-full h-auto object-cover"
              data-testid="img-water-tanks"
            />
          </div>
          <div className="rounded-md overflow-hidden">
            <img
              src={techniciansImage}
              alt="Technicians working on water well monitoring system"
              className="w-full h-auto object-cover"
              data-testid="img-technicians"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard value="1" label={t("commitment.wellComplete")} description={t("commitment.wellLocation")} />
          <StatCard value="100%" label={t("commitment.solar")} description={t("commitment.solarDesc")} />
          <StatCard value="24/7" label={t("commitment.monitoring")} description={t("commitment.monitoringDesc")} />
          <StatCard value="∞" label={t("commitment.impact")} description={t("commitment.impactDesc")} />
        </div>

        <div className="max-w-4xl mx-auto space-y-6 text-base md:text-lg leading-relaxed">
          <p className="text-center text-2xl font-semibold text-primary mb-8" data-testid="text-commitment-location">
            {t("commitment.location")}
          </p>
          
          <p className="text-center text-xl mb-8" data-testid="text-commitment-start">
            <span dangerouslySetInnerHTML={{ __html: t("commitment.start") }} />
          </p>

          <div className="bg-background rounded-md p-8 space-y-4">
            <p className="text-foreground" data-testid="text-commitment-intro">
              {t("commitment.intro")}
            </p>
            
            <div className="text-center font-semibold text-xl space-y-2 text-primary py-4">
              <p data-testid="text-commitment-one-1">{t("commitment.one1")}</p>
              <p data-testid="text-commitment-one-2">{t("commitment.one2")}</p>
              <p data-testid="text-commitment-one-3">{t("commitment.one3")}</p>
            </div>

            <p className="text-foreground" data-testid="text-commitment-reach">
              <span dangerouslySetInnerHTML={{ __html: t("commitment.reach") }} />
            </p>

            <p className="text-foreground" data-testid="text-commitment-lasting">
              <span dangerouslySetInnerHTML={{ __html: t("commitment.lasting") }} />
            </p>

            <p className="text-foreground" data-testid="text-commitment-tools">
              {t("commitment.tools")}
            </p>
          </div>

          <p className="text-center text-xl font-semibold mt-8" data-testid="text-commitment-need">
            {t("commitment.need")}
          </p>
        </div>
      </div>
    </section>
  );
}
