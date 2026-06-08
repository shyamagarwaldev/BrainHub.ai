// sections/landing/navbar.tsx

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";
import { ArrowRight } from "lucide-react";

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
    <header className="border-b border-border">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-12">
            <a href="/" className="flex items-center gap-2">
              <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-primary-foreground">
                B
              </div>

              <span className="text-sm font-medium">Brainhub.ai</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
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
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
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
