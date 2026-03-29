"use client";
import { motion } from "framer-motion";


interface AboutSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const AboutSection = ({ onPointerEnter, onPointerLeave }: AboutSectionProps) => {
  return (
    <section
      id="about"
      // Switched to dynamic background and text colors
      className="relative bg-background text-foreground min-h-screen flex items-center justify-center py-32 px-8 overflow-hidden font-sans transition-colors duration-500"
    >
      {/* Background/Doodle Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 'About ME' Handwritten Text */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -10 }}
          whileInView={{ opacity: 1, x: 0, rotate: -5 }}
          transition={{ duration: 0.8, ease }}
          // Dynamic text color
          className="absolute top-20 left-[15%] md:left-[25%] text-4xl md:text-6xl text-foreground transition-colors duration-500"
          style={{ fontFamily: "'Brush Script MT', 'Caveat', cursive" }}
        >
          About ME
          {/* Dynamic underline colors */}
          <div className="w-full h-1 bg-foreground mt-1 rounded-full opacity-80 transition-colors duration-500" />
          <div className="w-3/4 h-1 bg-foreground mt-1 rounded-full opacity-80 transition-colors duration-500" />
        </motion.div>

        {/* Pink Smiley Face (Kept pink as it acts as an accent color for both modes) */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-40 left-[5%] md:left-[15%] text-[#ff0055] text-5xl font-black"
        >
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#ff0055" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 30 40 L 45 55 M 45 40 L 30 55" /> {/* Left Eye X */}
            <path d="M 55 40 L 70 55 M 70 40 L 55 55" /> {/* Right Eye X */}
            <path d="M 30 75 Q 50 90 70 75" /> {/* Smile */}
          </svg>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">

        {/* Left Side: Polaroid Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="lg:col-span-5 flex justify-center items-center relative"
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
          {/* Circular Text Stamp Behind - dynamic border */}
          <div className="absolute -left-10 bottom-10 w-40 h-40 border-4 border-foreground rounded-full flex items-center justify-center animate-spin-slow transition-colors duration-500">
            <span className="text-[10px] tracking-[0.3em] font-bold text-center uppercase text-foreground transition-colors duration-500" style={{ transform: 'rotate(-45deg)' }}>
              Developer • Creator •
            </span>
          </div>

          {/* Polaroid Frame (Kept light explicitly so it looks like a physical photo in both modes) */}
          <div className="bg-[#f4f4f0] p-4 pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-[300px] sm:w-[350px] relative transition-shadow duration-500">
            {/* Image Placeholder */}
            <div className="w-full aspect-[4/5] bg-neutral-200 flex items-center justify-center overflow-hidden grayscale contrast-125 border border-neutral-300 transition-colors duration-500">
              {/* <span className="text-neutral-500 font-bold">IMAGE GOES HERE</span> */}
              <img src="/assets/portrait-2.png" alt="Midhun" className="w-full h-full object-cover" />
            </div>

            {/* Scribbled Stats on Polaroid - Explicitly kept black for contrast against the light polaroid paper */}
            <div className="absolute bottom-4 left-4 flex flex-col">
              <span className="text-black text-2xl font-bold" style={{ fontFamily: "'Marker Felt', 'Comic Sans MS', fantasy" }}>
                3+ YEARS
              </span>
              <div className="h-[2px] w-full bg-black mt-1"></div>
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end">
              <span className="text-black text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "'Marker Felt', 'Comic Sans MS', fantasy" }}>
                Location:
              </span>
              <span className="text-black text-xl font-bold" style={{ fontFamily: "'Marker Felt', 'Comic Sans MS', fantasy" }}>
                INDIA
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Typography & Content */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Dynamic heading color */}
            <h2 className="text-7xl sm:text-8xl md:text-[8rem] font-black tracking-tighter leading-none uppercase text-foreground mb-4 transition-colors duration-500" style={{ fontFamily: "Impact, sans-serif" }}>
              HI!!
            </h2>
            <p className="text-lg md:text-xl font-medium max-w-lg leading-snug text-foreground/80 transition-colors duration-500">
              My name is Midhun NK, I'm a <br />
              {/* Dynamic subtitle color */}
              <span className="text-muted-foreground">fullstack developer / content creator</span> <br />
              based in India.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="flex gap-4 max-w-md"
          >
            {/* Dynamic paragraph color */}
            <p className="text-sm md:text-base leading-relaxed text-foreground/80 transition-colors duration-500">
              {/* Dynamic drop-cap color */}
              <span className="text-3xl font-black mr-2 text-foreground block float-left leading-none mt-1 transition-colors duration-500" style={{ fontFamily: "'UnifrakturMaguntia', 'Old English Text MT', serif" }}>
                Ever since
              </span>
              I can remember I've had a special interest in building modern web applications. From the simplest scripts to fully architected, performant digital experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="flex gap-4 max-w-md ml-0 lg:ml-12"
          >
            {/* Dynamic paragraph color */}
            <p className="text-sm md:text-base leading-relaxed text-foreground/80 transition-colors duration-500">
              {/* Dynamic drop-cap color */}
              <span className="text-3xl font-black mr-2 text-foreground block float-left leading-none mt-1 transition-colors duration-500" style={{ fontFamily: "'UnifrakturMaguntia', 'Old English Text MT', serif" }}>
                I live to
              </span>
              bridge the gap between technical excellence and engaging storytelling, creating content and helping developers grow in public.
            </p>
          </motion.div>

          {/* Quick Stats Integrated in Grunge Style */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            // Dynamic dashed border color
            className="flex gap-8 pt-6 mt-4 border-t-2 border-dashed border-border transition-colors duration-500"
          >
            <div>
              {/* Dynamic stat numbers */}
              <span className="text-3xl font-black text-foreground transition-colors duration-500">30+</span>
              <p className="text-xs uppercase tracking-widest text-[#ff0055] font-bold mt-1">Projects Built</p>
            </div>
            <div>
              <span className="text-3xl font-black text-foreground transition-colors duration-500">10K+</span>
              <p className="text-xs uppercase tracking-widest text-[#ff0055] font-bold mt-1">Followers</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;