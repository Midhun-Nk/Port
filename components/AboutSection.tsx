"use client";
import { motion } from "framer-motion";
import Image from "next/image"; // Assuming Next.js, otherwise use standard <img>

interface AboutExperienceProps {
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const experiences = [
  {
    period: "Oct 2025 — Present",
    role: "Full Stack Developer",
    company: "ENTRIKE INFOTECH",
    description: "Architecting scalable web & mobile solutions utilizing the MERN stack and Flutter for cross-platform excellence.",
  },
  {
    period: "Jul 2025 — Oct 2025",
    role: "Full Stack Trainee",
    company: "EDUNET FOUNDATION",
    description: "Completed intensive training in full-stack development, mastering modern web technologies and database management.",
  },
  {
    period: "2024 — 2025",
    role: "Freelance Developer",
    company: "Self-Employed",
    description: "Engineered custom applications including a Real-Time Collaborative Code Editor and a comprehensive Disaster Management Platform.",
  },
];

// Updated to use Devicon CDN
const skills = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
];

const services = [
  {
    title: "Web Dev",
    description: "Scalable Full-Stack Apps",
  },
  {
    title: "App Dev",
    description: "Cross-Platform Mobile",
  },
  {
    title: "Content",
    description: "Tech Tutorials & Vlogs",
  },
];

const AboutExperienceSection = ({ onPointerEnter, onPointerLeave }: AboutExperienceProps) => {
  return (
    <section
      id="about"
      className="px-8 md:px-12 py-24 relative z-10 bg-background text-foreground overflow-hidden transition-colors duration-500"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        
        {/* ======================================= */}
        {/* COLUMN 1: ABOUT ME                      */}
        {/* ======================================= */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-10">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="font-technical text-[10px] text-primary uppercase tracking-widest">
              Introduction
            </span>
            <h2 className="font-display text-4xl md:text-6xl italic tracking-tighter mt-3">
              About me<span className="text-primary">,</span>
              <br />
              & what I do<span className="text-primary">.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-8 w-full">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
              className="flex flex-col space-y-5"
            >
              <p className="font-technical text-sm text-muted-foreground leading-relaxed">
                My name is Midhun NK. I am a <span className="text-primary">Full Stack Developer</span> and Creator. 
                Armed with a B.Tech in Computer Science, I specialize in bridging the gap between technical excellence and engaging storytelling.
              </p>
              <p className="font-technical text-sm text-muted-foreground leading-relaxed">
                I build robust applications—from conceptualizing comprehensive coding education platforms to developing seamless mobile experiences. Beyond writing code, I am passionate about building in public, sharing my development journey through vlogs and gaming content.
              </p>
            </motion.div>

            {/* Visual Skills/Tech Stack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
            >
              <span className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest block mb-4">
                Core Arsenal
              </span>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="group relative flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-xl border border-border bg-card/20 flex items-center justify-center hover:border-primary/40 hover:bg-card/40 transition-all duration-300">
                      {/* Using standard img tag for simplicity, swap to next/image if preferred */}
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" 
                      />
                    </div>
                    {/* Tooltip Label */}
                    <span className="absolute -bottom-5 font-technical text-[9px] text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Services Replaced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.3 }}
              className="pt-6 border-t border-border/40 mt-2"
            >
              <span className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest block mb-4">
                Services I Offer
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    onMouseEnter={onPointerEnter} 
                    onMouseLeave={onPointerLeave}
                    className="border border-border/60 rounded-xl p-4 bg-card/10 hover:border-primary/40 hover:bg-card/30 transition-all duration-300"
                  >
                    <h4 className="font-display text-xl italic tracking-tight text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {service.title}
                    </h4>
                    <p className="font-technical text-[9px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Spacer for Desktop */}
        <div className="hidden lg:block lg:col-span-1"></div>

        {/* ======================================= */}
        {/* COLUMN 2: EXPERIENCE                    */}
        {/* ======================================= */}
        <div className="lg:col-span-6 flex flex-col items-start w-full mt-10 lg:mt-0">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className="mb-10 w-full"
          >
            <span className="font-technical text-[10px] text-primary uppercase tracking-widest">
              Career Path
            </span>
            <h2 className="font-display text-4xl md:text-6xl italic tracking-tighter mt-3">
              Experience<span className="text-primary">.</span>
            </h2>
          </motion.div>

          {/* Dynamic Flexbox Timeline */}
          <div className="relative w-full">
            
            {/* Continuous Vertical Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[13px] md:left-[15px] top-6 bottom-4 w-[2px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent"
            />

            <div className="flex flex-col space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={`card-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.2 }}
                  className="relative pl-10 md:pl-14 group"
                >
                  {/* Timeline Dot (Anchored perfectly to the card) */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                    className="absolute left-0 top-5 w-[28px] h-[28px] md:w-[32px] md:h-[32px] bg-background border border-primary/50 rounded-full flex items-center justify-center z-10 group-hover:border-primary transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:shadow-[0_0_8px_1px_hsl(var(--primary))] transition-shadow duration-300" />
                  </motion.div>

                  {/* Experience Card */}
                  <div
                    onMouseEnter={onPointerEnter}
                    onMouseLeave={onPointerLeave}
                    className="border border-border rounded-xl p-5 md:p-6 bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-400 relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 relative z-10">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl italic tracking-tight text-foreground group-hover:text-primary transition-colors duration-400">
                          {exp.role}
                        </h3>
                        <p className="font-technical text-[9px] text-muted-foreground uppercase tracking-widest mt-1.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="font-technical text-[9px] text-primary tracking-widest shrink-0 border border-primary/20 px-2.5 py-1 rounded-full bg-primary/5 uppercase">
                        {exp.period}
                      </span>
                    </div>
                    
                    <p className="font-technical text-[13px] text-muted-foreground leading-relaxed relative z-10">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutExperienceSection;