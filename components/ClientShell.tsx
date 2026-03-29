"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Nav from "@/components/Nav";
import ParallaxBackground from "@/components/ParallaxBackground";
import { CustomCursor, useCursor } from "@/components/CustomCursor";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { variant, setVariant } = useCursor();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <CustomCursor variant={variant} />
          <ParallaxBackground />
          <Nav
            onHover={() => setVariant("pointer")}
            onLeave={() => setVariant("default")}
          />
          
          {/* Page Content Renders Here */}
          <main className="relative z-10">{children}</main>

          {/* Persistent Footer */}
          <footer className="px-8 md:px-12 py-16 border-t border-border relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <h3 className="font-display text-4xl md:text-6xl italic tracking-tighter">
                  Midhun NK<span className="text-primary">.</span>
                </h3>
                <p className="font-technical text-xs text-muted-foreground mt-4 tracking-wide">
                  Fullstack Developer & Content Creator
                </p>
              </div>
              <div className="font-technical text-[10px] text-muted-foreground tracking-widest uppercase">
                © 2026 Midhun NK. All rights reserved.
              </div>
            </div>
          </footer>

          <Toaster />
          <Sonner />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}