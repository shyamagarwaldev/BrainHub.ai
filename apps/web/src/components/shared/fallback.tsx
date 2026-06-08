import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FallbackComponentProps = {
  className?: string;
};

export default function FallbackComponent({
  className,
}: FallbackComponentProps) {
  return <PlayCircle className={cn(className)} />;
}
