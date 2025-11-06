import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
}

export default function FeatureCard({ icon: Icon, title, description, image }: FeatureCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all" data-testid={`card-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      {image && (
        <div className="mb-4 rounded-md overflow-hidden">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-xl mb-2" data-testid={`text-feature-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed" data-testid={`text-feature-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
