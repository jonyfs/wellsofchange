import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  initials: string;
}

export default function WhoWeAre() {
  const { t } = useLanguage();

  const leadership: TeamMember[] = [
    {
      name: "[Nome do Fundador]",
      role: "Fundador",
      bio: "Breve apresentação profissional do fundador, experiência e motivação para criar a Wells of Change.",
      linkedin: "https://linkedin.com/in/username",
      initials: "FD",
    },
    {
      name: "[Nome do Presidente]",
      role: "Presidente",
      bio: "Apresentação do presidente, sua experiência em gestão e visão para a organização.",
      linkedin: "https://linkedin.com/in/username",
      initials: "PR",
    },
    {
      name: "[Nome do Vice-Presidente]",
      role: "Vice-Presidente",
      bio: "Experiência do vice-presidente e suas responsabilidades na ONG.",
      linkedin: "https://linkedin.com/in/username",
      initials: "VP",
    },
    {
      name: "[Nome do Diretor de Marketing]",
      role: "Diretor de Marketing",
      bio: "Experiência em comunicação e estratégias para divulgar a missão da Wells of Change.",
      linkedin: "https://linkedin.com/in/username",
      initials: "DM",
    },
    {
      name: "[Nome do Diretor Patrimonial]",
      role: "Diretor Patrimonial",
      bio: "Responsável pela gestão financeira e patrimonial da organização.",
      linkedin: "https://linkedin.com/in/username",
      initials: "DP",
    },
  ];

  const advisors: TeamMember[] = [
    {
      name: "[Nome do Conselheiro 1]",
      role: "Conselheiro",
      bio: "Experiência e contribuição ao conselho consultivo da ONG.",
      linkedin: "https://linkedin.com/in/username",
      initials: "C1",
    },
    {
      name: "[Nome do Conselheiro 2]",
      role: "Conselheiro",
      bio: "Experiência e contribuição ao conselho consultivo da ONG.",
      linkedin: "https://linkedin.com/in/username",
      initials: "C2",
    },
  ];

  const renderTeamMember = (member: TeamMember, index: number) => (
    <Card key={index} className="p-6 hover-elevate transition-all" data-testid={`card-member-${index}`}>
      <div className="flex flex-col items-center text-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
            {member.initials}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="font-semibold text-xl mb-1" data-testid={`text-name-${index}`}>
            {member.name}
          </h3>
          <p className="text-primary font-medium mb-3" data-testid={`text-role-${index}`}>
            {member.role}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-bio-${index}`}>
            {member.bio}
          </p>
        </div>

        {member.linkedin && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(member.linkedin, "_blank")}
            className="mt-2"
            data-testid={`button-linkedin-${index}`}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <section id="who-we-are" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl mb-6" data-testid="text-whoweare-title">
            {t("whoWeAre.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-whoweare-intro">
            {t("whoWeAre.intro")}
          </p>
        </div>

        <div className="mb-20">
          <h3 className="font-display font-semibold text-2xl md:text-3xl mb-8 text-center" data-testid="text-leadership-title">
            {t("whoWeAre.leadership")}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, index) => renderTeamMember(member, index))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-2xl md:text-3xl mb-8 text-center" data-testid="text-advisors-title">
            {t("whoWeAre.advisors")}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisors.map((member, index) => renderTeamMember(member, leadership.length + index))}
          </div>
        </div>
      </div>
    </section>
  );
}
