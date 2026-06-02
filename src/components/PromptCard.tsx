"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PromptCardProps {
  title: string;
  description: string;
  category: string;
  prompt: string;
  index?: number;
}

export function PromptCard({
  title,
  description,
  category,
  prompt,
  index = 0,
}: PromptCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -6,
        transition: { duration: 0.2 }
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative flex flex-col rounded-xl border p-4 transition-all duration-200",
        isHovered
          ? "border-primary/40 shadow-lg ring-1 ring-primary/20"
          : "border-border/50 hover:border-border"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4 rounded-lg border border-border/60 bg-secondary p-4">
        <div className="flex h-24 items-center justify-center">
          <div className="text-4xl opacity-20">📄</div>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
        <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
          {category}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            isCopied
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isCopied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy prompt
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
}
