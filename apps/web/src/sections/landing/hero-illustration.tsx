import { FileText, Heart, Lightbulb, Search, StickyNote } from "lucide-react";

import BrainGraphic from "@/components/shared/brain-graphic";
import FloatingTag from "@/components/shared/floating-tag";
import FallbackComponent from "@/components/shared/fallback";

export default function HeroIllustration() {
  return (
    <div className="relative h-112.5 overflow-hidden rounded-2xl border border-border bg-card">
      <BrainGraphic />

      <div className="absolute inset-0 bg-background/50" />

      {/* Left Side */}
      <div className="absolute left-4 top-4 flex flex-col gap-2">
        <FloatingTag
          icon={<FallbackComponent className="size-4 text-[#ff6467]" />}
          label="YouTube"
        />

        <FloatingTag
          icon={<FallbackComponent className="size-4" />}
          label="X / Threads"
        />

        <FloatingTag
          icon={<FileText className="size-4 text-orange-500" />}
          label="PDFs"
        />

        <FloatingTag
          icon={<StickyNote className="size-4 text-green-500" />}
          label="Notes"
        />
      </div>

      {/* Right Side */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <FloatingTag
          icon={<Search className="size-4 text-primary" />}
          label="Ask anything"
        />

        <FloatingTag
          icon={<Lightbulb className="size-4 text-orange-500" />}
          label="Discover insights"
        />

        <FloatingTag
          icon={<Heart className="size-4 text-primary" />}
          label="Never forget"
        />
      </div>
    </div>
  );
}
