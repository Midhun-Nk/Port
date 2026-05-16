"use client";

import { motion } from "framer-motion";
import { Sun, Moon, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface NavProps {
  onHover?: () => void;
  onLeave?: () => void;
}

const sections = [
  { label: "About", hash: "#about", path: "/about" },
  { label: "Content", hash: "#content", path: "/content" },
  { label: "Freelance", hash: "#freelance", path: "/freelance" },
  { label: "Stack", hash: "#stack", path: "/stack" },
  { label: "Projects", hash: "#projects", path: "/projects" },
  { label: "Certificates", hash: "#certificates", path: "/certificates" },
  { label: "Blog", hash: "#blog", path: "/blog" },
  { label: "Contact", hash: "#contact", path: "/contact" },
];

const Nav = ({ onHover, onLeave }: NavProps) => {
  const [isDark, setIsDark] = useState(true);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash("#" + entry.target.id);
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string, path: string) => {
    if (pathname === "/" && hash !== "#blog") {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-12 py-3 border-b border-border backdrop-blur-md bg-background/80"
    >
      <span
        className="font-display text-3xl md:text-4xl font-black italic tracking-tight text-foreground cursor-pointer transition-transform hover:scale-105"
        onClick={handleLogoClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        Midhun Nk<span className="text-primary">.</span>
      </span>

      <div className="hidden md:flex items-center gap-5 xl:gap-6">
        {sections.map((item) => {
          const isActive = pathname === "/" ? activeHash === item.hash : pathname.startsWith(item.path);
          return (
            <Link
              key={item.label}
              href={item.path}
              onClick={(e) => handleNavClick(e, item.hash, item.path)}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
              className="group relative font-technical text-xs xl:text-sm font-bold uppercase tracking-widest py-2 transition-colors duration-300"
            >
              <span className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}>
                {item.label}
              </span>
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          );
        })}

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 font-technical text-xs uppercase tracking-widest px-3 py-1.5 border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <LayoutDashboard size={14} />
                Admin
              </motion.button>
            </Link>
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 font-technical text-xs uppercase tracking-widest px-3 py-1.5 border border-border text-muted-foreground hover:border-primary/30 hover:text-primary transition-all duration-300"
            >
              <LogOut size={14} />
            </motion.button>
          </div>
        ) : (
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
              className="flex items-center gap-1.5 font-technical text-xs uppercase tracking-widest px-3 py-1.5 border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              <LogIn size={14} />
              Login
            </motion.button>
          </Link>
        )}

        <motion.button
          onClick={() => setIsDark(!isDark)}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full border-2 border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Nav;
