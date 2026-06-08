import { Database, MessageSquare, Network, Infinity } from "lucide-react";

import Container from "@/components/shared/container";
import StatItem from "@/components/shared/stat-item";

const stats = [
  {
    icon: Database,
    value: "10K+",
    label: "Pieces of knowledge",
  },
  {
    icon: MessageSquare,
    value: "50K+",
    label: "Questions answered",
  },
  {
    icon: Network,
    value: "1M+",
    label: "Connections made",
  },
  {
    icon: Infinity,
    value: "∞",
    label: "Hours saved",
  },
];

export default function StatsSection() {
  return (
    <section className="py-12">
      <Container>
        <div className="bg-card border-border rounded-2xl border p-8">
          <p className="text-muted-foreground mb-6 text-center text-sm">
            Trusted by developers, creators, researchers, and lifelong learners
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatItem
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
