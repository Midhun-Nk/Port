"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "pointer" | "view" | "text";

const cursorVariants = {
  default: { height: 8, width: 8, backgroundColor: "hsl(0 0% 93%)", border: "none" },
  pointer: { height: 48, width: 48, backgroundColor: "transparent", border: "1px solid hsl(40 40% 55%)" },
  view: { height: 80, width: 80, backgroundColor: "hsl(0 0% 93%)", border: "none" },
  text: { height: 2, width: 24, backgroundColor: "hsl(40 40% 55%)", border: "none" },
};

export const useCursor = () => {
  const [variant, setVariant] = useState<CursorVariant>("default");
  return { variant, setVariant };
};

export const CustomCursor = ({ variant }: { variant: CursorVariant }) => {
  // Start off-screen so it doesn't flash at (0,0) on initial load
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 🔥 THE FIX: Much tighter physics. 
  // Higher stiffness = faster snap. Lower mass = less heavy dragging feel.
  const springConfig = { damping: 28, stiffness: 700, mass: 0.5 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      // 🔥 THE FIX: Moved the -50% translation to Tailwind (-translate-x-1/2 -translate-y-1/2) 
      // This prevents it from fighting with Framer Motion's x and y coordinates
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      style={{ x: sx, y: sy }}
      animate={variant}
      variants={cursorVariants}
      transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
    >
      {variant === "view" && (
        <span className="text-[10px] font-bold tracking-widest uppercase text-background">
          View
        </span>
      )}
    </motion.div>
  );
};