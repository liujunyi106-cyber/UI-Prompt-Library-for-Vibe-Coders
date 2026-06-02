"use client";

import React from "react";

interface CardPreviewProps {
  category: string;
  title: string;
  isDark?: boolean;
}

export function CardPreview({ category, title, isDark = false }: CardPreviewProps) {
  const id = `${category}-${title}`.replace(/\s+/g, "-").toLowerCase();

  const bg = isDark ? "#292524" : "#fff7ed";
  const fg5 = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const fg10 = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const fg15 = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const fg25 = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)";
  const fg30 = isDark ? "rgba(255,255,255,0.30)" : "rgba(0,0,0,0.30)";
  const fg40 = isDark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.40)";
  const accent = "#fb923c";
  const accentFill = isDark ? "#ea7e1a" : "#fb923c";
  const border = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  const R = (x: number, y: number, w: number, h: number, fill: string, rx = 3, sw = 0, stroke?: string) => (
    <rect key={`${id}-${x}-${y}-${w}`} x={x} y={y} width={w} height={h} fill={fill} rx={rx} stroke={stroke || "none"} strokeWidth={sw} />
  );
  const C = (cx: number, cy: number, r: number, fill: string) => (
    <circle key={`${id}-c-${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} />
  );
  const L = (x1: number, y1: number, x2: number, y2: number, stroke?: string, sw = 0.5) => (
    <line key={`${id}-l-${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke || fg30} strokeWidth={sw} />
  );
  const Pg = (points: string, fill: string) => (
    <polygon key={`${id}-pg-${points.slice(0,10)}`} points={points} fill={fill} />
  );

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="0.5" y="0.5" width="199" height="119" rx="6" fill={bg} stroke={border} />
      {render(category, title, R, C, L, Pg, fg5, fg10, fg15, fg25, fg30, fg40, accent, accentFill, border)}
    </svg>
  );
}

type RFn = (x: number, y: number, w: number, h: number, fill: string, rx?: number, sw?: number, stroke?: string) => React.ReactNode;
type CFn = (cx: number, cy: number, r: number, fill: string) => React.ReactNode;
type LFn = (x1: number, y1: number, x2: number, y2: number, stroke?: string, sw?: number) => React.ReactNode;
type PFn = (points: string, fill: string) => React.ReactNode;

function render(
  cat: string, title: string,
  R: RFn, C: CFn, L: LFn, Pg: PFn,
  fg5: string, fg10: string, fg15: string, fg25: string, fg30: string, fg40: string,
  accent: string, accentFill: string, border: string
): React.ReactNode[] {
  const e: React.ReactNode[] = [];

  if (cat === "Auth Forms") {
    if (title.includes("Split-screen")) {
      e.push(R(8, 8, 88, 104, fg5, 4));
      e.push(R(20, 28, 50, 3, fg40, 2));
      e.push(R(20, 42, 64, 10, "none", 4, 1, fg30));
      e.push(R(20, 56, 64, 10, "none", 4, 1, fg30));
      e.push(R(20, 74, 64, 10, accentFill, 3));
      e.push(R(104, 8, 88, 104, fg10, 4));
      e.push(C(148, 60, 18, fg15));
    } else if (title.includes("Centered card")) {
      e.push(R(4, 4, 192, 112, fg5, 4));
      e.push(R(50, 20, 100, 84, "none", 4, 1, fg40));
      e.push(R(70, 32, 60, 3, fg40, 2));
      e.push(R(62, 44, 76, 9, "none", 4, 1, fg30));
      e.push(R(62, 58, 76, 9, "none", 4, 1, fg30));
      e.push(R(62, 74, 76, 9, accentFill, 3));
    } else if (title.includes("Minimal")) {
      e.push(C(100, 20, 5, fg40));
      e.push(R(70, 34, 60, 4, fg40, 2));
      e.push(R(50, 48, 100, 9, "none", 4, 1, fg30));
      e.push(R(50, 62, 100, 9, "none", 4, 1, fg30));
      e.push(R(50, 78, 100, 9, accentFill, 3));
    } else if (title.includes("Social")) {
      e.push(R(50, 14, 100, 9, "none", 4, 1, fg30));
      e.push(R(50, 28, 100, 9, "none", 4, 1, fg30));
      e.push(R(50, 42, 100, 9, "none", 4, 1, fg30));
      e.push(L(56, 62, 92, 62, fg40), R(96, 60, 8, 4, fg25, 2));
      e.push(R(50, 72, 100, 9, "none", 4, 1, fg30));
    } else if (title.includes("Magic link")) {
      e.push(R(70, 34, 60, 4, fg40, 2));
      e.push(R(40, 50, 120, 11, "none", 4, 1, fg30));
      e.push(R(40, 68, 120, 11, accentFill, 3));
      e.push(R(62, 88, 76, 2, fg25, 2), R(72, 94, 56, 2, fg25, 2));
    } else if (title.includes("Multi-step")) {
      e.push(R(40, 20, 40, 3, accentFill, 2));
      e.push(R(82, 20, 40, 3, fg15, 2));
      e.push(R(124, 20, 36, 3, fg15, 2));
      e.push(R(70, 36, 60, 3, fg40, 2));
      e.push(R(50, 48, 100, 9, "none", 4, 1, fg30));
      e.push(R(50, 62, 100, 9, "none", 4, 1, fg30));
      e.push(R(50, 78, 46, 9, fg10, 3));
      e.push(R(104, 78, 46, 9, accentFill, 3));
    }
  } else if (cat === "Pricing") {
    if (title.includes("3-tier") || title.includes("Classic")) {
      e.push(R(8, 12, 56, 96, fg5, 4));
      e.push(R(72, 8, 56, 104, "none", 4, 1.5, accent));
      e.push(R(136, 12, 56, 96, fg5, 4));
      e.push(R(16, 24, 40, 3, fg40, 2), R(16, 34, 40, 8, accentFill, 3));
      e.push(R(16, 48, 40, 2, fg25, 1), R(16, 54, 40, 2, fg25, 1), R(16, 60, 40, 2, fg25, 1));
      e.push(R(16, 72, 40, 10, accentFill, 3));
      e.push(R(80, 20, 40, 3, fg40, 2), R(80, 30, 40, 8, accentFill, 3));
      e.push(R(80, 44, 40, 2, fg25, 1), R(80, 50, 40, 2, fg25, 1), R(80, 56, 40, 2, fg25, 1));
      e.push(R(80, 68, 40, 10, accentFill, 3));
      e.push(R(144, 24, 40, 3, fg40, 2), R(144, 34, 40, 8, accentFill, 3));
      e.push(R(144, 48, 40, 2, fg25, 1), R(144, 54, 40, 2, fg25, 1), R(144, 60, 40, 2, fg25, 1));
      e.push(R(144, 72, 40, 10, accentFill, 3));
    } else if (title.includes("Monthly") || title.includes("toggle")) {
      e.push(R(60, 15, 80, 16, "none", 10, 1, fg30));
      e.push(C(80, 23, 6, accentFill), C(120, 23, 6, fg15));
      e.push(R(140, 18, 20, 10, fg10, 4));
      e.push(R(20, 45, 72, 60, fg5, 4));
      e.push(R(108, 45, 72, 60, fg5, 4));
      e.push(R(32, 58, 48, 3, fg25, 1), R(32, 66, 48, 6, accentFill, 2));
      e.push(R(120, 58, 48, 3, fg25, 1), R(120, 66, 48, 6, accentFill, 2));
    } else if (title.includes("Comparison")) {
      e.push(R(8, 8, 184, 104, fg5, 4));
      e.push(L(68, 8, 68, 112, fg15), L(132, 8, 132, 112, fg15), L(8, 38, 192, 38, fg15));
      e.push(R(14, 14, 50, 6, fg25, 2), R(76, 14, 50, 6, accentFill, 2), R(138, 14, 50, 6, accentFill, 2));
      e.push(R(14, 48, 50, 3, fg15, 1), C(92, 50, 3, accentFill), C(154, 50, 3, fg15));
      e.push(R(14, 60, 50, 3, fg15, 1), C(92, 62, 3, accentFill), C(154, 62, 3, accentFill));
      e.push(R(14, 72, 50, 3, fg15, 1), C(92, 74, 3, fg15), C(154, 74, 3, accentFill));
    } else if (title.includes("Single-tier") || title.includes("hero")) {
      e.push(R(40, 12, 120, 96, "none", 6, 1.5, accent));
      e.push(R(60, 24, 80, 4, fg40, 2));
      e.push(R(60, 36, 80, 8, accentFill, 3));
      e.push(R(60, 52, 80, 2, fg25, 1), R(60, 58, 80, 2, fg25, 1), R(60, 64, 80, 2, fg25, 1));
      e.push(R(60, 76, 80, 12, accentFill, 4));
    } else if (title.includes("slider") || title.includes("Usage")) {
      e.push(R(30, 20, 140, 24, fg5, 4));
      e.push(L(45, 32, 155, 32, fg25, 2), C(100, 32, 5, accentFill));
      e.push(R(70, 60, 60, 6, accentFill, 3));
      e.push(R(60, 80, 80, 12, accentFill, 4));
    } else if (title.includes("Credit")) {
      e.push(R(8, 16, 56, 48, fg5, 4));
      e.push(R(72, 16, 56, 48, "none", 4, 1.5, accent));
      e.push(R(136, 16, 56, 48, fg5, 4));
      e.push(R(72, 10, 28, 8, accentFill, 3));
      e.push(R(28, 76, 144, 28, fg5, 4));
      e.push(R(38, 84, 124, 2, fg15, 1), R(38, 90, 84, 2, fg15, 1), R(38, 96, 104, 2, fg15, 1));
    } else if (title.includes("Free vs Pro")) {
      e.push(R(8, 16, 88, 88, fg5, 4));
      e.push(R(104, 16, 88, 88, "none", 4, 1.5, accent));
      e.push(R(104, 16, 88, 88, fg5, 4));
      e.push(R(28, 72, 48, 12, fg15, 4), R(124, 72, 48, 12, accentFill, 4));
    } else if (title.includes("Stacked")) {
      e.push(R(28, 8, 144, 28, fg5, 4));
      e.push(R(28, 42, 144, 28, "none", 4, 1.5, accent));
      e.push(R(28, 76, 144, 28, fg5, 4));
      e.push(R(38, 16, 40, 4, fg25, 1), R(38, 50, 40, 4, fg25, 1), R(38, 84, 40, 4, fg25, 1));
      e.push(R(140, 16, 22, 10, accentFill, 4), R(140, 50, 22, 10, accentFill, 4), R(140, 84, 22, 10, accentFill, 4));
    }
  } else if (cat === "Features / Bento") {
    if (title.includes("3-column") || title.includes("icon grid")) {
      e.push(R(8, 14, 56, 92, fg5, 4), R(72, 14, 56, 92, fg5, 4), R(136, 14, 56, 92, fg5, 4));
      e.push(C(36, 36, 8, fg15), C(100, 36, 8, fg15), C(164, 36, 8, fg15));
      e.push(R(22, 52, 28, 3, fg25, 1), R(86, 52, 28, 3, fg25, 1), R(150, 52, 28, 3, fg25, 1));
      e.push(R(18, 62, 36, 2, fg15, 1), R(18, 68, 36, 2, fg15, 1));
      e.push(R(82, 62, 36, 2, fg15, 1), R(82, 68, 36, 2, fg15, 1));
      e.push(R(146, 62, 36, 2, fg15, 1), R(146, 68, 36, 2, fg15, 1));
    } else if (title.includes("Bento")) {
      e.push(R(8, 8, 92, 52, fg5, 4), R(108, 8, 84, 52, fg5, 4));
      e.push(R(8, 68, 56, 44, fg5, 4), R(72, 68, 56, 44, "none", 4, 1.5, accent));
      e.push(R(136, 68, 56, 44, fg5, 4));
      e.push(C(54, 34, 14, fg10), C(150, 34, 14, fg10));
    } else if (title.includes("Alternating")) {
      e.push(R(8, 8, 88, 32, fg5, 4));
      e.push(R(104, 8, 88, 32, fg10, 4));
      e.push(R(8, 46, 88, 32, fg10, 4));
      e.push(R(104, 46, 88, 32, fg5, 4));
      e.push(R(8, 84, 88, 28, fg5, 4));
      e.push(R(104, 84, 88, 28, fg10, 4));
      e.push(R(18, 18, 68, 3, fg25, 1), R(114, 56, 68, 3, fg25, 1), R(18, 94, 68, 3, fg25, 1));
    } else if (title.includes("Tabbed")) {
      e.push(R(8, 8, 184, 104, fg5, 4));
      e.push(R(18, 18, 36, 10, accentFill, 3));
      e.push(R(60, 18, 36, 10, fg15, 3));
      e.push(R(102, 18, 36, 10, fg15, 3));
      e.push(L(18, 34, 182, 34, fg15));
      e.push(R(18, 42, 84, 56, fg10, 4));
      e.push(R(110, 42, 72, 6, fg25, 2));
      e.push(R(110, 54, 72, 2, fg15, 1), R(110, 60, 72, 2, fg15, 1));
      e.push(R(110, 72, 50, 10, accentFill, 4));
    } else if (title.includes("Accordion")) {
      e.push(R(28, 8, 144, 22, fg5, 4));
      e.push(R(38, 15, 124, 3, fg25, 1));
      e.push(R(28, 36, 144, 48, "none", 4, 1.5, accent));
      e.push(R(38, 43, 124, 3, fg25, 1));
      e.push(R(38, 54, 124, 2, fg15, 1), R(38, 60, 124, 2, fg15, 1), R(38, 66, 84, 2, fg15, 1));
      e.push(R(28, 90, 144, 22, fg5, 4));
      e.push(R(38, 97, 124, 3, fg25, 1));
    } else if (title.includes("Scroll-triggered")) {
      e.push(R(8, 8, 84, 104, fg10, 4));
      e.push(C(50, 60, 18, fg15));
      e.push(R(100, 8, 92, 104, fg5, 4));
      e.push(R(110, 18, 72, 5, fg25, 2));
      e.push(R(110, 30, 72, 2, fg15, 1), R(110, 36, 72, 2, fg15, 1));
      e.push(R(110, 46, 72, 5, accentFill, 2));
      e.push(R(110, 58, 72, 2, fg15, 1), R(110, 64, 72, 2, fg15, 1));
      e.push(R(110, 74, 72, 5, fg25, 2));
    } else if (title.includes("Icon wall")) {
      for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
        e.push(R(12 + c * 38, 8 + r * 22, 30, 16, fg5, 3));
        e.push(C(27 + c * 38, 16 + r * 22, 4, fg15));
      }
    } else if (title.includes("Before/after")) {
      e.push(R(8, 12, 88, 96, fg5, 4));
      e.push(R(104, 12, 88, 96, "none", 4, 1.5, accent));
      e.push(R(104, 12, 88, 96, fg5, 4));
      e.push(R(18, 44, 68, 3, fg25, 1), R(18, 52, 48, 3, fg25, 1), R(18, 60, 58, 3, fg25, 1));
      e.push(R(114, 44, 68, 3, accentFill, 1), R(114, 52, 68, 3, accentFill, 1));
      e.push(R(114, 60, 68, 3, accentFill, 1), R(114, 68, 48, 3, accentFill, 1));
      e.push(C(148, 88, 8, fg15));
    }
  } else if (cat === "Hero Sections") {
    if (title.includes("Centered text") || title.includes("screenshot")) {
      e.push(R(40, 8, 120, 6, fg40, 2));
      e.push(R(60, 20, 80, 4, fg25, 1));
      e.push(R(70, 30, 60, 10, accentFill, 4));
      e.push(R(28, 52, 144, 56, fg10, 4));
      e.push(R(48, 62, 104, 36, fg5, 4));
    } else if (title.includes("Split")) {
      e.push(R(8, 12, 92, 96, fg5, 4));
      e.push(R(18, 28, 72, 4, fg25, 1));
      e.push(R(18, 38, 72, 2, fg15, 1), R(18, 44, 52, 2, fg15, 1));
      e.push(R(18, 56, 52, 10, accentFill, 4));
      e.push(R(108, 12, 84, 96, fg10, 4));
      e.push(C(150, 60, 20, fg15));
    } else if (title.includes("Video")) {
      e.push(R(30, 14, 140, 84, fg5, 6));
      e.push(Pg("95,40 95,72 122,56", accentFill));
      e.push(R(68, 104, 64, 10, accentFill, 4));
    } else if (title.includes("gradient") || title.includes("mesh")) {
      e.push(<defs key="d"><linearGradient id={`${cat}-g1`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={accent} stopOpacity={0.25} /><stop offset="100%" stopColor="#f59e0b" stopOpacity={0.4} /></linearGradient></defs>);
      e.push(<rect key="bg" x="0.5" y="0.5" width="199" height="119" rx="6" fill={`url(#${cat}-g1)`} />);
      e.push(R(40, 28, 120, 6, "#fff", 2));
      e.push(R(60, 40, 80, 4, "#fff", 1));
      e.push(R(70, 52, 60, 10, accentFill, 4));
    } else if (title.includes("Terminal") || title.includes("code")) {
      e.push(R(28, 12, 144, 88, "#1e293b", 6));
      e.push(C(40, 22, 3, "#ef4444"), C(50, 22, 3, "#eab308"), C(60, 22, 3, "#22c55e"));
      e.push(R(38, 36, 80, 3, accent, 1), R(38, 44, 60, 3, fg25, 1));
      e.push(R(38, 52, 100, 3, accent, 1), R(38, 60, 40, 3, fg25, 1));
      e.push(R(38, 68, 70, 3, accent, 1));
      e.push(R(68, 106, 64, 8, accentFill, 4));
    } else if (title.includes("Floating")) {
      e.push(R(60, 24, 80, 6, fg25, 2));
      e.push(R(80, 36, 40, 4, fg25, 1));
      e.push(R(88, 48, 24, 8, accentFill, 4));
      e.push(R(18, 18, 52, 38, fg5, 4), R(130, 18, 52, 38, fg5, 4));
      e.push(R(28, 68, 52, 38, fg5, 4), R(120, 68, 52, 38, fg5, 4));
    } else if (title.includes("Big bold") || title.includes("typography")) {
      e.push(R(72, 88, 56, 12, accentFill, 4));
    } else if (title.includes("inline form") || title.includes("Hero with")) {
      e.push(R(30, 18, 140, 6, fg40, 2));
      e.push(R(50, 30, 100, 4, fg25, 1));
      e.push(R(30, 48, 104, 14, "none", 4, 1, fg30));
      e.push(R(138, 48, 32, 14, accentFill, 4));
    }
  } else if (cat === "CTA Banners") {
    if (title.includes("Full-bleed") || title.includes("gradient banner")) {
      e.push(<defs key="d"><linearGradient id={`${cat}-g1`} x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor={accent} stopOpacity={0.7} /><stop offset="100%" stopColor="#f59e0b" stopOpacity={0.85} /></linearGradient></defs>);
      e.push(<rect key="bg" x="0.5" y="0.5" width="199" height="119" rx="6" fill={`url(#${cat}-g1)`} />);
      e.push(R(72, 68, 56, 16, "#fff", 4));
    } else if (title.includes("Split CTA")) {
      e.push(R(18, 22, 164, 76, fg5, 6));
      e.push(R(32, 38, 80, 5, fg25, 2));
      e.push(R(32, 50, 80, 2, fg15, 1), R(32, 56, 60, 2, fg15, 1));
      e.push(R(140, 46, 28, 28, accentFill, 4));
    } else if (title.includes("Sticky bottom")) {
      e.push(R(8, 80, 184, 32, fg5, 6, 1.5, accent));
      e.push(R(18, 88, 80, 4, fg25, 1));
      e.push(R(18, 96, 60, 2, fg15, 1));
      e.push(R(140, 88, 28, 12, accentFill, 4));
    } else if (title.includes("Patterned")) {
      for (let i = 0; i < 20; i++) e.push(C(18 + (i % 10) * 18, 18 + Math.floor(i / 10) * 48, 2, fg10));
      e.push(R(72, 68, 56, 14, accentFill, 4));
    } else if (title.includes("Dual-CTA")) {
      e.push(R(48, 64, 48, 14, accentFill, 4));
      e.push(R(104, 64, 48, 14, "none", 4, 1, accent));
    } else if (title.includes("Inline email")) {
      e.push(R(28, 28, 144, 6, fg40, 2));
      e.push(R(48, 40, 100, 4, fg25, 1));
      e.push(R(38, 58, 94, 14, "none", 4, 1, fg30));
      e.push(R(136, 58, 36, 14, accentFill, 4));
    } else if (title.includes("Testimonial") || title.includes("combo")) {
      e.push(R(72, 76, 56, 14, accentFill, 4));
    }
  } else if (cat === "Stats Bars") {
    if (title.includes("4-column") || title.includes("Horizontal")) {
      e.push(R(14, 32, 32, 6, fg25, 2), R(62, 32, 32, 6, fg25, 2));
      e.push(R(110, 32, 32, 6, fg25, 2), R(158, 32, 32, 6, fg25, 2));
      e.push(R(14, 46, 32, 18, accentFill, 3));
      e.push(R(62, 46, 32, 18, accentFill, 3));
      e.push(R(110, 46, 32, 18, accentFill, 3));
      e.push(R(158, 46, 32, 18, accentFill, 3));
      e.push(R(14, 72, 32, 3, fg15, 1), R(62, 72, 32, 3, fg15, 1));
      e.push(R(110, 72, 32, 3, fg15, 1), R(158, 72, 32, 3, fg15, 1));
    } else if (title.includes("Animated") || title.includes("count-up")) {
      e.push(R(18, 24, 72, 44, fg5, 4));
      e.push(R(110, 24, 72, 44, fg5, 4));
      e.push(R(28, 80, 144, 3, fg15, 1), R(28, 80, 100, 3, accentFill, 1));
    } else if (title.includes("Icon + stat")) {
      e.push(C(28, 38, 10, fg15), C(128, 38, 10, fg15), C(78, 82, 10, fg15));
      e.push(R(52, 32, 32, 5, accentFill, 2), R(152, 32, 32, 5, accentFill, 2), R(102, 76, 32, 5, accentFill, 2));
      e.push(R(52, 42, 32, 3, fg15, 1), R(152, 42, 32, 3, fg15, 1), R(102, 86, 32, 3, fg15, 1));
    } else if (title.includes("Logo bar") || title.includes("combo")) {
      e.push(R(18, 12, 164, 28, fg5, 4));
      e.push(R(28, 20, 28, 10, fg15, 2), R(64, 20, 28, 10, fg15, 2));
      e.push(R(100, 20, 28, 10, fg15, 2), R(136, 20, 28, 10, fg15, 2));
      e.push(R(18, 52, 72, 48, fg5, 4));
      e.push(R(110, 52, 72, 48, fg5, 4));
    } else if (title.includes("Vertical")) {
      e.push(R(58, 8, 84, 104, fg5, 6));
      e.push(L(72, 60, 128, 60, fg15));
    } else if (title.includes("full-bleed") || title.includes("image")) {
      e.push(<defs key="d"><linearGradient id={`${cat}-g1`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={accent} stopOpacity={0.5} /><stop offset="100%" stopColor="#f59e0b" stopOpacity={0.7} /></linearGradient></defs>);
      e.push(<rect key="bg" x="0.5" y="0.5" width="199" height="119" rx="6" fill={`url(#${cat}-g1)`} />);
    } else if (title.includes("Card-based")) {
      e.push(R(8, 22, 56, 76, fg5, 4));
      e.push(R(72, 22, 56, 76, fg5, 4));
      e.push(R(136, 22, 56, 76, fg5, 4));
      e.push(R(28, 50, 16, 12, accentFill, 3));
      e.push(R(92, 50, 16, 12, accentFill, 3));
      e.push(R(156, 50, 16, 12, accentFill, 3));
    }
  } else if (cat === "Nav Bars") {
    if (title.includes("Minimal") || title.includes("logo + links")) {
      e.push(R(8, 14, 184, 28, fg5, 4));
      e.push(R(18, 22, 28, 10, accentFill, 3));
      e.push(R(62, 24, 18, 6, fg25, 2), R(88, 24, 18, 6, fg25, 2));
      e.push(R(114, 24, 18, 6, fg25, 2), R(158, 22, 26, 10, accentFill, 4));
    } else if (title.includes("Centered logo")) {
      e.push(R(8, 14, 184, 28, fg5, 4));
      e.push(R(18, 24, 18, 6, fg25, 2), R(46, 24, 18, 6, fg25, 2));
      e.push(R(78, 22, 44, 10, accentFill, 3));
      e.push(R(130, 24, 18, 6, fg25, 2), R(158, 24, 18, 6, fg25, 2));
    } else if (title.includes("Mega menu")) {
      e.push(R(8, 8, 184, 22, fg5, 4));
      e.push(R(18, 14, 22, 8, accentFill, 2));
      e.push(R(50, 16, 18, 6, fg25, 2), R(76, 16, 18, 6, fg25, 2));
      e.push(R(8, 34, 184, 78, "none", 4, 1.5, accent));
      e.push(R(18, 44, 48, 5, fg25, 2), R(18, 56, 40, 2, fg15, 1), R(18, 62, 40, 2, fg15, 1));
      e.push(R(76, 44, 48, 5, fg25, 2), R(76, 56, 40, 2, fg15, 1), R(76, 62, 40, 2, fg15, 1));
    } else if (title.includes("Sidebar")) {
      e.push(R(8, 8, 48, 104, fg5, 4));
      e.push(R(16, 18, 32, 6, accentFill, 2));
      e.push(R(16, 30, 32, 4, fg25, 1), R(16, 38, 32, 4, fg25, 1));
      e.push(R(16, 46, 32, 4, fg25, 1), R(16, 54, 32, 4, fg25, 1));
      e.push(C(24, 88, 5, fg15));
      e.push(R(64, 8, 128, 104, fg5, 4));
    } else if (title.includes("Floating pill")) {
      e.push(R(38, 14, 124, 24, "none", 14, 1, fg30));
      e.push(R(48, 20, 22, 10, accentFill, 3));
      e.push(R(78, 22, 14, 6, fg25, 2), R(100, 22, 14, 6, fg25, 2));
      e.push(R(128, 20, 26, 10, accentFill, 4));
    } else if (title.includes("Transparent")) {
      e.push(<defs key="d"><linearGradient id={`${cat}-g1`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={accent} stopOpacity={0.3} /><stop offset="100%" stopColor="#f59e0b" stopOpacity={0.5} /></linearGradient></defs>);
      e.push(<rect key="bg" x="0.5" y="0.5" width="199" height="119" rx="6" fill={`url(#${cat}-g1)`} />);
      e.push(R(8, 8, 184, 22, "#fff", 4, 0), R(18, 14, 22, 8, "rgba(255,255,255,0.5)", 2));
      e.push(R(50, 16, 14, 6, "rgba(255,255,255,0.5)", 2), R(72, 16, 14, 6, "rgba(255,255,255,0.5)", 2));
      e.push(R(152, 14, 28, 8, "rgba(255,255,255,0.5)", 4));
    } else if (title.includes("Command-palette")) {
      e.push(R(8, 14, 184, 28, fg5, 4));
      e.push(R(18, 22, 22, 10, accentFill, 2));
      e.push(R(58, 20, 84, 12, "none", 4, 1, fg30));
      e.push(R(158, 22, 22, 8, fg15, 2));
    } else if (title.includes("Bottom mobile")) {
      e.push(R(8, 80, 184, 32, fg5, 4));
      e.push(C(38, 92, 6, fg15), C(78, 92, 6, fg15));
      e.push(C(118, 92, 6, fg15), C(158, 92, 6, fg15));
      e.push(R(28, 104, 20, 3, fg15, 1), R(68, 104, 20, 3, fg15, 1));
      e.push(R(108, 104, 20, 3, fg15, 1), R(148, 104, 20, 3, fg15, 1));
    }
  } else if (cat === "Testimonials") {
    if (title.includes("3-column") || title.includes("quote")) {
      e.push(R(8, 18, 56, 84, fg5, 4));
      e.push(R(72, 18, 56, 84, fg5, 4));
      e.push(R(136, 18, 56, 84, fg5, 4));
      e.push(C(36, 38, 8, fg15), C(100, 38, 8, fg15), C(164, 38, 8, fg15));
      e.push(R(22, 54, 28, 3, fg25, 1), R(86, 54, 28, 3, fg25, 1), R(150, 54, 28, 3, fg25, 1));
      e.push(R(18, 64, 36, 2, fg15, 1), R(18, 70, 36, 2, fg15, 1), R(18, 76, 36, 2, fg15, 1));
      e.push(R(82, 64, 36, 2, fg15, 1), R(82, 70, 36, 2, fg15, 1), R(82, 76, 36, 2, fg15, 1));
      e.push(R(146, 64, 36, 2, fg15, 1), R(146, 70, 36, 2, fg15, 1), R(146, 76, 36, 2, fg15, 1));
    } else if (title.includes("Marquee")) {
      e.push(R(8, 28, 84, 64, fg5, 4));
      e.push(R(108, 28, 84, 64, fg5, 4));
      e.push(C(50, 50, 10, fg15), R(35, 66, 30, 3, fg25, 1));
      e.push(C(150, 50, 10, fg15), R(135, 66, 30, 3, fg25, 1));
    } else if (title.includes("Masonry")) {
      e.push(R(8, 8, 56, 52, fg5, 4), R(72, 8, 56, 72, fg5, 4), R(136, 8, 56, 40, fg5, 4));
      e.push(R(8, 68, 56, 44, fg5, 4), R(72, 88, 56, 24, fg5, 4), R(136, 56, 56, 56, fg5, 4));
      e.push(C(36, 24, 6, fg15), C(100, 24, 6, fg15), C(164, 24, 6, fg15));
    } else if (title.includes("Single featured")) {
      e.push(R(28, 18, 144, 84, fg5, 6));
      e.push(R(48, 42, 104, 3, fg25, 1), R(48, 50, 104, 3, fg25, 1), R(48, 58, 84, 3, fg25, 1));
      e.push(C(78, 78, 8, fg15), R(94, 74, 42, 3, fg25, 1), R(94, 80, 32, 2, fg15, 1));
    } else if (title.includes("Video")) {
      e.push(R(8, 12, 88, 48, fg5, 4), R(104, 12, 88, 48, fg5, 4));
      e.push(R(8, 68, 88, 48, fg5, 4), R(104, 68, 88, 48, fg5, 4));
      e.push(Pg("42,28 42,48 56,38", accentFill), Pg("138,28 138,48 152,38", accentFill));
      e.push(Pg("42,84 42,104 56,94", accentFill), Pg("138,84 138,104 152,94", accentFill));
    } else if (title.includes("Tweet")) {
      e.push(R(8, 8, 88, 52, fg5, 4), R(104, 8, 88, 52, fg5, 4));
      e.push(R(8, 68, 88, 44, fg5, 4), R(104, 68, 88, 44, fg5, 4));
      e.push(C(22, 20, 6, fg15), R(32, 16, 32, 3, fg25, 1), R(32, 22, 22, 2, fg15, 1));
      e.push(C(118, 20, 6, fg15), R(128, 16, 32, 3, fg25, 1), R(128, 22, 22, 2, fg15, 1));
    } else if (title.includes("Logo cloud")) {
      e.push(R(18, 38, 42, 22, fg5, 4), R(68, 38, 42, 22, fg5, 4), R(118, 38, 42, 22, fg5, 4));
      e.push(R(18, 68, 42, 22, fg5, 4), R(68, 68, 42, 22, fg5, 4), R(118, 68, 42, 22, fg5, 4));
    } else if (title.includes("Carousel")) {
      e.push(R(28, 18, 144, 72, fg5, 6));
      e.push(R(48, 48, 104, 3, fg25, 1), R(48, 56, 104, 3, fg25, 1));
      e.push(C(78, 72, 6, fg15), R(88, 68, 42, 3, fg25, 1));
      e.push(C(82, 98, 4, accentFill), C(100, 98, 4, fg15), C(118, 98, 4, fg15));
    }
  } else if (cat === "Footer") {
    if (title.includes("Multi-column") || title.includes("sitemap")) {
      e.push(R(8, 8, 184, 104, fg5, 4));
      e.push(R(18, 18, 28, 8, accentFill, 2));
      e.push(R(18, 36, 22, 3, fg15, 1), R(18, 42, 22, 3, fg15, 1), R(18, 48, 22, 3, fg15, 1));
      e.push(R(68, 32, 28, 4, fg25, 1), R(68, 42, 22, 3, fg15, 1), R(68, 48, 22, 3, fg15, 1));
      e.push(R(118, 32, 28, 4, fg25, 1), R(118, 42, 22, 3, fg15, 1), R(118, 48, 22, 3, fg15, 1));
      e.push(L(18, 88, 182, 88, fg15), R(18, 96, 80, 3, fg15, 1));
    } else if (title.includes("Minimal")) {
      e.push(R(8, 80, 184, 28, fg5, 4));
      e.push(R(18, 88, 22, 8, accentFill, 2));
      e.push(R(50, 90, 18, 3, fg15, 1), R(74, 90, 18, 3, fg15, 1), R(98, 90, 18, 3, fg15, 1));
      e.push(R(142, 88, 38, 8, fg15, 2));
    } else if (title.includes("Giant logo")) {
      e.push(R(72, 82, 56, 12, accentFill, 4));
      e.push(R(38, 68, 18, 3, fg15, 1), R(62, 68, 18, 3, fg15, 1));
      e.push(R(86, 68, 18, 3, fg15, 1), R(110, 68, 18, 3, fg15, 1));
    } else if (title.includes("Newsletter")) {
      e.push(R(8, 8, 184, 104, fg5, 4));
      e.push(R(38, 52, 94, 12, "none", 4, 1, fg30));
      e.push(R(136, 52, 32, 12, accentFill, 4));
      e.push(R(18, 78, 28, 3, fg15, 1), R(18, 84, 28, 3, fg15, 1));
      e.push(R(68, 78, 28, 3, fg15, 1), R(68, 84, 28, 3, fg15, 1));
      e.push(R(118, 78, 28, 3, fg15, 1), R(118, 84, 28, 3, fg15, 1));
    } else if (title.includes("Status")) {
      e.push(R(8, 80, 184, 32, fg5, 4));
      e.push(C(22, 92, 4, "#22c55e"));
      e.push(R(108, 88, 18, 3, fg15, 1), R(132, 88, 18, 3, fg15, 1), R(156, 88, 18, 3, fg15, 1));
    }
  } else if (cat === "FAQ") {
    if (title.includes("Accordion single")) {
      e.push(R(28, 8, 144, 22, fg5, 4));
      e.push(R(38, 14, 124, 3, fg25, 1));
      e.push(R(28, 36, 144, 48, "none", 4, 1.5, accent));
      e.push(R(38, 43, 124, 3, fg25, 1));
      e.push(R(38, 54, 124, 2, fg15, 1), R(38, 60, 124, 2, fg15, 1), R(38, 66, 84, 2, fg15, 1));
      e.push(R(28, 90, 144, 22, fg5, 4));
      e.push(R(38, 97, 124, 3, fg25, 1));
    } else if (title.includes("Two-column")) {
      e.push(R(8, 8, 88, 28, fg5, 4), R(104, 8, 88, 28, fg5, 4));
      e.push(R(8, 42, 88, 28, "none", 4, 1.5, accent), R(104, 42, 88, 28, fg5, 4));
      e.push(R(8, 76, 88, 28, fg5, 4), R(104, 76, 88, 28, fg5, 4));
      e.push(R(18, 16, 68, 3, fg25, 1), R(114, 16, 68, 3, fg25, 1));
      e.push(R(18, 50, 68, 3, fg25, 1), R(114, 50, 68, 3, fg25, 1));
      e.push(R(18, 84, 68, 3, fg25, 1), R(114, 84, 68, 3, fg25, 1));
    } else if (title.includes("Chat-bubble")) {
      e.push(R(18, 8, 72, 28, fg5, 4));
      e.push(R(110, 8, 72, 28, fg10, 4));
      e.push(R(18, 44, 72, 28, fg5, 4));
      e.push(R(110, 44, 72, 28, fg10, 4));
      e.push(R(18, 80, 72, 28, fg5, 4));
      e.push(R(110, 80, 72, 28, fg10, 4));
      e.push(R(28, 16, 52, 3, fg25, 1), R(120, 16, 52, 3, fg25, 1));
      e.push(R(28, 52, 52, 3, fg25, 1), R(120, 52, 52, 3, fg25, 1));
    } else if (title.includes("Searchable")) {
      e.push(R(38, 8, 124, 16, "none", 4, 1, fg30));
      e.push(C(52, 16, 4, "none"), R(38, 32, 124, 16, fg5, 4), R(38, 54, 124, 16, fg5, 4), R(38, 76, 124, 16, fg5, 4));
      e.push(R(48, 38, 104, 3, fg15, 1), R(48, 60, 104, 3, fg15, 1), R(48, 82, 104, 3, fg15, 1));
    } else if (title.includes("Categorized")) {
      e.push(R(18, 8, 42, 12, accentFill, 4));
      e.push(R(66, 8, 42, 12, fg15, 4));
      e.push(R(114, 8, 42, 12, fg15, 4));
      e.push(R(18, 30, 164, 16, fg5, 4), R(18, 52, 164, 16, fg5, 4), R(18, 74, 164, 16, fg5, 4));
      e.push(R(28, 36, 144, 3, fg15, 1), R(28, 58, 144, 3, fg15, 1), R(28, 80, 144, 3, fg15, 1));
    }
  } else if (cat === "Dashboards") {
    if (title.includes("Sidebar + main")) {
      e.push(R(8, 8, 48, 104, fg5, 4));
      e.push(R(16, 18, 32, 6, accentFill, 2));
      e.push(R(16, 30, 32, 4, fg25, 1), R(16, 38, 32, 4, fg25, 1), R(16, 46, 32, 4, fg25, 1));
      e.push(R(64, 8, 128, 104, fg5, 4));
      e.push(R(74, 18, 38, 6, fg25, 2));
      e.push(R(74, 32, 108, 28, fg10, 4));
      e.push(R(74, 66, 52, 36, fg10, 4), R(134, 66, 52, 36, fg10, 4));
    } else if (title.includes("Top nav")) {
      e.push(R(8, 8, 184, 22, fg5, 4));
      e.push(R(18, 14, 22, 8, accentFill, 2));
      e.push(R(58, 16, 14, 6, fg25, 2), R(78, 16, 14, 6, fg25, 2));
      e.push(R(158, 14, 22, 8, fg15, 2));
      e.push(R(8, 36, 184, 76, fg5, 4));
      e.push(R(18, 46, 38, 6, fg25, 2));
      e.push(R(18, 60, 72, 40, fg10, 4), R(98, 60, 84, 40, fg10, 4));
    } else if (title.includes("Three-pane")) {
      e.push(R(8, 8, 38, 104, fg5, 4));
      e.push(R(54, 8, 60, 104, fg5, 4));
      e.push(R(122, 8, 70, 104, fg5, 4));
      e.push(R(16, 18, 22, 6, accentFill, 2));
      e.push(R(16, 30, 22, 4, fg25, 1), R(16, 38, 22, 4, fg25, 1));
      e.push(R(64, 18, 40, 4, fg25, 1), R(64, 28, 40, 4, fg25, 1));
    } else if (title.includes("Kanban")) {
      e.push(R(8, 8, 56, 104, fg5, 4));
      e.push(R(72, 8, 56, 104, fg5, 4));
      e.push(R(136, 8, 56, 104, fg5, 4));
      e.push(R(16, 18, 40, 4, fg25, 1), R(80, 18, 40, 4, fg25, 1), R(144, 18, 40, 4, fg25, 1));
      e.push(R(16, 32, 40, 22, fg10, 4), R(16, 58, 40, 22, fg10, 4));
      e.push(R(80, 32, 40, 22, "none", 4, 1.5, accent), R(80, 58, 40, 22, fg10, 4));
      e.push(R(144, 32, 40, 22, fg10, 4));
    } else if (title.includes("Metric cards")) {
      e.push(R(8, 8, 42, 28, fg5, 4), R(58, 8, 42, 28, fg5, 4));
      e.push(R(108, 8, 42, 28, fg5, 4), R(158, 8, 34, 28, fg5, 4));
      e.push(R(8, 44, 184, 68, fg5, 4));
      e.push(<polyline key="ch" points="18,102 38,82 58,92 78,72 98,78 118,62 138,68 158,52 178,58" fill="none" stroke={accent} strokeWidth="2" />);
    } else if (title.includes("Empty state")) {
      e.push(C(100, 42, 20, fg15));
      e.push(R(85, 38, 30, 8, fg15, 2));
      e.push(R(72, 88, 56, 14, accentFill, 4));
    }
  } else if (cat === "Onboarding") {
    if (title.includes("Checklist")) {
      e.push(R(38, 8, 124, 104, fg5, 6));
      e.push(R(48, 38, 10, 10, accentFill, 2), R(64, 40, 72, 3, fg15, 1));
      e.push(R(48, 54, 10, 10, accentFill, 2), R(64, 56, 72, 3, fg15, 1));
      e.push(R(48, 70, 10, 10, "none", 2, 1, fg30), R(64, 72, 72, 3, fg15, 1));
      e.push(R(48, 86, 10, 10, "none", 2, 1, fg30), R(64, 88, 72, 3, fg15, 1));
    } else if (title.includes("Tour")) {
      e.push(R(8, 8, 184, 104, fg5, 4));
      e.push(R(18, 18, 38, 8, fg15, 2), R(64, 18, 38, 8, fg15, 2), R(110, 18, 38, 8, fg15, 2));
      e.push(R(58, 48, 84, 42, fg10, 6, 1.5, accent));
      e.push(Pg("100,42 90,48 110,48", accentFill));
      e.push(R(78, 78, 44, 8, accentFill, 4));
    } else if (title.includes("Video") && cat === "Onboarding") {
      e.push(R(28, 12, 144, 84, fg5, 6));
      e.push(R(48, 28, 104, 52, fg10, 4));
      e.push(Pg("95,44 95,68 118,56", accentFill));
      e.push(R(68, 102, 64, 10, accentFill, 4));
    } else if (title.includes("Illustrated")) {
      e.push(C(100, 38, 25, fg15));
      e.push(C(100, 38, 14, fg10));
      e.push(R(72, 100, 56, 12, accentFill, 4));
    }
  } else if (cat === "Blog / Content") {
    if (title.includes("Magazine")) {
      e.push(R(8, 8, 184, 52, fg5, 4));
      e.push(R(18, 18, 82, 5, fg25, 2));
      e.push(R(18, 30, 164, 2, fg15, 1), R(18, 36, 164, 2, fg15, 1));
      e.push(R(8, 68, 56, 44, fg5, 4), R(72, 68, 56, 44, fg5, 4), R(136, 68, 56, 44, fg5, 4));
    } else if (title.includes("Single column") || title.includes("reading")) {
      e.push(R(38, 8, 124, 104, fg5, 4));
      e.push(R(52, 18, 96, 5, fg25, 2));
      for (let i = 0; i < 7; i++) e.push(R(52, 32 + i * 10, 96, 2, fg15, 1));
    } else if (title.includes("Sidebar TOC")) {
      e.push(R(8, 8, 48, 104, fg5, 4));
      e.push(R(64, 8, 128, 104, fg5, 4));
      e.push(R(16, 18, 32, 5, accentFill, 2), R(16, 30, 32, 5, fg15, 2), R(16, 42, 32, 5, fg15, 2));
      e.push(R(74, 18, 108, 5, fg25, 2));
      e.push(R(74, 32, 108, 2, fg15, 1), R(74, 38, 108, 2, fg15, 1));
      e.push(R(74, 50, 108, 5, fg25, 2));
    } else if (title.includes("Card grid") || title.includes("filters")) {
      e.push(R(18, 8, 32, 10, accentFill, 4));
      e.push(R(56, 8, 32, 10, fg15, 4));
      e.push(R(94, 8, 32, 10, fg15, 4));
      e.push(R(8, 26, 56, 42, fg5, 4), R(72, 26, 56, 42, fg5, 4), R(136, 26, 56, 42, fg5, 4));
      e.push(R(8, 76, 56, 36, fg5, 4), R(72, 76, 56, 36, fg5, 4), R(136, 76, 56, 36, fg5, 4));
    }
  } else if (cat === "Contact") {
    if (title.includes("Split form")) {
      e.push(R(8, 12, 92, 96, fg5, 4));
      e.push(R(108, 12, 84, 96, fg10, 4));
      e.push(R(18, 24, 72, 5, fg25, 2));
      e.push(R(18, 38, 72, 8, "none", 4, 1, fg30));
      e.push(R(18, 52, 72, 8, "none", 4, 1, fg30));
      e.push(R(18, 72, 72, 12, accentFill, 4));
    } else if (title.includes("Support channel")) {
      e.push(R(8, 18, 88, 48, fg5, 4), R(104, 18, 88, 48, fg5, 4));
      e.push(R(8, 74, 88, 42, fg5, 4), R(104, 74, 88, 42, fg5, 4));
      e.push(C(52, 40, 8, fg15), C(148, 40, 8, fg15));
      e.push(C(52, 92, 8, fg15), C(148, 92, 8, fg15));
    } else if (title.includes("Full-page") || title.includes("minimal form")) {
      e.push(R(48, 12, 104, 96, fg5, 6));
      e.push(R(68, 22, 64, 5, fg25, 2));
      e.push(R(68, 38, 64, 8, "none", 4, 1, fg30));
      e.push(R(68, 52, 64, 8, "none", 4, 1, fg30));
      e.push(R(68, 72, 64, 12, accentFill, 4));
    }
  } else if (cat === "Bonus") {
    if (title.includes("Comparison table")) {
      e.push(R(8, 12, 92, 52, fg5, 4));
      e.push(R(108, 12, 84, 52, "none", 4, 1.5, accent));
      e.push(R(18, 28, 72, 4, fg25, 1), R(18, 42, 72, 2, fg15, 1));
      e.push(R(118, 28, 64, 4, accentFill, 1), R(118, 42, 64, 2, fg15, 1));
      e.push(R(8, 72, 184, 40, fg5, 4));
      e.push(R(18, 82, 164, 2, fg15, 1), R(18, 90, 164, 2, fg15, 1), R(18, 98, 164, 2, fg15, 1));
    } else if (title.includes("Notification")) {
      e.push(R(8, 8, 184, 22, fg5, 4));
      e.push(R(8, 36, 184, 22, fg10, 4));
      e.push(R(8, 64, 184, 22, fg5, 4));
      e.push(C(22, 47, 5, accentFill));
      e.push(R(32, 43, 82, 4, fg25, 1), R(32, 51, 124, 2, fg15, 1));
    } else if (title.includes("Search results")) {
      e.push(R(38, 8, 124, 14, "none", 4, 1, fg30));
      e.push(R(38, 30, 124, 26, fg5, 4));
      e.push(R(38, 62, 124, 26, fg5, 4));
      e.push(R(38, 94, 124, 22, fg5, 4));
      e.push(R(48, 36, 104, 4, fg25, 1), R(48, 44, 104, 2, fg15, 1));
      e.push(R(48, 68, 104, 4, fg25, 1), R(48, 76, 104, 2, fg15, 1));
    } else if (title.includes("Settings")) {
      e.push(R(8, 8, 48, 104, fg5, 4));
      e.push(R(64, 8, 128, 104, fg5, 4));
      e.push(R(16, 18, 32, 5, accentFill, 2), R(16, 30, 32, 5, fg15, 2), R(16, 42, 32, 5, fg15, 2));
      e.push(R(74, 18, 108, 5, fg25, 2));
      e.push(R(74, 32, 108, 22, fg10, 4));
      e.push(R(74, 62, 108, 5, fg25, 2));
      e.push(R(74, 76, 108, 22, fg10, 4));
    } else if (title.includes("Table")) {
      e.push(R(8, 8, 184, 104, fg5, 4));
      e.push(L(8, 34, 192, 34, fg15), L(8, 56, 192, 56, fg15), L(8, 78, 192, 78, fg15));
      e.push(L(68, 8, 68, 112, fg15), L(132, 8, 132, 112, fg15));
      e.push(R(14, 14, 50, 5, accentFill, 2), R(76, 14, 50, 5, accentFill, 2), R(140, 14, 50, 5, accentFill, 2));
      for (let r = 0; r < 3; r++) {
        e.push(R(14, 42 + r * 22, 48, 3, fg15, 1));
        e.push(R(76, 42 + r * 22, 48, 3, fg15, 1));
        e.push(R(140, 42 + r * 22, 48, 3, fg15, 1));
      }
    }
  }

  if (e.length === 0) {
    e.push(C(100, 60, 20, fg10));
    e.push(R(70, 50, 60, 20, accentFill, 4));
  }

  return e;
}
