import type { ReactNode } from "react";

type IconBoxProps = {
  children: ReactNode;
};

export default function IconBox({ children }: IconBoxProps) {
  return (
    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg">
      {children}
    </div>
  );
}
