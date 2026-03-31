"use client";
import { motion } from "framer-motion";

interface CertificatesSectionProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const certificates = [
  {
    title: "Meta Frontend Developer",
    issuer: "Meta / Coursera",
    year: "2024",
    image: "/certificates/certificate-1.png",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
    ]
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    image: "/certificates/certificate-2.png",
    skills: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" }
    ]
  },
  {
    title: "Fullstack Open",
    issuer: "University of Helsinki",
    year: "2023",
    image: "/certificates/certificate-3.png",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
    ]
  },
  {
    title: "React Advanced Patterns",
    issuer: "Frontend Masters",
    year: "2023",
    image: "/certificates/certificate-4.png",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
    ]
  },
  {
    title: "Node.js Design Patterns",
    issuer: "Udemy",
    year: "2022",
    image: "/certificates/certificate-5.png",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }
    ]
  },
  {
    title: "JavaScript Algorithms",
    issuer: "freeCodeCamp",
    year: "2022",
    image: "/certificates/certificate-6.png",
    skills: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
    ]
  },
  {
    title: "JavaScript Algorithms",
    issuer: "freeCodeCamp",
    year: "2022",
    image: "/certificates/certificate-7.png",
    skills: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
    ]
  },
  {
    title: "JavaScript Algorithms",
    issuer: "freeCodeCamp",
    year: "2022",
    image: "/certificates/certificate-8.png",
    skills: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
    ]
  },
];

const CertificatesSection = ({ onPointerEnter, onPointerLeave }: CertificatesSectionProps) => {
  return (
    <section id="certificates" className="px-8 md:px-12 py-32 relative z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="flex justify-between items-end mb-16 border-b border-border pb-6">
          <div>
            <span className="font-technical text-[10px] text-[#D4AF37] uppercase tracking-widest">Certifications</span>
            <h2 className="font-display text-5xl md:text-7xl italic tracking-tighter mt-2">Certificates</h2>
          </div>
        </div>

        {/* 🔥 THE BULLETPROOF GRID CAROUSEL 🔥 */}
        <div 
          className="
            grid grid-flow-col auto-cols-[85vw] sm:auto-cols-[340px] gap-6 
            overflow-x-auto overscroll-x-contain snap-x snap-mandatory 
            pb-8 -mx-8 px-8 
            md:grid-flow-row md:grid-cols-2 lg:grid-cols-3 md:auto-cols-auto 
            md:overflow-x-visible md:snap-none md:mx-0 md:px-0 md:pb-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          "
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              whileHover={{ y: -6, borderColor: "#D4AF37" }}
              onMouseEnter={onPointerEnter}
              onMouseLeave={onPointerLeave}
              // 🔥 Snap center added directly to the card
              className="group snap-center p-5 border border-border bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 flex flex-col h-full w-full"
            >
              {/* Image Container with Hover Effects */}
              <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded border border-border/50 bg-muted/20 relative shrink-0">
                <img
                  src={cert.image}
                  alt={`${cert.title} Certificate`}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-grow">
                <span className="font-technical text-[10px] text-[#D4AF37] uppercase tracking-widest">
                  {cert.year}
                </span>
                <h3 className="font-display text-xl italic mt-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                  {cert.title}
                </h3>
                <p className="font-technical text-[11px] text-muted-foreground mt-2 tracking-wide mb-6">
                  {cert.issuer}
                </p>

                {/* Skills Badges - Pushed to the bottom using mt-auto */}
                <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-border/50">
                  {cert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/40 transition-colors duration-500"
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-4 h-4 object-contain"
                        loading="lazy"
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CertificatesSection;