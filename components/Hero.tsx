"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

interface HeroProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onViewEnter: () => void;
  onViewLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

type HoverState = "none" | "fullstack" | "creator";

const Hero = ({ onPointerEnter, onPointerLeave, onViewEnter, onViewLeave }: HeroProps) => {
  const [hovered, setHovered] = useState<HoverState>("none");

  // Track the vertical scroll position of the window
  const { scrollY } = useScroll();
  
  // Transform the scroll position into horizontal movement
  // As the user scrolls from 0px to 600px down, move text 1 to -300px (Left)
  const textLeft = useTransform(scrollY, [0, 600], [0, -300]);
  // As the user scrolls from 0px to 600px down, move text 2 to +300px (Right)
  const textRight = useTransform(scrollY, [0, 600], [0, 300]);

  return (
    <section className="relative min-h-screen flex flex-col justify-start items-center px-8 md:px-12 pt-28 pb-0 mt-4 overflow-hidden">
      {/* Main layered section */}
      <div className="relative w-full flex flex-col items-center justify-center flex-1 mt-8" style={{ minHeight: "60vh" }}>
        
        {/* === "Fullstack Developer" === */}
        {/* Layer 1: Background */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] italic tracking-tighter text-center select-none absolute top-[12%] sm:top-[35%] md:top-[20%] left-0 right-0 cursor-pointer z-10"
          onMouseEnter={() => {
            setHovered("fullstack");
            onViewEnter();
          }}
          onMouseLeave={() => {
            setHovered("none");
            onViewLeave();
          }}
          // CHANGED: Inject the `x: textLeft` transform into the style
          style={{
            x: textLeft,
          }}
        >
          <span
            className="transition-all duration-500 whitespace-nowrap block"
            style={{
              WebkitTextStroke: hovered === "fullstack" ? "0px" : "1.5px hsl(var(--foreground) / 0.3)",
              color: hovered === "fullstack" ? "hsl(var(--foreground))" : "transparent",
            }}
          >
            Fullstack Developer
          </span>
        </motion.h1>

        {/* Layer 2: Foreground */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] italic tracking-tighter text-center select-none absolute top-[12%] sm:top-[35%] md:top-[20%] left-0 right-0 pointer-events-none z-30"
          // CHANGED: Inject the `x: textLeft` transform into the style
          style={{
            x: textLeft,
          }}
        >
          <span
            className="transition-all duration-500 whitespace-nowrap block"
            style={{
              WebkitTextStroke: hovered === "fullstack" ? "1.5px hsl(var(--foreground))" : "1.5px hsl(var(--foreground) / 0.3)",
              color: "transparent",
            }}
          >
            Fullstack Developer
          </span>
        </motion.h1>

        {/* Portrait images - MIDDLE layer, always z-20 */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none"
          style={{ zIndex: 20 }}
          animate={{ scale: hovered !== "none" ? 0.97 : 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="relative w-[950px] sm:w-[950px] md:w-[1200px] lg:w-[1200px] shrink-0 flex justify-center items-end max-w-none">
            
            {/* Portrait 1 */}
            <motion.img
              src="/assets/portrait-1.png"
              alt="Midhun NK Portrait"
              className="w-full h-auto object-contain object-bottom transition-all duration-700"
              style={{ position: 'absolute', bottom: 0 }}
              animate={{ opacity: hovered === "none" ? 1 : 0 }}
              transition={{ duration: 0.5, ease }}
            />

            {/* Portrait 2 - Alternative */}
            <motion.img
              src="/assets/portrait-2.png"
              alt="Midhun NK Portrait Alternative"
              className="w-full h-auto object-contain object-bottom  transition-all duration-700"
              style={{ position: 'relative' }}
              animate={{ opacity: hovered !== "none" ? 1 : 0 }}
              transition={{ duration: 0.5, ease }}
            />
          </div>
        </motion.div>

        {/* === "& Content Creator" === */}
        {/* Layer 1: Background */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.65 }}
          className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] italic tracking-tighter text-center select-none absolute top-[24%] bottom-auto sm:top-auto sm:bottom-[20%] md:bottom-[25%] left-0 right-0 cursor-pointer z-10"
          onMouseEnter={() => {
            setHovered("creator");
            onViewEnter();
          }}
          onMouseLeave={() => {
            setHovered("none");
            onViewLeave();
          }}
          // CHANGED: Inject the `x: textRight` transform into the style
          style={{
            x: textRight,
          }}
        >
          <span
            className="transition-all duration-500 whitespace-nowrap block"
            style={{
              WebkitTextStroke: hovered === "creator" ? "0px" : "1.5px hsl(var(--foreground) / 0.3)",
              color: hovered === "creator" ? "hsl(var(--foreground))" : "transparent",
            }}
          >
            & Content Creator
          </span>
        </motion.h2>

        {/* Layer 2: Foreground */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.65 }}
          className="font-display text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] italic tracking-tighter text-center select-none absolute top-[24%] bottom-auto sm:top-auto sm:bottom-[20%] md:bottom-[25%] left-0 right-0 pointer-events-none z-30"
          // CHANGED: Inject the `x: textRight` transform into the style
          style={{
            x: textRight,
          }}
        >
          <span
            className="transition-all duration-500 whitespace-nowrap block"
            style={{
              WebkitTextStroke: hovered === "creator" ? "1.5px hsl(var(--foreground))" : "1.5px hsl(var(--foreground) / 0.3)",
              color: "transparent",
            }}
          >
            & Content Creator
          </span>
        </motion.h2>
      </div>
    </section>
  );
};

export default Hero;