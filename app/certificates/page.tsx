import { Metadata } from "next";
import CertificatesClient from "@/components/CertificatesClient";

export const metadata: Metadata = {
  title: "Certificates & Awards | Midhun NK",
  description: "Professional certifications and achievements in software development.",
};

export default function CertificatesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <CertificatesClient />
    </div>
  );
}