"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Mail, Calendar, User, Info, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function AdminContacts() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Message deleted successfully");
      setSubmissions(submissions.filter((sub) => sub.id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      console.error("Error deleting message:", err);
      toast.error("Failed to delete message");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="font-technical text-[10px] text-primary uppercase tracking-widest">Admin</span>
        <h1 className="font-display text-5xl md:text-6xl italic tracking-tighter mt-2">Messages</h1>
        <p className="font-technical text-xs text-muted-foreground mt-3 tracking-wide">
          Manage contact form submissions and client inquiries
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center gap-3 py-20">
          <div className="w-1.5 h-1.5 bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-1.5 h-1.5 bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-1.5 h-1.5 bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          <span className="font-technical text-xs text-muted-foreground ml-2">Loading submissions...</span>
        </div>
      ) : submissions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 p-12 text-center border border-dashed border-border rounded-none bg-background/50"
        >
          <Mail size={32} className="text-muted-foreground/60 mx-auto mb-4" />
          <p className="font-display text-2xl italic text-muted-foreground">No submissions found</p>
          <p className="font-technical text-xs text-muted-foreground mt-2">
            Messages submitted through the contact form will appear here.
          </p>
        </motion.div>
      ) : (
        <div className="mt-10 space-y-4">
          {submissions.map((sub, i) => {
            const isExpanded = expandedId === sub.id;
            const formattedDate = new Date(sub.created_at).toLocaleString();

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className={`border transition-all duration-300 rounded-none overflow-hidden ${
                  isExpanded 
                    ? "border-primary bg-primary/[0.01]" 
                    : "border-border bg-background/50 hover:border-primary/50"
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(sub.id)}
                  className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer select-none"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className="font-technical text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 uppercase tracking-wider rounded-none">
                        {sub.name}
                      </span>
                      <span className="font-technical text-[10px] text-muted-foreground">
                        {sub.email}
                      </span>
                    </div>
                    <h3 className="font-technical text-sm font-semibold text-foreground truncate max-w-xl">
                      {sub.subject}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 font-technical text-[10px] text-muted-foreground">
                    <span>{formattedDate}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleDelete(sub.id, e)}
                        className="p-1.5 border border-border hover:border-destructive hover:text-destructive transition-colors rounded-none cursor-pointer"
                        title="Delete Message"
                      >
                        <Trash2 size={12} />
                      </button>
                      <button className="p-1.5 border border-border hover:border-primary transition-colors rounded-none cursor-pointer">
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="p-6 bg-background/30 flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-technical text-muted-foreground border-b border-border pb-4">
                          <div className="flex items-center gap-2">
                            <User size={12} className="text-primary" />
                            <span>Name: <strong className="text-foreground">{sub.name}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={12} className="text-primary" />
                            <span>Email: <strong className="text-foreground">{sub.email}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Info size={12} className="text-primary" />
                            <span>Subject: <strong className="text-foreground">{sub.subject}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={12} className="text-primary" />
                            <span>Date: <strong className="text-foreground">{formattedDate}</strong></span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-technical text-[10px] text-primary uppercase tracking-widest mb-2">Message</h4>
                          <p className="font-technical text-sm text-foreground leading-relaxed whitespace-pre-wrap bg-background/50 border border-border p-4 rounded-none">
                            {sub.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
