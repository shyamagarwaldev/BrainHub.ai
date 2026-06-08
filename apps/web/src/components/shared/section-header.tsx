type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-primary text-xs font-semibold uppercase tracking-widest">
        {eyebrow}
      </span>

      <h2 className="text-4xl font-bold leading-tight tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="text-muted-foreground text-base leading-6">
          {description}
        </p>
      )}
    </div>
  );
}
