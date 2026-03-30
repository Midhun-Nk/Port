"use client";

import FreelanceSection from "@/components/FreelanceSection";
import { useCursor } from "@/components/CustomCursor";

export default function FreelanceClient() {
  const { setVariant } = useCursor();

  return (
    <FreelanceSection 
      onPointerEnter={() => setVariant("pointer")}
      onPointerLeave={() => setVariant("default")}
    />
  );
}