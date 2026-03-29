"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ParallaxBackground = () => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 40, stiffness: 90 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  // Layer transforms — deeper layers move more
  const layer1X = useTransform(sx, [0, 1], [-15, 15]);
  const layer1Y = useTransform(sy, [0, 1], [-15, 15]);
  const layer2X = useTransform(sx, [0, 1], [-30, 30]);
  const layer2Y = useTransform(sy, [0, 1], [-30, 30]);
  const layer3X = useTransform(sx, [0, 1], [-50, 50]);
  const layer3Y = useTransform(sy, [0, 1], [-50, 50]);

  // Rotation for 3D tilt
  const rotateX = useTransform(sy, [0, 1], [2, -2]);
  const rotateY = useTransform(sx, [0, 1], [-2, 2]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ perspective: "1200px" }}>
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Grid layer */}
        <motion.div
          className="absolute inset-[-60px] opacity-[0.04]"
          style={{ x: layer1X, y: layer1Y }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground) / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </motion.div>

        {/* Floating orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            x: layer2X,
            y: layer2Y,
            top: "10%",
            left: "5%",
            background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            x: layer3X,
            y: layer3Y,
            bottom: "15%",
            right: "10%",
            background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Dot matrix deep layer */}
        <motion.div
          className="absolute inset-[-80px] opacity-[0.03]"
          style={{ x: layer3X, y: layer3Y }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>

        {/* Diagonal accent lines */}
        <motion.div
          className="absolute top-[20%] left-[60%] w-[1px] h-[300px] bg-primary/10 rotate-[25deg]"
          style={{ x: layer2X, y: layer2Y }}
        />
        <motion.div
          className="absolute top-[50%] left-[20%] w-[1px] h-[200px] bg-primary/5 rotate-[-15deg]"
          style={{ x: layer3X, y: layer3Y }}
        />
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
