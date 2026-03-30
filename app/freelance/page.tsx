import { Metadata } from "next";
import FreelanceClient from "@/components/FreelanceClient";

export const metadata: Metadata = {
  title: "Freelance Services | Midhun NK",
  description: "Freelance fullstack development and consulting services.",
};

export default function FreelancePage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <FreelanceClient />
    </div>
  );
}