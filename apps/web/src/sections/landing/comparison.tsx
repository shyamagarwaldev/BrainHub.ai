// sections/landing/comparison-section.tsx

import { Check, Minus, ArrowRight } from "lucide-react";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const comparisonRows = [
  {
    feature: "Stores content",
    traditional: false,
    brainhub: true,
  },
  {
    feature: "Keyword search",
    traditional: true,
    brainhub: true,
  },
  {
    feature: "Manual organization",
    traditional: true,
    brainhub: true,
  },
  {
    feature: "AI understanding",
    traditional: false,
    brainhub: true,
  },
  {
    feature: "Connected knowledge",
    traditional: false,
    brainhub: true,
  },
];

export default function ComparisonSection() {
  return (
    <section className="py-14">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT CARD */}
          <div className="bg-card border-border rounded-2xl border p-8">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">
              BUILT DIFFERENT
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Not just another notes app
            </h2>

            <div className="mt-10">
              <div className="grid grid-cols-[1fr_100px_100px] pb-4 text-sm">
                <div />

                <div className="text-muted-foreground text-center">
                  Traditional
                </div>

                <div className="text-primary text-center font-medium">
                  Brainhub.ai
                </div>
              </div>

              <Separator />

              {comparisonRows.map((row) => (
                <div key={row.feature}>
                  <div className="grid grid-cols-[1fr_100px_100px] items-center py-4">
                    <span className="text-muted-foreground">{row.feature}</span>

                    <div className="flex justify-center">
                      {row.traditional ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Minus className="text-muted-foreground h-4 w-4" />
                      )}
                    </div>

                    <div className="flex justify-center">
                      {row.brainhub ? (
                        <Check className="text-primary h-4 w-4" />
                      ) : (
                        <Minus className="h-4 w-4" />
                      )}
                    </div>
                  </div>

                  <Separator />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative overflow-hidden rounded-2xl border border-border">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/5 to-background" />

            {/* Glow 1 */}
            <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

            {/* Glow 2 */}
            <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />

            {/* Content */}
            <div className="relative flex h-full flex-col justify-center p-10">
              <h2 className="max-w-sm text-4xl font-bold leading-tight tracking-tight">
                Stop relearning things you already consumed.
              </h2>

              <p className="text-muted-foreground mt-4 max-w-sm text-lg">
                Build a knowledge base that compounds over time.
              </p>

              <Button className="mt-8 w-fit">
                Build Your Second Brain
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-muted-foreground mt-4 text-sm">
                Free 14-day trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
