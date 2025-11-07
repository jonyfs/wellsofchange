import { useLanguage } from "@/lib/i18n";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { motion } from "framer-motion";

export default function MissionStatement() {
  const { t } = useLanguage();
  const { elementRef, transform } = useMouseParallax(15);

  return (
    <section id="missao" className="py-16 md:py-24 lg:py-32 bg-background overflow-hidden" ref={elementRef}>
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <motion.h2 
          style={transform}
          className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-12" 
          data-testid="text-mission-title"
        >
          {t("mission.title")}
        </motion.h2>
        
        <div className="space-y-6 text-base md:text-lg leading-relaxed">
          <motion.p style={transform} className="text-foreground" data-testid="text-belief-1">
            <span dangerouslySetInnerHTML={{ __html: t("mission.belief1") }} />
          </motion.p>
          
          <motion.p style={transform} className="text-foreground" data-testid="text-belief-2">
            <span dangerouslySetInnerHTML={{ __html: t("mission.belief2") }} />
          </motion.p>
          
          <motion.p style={transform} className="text-foreground" data-testid="text-belief-3">
            <span dangerouslySetInnerHTML={{ __html: t("mission.belief3") }} />
          </motion.p>
          
          <motion.p style={transform} className="text-foreground" data-testid="text-belief-4">
            <span dangerouslySetInnerHTML={{ __html: t("mission.belief4") }} />
          </motion.p>
        </div>
      </div>
    </section>
  );
}
