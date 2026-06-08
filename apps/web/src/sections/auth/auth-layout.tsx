import Logo from "@/components/shared/logo";

import AuthForm from "./auth-form";
import AuthShowcase from "./auth-showcase";

type Props = {
  mode: "SignIn" | "SignUp";
};

export default function AuthLayout({ mode }: Props) {
  return (
    <div className="bg-zinc-950 text-neutral-50 min-h-screen w-screen overflow-hidden">
      <div className="relative flex min-h-screen bg-[#0D0D0F] bg-[radial-gradient(circle_at_30%_40%,oklch(0.541_0.281_293.009/.18),transparent_55%)]">
        {/* Left Panel */}
        <div className="bg-[#111114] border-r border-white/10 flex flex-col w-1/2 gap-8">
          <div className="flex px-12 pt-12 items-center gap-2">
            <Logo />
          </div>

          <div className="flex flex-1 flex-col justify-center px-12">
            <AuthForm mode={mode} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2">
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
}
