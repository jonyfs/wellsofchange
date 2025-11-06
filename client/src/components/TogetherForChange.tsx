import CTACard from "./CTACard";
import { Heart, Share2, Users } from "lucide-react";
import volunteerImage from "@assets/generated_images/Volunteer_team_working_together_8438e21a.png";

export default function TogetherForChange() {
  const handleDonate = () => {
    console.log("Donate action triggered");
    alert("Funcionalidade de doação será implementada em breve!");
  };

  const handleShare = () => {
    console.log("Share action triggered");
    if (navigator.share) {
      navigator.share({
        title: "Wells of Change",
        text: "Mudando vidas, um poço por vez",
        url: window.location.href,
      });
    } else {
      alert("Compartilhe: " + window.location.href);
    }
  };

  const handleVolunteer = () => {
    console.log("Volunteer action triggered");
    alert("Funcionalidade de cadastro de voluntários será implementada em breve!");
  };

  return (
    <section id="mudanca" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-6" data-testid="text-change-title">
            Juntos Pela Mudança
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-change-intro">
            Somos voluntários — engenheiros, desenvolvedores, geólogos, administradores, comunicadores — unidos por uma certeza simples e profunda: <strong>podemos fazer melhor</strong>.
          </p>
          <div className="rounded-md overflow-hidden mb-8">
            <img
              src={volunteerImage}
              alt="Equipe de voluntários trabalhando em projeto de poço"
              className="w-full h-auto max-h-96 object-cover"
              data-testid="img-volunteers"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <CTACard
            icon={Heart}
            title="Investir Recursos"
            description="Cada doação se transforma em água, saúde e dignidade para comunidades que mais precisam."
            buttonText="Fazer Doação"
            onClick={handleDonate}
          />
          <CTACard
            icon={Share2}
            title="Compartilhar a Causa"
            description="Ajude a espalhar nossa missão. Quanto mais pessoas souberem, mais vidas podemos transformar."
            buttonText="Compartilhar"
            onClick={handleShare}
          />
          <CTACard
            icon={Users}
            title="Ser Voluntário"
            description="Junte-se ao nosso time de especialistas e contribua com seu conhecimento e habilidades."
            buttonText="Quero Participar"
            onClick={handleVolunteer}
          />
        </div>

        <div className="bg-primary/5 rounded-md p-8 md:p-12 space-y-6">
          <h3 className="font-display font-semibold text-2xl md:text-3xl text-center mb-8" data-testid="text-transformation-title">
            Porque quando a água chega, tudo se transforma:
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-lg font-semibold" data-testid="text-transform-1">
                Sede → Saciedade
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold" data-testid="text-transform-2">
                Doença → Saúde
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold" data-testid="text-transform-3">
                Migração → Permanência
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold" data-testid="text-transform-4">
                Sobrevivência → Prosperidade
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold" data-testid="text-transform-5">
                Desespero → Dignidade
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary" data-testid="text-transform-6">
                E você pode ver isso acontecer em tempo real.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="font-display font-bold text-3xl md:text-4xl mb-6" data-testid="text-manifesto-title">
            WELLS OF CHANGE
          </h3>
          <p className="text-xl font-semibold text-primary mb-4" data-testid="text-manifesto-tagline">
            Mudando vidas, um poço por vez.
          </p>
          <div className="space-y-3 text-base md:text-lg">
            <p data-testid="text-manifesto-1">Porque água não é favor. <strong>É direito.</strong></p>
            <p data-testid="text-manifesto-2">Porque tecnologia não é privilégio. <strong>É ferramenta.</strong></p>
            <p data-testid="text-manifesto-3">Porque comunidade não é estatística. <strong>É vida.</strong></p>
          </div>
          <p className="text-lg font-semibold mt-8" data-testid="text-manifesto-closing">
            Juntos, perfuramos mais que solo. Perfuramos barreiras. Abrimos caminhos. Plantamos futuro.
          </p>
          <p className="text-xl font-bold text-primary" data-testid="text-manifesto-final">
            A mudança começa aqui. Gota por gota. Poço por poço.
          </p>
        </div>
      </div>
    </section>
  );
}
