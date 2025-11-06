import { Card } from "@/components/ui/card";
import solarPumpImage from "@assets/generated_images/Solar_water_pump_technology_13afdd21.png";

export default function OurStory() {
  return (
    <section id="historia" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-12 text-center" data-testid="text-story-title">
          Nossa História
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-base md:text-lg leading-relaxed">
            <p className="text-foreground" data-testid="text-story-1">
              A Wells of Change surgiu durante a pandemia, em um contexto de reflexão sobre o papel da tecnologia em tempos de crise.
            </p>
            
            <p className="text-foreground" data-testid="text-story-2">
              Em uma palestra promovida pela Intelie, empresa especializada em inteligência operacional e monitoramento em tempo real de poços de petróleo, discutia-se a importância da diversidade tecnológica e o potencial de aplicar soluções avançadas a desafios sociais urgentes.
            </p>
            
            <p className="text-foreground" data-testid="text-story-3">
              Naquele momento, a água tornou-se símbolo de desigualdade e urgência. <strong>A pergunta que se impôs foi simples, mas transformadora: se conseguimos empregar inteligência artificial e dados em tempo real para otimizar a extração de petróleo, por que não fazer o mesmo para garantir acesso à água?</strong>
            </p>
            
            <p className="text-foreground" data-testid="text-story-4">
              Essa ideia se consolidou com base em experiências prévias no campo do bombeamento fotovoltaico e em projetos de eletrificação rural sustentável.
            </p>
            
            <Card className="p-6 bg-primary/5 border-primary/20">
              <p className="font-semibold text-lg text-primary" data-testid="text-story-quote">
                "Assim nasceu a Wells of Change com a convicção de que a tecnologia deve servir à vida e que cada gota de água pode reacender a esperança onde ela parecia perdida."
              </p>
            </Card>
          </div>
          
          <div className="relative">
            <img
              src={solarPumpImage}
              alt="Bomba de água movida a energia solar com monitoramento em tempo real"
              className="rounded-md w-full h-auto"
              data-testid="img-solar-pump"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
