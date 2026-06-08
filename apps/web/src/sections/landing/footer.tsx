// sections/landing/footer.tsx

import Container from "@/components/shared/container";
import { GitBranchIcon, X, Mail } from "lucide-react";

const productLinks = ["Features", "How it works", "Pricing", "Changelog"];

const resourceLinks = ["Blog", "Guides", "Help Center", "API (Soon)"];

export default function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-lg font-semibold">Brainhub.ai</div>

            <p className="text-muted-foreground mt-4 text-sm">
              Your knowledge.
              <br />
              Organized like a brain.
            </p>

            <p className="text-muted-foreground mt-6 text-xs">
              © 2024 Brainhub.ai
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-medium">Product</h3>

            <div className="space-y-3">
              {productLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-muted-foreground block text-sm transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-medium">Resources</h3>

            <div className="space-y-3">
              {resourceLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-muted-foreground block text-sm transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 font-medium">Join our community</h3>

            <div className="flex gap-3">
              <a
                href="#"
                className="bg-card border-border flex h-10 w-10 items-center justify-center rounded-full border"
              >
                <X className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="bg-card border-border flex h-10 w-10 items-center justify-center rounded-full border"
              >
                <GitBranchIcon className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="bg-card border-border flex h-10 w-10 items-center justify-center rounded-full border"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
