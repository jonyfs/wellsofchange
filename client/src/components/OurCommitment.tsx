import StatCard from "./StatCard";

export default function OurCommitment() {
  return (
    <section id="compromisso" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-12 text-center" data-testid="text-commitment-title">
          Nosso Compromisso
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard value="1" label="Poço Completo" description="Campo Formoso, Bahia" />
          <StatCard value="100%" label="Solar" description="Energia limpa e sustentável" />
          <StatCard value="24/7" label="Monitoramento" description="Dados em tempo real" />
          <StatCard value="∞" label="Impacto" description="Vidas transformadas" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6 text-base md:text-lg leading-relaxed">
          <p className="text-center text-2xl font-semibold text-primary mb-8" data-testid="text-commitment-location">
            Começamos em Campo Formoso, no interior da Bahia.
          </p>
          
          <p className="text-center text-xl mb-8" data-testid="text-commitment-start">
            O primeiro poço está completo. <strong>A vida já começou a mudar!</strong>
          </p>

          <div className="bg-background rounded-md p-8 space-y-4">
            <p className="text-foreground" data-testid="text-commitment-intro">
              Mas este é apenas o começo.
            </p>
            
            <div className="text-center font-semibold text-xl space-y-2 text-primary py-4">
              <p data-testid="text-commitment-one-1">Um poço por vez.</p>
              <p data-testid="text-commitment-one-2">Uma comunidade por vez.</p>
              <p data-testid="text-commitment-one-3">Uma vida por vez.</p>
            </div>

            <p className="text-foreground" data-testid="text-commitment-reach">
              Do <strong>Nordeste brasileiro</strong> à <strong>África Subsaariana</strong>, vamos onde a sede é mais urgente e a esperança parece mais distante.
            </p>

            <p className="text-foreground" data-testid="text-commitment-lasting">
              E não paramos quando a água começa a jorrar. <strong>Ficamos. Ensinamos. Empoderamos.</strong>
            </p>

            <p className="text-foreground" data-testid="text-commitment-tools">
              Garantimos que cada comunidade tenha as ferramentas e o conhecimento para manter viva a sua própria fonte de vida.
            </p>
          </div>

          <p className="text-center text-xl font-semibold mt-8" data-testid="text-commitment-need">
            Porque este é apenas o começo. Precisamos de você para continuar.
          </p>
        </div>
      </div>
    </section>
  );
}
