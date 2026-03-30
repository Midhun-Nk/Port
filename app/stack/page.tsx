import { Metadata } from "next";
import StackClient from "@/components/StackClient";

export const metadata: Metadata = {
  title: "Tech Stack | Midhun NK",
  description: "An overview of the technologies, frameworks, and tools I use to build applications.",
};

export default function StackPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <StackClient />
    </div>
  );
}