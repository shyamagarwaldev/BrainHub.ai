import { ArrowRight } from "lucide-react";

import Container from "@/components/shared/container";
import Logo from "@/components/shared/logo";

import { Button } from "@/components/ui/button";

import MobileMenu from "./mobile-menu";

const navItems = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "How it works",
    href: "#how-it-works",
  },
  {
    label: "Use cases",
    href: "#use-cases",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Changelog",
    href: "#changelog",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur overflow-hidden">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Left */}

          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="/login"
              className="text-muted-foreground text-sm hover:text-foreground"
            >
              Log in
            </a>

            <Button size="sm">
              Get Started Free
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
