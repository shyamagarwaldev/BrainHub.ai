import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";

type Props = {
  placeholder?: string;
};

export default function PasswordInput({ placeholder = "••••••••" }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl bg-[#1A1A1F] border border-white/10 flex px-4 items-center gap-2 h-11">
      <Lock className="size-4 text-[#9f9fa9] shrink-0" />

      <Input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="bg-transparent shadow-none text-neutral-50 text-sm leading-5 border-0 p-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="shrink-0"
      >
        {show ? (
          <EyeOff className="size-4 text-[#9f9fa9]" />
        ) : (
          <Eye className="size-4 text-[#9f9fa9]" />
        )}
      </button>
    </div>
  );
}
