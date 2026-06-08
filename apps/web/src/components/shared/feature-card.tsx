import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";
import IconBox from "./icon-box";
type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col p-8">
        <IconBox>{icon}</IconBox>

        <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>

        <p className="text-muted-foreground mt-3 flex-1 leading-relaxed">
          {description}
        </p>

        <button className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-medium">
          Learn More
          <ArrowRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
