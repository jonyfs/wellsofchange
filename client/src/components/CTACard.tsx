import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface CTACardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

export default function CTACard({ icon: Icon, title, description, buttonText, onClick }: CTACardProps) {
  return (
    <Card className="p-8 hover-elevate transition-all h-full flex flex-col" data-testid={`card-cta-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex-shrink-0 w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-2xl mb-4" data-testid={`text-cta-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-6 flex-grow" data-testid={`text-cta-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {description}
      </p>
      <Button
        variant="default"
        className="w-full"
        onClick={onClick}
        data-testid={`button-cta-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {buttonText}
      </Button>
    </Card>
  );
}
