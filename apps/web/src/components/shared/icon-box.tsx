import type { ReactNode } from "react";

type IconBoxProps = {
  children: ReactNode;
};

export default function IconBox({ children }: IconBoxProps) {
  return (
    <div className="size-10 rounded-lg bg-primary/15 flex justify-center items-center text-primary">
      {children}
    </div>
  );
}
