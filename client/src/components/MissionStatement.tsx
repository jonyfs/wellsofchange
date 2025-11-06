export default function MissionStatement() {
  return (
    <section id="missao" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-12" data-testid="text-mission-title">
          O Que Nós Acreditamos
        </h2>
        
        <div className="space-y-6 text-base md:text-lg leading-relaxed">
          <p className="text-foreground" data-testid="text-belief-1">
            Acreditamos que a <strong>tecnologia existe, está disponível</strong>, e deve servir primeiro a quem mais precisa.
          </p>
          
          <p className="text-foreground" data-testid="text-belief-2">
            Acreditamos que <strong>transparência transforma doação em investimento</strong> — quando investidores, comunidades e toda a sociedade podem ver o impacto real, gota por gota.
          </p>
          
          <p className="text-foreground" data-testid="text-belief-3">
            Acreditamos que um poço não é apenas infraestrutura — é <strong>dignidade, é liberdade, é futuro</strong>.
          </p>
          
          <p className="text-foreground" data-testid="text-belief-4">
            Acreditamos que <strong>toda comunidade merece a chance de florescer</strong> onde está.
          </p>
        </div>
      </div>
    </section>
  );
}
