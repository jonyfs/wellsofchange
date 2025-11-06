import { Card } from "@/components/ui/card";

interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export default function StatCard({ value, label, description }: StatCardProps) {
  return (
    <Card className="p-6 text-center hover-elevate transition-all" data-testid={`card-stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="font-mono text-4xl md:text-5xl font-bold text-primary mb-2" data-testid={`text-stat-value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {value}
      </div>
      <div className="font-semibold text-lg mb-1" data-testid={`text-stat-label-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {label}
      </div>
      {description && (
        <div className="text-sm text-muted-foreground" data-testid={`text-stat-description-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </div>
      )}
    </Card>
  );
}
