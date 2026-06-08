import { Download, Brain, Search } from "lucide-react";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import StepCard from "@/components/shared/step-card";

const steps = [
  {
    step: "1",
    icon: Download,
    title: "Capture",
    description: "Save content from anywhere. We support 20+ platforms.",
  },
  {
    step: "2",
    icon: Brain,
    title: "Understand",
    description:
      "AI chunks, tags, and creates embeddings to understand the context.",
  },
  {
    step: "3",
    icon: Search,
    title: "Recall",
    description: "Ask anything. Get accurate, grounded answers in seconds.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <Container>
        <SectionHeader eyebrow="HOW IT WORKS" title="Simple 3-step process" />

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              icon={<step.icon className="h-5 w-5" />}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
