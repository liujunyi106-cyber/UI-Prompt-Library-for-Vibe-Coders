"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  totalPrompts: number;
  totalCategories: number;
}

export function Header({ totalPrompts, totalCategories }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden border-b border-border bg-card"
    >
      <div className="flex flex-col gap-3 px-4 py-6 sm:gap-4 sm:px-10 sm:py-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-medium text-muted-foreground sm:text-sm"
        >
          {totalPrompts} prompts · {totalCategories} categories
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          UI Prompt Library for <span className="text-orange-500">Vibe Coders</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          A curated library of layout prompts for vibe coders. Pick a structure,
          copy the prompt, paste it into your AI tool — and let it match your
          screenshot&apos;s aesthetic.
        </motion.p>
      </div>
    </motion.header>
  );
}
