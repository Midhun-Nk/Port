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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
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
