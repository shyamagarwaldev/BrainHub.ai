import type { ReactNode } from "react";
import IconBox from "./icon-box";

type StepCardProps = {
  step: string;
  icon: ReactNode;
  title: string;
  description: string;
};

export default function StepCard({
  step,
  icon,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="bg-card border-border rounded-2xl border p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold">
          {step}
        </div>

        <IconBox>{icon}</IconBox>
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
