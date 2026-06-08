import { ArrowRight } from "lucide-react";
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
    <div className="bg-card border-border flex h-full flex-col rounded-2xl border p-6">
      <IconBox>{icon}</IconBox>

      <h3 className="mt-4 text-base font-semibold leading-6">{title}</h3>

      <p className="text-muted-foreground mt-2 flex-1 text-sm leading-5">
        {description}
      </p>

      <button className="text-primary mt-4 inline-flex items-center gap-1 text-sm">
        Learn more
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
