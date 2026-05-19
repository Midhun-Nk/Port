"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

interface HeroProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onViewEnter: () => void;
  onViewLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;
type ActiveState = "fullstack" | "creator";

const Hero = ({ onPointerEnter, onPointerLeave, onViewEnter, onViewLeave }: HeroProps) => {
  const [active, setActive] = useState<ActiveState>("fullstack");
  const [isHovered, setIsHovered] = useState<ActiveState | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActive((prev) => (prev === "fullstack" ? "creator" : "fullstack"));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const { scrollY } = useScroll();
  const textLeft = useTransform(scrollY, [0, 600], [0, -300]);
  const textRight = useTransform(scrollY, [0, 600], [0, 300]);
  const currentActive = isHovered ?? active;
const getTextStyle = (which: ActiveState) => ({
    WebkitTextStroke: currentActive === which ? "0px" : "1.5px hsl(var(--foreground) / 0.25)",
    // Changed --foreground to --primary for the active text fill
    color: currentActive === which ? "hsl(var(--primary))" : "transparent",
    transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
  });

  const getStrokeStyle = (which: ActiveState) => ({
    // Changed --foreground to --primary for the active text stroke
    WebkitTextStroke: currentActive === which ? "1.5px hsl(var(--primary))" : "1.5px hsl(var(--foreground) / 0.25)",
    color: "transparent",
    transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-start items-center px-8 md:px-12 pt-28 pb-0 mt-4 overflow-hidden">
      <div className="relative w-full flex flex-col items-center justify-center flex-1 mt-8" style={{ minHeight: "60vh" }}>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] italic tracking-tighter text-center select-none absolute top-[12%] sm:top-[35%] md:top-[20%] left-0 right-0 cursor-pointer z-10"
          onMouseEnter={() => { setIsHovered("fullstack"); onViewEnter(); }}
          onMouseLeave={() => { setIsHovered(null); onViewLeave(); }}
          style={{ x: textLeft }}
        >
          <span className="whitespace-nowrap block" style={getTextStyle("fullstack")}>Fullstack Developer</span>
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] italic tracking-tighter text-center select-none absolute top-[12%] sm:top-[35%] md:top-[20%] left-0 right-0 pointer-events-none z-30"
          style={{ x: textLeft }}
        >
          <span className="whitespace-nowrap block" style={getStrokeStyle("fullstack")}>Fullstack Developer</span>
        </motion.h1>

        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none"
          style={{ zIndex: 20 }}
          animate={{ scale: currentActive !== "fullstack" ? 0.97 : 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="relative w-[950px] sm:w-[950px] md:w-[1200px] lg:w-[1200px] shrink-0 flex justify-center items-end max-w-none">
            <motion.img
              src="/assets/portrait-1.png"
              alt="Midhun NK Portrait"
              className="w-full h-auto object-contain object-bottom"
              style={{ position: "absolute", bottom: 0 }}
              animate={{ opacity: currentActive === "fullstack" ? 1 : 0 }}
              transition={{ duration: 0.5, ease }}
            />
            <motion.img
              src="/assets/portrait-2.png"
              alt="Midhun NK Portrait Alternative"
              className="w-full h-auto object-contain object-bottom"
              style={{ position: "relative" }}
              animate={{ opacity: currentActive === "creator" ? 1 : 0 }}
              transition={{ duration: 0.5, ease }}
            />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.65 }}
          className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] italic tracking-tighter text-center select-none absolute top-[24%] bottom-auto sm:top-auto sm:bottom-[20%] md:bottom-[25%] left-0 right-0 cursor-pointer z-10"
          onMouseEnter={() => { setIsHovered("creator"); onViewEnter(); }}
          onMouseLeave={() => { setIsHovered(null); onViewLeave(); }}
          style={{ x: textRight }}
        >
          <span className="whitespace-nowrap block" style={getTextStyle("creator")}>& Content Creator</span>
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.65 }}
          className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] italic tracking-tighter text-center select-none absolute top-[24%] bottom-auto sm:top-auto sm:bottom-[20%] md:bottom-[25%] left-0 right-0 pointer-events-none z-30"
          style={{ x: textRight }}
        >
          <span className="whitespace-nowrap block" style={getStrokeStyle("creator")}>& Content Creator</span>
        </motion.h2>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {(["fullstack", "creator"] as const).map((s) => (
            <motion.div
              key={s}
              className="w-1.5 h-1.5 rounded-full"
              animate={{
                backgroundColor: currentActive === s ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.2)",
                scale: currentActive === s ? 1.3 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
