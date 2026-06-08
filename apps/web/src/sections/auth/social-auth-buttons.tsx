import { Button } from "@/components/ui/button";

import FallbackComponent from "@/components/shared/fallback";
import { GitBranch } from "lucide-react";

export default function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        type="button"
        variant="outline"
        className="font-medium rounded-xl bg-[#1A1A1F] text-neutral-50 text-sm leading-5 border-0 gap-2 h-11 hover:bg-[#1A1A1F] hover:text-neutral-50"
      >
        {/* <Google className="size-4" /> */}
        Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="font-medium rounded-xl bg-[#1A1A1F] text-neutral-50 text-sm leading-5 border-0 gap-2 h-11 hover:bg-[#1A1A1F] hover:text-neutral-50"
      >
        {/* <GitBranch className="size-4" /> */}
        GitHub
      </Button>
    </div>
  );
}
