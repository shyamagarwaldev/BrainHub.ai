import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AuthDivider from "./auth-divider";
import PasswordInput from "./password-input";
import SocialAuthButtons from "./social-auth-buttons";

type AuthFormProps = {
  mode: "SignIn" | "SignUp";
};

const authContent = {
  SignIn: {
    title: "Welcome back",
    description: "Sign in to your second brain",
    submitText: "Sign In",
    footerText: "Don't have an account?",
    footerAction: "Sign up",
  },

  SignUp: {
    title: "Start creating your second brain",
    description: "Sign up to capture and connect your knowledge",
    submitText: "Create Account",
    footerText: "Already have an account?",
    footerAction: "Sign in",
  },
} as const;

export default function AuthForm({ mode }: AuthFormProps) {
  const content = authContent[mode];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-neutral-50 text-3xl leading-9 tracking-tight">
          {content.title}
        </h1>

        <p className="text-[#9f9fa9] text-sm leading-5">
          {content.description}
        </p>
      </div>

      {/* Form Fields */}
      <form className="flex flex-col gap-4">
        {mode === "SignUp" && (
          <div className="flex flex-col gap-2">
            <Label className="font-medium text-neutral-50 text-sm leading-5">
              Full Name
            </Label>

            <div className="rounded-xl bg-[#1A1A1F] border border-white/10 flex px-4 items-center gap-2 h-11">
              <Input
                placeholder="John Doe"
                className="bg-transparent shadow-none text-neutral-50 text-sm leading-5 border-0 p-0 h-auto"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label className="font-medium text-neutral-50 text-sm leading-5">
            Email address
          </Label>

          <div className="rounded-xl bg-[#1A1A1F] border border-white/10 flex px-4 items-center gap-2 h-11">
            <Mail className="size-4 text-[#9f9fa9]" />

            <Input
              type="email"
              placeholder="you@example.com"
              className="bg-transparent shadow-none text-neutral-50 text-sm leading-5 border-0 p-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Label className="font-medium text-neutral-50 text-sm leading-5">
              Password
            </Label>

            {mode === "SignIn" && (
              <button
                type="button"
                className="font-medium text-primary text-sm leading-5"
              >
                Forgot password?
              </button>
            )}
          </div>

          <PasswordInput />
        </div>

        {/* Confirm Password */}
        {mode === "SignUp" && (
          <div className="flex flex-col gap-2">
            <Label className="font-medium text-neutral-50 text-sm leading-5">
              Confirm Password
            </Label>

            <PasswordInput placeholder="Confirm Password" />
          </div>
        )}
      </form>

      {/* Submit */}
      <Button
        type="submit"
        className="font-semibold rounded-xl bg-primary text-violet-50 text-sm leading-5 w-full h-11"
      >
        {content.submitText}
      </Button>

      <AuthDivider />

      <SocialAuthButtons />

      {/* Footer */}
      <div className="text-sm leading-5 flex justify-center items-center gap-1 pb-8">
        <span className="text-[#9f9fa9]">{content.footerText}</span>

        <button type="button" className="font-medium text-primary">
          {content.footerAction}
        </button>
      </div>
    </div>
  );
}
