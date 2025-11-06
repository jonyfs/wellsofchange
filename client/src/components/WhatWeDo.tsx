import FeatureCard from "./FeatureCard";
import { Baby, Heart, Sprout, Users } from "lucide-react";
import childImage from "@assets/generated_images/Child_drinking_clean_water_62c93c11.png";
import motherImage from "@assets/generated_images/Mother_accessing_clean_water_94be181a.png";
import farmerImage from "@assets/generated_images/Farmer_with_irrigated_crops_17c8f849.png";

export default function WhatWeDo() {
  return (
    <section id="fazemos" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-6" data-testid="text-whatwedo-title">
            O Que Fazemos
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-primary mb-4" data-testid="text-whatwedo-subtitle">
            Não levamos apenas água. Levamos possibilidades.
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-whatwedo-intro">
            Cada poço que construímos é mais do que um ponto de acesso à água potável.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FeatureCard
            icon={Baby}
            title="Infância Protegida"
            description="Uma criança que não precisa caminhar quilômetros com um balde na cabeça."
            image={childImage}
          />
          <FeatureCard
            icon={Heart}
            title="Dignidade Familiar"
            description="Uma mãe que pode cuidar da higiene da família com dignidade."
            image={motherImage}
          />
          <FeatureCard
            icon={Sprout}
            title="Agricultura Sustentável"
            description="Um agricultor que pode planejar sua colheita sem depender apenas da chuva."
            image={farmerImage}
          />
          <FeatureCard
            icon={Users}
            title="Comunidade Próspera"
            description="Uma comunidade inteira que tem motivos para ficar, crescer e prosperar."
          />
        </div>

        <div className="bg-accent/20 rounded-md p-8 md:p-12 space-y-6 text-base md:text-lg">
          <p className="text-foreground" data-testid="text-tech-1">
            Nós <strong>perfuramos o solo</strong>, instalamos <strong>bombas movidas a energia solar</strong> e aplicamos <strong>tecnologia de monitoramento em tempo real</strong>.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-primary mb-2" data-testid="text-metric-water">Cada gota</p>
              <p className="text-muted-foreground">é medida</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-primary mb-2" data-testid="text-metric-impact">Cada impacto</p>
              <p className="text-muted-foreground">é documentado</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-primary mb-2" data-testid="text-metric-story">Cada história</p>
              <p className="text-muted-foreground">é contada</p>
            </div>
          </div>

          <p className="text-foreground" data-testid="text-tech-2">
            Com <strong>dados transparentes</strong> que mostram exatamente como cada real investido se transforma em vida.
          </p>
          
          <p className="text-center font-semibold text-lg text-primary" data-testid="text-visibility">
            Porque acreditamos que visibilidade gera mais visibilidade.<br />
            E que impacto demonstrado gera mais impacto.
          </p>
        </div>
      </div>
    </section>
  );
}
