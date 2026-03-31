"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavProps {
  onHover?: () => void;
  onLeave?: () => void;
}

// Added the missing sections and paired hashes with real paths
const sections = [
  { label: "About", hash: "#about", path: "/about" },
  { label: "Content", hash: "#content", path: "/content" },
  { label: "Experience", hash: "#experience", path: "/experience" },
  { label: "Freelance", hash: "#freelance", path: "/freelance" },
  { label: "Stack", hash: "#stack", path: "/stack" },
  { label: "Projects", hash: "#projects", path: "/projects" },
  { label: "Certificates", hash: "#certificates", path: "/certificates" },
  { label: "Contact", hash: "#contact", path: "/contact" },
];

const Nav = ({ onHover, onLeave }: NavProps) => {
  const [isDark, setIsDark] = useState(true);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Handle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  // Handle active section tracking (Only runs on the homepage)
  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(({ hash }) => {
      const el = document.querySelector(hash);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // The smart routing handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname === "/") {
      // If we are already on the homepage, intercept the link and smooth scroll
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    // If not on the homepage, the default <Link> behavior takes over and routes to the new page
  };

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-12 py-6 border-b border-border backdrop-blur-md bg-background/80"
    >
      {/* Brand / Logo */}
      <span 
        className="font-display text-3xl md:text-4xl font-black italic tracking-tight text-foreground cursor-pointer transition-transform hover:scale-105" 
        onClick={handleLogoClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        Midhun Nk<span className="text-primary">.</span>
      </span>

      <div className="hidden md:flex items-center gap-6 xl:gap-8">
        {sections.map((item) => {
          // Determine if the link is active based on pathname OR scroll position
          const isActive = pathname === "/" ? activeHash === item.hash : pathname === item.path;

          return (
            <Link
              key={item.label}
              href={item.path} // SEO bots see this valid URL!
              onClick={(e) => handleNavClick(e, item.hash)}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
              className="group relative font-technical text-xs xl:text-sm font-bold uppercase tracking-widest py-2 transition-colors duration-300"
            >
              {/* Text Color Logic */}
              <span
                className={`${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                }`}
              >
                {item.label}
              </span>

              {/* Animated Underline Effect */}
              <span 
                className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          );
        })}

        {/* Theme Toggle */}
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