import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, FileCheck, TrendingUp, Heart, Users, CheckCircle, AlertCircle } from "lucide-react";

export default function CodeOfEthics() {
  const { t } = useLanguage();
  const { elementRef, transform } = useMouseParallax(10);

  const principles = [
    {
      icon: ShieldCheck,
      titleKey: "ethics.principle1Title",
      textKey: "ethics.principle1Text",
    },
    {
      icon: Scale,
      titleKey: "ethics.principle2Title",
      textKey: "ethics.principle2Text",
    },
    {
      icon: FileCheck,
      titleKey: "ethics.principle3Title",
      textKey: "ethics.principle3Text",
    },
    {
      icon: TrendingUp,
      titleKey: "ethics.principle4Title",
      textKey: "ethics.principle4Text",
    },
    {
      icon: Heart,
      titleKey: "ethics.principle5Title",
      textKey: "ethics.principle5Text",
    },
    {
      icon: Users,
      titleKey: "ethics.principle6Title",
      textKey: "ethics.principle6Text",
    },
  ];

  return (
    <section id="ethics" className="py-16 md:py-24 lg:py-32 bg-background overflow-hidden" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div style={transform} className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-6" data-testid="text-ethics-title">
            {t("ethics.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-ethics-intro">
            {t("ethics.intro")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {principles.map(({ icon: Icon, titleKey, textKey }, index) => (
            <Card key={index} className="p-6 hover-elevate transition-all" data-testid={`card-principle-${index + 1}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl" data-testid={`text-principle-title-${index + 1}`}>
                  {t(titleKey)}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed" data-testid={`text-principle-text-${index + 1}`}>
                {t(textKey)}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-semibold text-2xl mb-4" data-testid="text-audit-title">
                  {t("ethics.auditTitle")}
                </h3>
                <p className="text-foreground leading-relaxed" data-testid="text-audit-text">
                  {t("ethics.auditText")}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-accent/20 border-accent/40">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-semibold text-2xl mb-4" data-testid="text-nonpartisan-title">
                  {t("ethics.nonPartisanTitle")}
                </h3>
                <p className="text-foreground leading-relaxed" data-testid="text-nonpartisan-text">
                  {t("ethics.nonPartisanText")}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
