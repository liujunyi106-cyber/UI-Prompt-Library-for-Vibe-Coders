"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";

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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <MainContent activeCategory={activeCategory} searchQuery={searchQuery} />
    </div>
  );
}
