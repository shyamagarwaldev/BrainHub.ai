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
    <div className="bg-card border-border flex flex-col gap-3 rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <div className="bg-muted flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold">
          {step}
        </div>

        <IconBox>{icon}</IconBox>
      </div>

      <h3 className="text-base font-semibold leading-6">{title}</h3>

      <p className="text-muted-foreground text-sm leading-5">{description}</p>
    </div>
  );
}
