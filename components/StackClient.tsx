"use client";

import StackSection from "@/components/StackSection";
import { useCursor } from "@/components/CustomCursor";

export default function StackClient() {
  const { setVariant } = useCursor();

  return (
    <StackSection 
      onPointerEnter={() => setVariant("pointer")}
      onPointerLeave={() => setVariant("default")}
    />
  );
}