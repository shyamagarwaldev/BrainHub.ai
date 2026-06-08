import type { LucideIcon } from "lucide-react";

type StatItemProps = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export default function StatItem({ icon: Icon, value, label }: StatItemProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="text-primary h-6 w-6 shrink-0" />

      <div>
        <div className="text-2xl font-bold leading-8">{value}</div>

        <div className="text-muted-foreground text-xs leading-4">{label}</div>
      </div>
    </div>
  );
}
