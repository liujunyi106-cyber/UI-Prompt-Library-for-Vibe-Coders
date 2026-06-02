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

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    
    setTimeout(() => {
      const anchorId = `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } else if (category === "All") {
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.scrollTo({ top: 0, behavior: 'smooth' });
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
