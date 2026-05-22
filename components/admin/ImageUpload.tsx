"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Link2, X, AlertCircle } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export default function ImageUpload({ value, onChange, label }: Props) {
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError("");
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file.");
        return;
      }

      // Validate size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        return;
      }

      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to the 'blogs' bucket
      const { error: uploadError } = await supabase.storage
        .from("blogs")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("blogs")
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err: any) {
      setError(err.message || "Failed to upload image. Make sure 'blogs' storage bucket exists and is public.");
      console.error("Upload error details:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-technical text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsUrlMode(!isUrlMode)}
          className="flex items-center gap-1 font-technical text-[9px] uppercase tracking-widest text-primary hover:underline"
        >
          {isUrlMode ? (
            <>
              <Upload size={10} /> Upload File
            </>
          ) : (
            <>
              <Link2 size={10} /> Paste URL
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 border border-destructive/20 bg-destructive/5 px-3 py-2 font-technical text-[10px] text-destructive">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}

      {isUrlMode ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-background border border-border px-4 py-3 font-technical text-sm focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/40"
        />
      ) : (
        <div className="border border-border/80 bg-background/50 hover:border-primary/30 transition-colors p-4 flex flex-col items-center justify-center min-h-[140px] text-center relative group">
          {value ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Upload preview"
                className="max-h-36 object-contain border border-border mb-3"
              />
              <div className="flex gap-2 items-center">
                <span className="font-technical text-[9px] text-muted-foreground max-w-xs truncate font-mono">
                  {value}
                </span>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1 border border-destructive/40 text-destructive hover:bg-destructive/5 transition-all"
                  title="Remove image"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                className="hidden"
                id={`file-input-${label.replace(/\s+/g, "-").toLowerCase()}`}
              />
              <label
                htmlFor={`file-input-${label.replace(/\s+/g, "-").toLowerCase()}`}
                className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-4 px-6 w-full"
              >
                {uploading ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="font-technical text-[10px] text-primary uppercase tracking-widest animate-pulse">
                      Uploading to Supabase...
                    </span>
                  </div>
                ) : (
                  <>
                    <Upload size={20} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <span className="font-technical text-[10px] text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors duration-300">
                      Click to choose an image file
                    </span>
                    <span className="font-technical text-[9px] text-muted-foreground/50">
                      PNG, JPG, WEBP (Max 5MB)
                    </span>
                  </>
                )}
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
}
