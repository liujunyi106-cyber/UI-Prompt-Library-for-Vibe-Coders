"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  name: string;
  count: number;
}

const categories: Category[] = [
  { name: "All", count: 92 },
  { name: "Auth Forms", count: 6 },
  { name: "Pricing", count: 8 },
  { name: "Features / Bento", count: 8 },
  { name: "Hero Sections", count: 8 },
  { name: "CTA Banners", count: 7 },
  { name: "Stats Bars", count: 7 },
  { name: "Nav Bars", count: 8 },
  { name: "Testimonials", count: 8 },
  { name: "Footer", count: 5 },
  { name: "FAQ", count: 5 },
  { name: "Dashboards", count: 6 },
  { name: "Onboarding", count: 4 },
  { name: "Blog / Content", count: 4 },
  { name: "Contact", count: 3 },
  { name: "Bonus", count: 5 },
];

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function Sidebar({
  activeCategory,
  onCategoryChange,
  isDarkMode,
  onThemeToggle,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryName: string) => {
    onCategoryChange(categoryName);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

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
        <AnimatePresence>
          {!shouldShowCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  V
                </div>
                <span className="text-lg font-semibold text-foreground whitespace-nowrap">
                  Prompt Library
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={handleClose}
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          {shouldShowCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {!shouldShowCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4"
          >
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={16}
              />
              <input
                type="text"
                placeholder="Search prompts…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 py-0.5 text-xs text-muted-foreground">
                /
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {filteredCategories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => handleCategoryClick(category.name)}
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                  activeCategory === category.name
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {shouldShowCollapsed ? (
                  <span className="mx-auto text-xs">
                    {category.name.charAt(0)}
                  </span>
                ) : (
                  <>
                    <span className="flex-1 text-left whitespace-nowrap">
                      {category.name}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {category.count}
                    </span>
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!shouldShowCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  About
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={onThemeToggle}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
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
        className={cn(
          "flex h-full flex-col border-r border-border bg-card shrink-0 overflow-hidden",
          isMobile ? "fixed z-50" : "relative",
          isMobile && !isMobileOpen && "hidden"
        )}
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
