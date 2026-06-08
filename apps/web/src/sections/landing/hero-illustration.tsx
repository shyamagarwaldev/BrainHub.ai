import { Brain, MessageSquare, Lightbulb, FileText } from "lucide-react";

import FloatingTag from "@/components/shared/floating-tag";
import BrainGraphic from "@/components/shared/brain-graphic";

export default function HeroIllustration() {
  return (
    <div className="relative flex min-h-125 items-center justify-center overflow-hidden rounded-3xl border border-border bg-card">
      {/* Glow */}
      <div className="bg-primary/20 absolute h-72 w-72 rounded-full blur-3xl" />

      {/* Brain */}
      <div className="relative z-10">
        <BrainGraphic />
      </div>

      {/* Top Left */}
      <div className="absolute left-8 top-12">
        <FloatingTag
          icon={<Lightbulb className="h-4 w-4" />}
          label="Project Ideas"
        />
      </div>

      {/* Top Right */}
      <div className="absolute right-8 top-16">
        <FloatingTag
          icon={<MessageSquare className="h-4 w-4" />}
          label="AI Summary"
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-16 left-6">
        <FloatingTag
          icon={<FileText className="h-4 w-4" />}
          label="Research Notes"
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-12 right-10">
        <FloatingTag
          icon={<Brain className="h-4 w-4" />}
          label="Knowledge Graph"
        />
      </div>
    </div>
  );
}
