import {
  Brain,
  MessageSquare,
  //   Network,
  Search,
  Zap,
  Database,
  Download,
} from "lucide-react";

import Container from "@/components/shared/container";
import FeatureCard from "@/components/shared/feature-card";
import SectionHeader from "@/components/shared/section-header";

const features = [
  {
    title: "Smart Ingestion",
    description: "Save content from anywhere on the web",
    icon: Download,
  },
  {
    title: "Hybrid Search",
    description: "Search ideas with keywords.",
    icon: Search,
  },
  {
    title: "AI Chat",
    description:
      "Ask questions about your saved knowledge and get contextual answers.",
    icon: MessageSquare,
  },
  {
    title: "Second Brain",
    description:
      "Organize information in a way that mirrors how your mind works.",
    icon: Brain,
  },
  {
    title: "Lightning Fast",
    description:
      "Access information quickly with optimized indexing and retrieval.",
    icon: Zap,
  },
  {
    title: "Unified Knowledge",
    description:
      "Bring notes, bookmarks and documents into a single workspace.",
    icon: Database,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-18">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <SectionHeader
            eyebrow="FEATURES"
            title="Everything you need to build your second brain"
            description="Capture, organize and retrieve knowledge effortlessly."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={<feature.icon className="h-6 w-6" />}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
