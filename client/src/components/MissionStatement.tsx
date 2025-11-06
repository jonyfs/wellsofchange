import { useLanguage } from "@/lib/i18n";

export default function MissionStatement() {
  const { t } = useLanguage();

  return (
    <section id="missao" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-12" data-testid="text-mission-title">
          {t("mission.title")}
        </h2>
        
        <div className="space-y-6 text-base md:text-lg leading-relaxed">
          <p className="text-foreground" data-testid="text-belief-1">
            <span dangerouslySetInnerHTML={{ __html: t("mission.belief1") }} />
          </p>
          
          <p className="text-foreground" data-testid="text-belief-2">
            <span dangerouslySetInnerHTML={{ __html: t("mission.belief2") }} />
          </p>
          
          <p className="text-foreground" data-testid="text-belief-3">
            <span dangerouslySetInnerHTML={{ __html: t("mission.belief3") }} />
          </p>
          
          <p className="text-foreground" data-testid="text-belief-4">
            <span dangerouslySetInnerHTML={{ __html: t("mission.belief4") }} />
          </p>
        </div>
      </div>
    </section>
  );
}
