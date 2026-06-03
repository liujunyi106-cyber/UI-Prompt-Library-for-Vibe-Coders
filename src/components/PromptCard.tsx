"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardPreview } from "./CardPreview";
import { t, type Language } from "@/lib/translations";

const categoryTranslationKeys: Record<string, string> = {
  "Auth Forms": "sidebar.authForms",
  "Pricing": "sidebar.pricing",
  "Features / Bento": "sidebar.featuresBento",
  "Hero Sections": "sidebar.heroSections",
  "CTA Banners": "sidebar.ctaBanners",
  "Stats Bars": "sidebar.statsBars",
  "Nav Bars": "sidebar.navBars",
  "Testimonials": "sidebar.testimonials",
  "Footer": "sidebar.footer",
  "FAQ": "sidebar.faq",
  "Dashboards": "sidebar.dashboards",
  "Onboarding": "sidebar.onboarding",
  "Blog / Content": "sidebar.blogContent",
  "Contact": "sidebar.contact",
  "Bonus": "sidebar.bonus",
};

interface PromptCardProps {
  title: string;
  titleCn: string;
  description: string;
  descriptionCn: string;
  category: string;
  prompt: string;
  promptCn: string;
  language?: Language;
  index?: number;
}

export function PromptCard({
  title,
  titleCn,
  description,
  descriptionCn,
  category,
  prompt,
  promptCn,
  language = 'cn',
  index = 0,
}: PromptCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    const textToCopy = language === 'cn' ? promptCn : prompt;
    console.log("Copy clicked, prompt:", textToCopy?.substring(0, 30));
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const result = document.execCommand("copy");
        console.log("Copy result:", result);
        
        document.body.removeChild(textArea);
        
        if (result) {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl border p-4 transition-all duration-200",
        isHovered
          ? "border-primary/40 shadow-lg ring-1 ring-primary/20 -translate-y-1.5"
          : "border-border/50 hover:border-border"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4 rounded-lg border border-border/60 bg-[var(--diagram-bg)] p-3">
        <div className="flex h-40 items-center justify-center overflow-hidden rounded">
          <CardPreview category={category} title={title} />
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold text-foreground">{language === 'cn' ? titleCn : title}</h3>
        <p className="mt-1 text-[11px] text-muted-foreground/70 line-clamp-2">
          {language === 'cn' ? descriptionCn : description}
        </p>
        <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
          {t(categoryTranslationKeys[category] as any, language) || category}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleCopy}
          style={{ cursor: 'pointer' }}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            isCopied
              ? "bg-orange-500 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isCopied ? (
            <>
              <Check size={16} />
              {t('card.copied', language)}
            </>
          ) : (
            <>
              <Copy size={16} />
              {t('card.copy', language)}
            </>
          )}
        </button>
      </div>
    </article>
  );
}
