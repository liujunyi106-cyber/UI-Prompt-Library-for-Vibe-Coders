"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";

const promptsForSearch = [
  { title: "Split-screen with visual", category: "Auth Forms" },
  { title: "Centered card on background", category: "Auth Forms" },
  { title: "Minimal single-column", category: "Auth Forms" },
  { title: "Social-first stack", category: "Auth Forms" },
  { title: "Magic link only", category: "Auth Forms" },
  { title: "Multi-step wizard", category: "Auth Forms" },
  { title: "Classic 3-tier cards", category: "Pricing" },
  { title: "Monthly/annual toggle", category: "Pricing" },
  { title: "Comparison table", category: "Pricing" },
  { title: "Single-tier hero", category: "Pricing" },
  { title: "Usage-based slider", category: "Pricing" },
  { title: "Credit pack grid", category: "Pricing" },
  { title: "Free vs Pro split", category: "Pricing" },
  { title: "Stacked mobile-first", category: "Pricing" },
  { title: "3-column icon grid", category: "Features / Bento" },
  { title: "Bento grid", category: "Features / Bento" },
  { title: "Alternating rows", category: "Features / Bento" },
  { title: "Tabbed features", category: "Features / Bento" },
  { title: "Accordion list", category: "Features / Bento" },
  { title: "Scroll-triggered reveals", category: "Features / Bento" },
  { title: "Icon wall", category: "Features / Bento" },
  { title: "Before / after slider", category: "Features / Bento" },
  { title: "Centered text + screenshot", category: "Hero Sections" },
  { title: "Split hero", category: "Hero Sections" },
  { title: "Video background", category: "Hero Sections" },
  { title: "Animated gradient mesh", category: "Hero Sections" },
  { title: "Terminal / code hero", category: "Hero Sections" },
  { title: "Floating UI elements", category: "Hero Sections" },
  { title: "Big bold typography", category: "Hero Sections" },
  { title: "Hero with inline form", category: "Hero Sections" },
  { title: "Full-bleed gradient banner", category: "CTA Banners" },
  { title: "Split CTA card", category: "CTA Banners" },
  { title: "Sticky bottom bar", category: "CTA Banners" },
  { title: "Patterned background", category: "CTA Banners" },
  { title: "Dual-CTA", category: "CTA Banners" },
  { title: "Inline email capture CTA", category: "CTA Banners" },
  { title: "Testimonial + CTA combo", category: "CTA Banners" },
  { title: "Horizontal 4-column", category: "Stats Bars" },
  { title: "Animated count-up", category: "Stats Bars" },
  { title: "Icon + stat pairs", category: "Stats Bars" },
  { title: "Logo bar + stats", category: "Stats Bars" },
  { title: "Vertical stacked", category: "Stats Bars" },
  { title: "Stats over full-bleed image", category: "Stats Bars" },
  { title: "Card-based stats", category: "Stats Bars" },
  { title: "Minimal logo + links", category: "Nav Bars" },
  { title: "Centered logo split nav", category: "Nav Bars" },
  { title: "Mega menu", category: "Nav Bars" },
  { title: "Sidebar nav", category: "Nav Bars" },
  { title: "Floating pill nav", category: "Nav Bars" },
  { title: "Transparent over hero", category: "Nav Bars" },
  { title: "Command-palette nav", category: "Nav Bars" },
  { title: "Bottom mobile nav", category: "Nav Bars" },
  { title: "3-column quote cards", category: "Testimonials" },
  { title: "Marquee scroll", category: "Testimonials" },
  { title: "Masonry grid", category: "Testimonials" },
  { title: "Single featured testimonial", category: "Testimonials" },
  { title: "Video testimonial grid", category: "Testimonials" },
  { title: "Tweet wall", category: "Testimonials" },
  { title: "Carousel", category: "Testimonials" },
  { title: "Multi-column sitemap", category: "Footer" },
  { title: "Giant logo footer", category: "Footer" },
  { title: "Newsletter-first footer", category: "Footer" },
  { title: "Accordion single column", category: "FAQ" },
  { title: "Two-column accordion", category: "FAQ" },
  { title: "Chat-bubble Q&A", category: "FAQ" },
  { title: "Searchable FAQ", category: "FAQ" },
  { title: "Categorized tabs", category: "FAQ" },
  { title: "Sidebar + main", category: "Dashboards" },
  { title: "Top nav + content", category: "Dashboards" },
  { title: "Three-pane layout", category: "Dashboards" },
  { title: "Kanban board", category: "Dashboards" },
  { title: "Metric cards + chart", category: "Dashboards" },
  { title: "Empty state", category: "Dashboards" },
  { title: "Checklist onboarding", category: "Onboarding" },
  { title: "Tour tooltips", category: "Onboarding" },
  { title: "Video walkthrough", category: "Onboarding" },
  { title: "Illustrated empty state", category: "Onboarding" },
  { title: "Magazine grid", category: "Blog / Content" },
  { title: "Single column reading", category: "Blog / Content" },
  { title: "Sidebar TOC", category: "Blog / Content" },
  { title: "Card grid with filters", category: "Blog / Content" },
  { title: "Split form", category: "Contact" },
  { title: "Support channel cards", category: "Contact" },
  { title: "Full-page minimal form", category: "Contact" },
  { title: "Comparison table", category: "Bonus" },
  { title: "Feature announcement banner", category: "Bonus" },
  { title: "Cookie banner", category: "Bonus" },
  { title: "404 page", category: "Bonus" },
  { title: "Loading state", category: "Bonus" },
  { title: "Logo cloud", category: "Testimonials" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const smoothScrollTo = (targetPosition: number, duration: number = 800) => {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const startPosition = mainContent.scrollTop;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      mainContent.scrollTop = startPosition + distance * easeProgress;

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    
    setTimeout(() => {
      if (category === "All") {
        smoothScrollTo(0, 800);
      } else {
        const anchorId = `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        const element = document.getElementById(anchorId);
        if (element) {
          const targetPosition = element.offsetTop - 20;
          smoothScrollTo(targetPosition, 800);
        }
      }
    }, 100);
  }, []);

  const handleCategoryVisible = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        prompts={promptsForSearch}
      />
      <MainContent 
        activeCategory={activeCategory} 
        searchQuery={searchQuery}
        onCategoryVisible={handleCategoryVisible}
      />
    </div>
  );
}
