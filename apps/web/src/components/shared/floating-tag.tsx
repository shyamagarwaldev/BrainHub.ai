import type { ReactNode } from "react";

type FloatingTagProps = {
  icon: ReactNode;
  label: string;
};

export default function FloatingTag({ icon, label }: FloatingTagProps) {
  return (
    <div className="bg-card/90 border-border flex items-center gap-2 rounded-full border px-4 py-2 shadow-lg backdrop-blur-sm">
      <div className="text-primary">{icon}</div>

      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
