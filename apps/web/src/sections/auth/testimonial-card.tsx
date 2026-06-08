export default function TestimonialCard() {
  return (
    <div className="backdrop-blur-md rounded-2xl bg-zinc-900/40 border border-white/10 flex p-6 flex-col gap-4">
      <p className="leading-relaxed italic text-neutral-50 text-base leading-6">
        "Brainhub.ai changed how I learn. It's like having a perfect memory that
        connects every idea I've ever captured."
      </p>

      <div className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfDJ8fHwxNzgwOTA0MDUzfDA&ixlib=rb-4.1.0&q=80&w=400"
          alt="User avatar"
          className="size-10 object-cover rounded-full border border-primary/40"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-neutral-50 text-sm leading-5">
            Maya Chen
          </span>

          <span className="text-[#9f9fa9] text-xs leading-4">
            Researcher & Lifelong Learner
          </span>
        </div>
      </div>
    </div>
  );
}
