"use client";

import { motion } from "framer-motion";
import { t, type Language } from "@/lib/translations";

interface HeaderProps {
  totalPrompts: number;
  totalCategories: number;
  language: Language;
}

export function Header({ totalPrompts, totalCategories, language }: HeaderProps) {
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
          {totalPrompts} {t('header.prompts', language)} · {totalCategories} {t('header.categories', language)}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          {language === 'cn' ? (
            <><span className="text-orange-500">{t('header.titleBrand', language)}</span>{t('header.titleSuffix', language)}</>
          ) : (
            <>{t('header.title', language)} <span className="text-orange-500">{t('header.titleBrand', language)}</span></>
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          {t('header.description', language)}
        </motion.p>
      </div>
    </motion.header>
  );
}
