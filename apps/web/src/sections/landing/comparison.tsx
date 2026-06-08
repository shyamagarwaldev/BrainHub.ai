import { ArrowRight, Check, X } from "lucide-react";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";

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
          {/* Comparison Card */}
          <div className="bg-card border-border rounded-2xl border p-8">
            <SectionHeader
              eyebrow="Built Different"
              title="Not just another notes app"
            />

            <div className="mt-8">
              <div className="mb-3 grid grid-cols-3 gap-2 border-b border-border pb-3">
                <span />

                <span className="text-center text-sm font-semibold">
                  Traditional
                </span>

                <span className="text-primary text-center text-sm font-semibold">
                  Brainhub.ai
                </span>
              </div>

              {comparisonRows.map((row) => (
                <div key={row.feature}>
                  <div className="grid grid-cols-3 items-center gap-2 py-3">
                    <span className="text-muted-foreground text-sm">
                      {row.feature}
                    </span>

                    <div className="flex justify-center">
                      {row.traditional ? (
                        <Check className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>

                    <div className="flex justify-center">
                      {row.brainhub ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </div>
                  </div>

                  <Separator />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src="https://images.unsplash.com/photo-1613327986042-63d4425a1a5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
              alt="Purple abstract"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

            <div className="relative flex h-full flex-col justify-center p-8">
              <h2 className="text-3xl font-bold leading-tight">
                Stop relearning things you already consumed.
              </h2>

              <p className="mt-4 text-sm text-foreground/80">
                Build a knowledge base that compounds.
              </p>

              <div className="mt-6">
                <Button>
                  Build Your Second Brain
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="mt-4 text-xs text-foreground/70">
                Free 14-day trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
