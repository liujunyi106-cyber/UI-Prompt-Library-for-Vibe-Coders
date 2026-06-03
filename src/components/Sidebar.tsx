"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { Search, Moon, Sun, Menu, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { t, type Language } from "@/lib/translations";

interface Category {
  name: string;
  count: number;
  translationKey: string;
}

const categories: Category[] = [
  { name: "All", count: 92, translationKey: "sidebar.all" },
  { name: "Auth Forms", count: 6, translationKey: "sidebar.authForms" },
  { name: "Pricing", count: 8, translationKey: "sidebar.pricing" },
  { name: "Features / Bento", count: 8, translationKey: "sidebar.featuresBento" },
  { name: "Hero Sections", count: 8, translationKey: "sidebar.heroSections" },
  { name: "CTA Banners", count: 7, translationKey: "sidebar.ctaBanners" },
  { name: "Stats Bars", count: 7, translationKey: "sidebar.statsBars" },
  { name: "Nav Bars", count: 8, translationKey: "sidebar.navBars" },
  { name: "Testimonials", count: 8, translationKey: "sidebar.testimonials" },
  { name: "Footer", count: 5, translationKey: "sidebar.footer" },
  { name: "FAQ", count: 5, translationKey: "sidebar.faq" },
  { name: "Dashboards", count: 6, translationKey: "sidebar.dashboards" },
  { name: "Onboarding", count: 4, translationKey: "sidebar.onboarding" },
  { name: "Blog / Content", count: 4, translationKey: "sidebar.blogContent" },
  { name: "Contact", count: 3, translationKey: "sidebar.contact" },
  { name: "Bonus", count: 5, translationKey: "sidebar.bonus" },
];

interface Prompt {
  title: string;
  category: string;
}

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  prompts: Prompt[];
  language: 'en' | 'cn';
  onLanguageToggle: () => void;
}

export function Sidebar({
  activeCategory,
  onCategoryChange,
  isDarkMode,
  onThemeToggle,
  searchQuery,
  onSearchChange,
  prompts,
  language,
  onLanguageToggle,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const categoriesWithResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const matchingCategories = new Set<string>();
    prompts.forEach((p) => {
      if (p.title.toLowerCase().includes(query)) {
        matchingCategories.add(p.category);
      }
    });
    matchingCategories.add("All");
    return matchingCategories;
  }, [searchQuery, prompts]);

  const canClickCategory = (categoryName: string) => {
    if (!categoriesWithResults) return true;
    return categoriesWithResults.has(categoryName);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCategories = categories;

  const handleCategoryClick = (categoryName: string) => {
    if (!canClickCategory(categoryName)) return;
    onCategoryChange(categoryName);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  }, []);

  const handleDragMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const diff = e.clientX - dragStartX.current;
      if (diff > 50) {
        setIsCollapsed(false);
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      return () => {
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  const handleClose = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const shouldShowCollapsed = !isMobile && isCollapsed;

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-4">
        {!shouldShowCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              V
            </div>
            <span className="text-lg font-semibold text-foreground whitespace-nowrap">
              Prompt Library
            </span>
          </Link>
        )}
        <button
          onClick={handleClose}
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          {shouldShowCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {!shouldShowCollapsed && (
        <div className="px-4 pb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <input
              id="search-prompts"
              name="search"
              type="text"
              placeholder={t('sidebar.searchPlaceholder', language)}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 py-0.5 text-xs text-muted-foreground">
              /
            </span>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => {
              const isEnabled = canClickCategory(category.name);
              return (
                <li key={category.name}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    disabled={!isEnabled}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                      activeCategory === category.name
                        ? "bg-primary text-primary-foreground font-semibold"
                        : isEnabled
                        ? "text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
                        : "text-muted-foreground/50 cursor-not-allowed hover:bg-secondary/50"
                    )}
                  >
                    {shouldShowCollapsed ? (
                      <span className="mx-auto text-xs">
                        {category.name.charAt(0)}
                      </span>
                    ) : (
                      <>
                        <span className="flex-1 text-left whitespace-nowrap">
                          {t(category.translationKey as any, language)}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {category.count}
                        </span>
                      </>
                    )}
                  </button>
                </li>
              );
            })
          ) : (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              {language === 'cn' ? '未找到分类' : 'No categories found'}
            </li>
          )}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          {!shouldShowCollapsed && (
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {language === 'cn' ? '关于' : 'About'}
            </Link>
          )}
          <div className="flex items-center gap-1">
            <button
              onClick={onLanguageToggle}
              className="rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              {t('sidebar.languageLabel', language)}
            </button>
            <button
              onClick={onThemeToggle}
              className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && !isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-40 rounded-lg bg-primary p-2 text-primary-foreground shadow-lg"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: shouldShowCollapsed ? 64 : 287,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseDown={shouldShowCollapsed ? handleDragStart : undefined}
        className={cn(
          "flex h-full flex-col border-r border-border bg-card shrink-0 overflow-hidden",
          isMobile ? "fixed z-50" : "relative",
          isMobile && !isMobileOpen && "hidden",
          shouldShowCollapsed && "cursor-grab active:cursor-grabbing"
        )}
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
