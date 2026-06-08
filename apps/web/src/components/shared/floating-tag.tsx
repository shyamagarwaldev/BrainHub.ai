import type { ReactNode } from "react";

type FloatingTagProps = {
  icon: ReactNode;
  label: string;
};

export default function FloatingTag({ icon, label }: FloatingTagProps) {
  return (
    <div className="bg-card/80 border-border flex items-center gap-2 rounded-lg border px-3 py-2 backdrop-blur-sm">
      <div>{icon}</div>

      <span className="text-xs leading-4">{label}</span>
    </div>
  );
}
