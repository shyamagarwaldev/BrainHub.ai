import { Database, Infinity, Sparkles } from "lucide-react";

import TestimonialCard from "./testimonial-card";

export default function AuthShowcase() {
  return (
    <div className="relative bg-[linear-gradient(160deg,#1A0A2E_0%,#0D0D0F_85%)] h-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1728675438130-4393f2e8fb2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5ldXJhbCUyMG5ldHdvcmslMjBicmFpbiUyMGdsb3dpbmclMjBwdXJwbGUlMjB2aW9sZXR8ZW58MXwxfHx8MTc4MDkwNDA1M3ww&ixlib=rb-4.1.0&q=80&w=400"
        alt="Neural network brain"
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,oklch(0.541_0.281_293.009/.35),transparent_60%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,#0D0D0F_100%)]" />

      <div className="relative z-10 flex p-12 flex-col justify-between h-full">
        <div className="flex mt-8 flex-col gap-4">
          <div className="backdrop-blur-md rounded-2xl bg-zinc-900/40 border border-primary/40 flex px-4 py-3 self-start items-center gap-3">
            <div className="size-9 rounded-xl bg-primary/20 flex justify-center items-center">
              <Sparkles className="size-4 text-primary" />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-neutral-50 text-sm leading-5">
                Ask anything
              </span>

              <span className="text-[#9f9fa9] text-xs leading-4">
                Instant answers from your knowledge
              </span>
            </div>
          </div>

          <div className="backdrop-blur-md rounded-2xl bg-zinc-900/40 border border-primary/40 flex px-4 py-3 self-end items-center gap-3">
            <div className="size-9 rounded-xl bg-primary/20 flex justify-center items-center">
              <Database className="size-4 text-primary" />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-neutral-50 text-sm leading-5">
                10K+ pieces of knowledge
              </span>

              <span className="text-[#9f9fa9] text-xs leading-4">
                Organized like a brain
              </span>
            </div>
          </div>

          <div className="backdrop-blur-md rounded-2xl bg-zinc-900/40 border border-primary/40 flex px-4 py-3 self-start items-center gap-3">
            <div className="size-9 rounded-xl bg-primary/20 flex justify-center items-center">
              <Infinity className="size-4 text-primary" />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-neutral-50 text-sm leading-5">
                Never forget
              </span>

              <span className="text-[#9f9fa9] text-xs leading-4">
                Your second brain remembers
              </span>
            </div>
          </div>
        </div>

        <TestimonialCard />
      </div>
    </div>
  );
}
