import { FileText, Clock3, Bookmark, Link2 } from "lucide-react";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";

const problems = [
  {
    icon: Bookmark,
    text: "YouTube bookmarks you never revisit",
  },
  {
    icon: Link2,
    text: "X threads that disappear forever",
  },
  {
    icon: FileText,
    text: "PDFs you can't search through",
  },
  {
    icon: FileText,
    text: "Notes that don't connect",
  },
  {
    icon: Clock3,
    text: "Hours spent re-learning things",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-28">
      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left */}
          <div>
            <div className="max-w-lg">
              <SectionHeader
                eyebrow="THE PROBLEM"
                title="Your knowledge is scattered everywhere"
              />
            </div>

            <div className="mt-12 space-y-5">
              {problems.map((problem) => {
                const Icon = problem.icon;

                return (
                  <div key={problem.text} className="flex items-center gap-4">
                    <Icon className="text-muted-foreground h-5 w-5 shrink-0" />

                    <span className="text-muted-foreground text-lg">
                      {problem.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-primary mt-12 text-lg font-medium leading-relaxed">
              <p>Your brain remembers ideas.</p>
              <p>Traditional tools store files.</p>
            </div>
          </div>

          {/* Right */}
          <div>
            <img
              src="../../../public/homepage.png"
              alt="BrainHub Dashboard"
              className="w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
