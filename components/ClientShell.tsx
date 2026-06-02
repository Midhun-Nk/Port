"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Nav from "@/components/Nav";
import ParallaxBackground from "@/components/ParallaxBackground";
import { CustomCursor, useCursor } from "@/components/CustomCursor";
import { AuthProvider } from "@/lib/auth-context";
import Link from "next/link";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { variant, setVariant } = useCursor();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Skip navigation for accessibility & SEO */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <div className="min-h-screen bg-background text-foreground">
            <CustomCursor variant={variant} />
            <ParallaxBackground />
            <Nav
              onHover={() => setVariant("pointer")}
              onLeave={() => setVariant("default")}
            />
            <main id="main-content" className="relative z-10">
              {children}
            </main>
            <footer
              className="px-8 md:px-12 py-16 border-t border-border relative z-10"
              role="contentinfo"
              aria-label="Site footer"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                  <Link href="/" aria-label="Midhun NK — Home">
                    <h3 className="font-display text-4xl md:text-6xl italic tracking-tighter hover:text-primary transition-colors">
                      Midhun NK<span className="text-primary" aria-hidden="true">.</span>
                    </h3>
                  </Link>
                  <p className="font-technical text-xs text-muted-foreground mt-4 tracking-wide">
                    Fullstack Developer &amp; Content Creator
                  </p>
                </div>
                <nav aria-label="Footer navigation" className="font-technical text-[10px] text-muted-foreground tracking-widest uppercase">
                  <ul className="flex flex-wrap gap-6 mb-4">
                    <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                    <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
                    <li><Link href="/freelance" className="hover:text-primary transition-colors">Hire Me</Link></li>
                    <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                  </ul>
                  <p>© {new Date().getFullYear()} Midhun NK. All rights reserved.</p>
                </nav>
              </div>
            </footer>
            <Toaster />
            <Sonner />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
