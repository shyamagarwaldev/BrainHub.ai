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
    <div className="flex flex-col justify-center">
      <Badge variant="secondary" className="mb-6 w-fit p-3 text-primary">
        {<Sparkles />}Your AI-powered knowledge system
      </Badge>

      <h1 className="max-w-xl text-5xl font-bold tracking-tight lg:text-7xl">
        Your knowledge.
        <br />
        Organized
        <span className="text-primary">
          like a
          <br />
          brain.
        </span>
      </h1>

      <p className="text-muted-foreground mt-6 max-w-lg text-lg leading-relaxed">
        Capture anything. AI understands it. Retrieve instantly. Build a second
        brain that never forgets.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button size="lg" className="p-5">
          Start For Free
        </Button>

        <Button size="lg" variant="outline" className="p-5">
          <Play className="mr-2 h-4 w-4" />
          Watch Demo
        </Button>
      </div>

      <div className="text-muted-foreground mt-8 flex flex-wrap gap-6 text-sm">
        {trustItems.map((item) => (
          <div key={item.title} className="flex items-center gap-2">
            <item.icon className="h-4 w-4 text-primary" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
