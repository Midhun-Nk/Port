"use client";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

interface NavProps {
  onHover: () => void;
  onLeave: () => void;
}

const sections = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const Nav = ({ onHover, onLeave }: NavProps) => {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-12 py-6 border-b border-border backdrop-blur-md bg-background/80"
    >
      {/* Brand / Logo - Made larger and bolder */}
      <span className="font-display text-3xl md:text-4xl font-black italic tracking-tight text-foreground cursor-pointer transition-transform hover:scale-105" onClick={() => scrollTo("#top")}>
        Midhun Nk<span className="text-primary">.</span>
      </span>

      <div className="hidden md:flex items-center gap-8 lg:gap-10">
        {sections.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollTo(item.href)}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="group relative font-technical text-sm lg:text-base font-bold uppercase tracking-widest py-2 transition-colors duration-300"
          >
            {/* Text Color Logic */}
            <span
              className={`${
                activeSection === item.href
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
            >
              {item.label}
            </span>

            {/* Animated Underline Effect */}
            <span 
              className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${
                activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </button>
        ))}

        {/* Theme Toggle - Increased padding, rounded shape, and larger icon */}
        <motion.button
          onClick={() => setIsDark(!isDark)}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 ml-2 rounded-full border-2 border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Nav;