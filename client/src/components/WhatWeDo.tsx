import FeatureCard from "./FeatureCard";
import { Baby, Heart, Sprout, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import waterHandsImage from "@assets/mrjn-photography-YpZ2cj4s0oo-unsplash_1762442531909.jpg";
import familyImage from "@assets/image (2)_1762442531909.png";
import cropImage from "@assets/corn-1841271_1762442531910.jpg";
import communityImage from "@assets/20191002_124421_1762442531910.jpg";
import solarPanelsImage from "@assets/Gemini_Generated_Image_z0m031z0m031z0m0_1762553059692.png";

export default function WhatWeDo() {
  const { t } = useLanguage();

  return (
    <section id="what-we-do" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-6" data-testid="text-whatwedo-title">
            {t("whatWeDo.title")}
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-primary mb-4" data-testid="text-whatwedo-subtitle">
            {t("whatWeDo.subtitle")}
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-whatwedo-intro">
            {t("whatWeDo.intro")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
          <div className="rounded-md overflow-hidden">
            <img
              src={solarPanelsImage}
              alt="Complete solar-powered well system with Viasat monitoring, FORTLEV water tank, and thriving agriculture"
              className="w-full h-auto object-cover"
              data-testid="img-solar-tech"
            />
          </div>
          <div className="space-y-6">
            <p className="text-foreground text-base md:text-lg" data-testid="text-tech-1">
              <span dangerouslySetInnerHTML={{ __html: t("whatWeDo.tech1") }} />
            </p>
            <p className="text-foreground text-base md:text-lg" data-testid="text-tech-2">
              <span dangerouslySetInnerHTML={{ __html: t("whatWeDo.tech2") }} />
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FeatureCard
            icon={Baby}
            title={t("whatWeDo.childTitle")}
            description={t("whatWeDo.childDesc")}
            image={waterHandsImage}
          />
          <FeatureCard
            icon={Heart}
            title={t("whatWeDo.motherTitle")}
            description={t("whatWeDo.motherDesc")}
            image={familyImage}
          />
          <FeatureCard
            icon={Sprout}
            title={t("whatWeDo.farmerTitle")}
            description={t("whatWeDo.farmerDesc")}
            image={cropImage}
          />
          <FeatureCard
            icon={Users}
            title={t("whatWeDo.communityTitle")}
            description={t("whatWeDo.communityDesc")}
            image={communityImage}
          />
        </div>
        <div className="bg-accent/20 rounded-md p-8 md:p-12 space-y-6 text-base md:text-lg">
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-primary mb-2" data-testid="text-metric-water">{t("whatWeDo.metricWater")}</p>
              <p className="text-muted-foreground">{t("whatWeDo.metricWaterLabel")}</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-primary mb-2" data-testid="text-metric-impact">{t("whatWeDo.metricImpact")}</p>
              <p className="text-muted-foreground">{t("whatWeDo.metricImpactLabel")}</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-primary mb-2" data-testid="text-metric-story">{t("whatWeDo.metricStory")}</p>
              <p className="text-muted-foreground">{t("whatWeDo.metricStoryLabel")}</p>
            </div>
          </div>
          
          <p className="text-center font-semibold text-lg text-primary whitespace-pre-line" data-testid="text-visibility">
            {t("whatWeDo.visibility")}
          </p>
        </div>
      </div>
    </section>
  );
}
