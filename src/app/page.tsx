"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />
      <MainContent activeCategory={activeCategory} />
    </div>
  );
}
