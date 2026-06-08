import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  CircleX,
  CreditCard,
  Play,
  Sparkles,
} from "lucide-react";

const trustItems = [
  {
    title: "Free 14-day trial",
    icon: CheckCircle2,
  },
  {
    title: "No credit card",
    icon: CreditCard,
  },
  {
    title: "Cancel anytime",
    icon: CircleX,
  },
];

export default function HeroContent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Badge
          variant="secondary"
          className="bg-primary/15 border-primary/30 text-primary rounded-full px-3 py-1"
        >
          <Sparkles className="mr-2 h-3.5 w-3.5" />
          Your AI-powered knowledge system
        </Badge>
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
        Your knowledge.
        <br />
        Organized
        <span className="text-primary">
          like a
          <br />
          brain.
        </span>
      </h1>

      <p className="text-muted-foreground max-w-md text-base leading-6">
        Capture anything. AI understands it. Retrieve instantly. Build a second
        brain that never forgets.
      </p>

      <div className="flex items-center gap-4">
        <Button className="px-6 py-5">Start for Free</Button>

        <Button variant="outline" className="px-6 py-5">
          <Play className="mr-2 h-4 w-4" />
          Watch Demo
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-8">
        {trustItems.map((item) => (
          <div key={item.title} className="flex items-center gap-2">
            <item.icon className="text-primary h-4 w-4" />

            <span className="text-muted-foreground text-sm">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
