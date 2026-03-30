"use client";

import CertificatesSection from "@/components/CertificatesSection";
import { useCursor } from "@/components/CustomCursor";

export default function CertificatesClient() {
  const { setVariant } = useCursor();

  return (
    <CertificatesSection 
      onPointerEnter={() => setVariant("pointer")}
      onPointerLeave={() => setVariant("default")}
    />
  );
}