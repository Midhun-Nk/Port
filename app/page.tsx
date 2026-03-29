import { Metadata } from "next";
import HomeSections from "@/components/HomeSections";

export const metadata: Metadata = {
  title: "Home | Midhun NK",
  description: "Explore the portfolio, experience, and projects of Midhun NK.",
};

export default function Page() {
  return <HomeSections />;
}