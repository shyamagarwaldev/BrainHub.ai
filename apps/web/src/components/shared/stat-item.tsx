import type { LucideIcon } from "lucide-react";

type StatItemProps = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export default function StatItem({ icon: Icon, value, label }: StatItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-primary mt-1 h-5 w-5 shrink-0" />

      <div>
        <div className="text-xl font-bold tracking-tight">{value}</div>

        <p className="text-muted-foreground mt-1 text-xs">{label}</p>
      </div>
    </div>
  );
}
