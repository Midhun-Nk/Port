import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Midhun NK",
  description: "The page you are looking for does not exist. Return to the portfolio of Midhun NK.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-8">
      <div className="text-center">
        <p className="font-technical text-[10px] uppercase tracking-widest text-primary mb-4">Error 404</p>
        <h1 className="font-display text-6xl md:text-8xl italic tracking-tighter text-foreground mb-4">
          Page not found
        </h1>
        <p className="font-technical text-sm text-muted-foreground mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-primary border border-primary px-6 py-3 hover:bg-primary/10 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
