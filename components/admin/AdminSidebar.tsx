"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  Settings,
  List,
  ArrowLeft,
  Mail,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "All Blogs", path: "/admin/blogs", icon: List },
  { label: "New Post", path: "/admin/blogs/new", icon: PenSquare },
  { label: "Messages", path: "/admin/contacts", icon: Mail },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -64, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-16 bottom-0 w-64 border-r border-border bg-background/95 backdrop-blur-md z-40 flex flex-col"
    >
      <div className="p-6 border-b border-border">
        <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Admin Panel</span>
        <h2 className="font-display text-2xl italic tracking-tighter mt-1">Blog CMS</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 font-technical text-xs uppercase tracking-widest transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link href="/">
          <motion.div
            whileHover={{ x: -4 }}
            className="flex items-center gap-3 px-4 py-3 font-technical text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all"
          >
            <ArrowLeft size={16} />
            Back to Site
          </motion.div>
        </Link>
      </div>
    </motion.aside>
  );
}
