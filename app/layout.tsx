import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "@/components/ClientShell"; // Import the shell we just created

export const metadata: Metadata = {
  title: "Midhun NK - Fullstack Developer & Content Creator",
  description: "Portfolio of Midhun NK, a Fullstack Developer and Content Creator based in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}