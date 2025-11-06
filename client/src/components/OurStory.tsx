import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";
import solarPumpImage from "@assets/generated_images/Solar_water_pump_technology_13afdd21.png";

export default function OurStory() {
  const { t } = useLanguage();

  return (
    <section id="historia" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-12 text-center" data-testid="text-story-title">
          {t("story.title")}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-base md:text-lg leading-relaxed">
            <p className="text-foreground" data-testid="text-story-1">
              {t("story.p1")}
            </p>
            
            <p className="text-foreground" data-testid="text-story-2">
              {t("story.p2")}
            </p>
            
            <p className="text-foreground" data-testid="text-story-3">
              <span dangerouslySetInnerHTML={{ __html: t("story.p3") }} />
            </p>
            
            <p className="text-foreground" data-testid="text-story-4">
              {t("story.p4")}
            </p>
            
            <Card className="p-6 bg-primary/5 border-primary/20">
              <p className="font-semibold text-lg text-primary" data-testid="text-story-quote">
                "{t("story.quote")}"
              </p>
            </Card>
          </div>
          
          <div className="relative">
            <img
              src={solarPumpImage}
              alt="Solar-powered water pump with real-time monitoring"
              className="rounded-md w-full h-auto"
              data-testid="img-solar-pump"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
