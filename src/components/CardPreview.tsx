"use client";

import React from "react";

interface CardPreviewProps {
  category: string;
  title: string;
}

export function CardPreview({ category, title }: CardPreviewProps) {
  const id = `${category}-${title}`.replace(/\s+/g, "-").toLowerCase();
  let counter = 0;

  const R = (x: number, y: number, w: number, h: number, cls: string, rx = 3, sw = 0) => (
    <rect key={`${id}-r-${counter++}`} x={x} y={y} width={w} height={h} className={cls} rx={rx} strokeWidth={sw} />
  );
  const C = (cx: number, cy: number, r: number, cls: string) => (
    <circle key={`${id}-c-${counter++}`} cx={cx} cy={cy} r={r} className={cls} />
  );
  const L = (x1: number, y1: number, x2: number, y2: number, cls: string, sw = 0.5) => (
    <line key={`${id}-l-${counter++}`} x1={x1} y1={y1} x2={x2} y2={y2} className={cls} strokeWidth={sw} />
  );
  const Pg = (points: string, cls: string) => (
    <polygon key={`${id}-pg-${counter++}`} points={points} className={cls} />
  );

  return (
    <svg viewBox="0 0 200 120" className="w-full h-auto text-foreground/70" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="0.5" y="0.5" width="199" height="119" rx="6" className="fill-background" stroke="currentColor" strokeOpacity={0.15} />
      {render(category, title, R, C, L, Pg)}
    </svg>
  );
}

type RFn = (x: number, y: number, w: number, h: number, cls: string, rx?: number, sw?: number) => React.ReactNode;
type CFn = (cx: number, cy: number, r: number, cls: string) => React.ReactNode;
type LFn = (x1: number, y1: number, x2: number, y2: number, cls: string, sw?: number) => React.ReactNode;
type PFn = (points: string, cls: string) => React.ReactNode;

function render(
  cat: string, title: string,
  R: RFn, C: CFn, L: LFn, Pg: PFn
): React.ReactNode[] {
  const e: React.ReactNode[] = [];

  if (cat === "Auth Forms") {
    if (title.includes("Split-screen")) {
      e.push(R(8, 8, 88, 104, "fill-foreground/5", 4));
      e.push(R(20, 28, 50, 3, "fill-foreground/40", 2));
      e.push(R(20, 42, 64, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 56, 64, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 74, 64, 10, "fill-[var(--accent-mint)]", 3));
      e.push(R(104, 8, 88, 104, "fill-foreground/10", 4));
      e.push(C(148, 50, 14, "fill-foreground/15"));
      e.push(R(120, 76, 56, 3, "fill-foreground/30", 2));
    } else if (title.includes("Centered card")) {
      e.push(R(4, 4, 192, 112, "fill-foreground/5", 4));
      e.push(R(50, 20, 100, 84, "fill-none stroke-foreground/40", 4, 1));
      e.push(R(70, 32, 60, 3, "fill-foreground/40", 2));
      e.push(R(62, 44, 76, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(62, 58, 76, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(62, 74, 76, 9, "fill-[var(--accent-mint)]", 3));
      e.push(R(80, 90, 40, 2, "fill-foreground/30", 2));
    } else if (title.includes("Minimal")) {
      e.push(C(100, 20, 5, "fill-foreground/40"));
      e.push(R(70, 34, 60, 4, "fill-foreground/40", 2));
      e.push(R(50, 48, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 62, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 78, 100, 9, "fill-[var(--accent-mint)]", 3));
    } else if (title.includes("Social")) {
      e.push(R(50, 14, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 28, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 42, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(L(56, 62, 92, 62, "stroke-foreground/40"), R(96, 60, 8, 4, "fill-foreground/30", 2));
      e.push(L(108, 62, 144, 62, "stroke-foreground/40"));
      e.push(R(50, 70, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 84, 100, 9, "fill-[var(--accent-mint)]", 3));
    } else if (title.includes("Magic link")) {
      e.push(R(70, 34, 60, 4, "fill-foreground/40", 2));
      e.push(R(40, 50, 120, 11, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(40, 68, 120, 11, "fill-[var(--accent-mint)]", 3));
      e.push(R(62, 88, 76, 2, "fill-foreground/25", 2), R(72, 94, 56, 2, "fill-foreground/25", 2));
    } else if (title.includes("Multi-step")) {
      e.push(R(40, 20, 40, 3, "fill-[var(--accent-mint)]", 2));
      e.push(R(82, 20, 40, 3, "fill-foreground/15", 2));
      e.push(R(124, 20, 36, 3, "fill-foreground/15", 2));
      e.push(R(70, 36, 60, 3, "fill-foreground/40", 2));
      e.push(R(50, 48, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 62, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 78, 46, 9, "fill-foreground/10", 3));
      e.push(R(104, 78, 46, 9, "fill-[var(--accent-mint)]", 3));
    }
  } else if (cat === "Pricing") {
    if (title.includes("3-tier") || title.includes("Classic")) {
      e.push(R(12, 20, 52, 84, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(74, 12, 52, 100, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(136, 20, 52, 84, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 30, 20, 3, "fill-foreground/40", 2), R(20, 38, 28, 5, "fill-foreground/60", 2));
      e.push(R(20, 52, 36, 2, "fill-foreground/15", 1), R(20, 58, 25.2, 2, "fill-foreground/15", 1), R(20, 64, 36, 2, "fill-foreground/15", 1));
      e.push(R(20, 90, 36, 6, "fill-foreground/15", 2));
      e.push(R(82, 22, 20, 3, "fill-foreground/40", 2), R(82, 30, 28, 5, "fill-foreground/60", 2));
      e.push(R(82, 44, 36, 2, "fill-foreground/15", 1), R(82, 50, 25.2, 2, "fill-foreground/15", 1), R(82, 56, 36, 2, "fill-foreground/15", 1));
      e.push(R(82, 92, 36, 6, "fill-[var(--accent-mint)]", 2));
      e.push(R(144, 30, 20, 3, "fill-foreground/40", 2), R(144, 38, 28, 5, "fill-foreground/60", 2));
      e.push(R(144, 52, 36, 2, "fill-foreground/15", 1), R(144, 58, 25.2, 2, "fill-foreground/15", 1), R(144, 64, 36, 2, "fill-foreground/15", 1));
      e.push(R(144, 90, 36, 6, "fill-foreground/15", 2));
    } else if (title.includes("Monthly") || title.includes("toggle")) {
      e.push(R(70, 10, 60, 10, "fill-none stroke-foreground/30", 5, 1));
      e.push(R(102, 12, 26, 6, "fill-[var(--accent-mint)]", 3));
      e.push(R(20, 30, 50, 70, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(75, 30, 50, 70, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(130, 30, 50, 70, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Comparison")) {
      e.push(R(10, 14, 180, 8, "fill-foreground/10", 2));
      e.push(L(10, 28, 190, 28, "stroke-foreground/15"), L(10, 42, 190, 42, "stroke-foreground/15"), L(10, 56, 190, 56, "stroke-foreground/15"));
      e.push(L(10, 70, 190, 70, "stroke-foreground/15"), L(10, 84, 190, 84, "stroke-foreground/15"), L(10, 98, 190, 98, "stroke-foreground/15"));
      e.push(L(55, 14, 55, 106, "stroke-foreground/15"), L(100, 14, 100, 106, "stroke-foreground/15"), L(145, 14, 145, 106, "stroke-foreground/15"));
      e.push(R(102, 14, 42, 8, "fill-[var(--accent-mint)]", 2));
    } else if (title.includes("Single-tier") || title.includes("hero")) {
      e.push(R(40, 14, 120, 92, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(88, 26, 24, 4, "fill-foreground/40", 2));
      e.push(R(78, 34, 44, 9, "fill-foreground/60", 2));
      e.push(R(62, 52, 76, 2, "fill-foreground/15", 1), R(62, 58, 53.2, 2, "fill-foreground/15", 1));
      e.push(R(62, 64, 76, 2, "fill-foreground/15", 1), R(62, 70, 53.2, 2, "fill-foreground/15", 1));
      e.push(R(62, 88, 76, 9, "fill-[var(--accent-mint)]", 3));
    } else if (title.includes("slider") || title.includes("Usage")) {
      e.push(R(20, 36, 160, 2, "fill-foreground/20", 1));
      e.push(R(20, 36, 70, 2, "fill-[var(--accent-mint)]", 1));
      e.push(C(90, 37, 5, "fill-[var(--accent-mint)]"));
      e.push(R(70, 64, 60, 12, "fill-foreground/60", 2));
      e.push(R(80, 88, 40, 4, "fill-foreground/30", 2));
    } else if (title.includes("Credit")) {
      e.push(R(14, 14, 52, 42, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(14, 64, 52, 42, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(74, 14, 52, 42, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(74, 64, 52, 42, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(134, 14, 52, 42, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(134, 64, 52, 42, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(66, 12, 20, 4, "fill-[var(--accent-mint)]", 2));
    } else if (title.includes("Free vs Pro")) {
      e.push(R(12, 14, 84, 92, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(104, 14, 84, 92, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(112, 26, 28, 5, "fill-foreground/60", 2));
      e.push(R(112, 94, 68, 9, "fill-[var(--accent-mint)]", 3));
      e.push(R(20, 26, 28, 5, "fill-foreground/40", 2));
      e.push(R(20, 42, 68, 2, "fill-foreground/15", 1), R(20, 48, 47.6, 2, "fill-foreground/15", 1), R(20, 54, 68, 2, "fill-foreground/15", 1));
    } else if (title.includes("Stacked")) {
      e.push(R(20, 12, 160, 28, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 50, 160, 28, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(20, 88, 160, 28, "fill-none stroke-foreground/30", 4, 1));
    }
  } else if (cat === "Features / Bento") {
    if (title.includes("3-column") || title.includes("icon grid")) {
      e.push(C(40, 32, 8, "fill-foreground/15"), C(100, 32, 8, "fill-foreground/15"), C(160, 32, 8, "fill-foreground/15"));
      e.push(R(22, 50, 36, 4, "fill-foreground/40", 2), R(82, 50, 36, 4, "fill-foreground/40", 2), R(142, 50, 36, 4, "fill-foreground/40", 2));
      e.push(R(22, 62, 42, 2, "fill-foreground/15", 1), R(22, 68, 29.4, 2, "fill-foreground/15", 1), R(22, 74, 42, 2, "fill-foreground/15", 1));
      e.push(R(82, 62, 42, 2, "fill-foreground/15", 1), R(82, 68, 29.4, 2, "fill-foreground/15", 1), R(82, 74, 42, 2, "fill-foreground/15", 1));
      e.push(R(142, 62, 42, 2, "fill-foreground/15", 1), R(142, 68, 29.4, 2, "fill-foreground/15", 1), R(142, 74, 42, 2, "fill-foreground/15", 1));
    } else if (title.includes("Bento")) {
      e.push(R(10, 10, 88, 56, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(104, 10, 86, 26, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(104, 42, 86, 24, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(10, 72, 56, 38, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(72, 72, 118, 38, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Alternating")) {
      e.push(R(10, 14, 80, 32, "fill-foreground/10", 2));
      e.push(R(104, 20, 80, 2, "fill-foreground/15", 1), R(104, 26, 56, 2, "fill-foreground/15", 1), R(104, 32, 80, 2, "fill-foreground/15", 1));
      e.push(R(10, 66, 80, 2, "fill-foreground/15", 1), R(10, 72, 56, 2, "fill-foreground/15", 1), R(10, 78, 80, 2, "fill-foreground/15", 1));
      e.push(R(104, 62, 80, 32, "fill-foreground/10", 2));
    } else if (title.includes("Tabbed")) {
      e.push(R(20, 14, 30, 6, "fill-[var(--accent-mint)]", 2));
      e.push(R(56, 14, 30, 6, "fill-foreground/15", 2));
      e.push(R(92, 14, 30, 6, "fill-foreground/15", 2));
      e.push(R(20, 28, 160, 76, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(32, 42, 70, 48, "fill-foreground/10", 2));
      e.push(R(112, 48, 56, 2, "fill-foreground/15", 1), R(112, 54, 39.2, 2, "fill-foreground/15", 1));
      e.push(R(112, 60, 56, 2, "fill-foreground/15", 1), R(112, 66, 39.2, 2, "fill-foreground/15", 1));
    } else if (title.includes("Accordion")) {
      e.push(R(20, 14, 160, 14, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 36, 160, 38, "fill-none stroke-[var(--accent-mint)]", 4, 1));
      e.push(R(20, 58, 160, 14, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 92, 160, 14, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Scroll-triggered")) {
      e.push(R(10, 14, 80, 92, "fill-foreground/10", 2));
      e.push(R(102, 20, 86, 2, "fill-foreground/15", 1), R(102, 26, 60.2, 2, "fill-foreground/15", 1));
      e.push(R(102, 42, 86, 2, "fill-foreground/15", 1), R(102, 48, 60.2, 2, "fill-foreground/15", 1));
      e.push(R(102, 66, 86, 2, "fill-[var(--accent-mint)]", 1), R(102, 72, 86, 2, "fill-foreground/15", 1), R(102, 78, 60.2, 2, "fill-foreground/15", 1));
      e.push(R(102, 92, 86, 2, "fill-foreground/15", 1), R(102, 98, 60.2, 2, "fill-foreground/15", 1));
    } else if (title.includes("Icon wall")) {
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
        e.push(R(14 + c * 36, 14 + r * 32, 28, 24, "fill-none stroke-foreground/30", 4, 1));
      }
    } else if (title.includes("Before/after")) {
      e.push(R(10, 14, 88, 92, "fill-foreground/10", 2));
      e.push(R(20, 20, 20, 3, "fill-foreground/30", 2));
      e.push(R(102, 14, 88, 92, "fill-foreground/5", 2));
      e.push(R(112, 20, 20, 3, "fill-[var(--accent-mint)]", 2));
    }
  } else if (cat === "Hero Sections") {
    if (title.includes("Centered text") || title.includes("screenshot")) {
      e.push(R(50, 14, 100, 6, "fill-foreground/60", 2));
      e.push(R(70, 26, 60, 3, "fill-foreground/30", 2));
      e.push(R(74, 36, 22, 6, "fill-[var(--accent-mint)]", 2), R(104, 36, 22, 6, "fill-foreground/15", 2));
      e.push(R(20, 52, 160, 56, "fill-foreground/10", 3));
    } else if (title.includes("Split")) {
      e.push(R(14, 26, 70, 6, "fill-foreground/60", 2));
      e.push(R(14, 38, 56, 3, "fill-foreground/30", 2));
      e.push(R(14, 56, 28, 9, "fill-[var(--accent-mint)]", 3));
      e.push(R(102, 14, 86, 92, "fill-foreground/10", 3));
    } else if (title.includes("Video")) {
      e.push(R(4, 4, 192, 112, "fill-foreground/15", 4));
      e.push(Pg("92,52 92,72 110,62", "fill-[var(--accent-mint)]"));
      e.push(R(50, 84, 100, 5, "fill-foreground/40", 2));
    } else if (title.includes("gradient") || title.includes("mesh")) {
      e.push(<defs key="d"><linearGradient id={`${cat}-g1`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="var(--accent-mint)" stopOpacity={0.6} /><stop offset="100%" stopColor="var(--accent-pink)" stopOpacity={0.6} /></linearGradient></defs>);
      e.push(<rect key="bg" x="4" y="4" width="192" height="112" rx="4" fill={`url(#${cat}-g1)`} />);
      e.push(R(50, 48, 100, 6, "fill-foreground/70", 2));
      e.push(R(70, 62, 60, 3, "fill-foreground/40", 2));
      e.push(R(84, 78, 32, 8, "fill-foreground/80", 3));
    } else if (title.includes("Terminal") || title.includes("code")) {
      e.push(R(14, 26, 70, 5, "fill-foreground/60", 2));
      e.push(R(14, 56, 26, 8, "fill-[var(--accent-mint)]", 3));
      e.push(R(102, 14, 86, 92, "fill-none stroke-foreground/30", 4, 1));
      e.push(C(110, 22, 1.5, "fill-foreground/40"), C(116, 22, 1.5, "fill-foreground/40"), C(122, 22, 1.5, "fill-foreground/40"));
      e.push(R(108, 32, 70, 2, "fill-foreground/15", 1), R(108, 38, 49, 2, "fill-foreground/15", 1));
      e.push(R(108, 44, 70, 2, "fill-foreground/15", 1), R(108, 50, 49, 2, "fill-foreground/15", 1), R(108, 56, 70, 2, "fill-foreground/15", 1));
    } else if (title.includes("Floating")) {
      e.push(R(60, 48, 80, 6, "fill-foreground/60", 2));
      e.push(R(84, 62, 32, 6, "fill-[var(--accent-mint)]", 2));
      e.push(<g key="g1" transform="rotate(-8 40 40)"><rect x="20" y="20" width="40" height="28" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /></g>);
      e.push(<g key="g2" transform="rotate(10 160 30)"><rect x="140" y="14" width="42" height="26" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /></g>);
      e.push(<g key="g3" transform="rotate(-6 30 90)"><rect x="14" y="78" width="42" height="28" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /></g>);
      e.push(<g key="g4" transform="rotate(8 168 96)"><rect x="146" y="82" width="42" height="26" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /></g>);
    } else if (title.includes("Big bold") || title.includes("typography")) {
      e.push(R(14, 36, 172, 18, "fill-foreground/70", 2));
      e.push(R(14, 62, 140, 18, "fill-foreground/70", 2));
      e.push(R(14, 92, 40, 6, "fill-[var(--accent-mint)]", 2));
    } else if (title.includes("inline form") || title.includes("Hero with")) {
      e.push(R(40, 26, 120, 6, "fill-foreground/60", 2));
      e.push(R(70, 40, 60, 3, "fill-foreground/30", 2));
      e.push(R(36, 56, 96, 11, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(136, 56, 32, 11, "fill-[var(--accent-mint)]", 3));
    }
  } else if (cat === "CTA Banners") {
    if (title.includes("Full-bleed") || title.includes("gradient banner")) {
      e.push(<defs key="d"><linearGradient id={`${cat}-g1`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="var(--accent-mint)" stopOpacity={0.7} /><stop offset="100%" stopColor="var(--accent-pink)" stopOpacity={0.7} /></linearGradient></defs>);
      e.push(<rect key="bg" x="10" y="28" width="180" height="64" rx="6" fill={`url(#${cat}-g1)`} />);
      e.push(R(60, 48, 80, 5, "fill-foreground/80", 2));
      e.push(R(84, 68, 32, 8, "fill-foreground/90", 3));
    } else if (title.includes("Split CTA")) {
      e.push(R(14, 36, 172, 48, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(26, 50, 80, 5, "fill-foreground/60", 2));
      e.push(R(26, 62, 60, 3, "fill-foreground/30", 2));
      e.push(R(134, 56, 42, 10, "fill-[var(--accent-mint)]", 3));
    } else if (title.includes("Sticky bottom")) {
      e.push(R(4, 92, 192, 20, "fill-foreground/10", 2));
      e.push(R(14, 100, 80, 4, "fill-foreground/40", 2));
      e.push(R(134, 98, 42, 8, "fill-[var(--accent-mint)]", 3));
      e.push(R(180, 100, 4, 4, "fill-foreground/40", 2));
    } else if (title.includes("Patterned")) {
      for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) {
        e.push(C(14 + c * 24, 14 + r * 22, 1, "fill-foreground/20"));
      }
      e.push(R(60, 44, 80, 5, "fill-foreground/60", 2));
      e.push(R(84, 62, 32, 8, "fill-[var(--accent-mint)]", 3));
    } else if (title.includes("Dual-CTA")) {
      e.push(R(50, 32, 100, 5, "fill-foreground/60", 2));
      e.push(R(70, 46, 60, 3, "fill-foreground/30", 2));
      e.push(R(56, 66, 42, 10, "fill-[var(--accent-mint)]", 3));
      e.push(R(104, 66, 42, 10, "fill-foreground/15", 3));
    } else if (title.includes("Inline email")) {
      e.push(R(50, 26, 100, 5, "fill-foreground/60", 2));
      e.push(R(70, 40, 60, 3, "fill-foreground/30", 2));
      e.push(R(36, 62, 96, 11, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(136, 62, 32, 11, "fill-[var(--accent-mint)]", 3));
    } else if (title.includes("Testimonial") || title.includes("combo")) {
      e.push(R(50, 20, 100, 3, "fill-foreground/30", 2));
      e.push(R(62, 28, 76, 3, "fill-foreground/30", 2));
      e.push(R(50, 50, 100, 5, "fill-foreground/60", 2));
      e.push(R(84, 70, 32, 9, "fill-[var(--accent-mint)]", 3));
    }
  } else if (cat === "Stats Bars") {
    if (title.includes("4-column") || title.includes("Horizontal")) {
      e.push(<g key="g1"><rect x="14" y="42" width="32" height="12" rx="2" className="fill-[var(--accent-mint)]" strokeWidth="0" /><rect x="18" y="62" width="24" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="64" y="42" width="32" height="12" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="68" y="62" width="24" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="114" y="42" width="32" height="12" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="118" y="62" width="24" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g4"><rect x="164" y="42" width="32" height="12" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="168" y="62" width="24" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
    } else if (title.includes("Animated") || title.includes("count-up")) {
      e.push(<g key="g1"><rect x="16" y="42" width="48" height="12" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="16" y="62" width="48" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="76" y="42" width="48" height="12" rx="2" className="fill-[var(--accent-mint)]" strokeWidth="0" /><rect x="76" y="62" width="48" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="136" y="42" width="48" height="12" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="136" y="62" width="48" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(R(20, 88, 4, 4, "fill-[var(--accent-mint)]", 2));
    } else if (title.includes("Icon + stat")) {
      e.push(<g key="g1"><circle cx="24" cy="50" r="8" className="fill-foreground/15" /><rect x="38" y="44" width="32" height="8" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="38" y="58" width="28" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g2"><circle cx="84" cy="50" r="8" className="fill-foreground/15" /><rect x="98" y="44" width="32" height="8" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="98" y="58" width="28" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g3"><circle cx="144" cy="50" r="8" className="fill-foreground/15" /><rect x="158" y="44" width="32" height="8" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="158" y="58" width="28" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
    } else if (title.includes("Logo bar") || title.includes("combo")) {
      e.push(R(14, 20, 28, 6, "fill-foreground/30", 2), R(50, 20, 28, 6, "fill-foreground/30", 2));
      e.push(R(86, 20, 28, 6, "fill-foreground/30", 2), R(122, 20, 28, 6, "fill-foreground/30", 2), R(158, 20, 28, 6, "fill-foreground/30", 2));
      e.push(L(14, 42, 186, 42, "stroke-foreground/15"));
      e.push(<g key="g1"><rect x="20" y="58" width="40" height="10" rx="2" className="fill-[var(--accent-mint)]" strokeWidth="0" /><rect x="20" y="74" width="36" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="80" y="58" width="40" height="10" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="80" y="74" width="36" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="140" y="58" width="40" height="10" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="140" y="74" width="36" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
    } else if (title.includes("Vertical")) {
      e.push(<g key="g1"><rect x="70" y="14" width="50" height="9" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="70" y="28" width="50" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="70" y="44" width="50" height="9" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="70" y="58" width="50" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="70" y="74" width="50" height="9" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="70" y="88" width="50" height="3" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(R(70, 104, 4, 4, "fill-[var(--accent-mint)]", 2));
    } else if (title.includes("full-bleed") || title.includes("image")) {
      e.push(<defs key="d"><linearGradient id={`${cat}-g1`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="var(--accent-mint)" stopOpacity={0.6} /><stop offset="100%" stopColor="var(--accent-pink)" stopOpacity={0.6} /></linearGradient></defs>);
      e.push(<rect key="bg" x="4" y="4" width="192" height="112" rx="4" fill={`url(#${cat}-g1)`} />);
      e.push(<g key="g1"><rect x="20" y="48" width="40" height="12" rx="2" className="fill-foreground/80" strokeWidth="0" /><rect x="20" y="66" width="36" height="3" rx="2" className="fill-foreground/50" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="80" y="48" width="40" height="12" rx="2" className="fill-foreground/80" strokeWidth="0" /><rect x="80" y="66" width="36" height="3" rx="2" className="fill-foreground/50" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="140" y="48" width="40" height="12" rx="2" className="fill-foreground/80" strokeWidth="0" /><rect x="140" y="66" width="36" height="3" rx="2" className="fill-foreground/50" strokeWidth="0" /></g>);
    } else if (title.includes("Card-based")) {
      e.push(R(8, 22, 56, 76, "fill-foreground/5", 4));
      e.push(R(72, 22, 56, 76, "fill-foreground/5", 4));
      e.push(R(136, 22, 56, 76, "fill-foreground/5", 4));
      e.push(R(28, 50, 16, 12, "fill-[var(--accent-mint)]", 3));
      e.push(R(92, 50, 16, 12, "fill-[var(--accent-mint)]", 3));
      e.push(R(156, 50, 16, 12, "fill-[var(--accent-mint)]", 3));
    }
  } else if (cat === "Nav Bars") {
    if (title.includes("Minimal") || title.includes("logo + links")) {
      e.push(R(14, 50, 28, 8, "fill-foreground/60", 2));
      e.push(R(80, 52, 20, 4, "fill-foreground/40", 2), R(110, 52, 20, 4, "fill-foreground/40", 2), R(140, 52, 20, 4, "fill-foreground/40", 2));
      e.push(R(170, 50, 20, 8, "fill-[var(--accent-mint)]", 3));
    } else if (title.includes("Centered logo")) {
      e.push(R(14, 52, 22, 4, "fill-foreground/40", 2), R(44, 52, 22, 4, "fill-foreground/40", 2), R(74, 52, 22, 4, "fill-foreground/40", 2));
      e.push(R(88, 48, 24, 12, "fill-foreground/60", 2));
      e.push(R(120, 52, 18, 4, "fill-foreground/40", 2), R(150, 52, 18, 4, "fill-foreground/40", 2), R(168, 52, 18, 4, "fill-foreground/40", 2));
    } else if (title.includes("Mega menu")) {
      e.push(R(14, 20, 28, 6, "fill-foreground/60", 2));
      e.push(R(80, 22, 20, 4, "fill-[var(--accent-mint)]", 2), R(110, 22, 20, 4, "fill-foreground/40", 2), R(140, 22, 20, 4, "fill-foreground/40", 2));
      e.push(R(4, 36, 192, 70, "fill-none stroke-foreground/30", 4, 1));
      e.push(<g key="g1"><rect x="14" y="48" width="36" height="4" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="14" y="58" width="36" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="14" y="64" width="25.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="14" y="70" width="36" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="64" y="48" width="36" height="4" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="64" y="58" width="36" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="64" y="64" width="25.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="64" y="70" width="36" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="114" y="48" width="36" height="4" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="114" y="58" width="36" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="114" y="64" width="25.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="114" y="70" width="36" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g4"><rect x="164" y="48" width="36" height="4" rx="2" className="fill-foreground/60" strokeWidth="0" /><rect x="164" y="58" width="36" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="164" y="64" width="25.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="164" y="70" width="36" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
    } else if (title.includes("Sidebar")) {
      e.push(R(4, 4, 50, 112, "fill-foreground/8", 2));
      e.push(R(14, 14, 28, 6, "fill-foreground/60", 2));
      e.push(R(14, 34, 28, 4, "fill-foreground/40", 2));
      e.push(R(14, 46, 28, 4, "fill-[var(--accent-mint)]", 2));
      e.push(R(14, 58, 28, 4, "fill-foreground/40", 2));
      e.push(R(14, 70, 28, 4, "fill-foreground/40", 2));
      e.push(C(20, 104, 5, "fill-foreground/30"));
    } else if (title.includes("Floating pill")) {
      e.push(R(40, 20, 120, 20, "fill-none stroke-[var(--accent-mint)]", 10, 1.5));
      e.push(R(56, 28, 20, 4, "fill-foreground/40", 2), R(90, 28, 20, 4, "fill-foreground/40", 2), R(124, 28, 20, 4, "fill-foreground/40", 2));
    } else if (title.includes("Transparent")) {
      e.push(R(4, 20, 192, 84, "fill-foreground/10", 3));
      e.push(R(14, 36, 28, 6, "fill-foreground/60", 2));
      e.push(R(80, 38, 20, 4, "fill-foreground/40", 2), R(110, 38, 20, 4, "fill-foreground/40", 2), R(140, 38, 20, 4, "fill-foreground/40", 2));
      e.push(R(170, 36, 20, 8, "fill-[var(--accent-mint)]", 3));
    } else if (title.includes("Command-palette")) {
      e.push(R(14, 50, 20, 8, "fill-foreground/60", 2));
      e.push(R(50, 48, 100, 12, "fill-none stroke-[var(--accent-mint)]", 3, 1.5));
      e.push(R(56, 52, 50, 4, "fill-foreground/30", 2));
      e.push(R(132, 51, 14, 6, "fill-foreground/15", 2));
      e.push(R(170, 50, 20, 8, "fill-foreground/15", 3));
    } else if (title.includes("Bottom mobile")) {
      e.push(R(4, 94, 192, 22, "fill-foreground/10", 2));
      e.push(<g key="g1"><circle cx="22" cy="102" r="3" className="fill-foreground/40" /><rect x="14" y="108" width="18" height="2" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g2"><circle cx="62" cy="102" r="3" className="fill-foreground/40" /><rect x="54" y="108" width="18" height="2" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g3"><circle cx="102" cy="102" r="3" className="fill-[var(--accent-mint)]" /><rect x="94" y="108" width="18" height="2" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g4"><circle cx="142" cy="102" r="3" className="fill-foreground/40" /><rect x="134" y="108" width="18" height="2" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
      e.push(<g key="g5"><circle cx="182" cy="102" r="3" className="fill-foreground/40" /><rect x="174" y="108" width="18" height="2" rx="2" className="fill-foreground/30" strokeWidth="0" /></g>);
    }
  } else if (cat === "Testimonials") {
    if (title.includes("3-column") || title.includes("quote")) {
      e.push(<g key="g1"><rect x="10" y="20" width="60" height="80" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><circle cx="24" cy="34" r="5" className="fill-foreground/30" /><rect x="34" y="32" width="28" height="3" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="18" y="50" width="44" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="18" y="56" width="30.8" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="18" y="62" width="44" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="18" y="68" width="30.8" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="70" y="20" width="60" height="80" rx="4" className="fill-none stroke-[var(--accent-mint)]" strokeWidth="1" /><circle cx="84" cy="34" r="5" className="fill-foreground/30" /><rect x="94" y="32" width="28" height="3" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="78" y="50" width="44" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="78" y="56" width="30.8" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="78" y="62" width="44" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="78" y="68" width="30.8" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="130" y="20" width="60" height="80" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><circle cx="144" cy="34" r="5" className="fill-foreground/30" /><rect x="154" y="32" width="28" height="3" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="138" y="50" width="44" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="138" y="56" width="30.8" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="138" y="62" width="44" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="138" y="68" width="30.8" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
    } else if (title.includes("Marquee")) {
      e.push(R(-10, 30, 50, 60, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 30, 50, 60, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(110, 30, 50, 60, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(170, 30, 50, 60, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(230, 30, 50, 60, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(4, 30, 20, 60, "fill-background", 2));
      e.push(R(176, 30, 20, 60, "fill-background", 2));
    } else if (title.includes("Masonry")) {
      e.push(R(10, 10, 56, 50, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(10, 66, 56, 44, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(72, 10, 56, 44, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(72, 60, 56, 50, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(134, 10, 56, 60, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(134, 76, 56, 34, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Single featured")) {
      e.push(R(20, 20, 160, 80, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(C(36, 40, 8, "fill-foreground/30"));
      e.push(R(50, 36, 40, 4, "fill-foreground/40", 2));
      e.push(R(50, 44, 32, 3, "fill-foreground/30", 2));
      e.push(R(32, 62, 130, 2, "fill-foreground/15", 1), R(32, 68, 91, 2, "fill-foreground/15", 1), R(32, 74, 130, 2, "fill-foreground/15", 1));
    } else if (title.includes("Video")) {
      e.push(<g key="g1"><rect x="10" y="20" width="60" height="50" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><polygon points="36,36 36,54 48,45" className="fill-[var(--accent-mint)]" /><rect x="16" y="78" width="44" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="70" y="20" width="60" height="50" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><polygon points="96,36 96,54 108,45" className="fill-[var(--accent-mint)]" /><rect x="76" y="78" width="44" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="130" y="20" width="60" height="50" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><polygon points="156,36 156,54 168,45" className="fill-[var(--accent-mint)]" /><rect x="136" y="78" width="44" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
    } else if (title.includes("Tweet")) {
      e.push(<g key="g1"><rect x="14" y="14" width="82" height="42" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><circle cx="22" cy="22" r="3" className="fill-foreground/30" /><rect x="30" y="20" width="24" height="3" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="20" y="32" width="70" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="20" y="38" width="49" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="14" y="64" width="82" height="42" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><circle cx="22" cy="72" r="3" className="fill-foreground/30" /><rect x="30" y="70" width="24" height="3" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="20" y="82" width="70" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="20" y="88" width="49" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="104" y="14" width="82" height="42" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><circle cx="112" cy="22" r="3" className="fill-foreground/30" /><rect x="120" y="20" width="24" height="3" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="110" y="32" width="70" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="110" y="38" width="49" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g4"><rect x="104" y="64" width="82" height="42" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><circle cx="112" cy="72" r="3" className="fill-foreground/30" /><rect x="120" y="70" width="24" height="3" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="110" y="82" width="70" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="110" y="88" width="49" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
    } else if (title.includes("Logo cloud")) {
      e.push(R(70, 20, 60, 4, "fill-foreground/40", 2));
      e.push(R(20, 42, 30, 16, "fill-foreground/15", 3), R(20, 74, 30, 16, "fill-foreground/15", 3));
      e.push(R(62, 42, 30, 16, "fill-[var(--accent-mint)]", 3), R(62, 74, 30, 16, "fill-foreground/15", 3));
      e.push(R(104, 42, 30, 16, "fill-foreground/15", 3), R(104, 74, 30, 16, "fill-foreground/15", 3));
      e.push(R(146, 42, 30, 16, "fill-foreground/15", 3), R(146, 74, 30, 16, "fill-foreground/15", 3));
    } else if (title.includes("Carousel")) {
      e.push(R(30, 20, 140, 70, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(48, 36, 104, 2, "fill-foreground/15", 1), R(48, 42, 72.8, 2, "fill-foreground/15", 1));
      e.push(R(48, 48, 104, 2, "fill-foreground/15", 1), R(48, 54, 72.8, 2, "fill-foreground/15", 1));
      e.push(C(86, 102, 2, "fill-foreground/30"), C(96, 102, 2, "fill-[var(--accent-mint)]"), C(106, 102, 2, "fill-foreground/30"), C(116, 102, 2, "fill-foreground/30"));
    }
  } else if (cat === "Footer") {
    if (title.includes("Multi-column") || title.includes("sitemap")) {
      e.push(R(14, 20, 28, 6, "fill-foreground/60", 2));
      e.push(R(14, 32, 40, 3, "fill-foreground/30", 2));
      e.push(<g key="g1"><rect x="80" y="20" width="24" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="80" y="30" width="26" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="80" y="36" width="18.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="80" y="42" width="26" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="80" y="48" width="18.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="116" y="20" width="24" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="116" y="30" width="26" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="116" y="36" width="18.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="116" y="42" width="26" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="116" y="48" width="18.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="152" y="20" width="24" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="152" y="30" width="26" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="152" y="36" width="18.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="152" y="42" width="26" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /><rect x="152" y="48" width="18.2" height="2" rx="2" className="fill-foreground/15" strokeWidth="0" /></g>);
      e.push(L(14, 94, 186, 94, "stroke-foreground/15"));
      e.push(R(14, 102, 50, 3, "fill-foreground/30", 2));
    } else if (title.includes("Minimal")) {
      e.push(R(4, 4, 192, 16, "fill-foreground/10", 2));
      e.push(R(14, 9, 20, 6, "fill-[var(--accent-mint)]", 2));
      e.push(R(60, 11, 16, 3, "fill-foreground/40", 2), R(84, 11, 16, 3, "fill-foreground/40", 2), R(108, 11, 16, 3, "fill-foreground/40", 2));
      e.push(R(10, 28, 88, 40, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(102, 28, 88, 40, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(10, 74, 180, 36, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Giant logo")) {
      e.push(R(14, 28, 172, 32, "fill-[var(--accent-mint)]", 2));
      e.push(R(14, 80, 20, 3, "fill-foreground/40", 2), R(54, 80, 20, 3, "fill-foreground/40", 2));
      e.push(R(94, 80, 20, 3, "fill-foreground/40", 2), R(134, 80, 20, 3, "fill-foreground/40", 2), R(174, 80, 20, 3, "fill-foreground/40", 2));
      e.push(R(70, 100, 60, 2, "fill-foreground/30", 2));
    } else if (title.includes("Newsletter")) {
      e.push(R(50, 20, 100, 6, "fill-foreground/60", 2));
      e.push(R(36, 36, 96, 11, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(136, 36, 32, 11, "fill-[var(--accent-mint)]", 3));
      e.push(R(14, 86, 18, 3, "fill-foreground/40", 2), R(54, 86, 18, 3, "fill-foreground/40", 2));
      e.push(R(94, 86, 18, 3, "fill-foreground/40", 2), R(134, 86, 18, 3, "fill-foreground/40", 2), R(174, 86, 18, 3, "fill-foreground/40", 2));
    } else if (title.includes("Status")) {
      e.push(R(8, 80, 184, 32, "fill-foreground/5", 4));
      e.push(C(22, 92, 4, "fill-[#22c55e]"));
      e.push(R(108, 88, 18, 3, "fill-foreground/15", 1), R(132, 88, 18, 3, "fill-foreground/15", 1), R(156, 88, 18, 3, "fill-foreground/15", 1));
    }
  } else if (cat === "FAQ") {
    if (title.includes("Accordion single")) {
      e.push(R(20, 14, 160, 12, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 30, 160, 12, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 46, 160, 16, "fill-none stroke-[var(--accent-mint)]", 4, 1));
      e.push(R(20, 64, 160, 12, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 84, 160, 12, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 100, 160, 12, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Two-column")) {
      e.push(R(14, 14, 84, 16, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(14, 36, 84, 16, "fill-none stroke-[var(--accent-mint)]", 4, 1));
      e.push(R(14, 58, 84, 16, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(14, 80, 84, 16, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(102, 14, 84, 16, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(102, 36, 84, 16, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(102, 58, 84, 16, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(102, 80, 84, 16, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Chat-bubble")) {
      e.push(R(14, 20, 80, 14, "fill-foreground/15", 5));
      e.push(R(106, 42, 80, 14, "fill-[var(--accent-mint)]", 5));
      e.push(R(14, 64, 80, 14, "fill-foreground/15", 5));
      e.push(R(106, 86, 80, 14, "fill-[var(--accent-mint)]", 5));
    } else if (title.includes("Searchable")) {
      e.push(R(30, 14, 140, 12, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(C(40, 20, 3, "fill-foreground/40"));
      e.push(R(20, 34, 160, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 50, 160, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 66, 160, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 82, 160, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 98, 160, 10, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Categorized")) {
      e.push(R(20, 14, 36, 8, "fill-foreground/15", 3));
      e.push(R(60, 14, 36, 8, "fill-[var(--accent-mint)]", 3));
      e.push(R(100, 14, 36, 8, "fill-foreground/15", 3));
      e.push(R(140, 14, 36, 8, "fill-foreground/15", 3));
      e.push(R(20, 34, 160, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 50, 160, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 66, 160, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 82, 160, 10, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 98, 160, 10, "fill-none stroke-foreground/30", 4, 1));
    }
  } else if (cat === "Dashboards") {
    if (title.includes("Sidebar + main")) {
      e.push(R(4, 4, 50, 112, "fill-foreground/8", 2));
      e.push(R(12, 14, 34, 6, "fill-foreground/15", 2));
      e.push(R(12, 26, 34, 6, "fill-[var(--accent-mint)]", 2));
      e.push(R(12, 38, 34, 6, "fill-foreground/15", 2));
      e.push(R(12, 50, 34, 6, "fill-foreground/15", 2));
      e.push(R(62, 14, 56, 36, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(124, 14, 66, 36, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(62, 58, 128, 48, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Top nav")) {
      e.push(R(4, 4, 192, 16, "fill-foreground/10", 2));
      e.push(R(14, 9, 20, 6, "fill-[var(--accent-mint)]", 2));
      e.push(R(60, 11, 16, 3, "fill-foreground/40", 2), R(84, 11, 16, 3, "fill-foreground/40", 2), R(108, 11, 16, 3, "fill-foreground/40", 2));
      e.push(R(10, 28, 88, 40, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(102, 28, 88, 40, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(10, 74, 180, 36, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Three-pane")) {
      e.push(R(4, 4, 36, 112, "fill-foreground/8", 2));
      e.push(R(44, 4, 70, 112, "fill-foreground/5", 2));
      e.push(R(50, 12, 58, 12, "fill-foreground/15", 2));
      e.push(R(50, 30, 58, 12, "fill-[var(--accent-mint)]", 2));
      e.push(R(50, 48, 58, 12, "fill-foreground/15", 2));
      e.push(R(50, 66, 58, 12, "fill-foreground/15", 2));
      e.push(R(50, 84, 58, 12, "fill-foreground/15", 2));
      e.push(R(120, 10, 72, 100, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Kanban")) {
      e.push(<g key="g1"><rect x="10" y="10" width="60" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="10" y="20" width="60" height="20" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><rect x="10" y="44" width="60" height="20" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><rect x="10" y="68" width="60" height="20" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /></g>);
      e.push(<g key="g2"><rect x="70" y="10" width="60" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="70" y="20" width="60" height="20" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><rect x="70" y="44" width="60" height="20" rx="4" className="fill-none stroke-[var(--accent-mint)]" strokeWidth="1.5" /><rect x="70" y="68" width="60" height="20" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /></g>);
      e.push(<g key="g3"><rect x="130" y="10" width="60" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /><rect x="130" y="20" width="60" height="20" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><rect x="130" y="44" width="60" height="20" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><rect x="130" y="68" width="60" height="20" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /></g>);
    } else if (title.includes("Metric cards")) {
      e.push(R(10, 10, 40, 36, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(60, 10, 40, 36, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(110, 10, 40, 36, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(160, 10, 40, 36, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(10, 54, 180, 56, "fill-none stroke-foreground/30", 4, 1));
      e.push(<polyline key="ch" points="20,90 50,70 80,80 110,60 140,72 180,58" fill="none" stroke="var(--accent-mint)" strokeWidth="1.5" />);
    } else if (title.includes("Empty state")) {
      e.push(C(100, 48, 16, "fill-foreground/10"));
      e.push(R(70, 74, 60, 5, "fill-foreground/40", 2));
      e.push(R(84, 92, 32, 9, "fill-[var(--accent-mint)]", 3));
    }
  } else if (cat === "Onboarding") {
    if (title.includes("Checklist")) {
      e.push(<g key="g1"><circle cx="26" cy="20" r="4" className="fill-[var(--accent-mint)]" /><rect x="36" y="18" width="140" height="5" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
      e.push(<g key="g2"><circle cx="26" cy="38" r="4" className="fill-[var(--accent-mint)]" /><rect x="36" y="36" width="140" height="5" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
      e.push(<g key="g3"><circle cx="26" cy="56" r="4" className="fill-foreground/15" /><rect x="36" y="54" width="140" height="5" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
      e.push(<g key="g4"><circle cx="26" cy="74" r="4" className="fill-foreground/15" /><rect x="36" y="72" width="140" height="5" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
      e.push(<g key="g5"><circle cx="26" cy="92" r="4" className="fill-foreground/15" /><rect x="36" y="90" width="140" height="5" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
    } else if (title.includes("Tour")) {
      e.push(R(10, 10, 180, 100, "fill-none stroke-foreground/15", 4, 1));
      e.push(C(60, 50, 4, "fill-[var(--accent-mint)]"));
      e.push(R(70, 32, 70, 28, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(76, 40, 58, 2, "fill-foreground/15", 1), R(76, 46, 40.6, 2, "fill-foreground/15", 1));
    } else if (title.includes("Video") && cat === "Onboarding") {
      e.push(R(4, 4, 192, 112, "fill-foreground/8", 2));
      e.push(R(30, 20, 140, 80, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(30, 20, 140, 56, "fill-foreground/15", 2));
      e.push(Pg("92,42 92,58 108,50", "fill-[var(--accent-mint)]"));
      e.push(R(120, 84, 40, 8, "fill-[var(--accent-mint)]", 3));
    } else if (title.includes("Illustrated")) {
      e.push(C(100, 42, 14, "fill-foreground/10"));
      e.push(R(70, 66, 60, 5, "fill-foreground/40", 2));
      e.push(R(64, 78, 72, 3, "fill-foreground/30", 2));
      e.push(R(84, 94, 32, 9, "fill-[var(--accent-mint)]", 3));
    }
  } else if (cat === "Blog / Content") {
    if (title.includes("Magazine")) {
      e.push(R(10, 10, 180, 50, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(10, 66, 56, 44, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(72, 66, 56, 44, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(134, 66, 56, 44, "fill-none stroke-foreground/30", 4, 1));
    } else if (title.includes("Single column") || title.includes("reading")) {
      e.push(R(50, 14, 100, 6, "fill-foreground/60", 2));
      e.push(R(50, 28, 100, 2, "fill-foreground/20", 1), R(50, 36, 100, 2, "fill-foreground/20", 1), R(50, 44, 70, 2, "fill-foreground/20", 1));
      e.push(R(50, 52, 100, 2, "fill-foreground/20", 1), R(50, 60, 100, 2, "fill-foreground/20", 1), R(50, 68, 70, 2, "fill-foreground/20", 1));
      e.push(R(50, 76, 100, 2, "fill-foreground/20", 1), R(50, 84, 100, 2, "fill-foreground/20", 1), R(50, 92, 70, 2, "fill-foreground/20", 1));
      e.push(R(50, 100, 100, 2, "fill-foreground/20", 1));
    } else if (title.includes("Sidebar TOC")) {
      e.push(R(10, 14, 50, 4, "fill-foreground/40", 2));
      e.push(R(14, 26, 42, 3, "fill-foreground/25", 2), R(14, 38, 42, 3, "fill-[var(--accent-mint)]", 2));
      e.push(R(14, 50, 42, 3, "fill-foreground/25", 2), R(14, 62, 42, 3, "fill-foreground/25", 2));
      e.push(R(68, 14, 118, 2, "fill-foreground/20", 1), R(68, 22, 118, 2, "fill-foreground/20", 1), R(68, 30, 80, 2, "fill-foreground/20", 1));
      e.push(R(68, 38, 118, 2, "fill-foreground/20", 1), R(68, 46, 118, 2, "fill-foreground/20", 1), R(68, 54, 80, 2, "fill-foreground/20", 1));
      e.push(R(68, 62, 118, 2, "fill-foreground/20", 1), R(68, 70, 118, 2, "fill-foreground/20", 1), R(68, 78, 80, 2, "fill-foreground/20", 1));
      e.push(R(68, 86, 118, 2, "fill-foreground/20", 1), R(68, 94, 118, 2, "fill-foreground/20", 1), R(68, 102, 80, 2, "fill-foreground/20", 1));
    } else if (title.includes("Card grid") || title.includes("filters")) {
      e.push(R(14, 14, 20, 6, "fill-foreground/15", 3), R(38, 14, 20, 6, "fill-[var(--accent-mint)]", 3));
      e.push(R(62, 14, 20, 6, "fill-foreground/15", 3), R(86, 14, 20, 6, "fill-foreground/15", 3));
      e.push(R(10, 28, 56, 36, "fill-none stroke-foreground/30", 4, 1), R(10, 70, 56, 36, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(72, 28, 56, 36, "fill-none stroke-foreground/30", 4, 1), R(72, 70, 56, 36, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(134, 28, 56, 36, "fill-none stroke-foreground/30", 4, 1), R(134, 70, 56, 36, "fill-none stroke-foreground/30", 4, 1));
    }
  } else if (cat === "Contact") {
    if (title.includes("Split form")) {
      e.push(R(10, 14, 88, 92, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 26, 68, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 40, 68, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 54, 68, 28, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(20, 88, 68, 9, "fill-[var(--accent-mint)]", 3));
      e.push(R(108, 26, 70, 4, "fill-foreground/40", 2));
      e.push(R(108, 44, 70, 4, "fill-foreground/40", 2));
      e.push(R(108, 62, 70, 4, "fill-foreground/40", 2));
      e.push(R(108, 80, 70, 4, "fill-foreground/40", 2));
    } else if (title.includes("Support channel")) {
      e.push(<g key="g1"><rect x="14" y="14" width="82" height="42" rx="4" className="fill-none stroke-[var(--accent-mint)]" strokeWidth="1.5" /><circle cx="28" cy="30" r="5" className="fill-foreground/30" /><rect x="42" y="28" width="36" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
      e.push(<g key="g2"><rect x="104" y="14" width="82" height="42" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><circle cx="118" cy="30" r="5" className="fill-foreground/30" /><rect x="132" y="28" width="36" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
      e.push(<g key="g3"><rect x="14" y="64" width="82" height="42" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><circle cx="28" cy="80" r="5" className="fill-foreground/30" /><rect x="42" y="78" width="36" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
      e.push(<g key="g4"><rect x="104" y="64" width="82" height="42" rx="4" className="fill-none stroke-foreground/30" strokeWidth="1" /><circle cx="118" cy="80" r="5" className="fill-foreground/30" /><rect x="132" y="78" width="36" height="4" rx="2" className="fill-foreground/40" strokeWidth="0" /></g>);
    } else if (title.includes("Full-page") || title.includes("minimal form")) {
      e.push(R(70, 18, 60, 5, "fill-foreground/60", 2));
      e.push(R(50, 34, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 48, 100, 9, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 62, 100, 26, "fill-none stroke-foreground/30", 4, 1));
      e.push(R(50, 94, 100, 9, "fill-[var(--accent-mint)]", 3));
    }
  } else if (cat === "Bonus") {
    if (title.includes("Comparison table") && title.includes("us vs")) {
      e.push(R(10, 14, 45, 8, "fill-foreground/10", 2), R(55, 14, 45, 8, "fill-[var(--accent-mint)]", 2));
      e.push(R(100, 14, 45, 8, "fill-foreground/10", 2), R(145, 14, 45, 8, "fill-foreground/10", 2));
      e.push(L(10, 28, 190, 28, "stroke-foreground/15"), L(10, 42, 190, 42, "stroke-foreground/15"), L(10, 56, 190, 56, "stroke-foreground/15"));
      e.push(L(10, 70, 190, 70, "stroke-foreground/15"), L(10, 84, 190, 84, "stroke-foreground/15"), L(10, 98, 190, 98, "stroke-foreground/15"));
    } else if (title.includes("Feature announcement")) {
      e.push(R(4, 4, 192, 16, "fill-[var(--accent-mint)]", 2));
      e.push(R(14, 9, 14, 6, "fill-foreground/70", 3));
      e.push(R(34, 10, 80, 4, "fill-foreground/60", 2));
      e.push(R(120, 10, 30, 4, "fill-foreground/40", 2));
      e.push(R(184, 9, 6, 6, "fill-foreground/60", 2));
      e.push(R(10, 28, 180, 80, "fill-none stroke-foreground/15", 4, 1));
    } else if (title.includes("Cookie banner")) {
      e.push(R(6, 70, 130, 44, "fill-none stroke-[var(--accent-mint)]", 4, 1.5));
      e.push(R(14, 78, 100, 2, "fill-foreground/15", 1), R(14, 84, 70, 2, "fill-foreground/15", 1));
      e.push(R(14, 94, 28, 8, "fill-[var(--accent-mint)]", 3));
      e.push(R(46, 94, 28, 8, "fill-foreground/15", 3));
      e.push(R(78, 96, 36, 3, "fill-foreground/30", 2));
    } else if (title.includes("404 page")) {
      e.push(R(56, 20, 88, 26, "fill-foreground/60", 2));
      e.push(R(70, 56, 60, 4, "fill-foreground/40", 2));
      e.push(R(64, 68, 72, 3, "fill-foreground/30", 2));
      e.push(R(64, 88, 32, 9, "fill-[var(--accent-mint)]", 3));
      e.push(R(104, 88, 32, 9, "fill-foreground/15", 3));
    } else if (title.includes("Loading state")) {
      e.push(R(14, 14, 60, 6, "fill-foreground/15", 2));
      e.push(R(14, 26, 172, 4, "fill-foreground/10", 2));
      e.push(R(14, 36, 140, 4, "fill-foreground/10", 2));
      e.push(R(14, 50, 84, 50, "fill-foreground/10", 2));
      e.push(R(104, 50, 84, 20, "fill-foreground/10", 2));
      e.push(R(104, 76, 84, 24, "fill-foreground/10", 2));
    } else if (title.includes("Comparison table")) {
      e.push(R(10, 14, 180, 8, "fill-foreground/10", 2));
      e.push(L(10, 28, 190, 28, "stroke-foreground/15"), L(10, 42, 190, 42, "stroke-foreground/15"), L(10, 56, 190, 56, "stroke-foreground/15"));
      e.push(L(10, 70, 190, 70, "stroke-foreground/15"), L(10, 84, 190, 84, "stroke-foreground/15"), L(10, 98, 190, 98, "stroke-foreground/15"));
      e.push(L(55, 14, 55, 106, "stroke-foreground/15"), L(100, 14, 100, 106, "stroke-foreground/15"), L(145, 14, 145, 106, "stroke-foreground/15"));
      e.push(R(102, 14, 42, 8, "fill-[var(--accent-mint)]", 2));
    }
  }

  if (e.length === 0) {
    e.push(C(100, 60, 20, "fill-foreground/10"));
    e.push(R(70, 50, 60, 20, "fill-[var(--accent-mint)]", 4));
  }

  return e;
}
