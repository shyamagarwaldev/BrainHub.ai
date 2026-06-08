import { Brain } from "lucide-react";

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
        <Brain className="size-5 text-primary-foreground" />
      </div>

      <span className="text-lg font-bold leading-7">Brainhub.ai</span>
    </a>
  );
}
