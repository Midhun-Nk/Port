"use client";
// import { motion } from "framer-motion";

// interface ExperienceSectionProps {
//   onPointerEnter: () => void;
//   onPointerLeave: () => void;
// }

// const ease = [0.16, 1, 0.3, 1] as const;

// const experiences = [
//   {
//     period: "Current",
//     role: "Full Stack Developer",
//     company: "ENTRIKE INFOTECH",
//     description: "Architecting scalable web & mobile solutions.",
//   },
//   {
//     period: "July — October",
//     role: "Full Stack Trainee",
//     company: "EDUNET FOUNDATION",
//     description: "Undergoing intensive training in full stack development.",
//   },
//   {
//     period: "2024",
//     role: "Freelance Developer",
//     company: "Self-Employed",
//     description: "Building custom web applications for college projects.",
//   },
// ];

// const ExperienceSection = ({ onPointerEnter, onPointerLeave }: ExperienceSectionProps) => {
//   return (
//     <section 
//       id="experience" 
//       className="px-4 md:px-12 py-32 relative z-10 overflow-hidden"
//       // Added the subtle grid pattern from your reference image
//       style={{
//         backgroundImage: "radial-gradient(hsl(var(--muted-foreground)/0.15) 1px, transparent 1px)",
//         backgroundSize: "32px 32px"
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.8, ease }}
//       >
//         <div className="mb-16 border-b border-border/50 pb-6 max-w-6xl mx-auto">
//           <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Career Path</span>
//           <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2 text-foreground">
//             Career Trajectory
//           </h2>
//         </div>

//         {/* Locked coordinate system Container */}
//         <div className="relative w-full max-w-5xl mx-auto h-[900px] md:h-[1000px]">
          
//           {/* ======================================= */}
//           {/* DESKTOP SVG (Wanders around the center) */}
//           {/* ======================================= */}
//           <svg
//             className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
//             viewBox="0 0 1000 1000"
//             fill="none"
//             preserveAspectRatio="none"
//           >
//             {/* Background dashed path */}
//             <path
//               d="M 500 0 C 500 80, 400 120, 400 200 C 400 320, 600 380, 600 500 C 600 620, 400 680, 400 800 C 400 920, 500 960, 500 1000"
//               stroke="hsl(var(--border))"
//               strokeWidth="1.5"
//               strokeDasharray="6 6"
//             />
//             {/* Animated glowing primary path */}
//             <motion.path
//               d="M 500 0 C 500 80, 400 120, 400 200 C 400 320, 600 380, 600 500 C 600 620, 400 680, 400 800 C 400 920, 500 960, 500 1000"
//               stroke="hsl(var(--primary))"
//               strokeWidth="2"
//               initial={{ pathLength: 0, opacity: 0 }}
//               whileInView={{ pathLength: 1, opacity: 0.6 }}
//               viewport={{ once: true }}
//               transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
//             />

//             {/* Desktop Connectors & Dots */}
//             {[
//               { cx: 400, cy: 200, lx: 350 }, // Left connection
//               { cx: 600, cy: 500, lx: 650 }, // Right connection
//               { cx: 400, cy: 800, lx: 350 }, // Left connection
//             ].map((pt, i) => (
//               <g key={`desktop-dot-${i}`}>
//                 {/* Horizontal branch line */}
//                 <line x1={pt.cx} y1={pt.cy} x2={pt.lx} y2={pt.cy} stroke="hsl(var(--border))" strokeWidth="2" />
//                 {/* Outer Ring */}
//                 <circle cx={pt.cx} cy={pt.cy} r="8" stroke="hsl(var(--primary))" strokeWidth="2" fill="#0a0a0a" />
//                 {/* Inner Dot */}
//                 <circle cx={pt.cx} cy={pt.cy} r="3" fill="hsl(var(--primary))" />
//               </g>
//             ))}
//           </svg>

//           {/* ======================================= */}
//           {/* MOBILE SVG (Shifted to the left edge)   */}
//           {/* ======================================= */}
//           <svg
//             className="block md:hidden absolute inset-0 w-full h-full pointer-events-none"
//             viewBox="0 0 1000 1000"
//             fill="none"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M 100 0 C 100 80, 50 120, 50 200 C 50 320, 150 380, 150 500 C 150 620, 50 680, 50 800 C 50 920, 100 960, 100 1000"
//               stroke="hsl(var(--border))"
//               strokeWidth="1.5"
//               strokeDasharray="6 6"
//             />
//             <motion.path
//               d="M 100 0 C 100 80, 50 120, 50 200 C 50 320, 150 380, 150 500 C 150 620, 50 680, 50 800 C 50 920, 100 960, 100 1000"
//               stroke="hsl(var(--primary))"
//               strokeWidth="2"
//               initial={{ pathLength: 0, opacity: 0 }}
//               whileInView={{ pathLength: 1, opacity: 0.6 }}
//               viewport={{ once: true }}
//               transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
//             />
//             {/* Mobile Connectors & Dots */}
//             {[
//               { cx: 50, cy: 200, lx: 220 },
//               { cx: 150, cy: 500, lx: 220 },
//               { cx: 50, cy: 800, lx: 220 },
//             ].map((pt, i) => (
//               <g key={`mobile-dot-${i}`}>
//                 <line x1={pt.cx} y1={pt.cy} x2={pt.lx} y2={pt.cy} stroke="hsl(var(--border))" strokeWidth="2" />
//                 <circle cx={pt.cx} cy={pt.cy} r="12" stroke="hsl(var(--primary))" strokeWidth="2" fill="#0a0a0a" />
//                 <circle cx={pt.cx} cy={pt.cy} r="4" fill="hsl(var(--primary))" />
//               </g>
//             ))}
//           </svg>

//           {/* HTML Experience Cards */}
//           <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
//             {experiences.map((exp, i) => {
//               const isLeft = i % 2 === 0;
//               // These match the SVG 'cy' coordinates exactly (200=20%, 500=50%, 800=80%)
//               const topPercentage = i === 0 ? "20%" : i === 1 ? "50%" : "80%";

//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.2 }}
//                   className={`absolute pointer-events-auto
//                     w-[75%] md:w-[32%] lg:w-[28%]
//                     /* Responsive Card Placement */
//                     left-[22%] md:left-auto md:right-auto
//                     ${isLeft ? "md:right-[65%]" : "md:left-[65%]"}
//                   `}
//                   style={{
//                     top: topPercentage,
//                     // translateY perfectly centers the card horizontally on the dot
//                     transform: "translateY(-50%)",
//                   }}
//                 >
//                   <motion.div
//                     onMouseEnter={onPointerEnter}
//                     onMouseLeave={onPointerLeave}
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.3, ease }}
//                     className={`
//                       border border-border/40 p-6 md:p-8 transition-colors duration-500 hover:border-primary/50
//                       /* Creates the fading dark background effect from the reference */
//                       bg-background/90 md:bg-transparent backdrop-blur-sm
//                       ${isLeft 
//                         ? "md:bg-gradient-to-l md:from-card/40 md:to-transparent" 
//                         : "md:bg-gradient-to-r md:from-card/40 md:to-transparent"}
//                     `}
//                   >
//                     <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
//                       <h3 className="font-display text-2xl md:text-3xl italic text-foreground tracking-tight">
//                         {exp.role}
//                       </h3>
//                       <span className="font-technical text-[10px] text-primary tracking-widest uppercase font-bold">
//                         {exp.period}
//                       </span>
//                     </div>
                    
//                     <span className="font-technical text-[10px] text-muted-foreground uppercase tracking-[0.2em] block mb-4">
//                       {exp.company}
//                     </span>
                    
//                     <p className="font-technical text-sm text-muted-foreground/80 leading-relaxed max-w-sm">
//                       {exp.description}
//                     </p>
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//           </div>
          
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default ExperienceSection;

import { motion } from "framer-motion";

interface ExperienceSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const experiences = [
  {
    period: "Current",
    role: "Full Stack Developer",
    company: "ENTRIKE INFOTECH",
    description: "Architecting scalable web & mobile solutions.",
  },
  {
    period: "July — October",
    role: "Full Stack Trainee",
    company: "EDUNET FOUNDATION",
    description: "Undergoing intensive training in full stack development.",
  },
  {
    period: "2024",
    role: "Freelance Developer",
    company: "Self-Employed",
    description: "Building custom web applications for college projects.",
  },
];

const ExperienceSection = ({ onPointerEnter, onPointerLeave }: ExperienceSectionProps) => {
  return (
    <section id="experience" className="px-8 md:px-12 py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="mb-16 border-b border-border pb-6">
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Career Path</span>
          <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">Career Trajectory</h2>
        </div>

        <div className="relative max-w-4xl mx-auto py-8">
          {/* SVG curvy treasure-map path */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full pointer-events-none"
            viewBox="0 0 600 900"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              d="M 300 30
                 C 300 80, 120 100, 120 180
                 C 120 260, 480 240, 480 340
                 C 480 440, 120 420, 120 520
                 C 120 620, 480 600, 480 700
                 C 480 780, 300 760, 300 840"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeDasharray="8 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 300 30
                 C 300 80, 120 100, 120 180
                 C 120 260, 480 240, 480 340
                 C 480 440, 120 420, 120 520
                 C 120 620, 480 600, 480 700
                 C 480 780, 300 760, 300 840"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8 6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
            />
            {/* Dots exactly on the path curve anchor points */}
            {[
              { cx: 120, cy: 180 },
              { cx: 480, cy: 340 },
              { cx: 120, cy: 520 },
            ].map((dot, i) => (
              <g key={`dot-${i}`}>
                <motion.circle
                  cx={dot.cx}
                  cy={dot.cy}
                  r="14"
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.3 }}
                />
                <motion.circle
                  cx={dot.cx}
                  cy={dot.cy}
                  r="6"
                  fill="hsl(var(--primary))"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.3 }}
                />
              </g>
            ))}
          </svg>

          {/* Experience cards positioned along the curvy path */}
          <div className="relative z-10 flex flex-col gap-0" style={{ minHeight: "800px" }}>
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const topPositions = ["17%", "34%", "54%"];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: i * 0.2 }}
                  className="absolute w-[70%] md:w-[38%]"
                  style={{
                    top: topPositions[i],
                    left: isLeft ? "2%" : undefined,
                    right: !isLeft ? "2%" : undefined,
                  }}
                >
                  <motion.div
                    onMouseEnter={onPointerEnter}
                    onMouseLeave={onPointerLeave}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.4, ease }}
                    className="border border-border bg-card/60 backdrop-blur-sm p-6 md:p-8 hover:border-primary/50 transition-colors duration-500"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-xl md:text-2xl italic text-foreground">
                        {exp.role}
                      </h3>
                      <span className="font-technical text-[10px] text-primary tracking-widest">
                        {exp.period}
                      </span>
                    </div>
                    <span className="font-technical text-[10px] text-muted-foreground uppercase tracking-[0.2em] block mb-3">
                      {exp.company}
                    </span>
                    <p className="font-technical text-xs text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
