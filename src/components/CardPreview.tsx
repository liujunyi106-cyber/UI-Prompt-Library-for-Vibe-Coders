"use client";

import React from "react";

interface CardPreviewProps {
  category: string;
  title: string;
  isDark?: boolean;
}

const C = {
  p: "#fb923c",
  s: "#fed7aa",
  l: "#fff7ed",
  a: "#f97316",
  // 暗色模式背景色
  dl: "#2a2520",
  ds: "#3d3530",
  dw: "#3a3228",
};

export function CardPreview({ category, title, isDark = false }: CardPreviewProps) {
  const id = `${category}-${title}`.replace(/\s+/g, "-").toLowerCase();
  const bg = isDark ? C.dl : C.l;
  const cardBg = isDark ? C.dw : "#fff";
  const accent = isDark ? C.ds : C.s;

  const box = (x: number, y: number, w: number, h: number, fill: string, r = 3, sw = 0.5) => {
    const f = fill === "#fff" ? cardBg : fill === C.l ? bg : fill === C.s ? accent : fill;
    return <rect key={`${id}-${x}-${y}`} x={x} y={y} width={w} height={h} fill={f} rx={r} stroke={accent} strokeWidth={sw} />;
  };
  const cir = (cx: number, cy: number, r: number, fill: string, op = 1) => {
    const f = fill === C.s ? accent : fill;
    return <circle key={`${id}-c-${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={f} opacity={op} />;
  };
  const line = (x1: number, y1: number, x2: number, y2: number) => (
    <line key={`${id}-l-${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth={0.5} />
  );
  const bar = (x: number, y: number, w: number, h = 3, fill?: string) => {
    const f = fill === C.s || !fill ? accent : fill;
    return <rect key={`${id}-b-${x}-${y}`} x={x} y={y} width={w} height={h} fill={f} rx={1} />;
  };

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <rect width="200" height="120" fill={bg} rx="4" />
      {renderPreview(category, title, box, cir, line, bar, isDark, bg, cardBg, accent)}
    </svg>
  );
}

type BoxFn = (x: number, y: number, w: number, h: number, fill: string, r?: number, sw?: number) => React.ReactNode;
type CirFn = (cx: number, cy: number, r: number, fill: string, op?: number) => React.ReactNode;
type LineFn = (x1: number, y1: number, x2: number, y2: number) => React.ReactNode;
type BarFn = (x: number, y: number, w: number, h?: number, fill?: string) => React.ReactNode;

function renderPreview(cat: string, title: string, box: BoxFn, cir: CirFn, line: LineFn, bar: BarFn, isDark: boolean, bg: string, cardBg: string, accent: string): React.ReactNode[] {
  const els: React.ReactNode[] = [];

  if (cat === "Auth Forms") {
    if (title.includes("Split-screen")) {
      els.push(box(10, 10, 85, 100, "#fff"), box(105, 10, 85, 100, C.s, 4, 0));
      els.push(bar(20, 25, 65, 8, C.s), box(20, 40, 65, 12, C.l), box(20, 58, 65, 12, C.l), box(20, 80, 65, 20, C.p, 4));
      els.push(cir(147, 60, 20, C.p, 0.2));
    } else if (title.includes("Centered card")) {
      els.push(box(50, 15, 100, 90, "#fff", 6), bar(65, 30, 70, 8, C.s), box(65, 45, 70, 10, C.l), box(65, 60, 70, 10, C.l), box(65, 78, 70, 18, C.p, 4));
    } else if (title.includes("Minimal")) {
      els.push(cir(100, 25, 10, C.p, 0.3), bar(60, 42, 80, 8, C.s), box(50, 58, 100, 10, "#fff"), box(50, 74, 100, 10, "#fff"), box(50, 92, 100, 16, C.p, 4));
    } else if (title.includes("Social")) {
      els.push(box(50, 15, 100, 90, "#fff", 6));
      els.push(box(60, 25, 80, 12, C.p, 4), box(60, 42, 80, 12, C.p, 4), box(60, 59, 80, 12, C.p, 4));
      els.push(line(60, 80, 140, 80), box(60, 88, 80, 10, C.l));
    } else if (title.includes("Magic link")) {
      els.push(box(50, 30, 100, 60, "#fff", 6), box(65, 42, 70, 10, C.l), box(65, 60, 70, 18, C.p, 4));
    } else if (title.includes("Multi-step")) {
      els.push(box(30, 15, 140, 15, "#fff", 4));
      els.push(box(35, 18, 40, 9, C.p, 2), box(80, 18, 40, 9, C.s, 2), box(125, 18, 40, 9, C.s, 2));
      els.push(box(50, 40, 100, 65, "#fff", 6), box(65, 50, 70, 10, C.l), box(65, 65, 70, 10, C.l));
      els.push(box(65, 85, 30, 12, C.s, 2), box(105, 85, 30, 12, C.p, 2));
    }
  } else if (cat === "Pricing") {
    if (title.includes("3-tier") || title.includes("Classic")) {
      els.push(box(10, 20, 55, 85, "#fff"), box(72, 15, 56, 90, "#fff", 4, 1.5), box(135, 20, 55, 85, "#fff"));
      els.push(bar(20, 30, 35, 6, C.s), box(20, 42, 35, 10, C.p, 2), bar(20, 58, 35), bar(20, 65, 35), bar(20, 72, 35), box(20, 85, 35, 12, C.p, 4));
      els.push(bar(82, 25, 36, 6, C.s), box(82, 37, 36, 10, C.p, 2), bar(82, 53, 36), bar(82, 60, 36), bar(82, 67, 36), box(82, 80, 36, 12, C.p, 4));
      els.push(bar(145, 30, 35, 6, C.s), box(145, 42, 35, 10, C.p, 2), bar(145, 58, 35), bar(145, 65, 35), bar(145, 72, 35), box(145, 85, 35, 12, C.p, 4));
    } else if (title.includes("Monthly") || title.includes("toggle")) {
      els.push(box(60, 15, 80, 20, "#fff", 10), cir(80, 25, 8, C.p), cir(120, 25, 8, C.s));
      els.push(box(30, 45, 60, 60, "#fff"), box(110, 45, 60, 60, "#fff"));
      els.push(bar(45, 58, 30, 6, C.s), box(45, 70, 30, 10, C.p, 2), bar(125, 58, 30, 6, C.s), box(125, 70, 30, 10, C.p, 2));
    } else if (title.includes("Comparison")) {
      els.push(box(10, 10, 180, 100, "#fff"), line(70, 10, 70, 110), line(130, 10, 130, 110), line(10, 40, 190, 40));
      els.push(bar(15, 15, 50, 10, C.s), box(75, 15, 50, 10, C.p, 2), box(135, 15, 50, 10, C.p, 2));
      els.push(bar(15, 50, 50, 5, C.s), cir(90, 52, 3, C.p), cir(150, 52, 3, C.s));
      els.push(bar(15, 65, 50, 5, C.s), cir(90, 67, 3, C.p), cir(150, 67, 3, C.p));
      els.push(bar(15, 80, 50, 5, C.s), cir(90, 82, 3, C.s), cir(150, 82, 3, C.p));
    } else if (title.includes("Single-tier") || title.includes("hero")) {
      els.push(box(40, 15, 120, 90, "#fff", 6, 1.5), bar(60, 25, 80, 8, C.s), box(60, 90, 80, 12, C.p, 4));
      els.push(bar(60, 60, 80), bar(60, 68, 80), bar(60, 76, 80));
    } else if (title.includes("slider") || title.includes("Usage")) {
      els.push(box(30, 20, 140, 30, "#fff"), line(45, 35, 155, 35), cir(100, 35, 6, C.p));
      els.push(box(60, 95, 80, 12, C.p, 4));
    } else if (title.includes("Credit")) {
      els.push(box(10, 20, 55, 45, "#fff"), box(72, 20, 56, 45, "#fff", 4, 1.5), box(135, 20, 55, 45, "#fff"));
      els.push(box(72, 15, 30, 10, C.p, 2));
      els.push(box(30, 75, 140, 30, "#fff"), bar(40, 82, 120), bar(40, 89, 80), bar(40, 96, 100));
    } else if (title.includes("Free vs Pro")) {
      els.push(box(10, 20, 85, 80, "#fff"), box(105, 20, 85, 80, C.l, 4, 1.5));
      els.push(box(30, 75, 45, 12, C.s, 4), box(125, 75, 45, 12, C.p, 4));
    } else if (title.includes("Stacked")) {
      els.push(box(30, 10, 140, 25, "#fff"), box(30, 40, 140, 25, "#fff", 4, 1.5), box(30, 70, 140, 25, "#fff"));
      els.push(bar(40, 16, 40, 6, C.s), bar(40, 46, 40, 6, C.s), bar(40, 76, 40, 6, C.s));
      els.push(box(140, 16, 20, 12, C.p, 4), box(140, 46, 20, 12, C.p, 4), box(140, 76, 20, 12, C.p, 4));
    }
  } else if (cat === "Features / Bento") {
    if (title.includes("3-column") || title.includes("icon grid")) {
      els.push(box(10, 20, 55, 80, "#fff"), box(72, 20, 56, 80, "#fff"), box(135, 20, 55, 80, "#fff"));
      els.push(cir(37, 40, 8, C.p, 0.3), cir(100, 40, 8, C.p, 0.3), cir(162, 40, 8, C.p, 0.3));
      els.push(bar(25, 55, 25, 4, C.s), bar(87, 55, 25, 4, C.s), bar(150, 55, 25, 4, C.s));
      els.push(bar(20, 65, 35), bar(20, 72, 35), bar(82, 65, 35), bar(82, 72, 35), bar(145, 65, 35), bar(145, 72, 35));
    } else if (title.includes("Bento")) {
      els.push(box(10, 10, 90, 50, "#fff"), box(105, 10, 85, 50, "#fff"), box(10, 65, 55, 45, "#fff"), box(72, 65, 56, 45, "#fff", 4, 1.5), box(135, 65, 55, 45, "#fff"));
      els.push(cir(55, 35, 12, C.p, 0.2), cir(147, 35, 12, C.p, 0.2));
    } else if (title.includes("Alternating")) {
      els.push(box(10, 10, 85, 30, "#fff"), box(105, 10, 85, 30, C.s, 4, 0));
      els.push(box(10, 45, 85, 30, C.s, 4, 0), box(105, 45, 85, 30, "#fff"));
      els.push(box(10, 80, 85, 30, "#fff"), box(105, 80, 85, 30, C.s, 4, 0));
      els.push(bar(20, 20, 65, 4, C.s), bar(115, 55, 65, 4, C.s), bar(20, 90, 65, 4, C.s));
    } else if (title.includes("Tabbed")) {
      els.push(box(10, 10, 180, 100, "#fff"));
      els.push(box(20, 20, 40, 12, C.p, 2), box(65, 20, 40, 12, C.s, 2), box(110, 20, 40, 12, C.s, 2));
      els.push(line(20, 36, 180, 36));
      els.push(box(20, 45, 80, 50, C.s, 4, 0));
      els.push(bar(110, 45, 70, 8, C.s), bar(110, 58, 70), bar(110, 65, 70), bar(110, 72, 70), box(110, 82, 50, 10, C.p, 4));
    } else if (title.includes("Accordion")) {
      els.push(box(30, 10, 140, 20, "#fff"), bar(40, 16, 100, 4, C.s));
      els.push(box(30, 35, 140, 50, "#fff", 4, 1.5), bar(40, 41, 100, 4, C.s), bar(40, 55, 120), bar(40, 62, 120), bar(40, 69, 80));
      els.push(box(30, 90, 140, 20, "#fff"), bar(40, 96, 100, 4, C.s));
    } else if (title.includes("Scroll-triggered")) {
      els.push(box(10, 10, 80, 100, C.s, 4, 0), box(100, 10, 90, 100, "#fff"));
      els.push(bar(110, 20, 70, 8, C.s), bar(110, 35, 70), bar(110, 42, 70), box(110, 55, 70, 8, C.p, 2));
      els.push(cir(50, 60, 15, C.p, 0.2));
    } else if (title.includes("Icon wall")) {
      for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
        els.push(box(15 + c * 38, 10 + r * 22, 30, 18, "#fff", 3, 0.5));
        els.push(cir(30 + c * 38, 19 + r * 22, 4, C.p, 0.3));
      }
    } else if (title.includes("Before/after")) {
      els.push(box(10, 15, 85, 90, "#fff"), box(105, 15, 85, 90, "#fff", 4, 1.5));
      els.push(bar(20, 45, 65, 4, C.s), bar(20, 55, 45, 4, C.s), bar(20, 65, 55, 4, C.s));
      els.push(bar(115, 45, 65, 4, C.p), bar(115, 55, 65, 4, C.p), bar(115, 65, 65, 4, C.p), bar(115, 75, 45, 4, C.p));
      els.push(cir(147, 90, 8, C.p, 0.3));
    }
  } else if (cat === "Hero Sections") {
    if (title.includes("Centered text") || title.includes("screenshot")) {
      els.push(bar(40, 10, 120, 10, C.s), bar(60, 25, 80, 6, C.s), bar(70, 35, 60, 4, C.s), box(80, 45, 40, 12, C.p, 4));
      els.push(box(30, 65, 140, 45, C.s, 4, 0));
      els.push(box(50, 75, 100, 25, "#fff"));
    } else if (title.includes("Split")) {
      els.push(box(10, 15, 90, 90, "#fff"), bar(20, 30, 70, 8, C.s), bar(20, 45, 70, 4, C.s), bar(20, 55, 50, 4, C.s), box(20, 70, 50, 12, C.p, 4));
      els.push(box(100, 15, 90, 90, C.s, 4, 0), cir(145, 60, 20, C.p, 0.2));
    } else if (title.includes("Video")) {
      els.push(box(30, 15, 140, 80, "#fff", 6));
      els.push(<polygon key="play" points="95,40 95,70 120,55" fill={C.p} />);
      els.push(box(70, 100, 60, 12, C.p, 4));
    } else if (title.includes("gradient") || title.includes("mesh")) {
      els.push(<defs key="defs"><linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={C.p} stopOpacity={isDark ? 0.5 : 0.3} /><stop offset="100%" stopColor={accent} stopOpacity={isDark ? 0.7 : 0.5} /></linearGradient></defs>);
      els.push(<rect key="bg" width="200" height="120" fill="url(#hg1)" rx="4" />);
      els.push(bar(40, 30, 120, 10, cardBg), bar(60, 45, 80, 6, cardBg), bar(70, 55, 60, 4, cardBg), box(80, 70, 40, 12, C.p, 4));
    } else if (title.includes("Terminal") || title.includes("code")) {
      els.push(box(30, 15, 140, 80, "#1e293b", 6, 0));
      els.push(cir(42, 25, 3, "#ef4444"), cir(52, 25, 3, "#eab308"), cir(62, 25, 3, "#22c55e"));
      els.push(bar(40, 38, 80, 4, C.p), bar(40, 48, 60, 4, C.s), bar(40, 58, 100, 4, C.p), bar(40, 68, 40, 4, C.s), bar(40, 78, 70, 4, C.p));
      els.push(box(70, 100, 60, 12, C.p, 4));
    } else if (title.includes("Floating")) {
      els.push(bar(60, 25, 80, 10, C.s), bar(80, 40, 40, 6, C.s), box(90, 55, 20, 10, C.p, 4));
      els.push(box(20, 20, 50, 35, "#fff"), box(130, 20, 50, 35, "#fff"), box(30, 70, 50, 35, "#fff"), box(120, 70, 50, 35, "#fff"));
    } else if (title.includes("Big bold") || title.includes("typography")) {
      els.push(box(75, 85, 50, 12, C.p, 4));
    } else if (title.includes("inline form") || title.includes("Hero with")) {
      els.push(bar(30, 20, 140, 10, C.s), bar(50, 35, 100, 6, C.s), box(30, 55, 100, 16, "#fff"), box(135, 55, 35, 16, C.p, 4));
    }
  } else if (cat === "CTA Banners") {
    if (title.includes("Full-bleed") || title.includes("gradient banner")) {
      els.push(<defs key="defs"><linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={C.p} stopOpacity={isDark ? 0.8 : 0.7} /><stop offset="100%" stopColor={C.a} stopOpacity={isDark ? 0.9 : 0.85} /></linearGradient></defs>);
      els.push(<rect key="bg" width="200" height="120" fill="url(#cg1)" rx="4" />);
      els.push(box(75, 70, 50, 16, cardBg, 4));
    } else if (title.includes("Split CTA")) {
      els.push(box(20, 25, 160, 70, "#fff", 6), bar(35, 40, 80, 8, C.s), bar(35, 55, 80, 4, C.s), bar(35, 65, 60, 4, C.s));
      els.push(box(140, 50, 30, 30, C.p, 4));
    } else if (title.includes("Sticky bottom")) {
      els.push(box(10, 80, 180, 30, "#fff", 6, 1.5), bar(20, 88, 80, 6, C.s), bar(20, 98, 60, 4, C.s), box(140, 88, 30, 14, C.p, 4));
    } else if (title.includes("Patterned")) {
      for (let i = 0; i < 20; i++) els.push(cir(20 + (i % 10) * 18, 20 + Math.floor(i / 10) * 50, 2, C.p, 0.1));
      els.push(box(75, 70, 50, 14, C.p, 4));
    } else if (title.includes("Dual-CTA")) {
      els.push(box(50, 65, 45, 14, C.p, 4), box(105, 65, 45, 14, "#fff", 4));
    } else if (title.includes("Inline email")) {
      els.push(bar(30, 30, 140, 10, C.s), bar(50, 45, 100, 6, C.s), box(40, 60, 90, 16, "#fff"), box(135, 60, 35, 16, C.p, 4));
    } else if (title.includes("Testimonial") || title.includes("combo")) {
      els.push(box(75, 80, 50, 14, C.p, 4));
    }
  } else if (cat === "Stats Bars") {
    if (title.includes("4-column") || title.includes("Horizontal")) {
      els.push(bar(15, 35, 30, 6, C.s), bar(65, 35, 30, 6, C.s), bar(115, 35, 30, 6, C.s), bar(165, 35, 30, 6, C.s));
      els.push(box(15, 50, 30, 18, C.p, 2), box(65, 50, 30, 18, C.p, 2), box(115, 50, 30, 18, C.p, 2), box(165, 50, 30, 18, C.p, 2));
      els.push(bar(15, 75, 30, 4, C.s), bar(65, 75, 30, 4, C.s), bar(115, 75, 30, 4, C.s), bar(165, 75, 30, 4, C.s));
    } else if (title.includes("Animated") || title.includes("count-up")) {
      els.push(box(20, 25, 70, 40, "#fff"), box(110, 25, 70, 40, "#fff"));
      els.push(bar(30, 80, 140, 4, C.s), bar(30, 80, 100, 4, C.p));
    } else if (title.includes("Icon + stat")) {
      els.push(cir(30, 40, 10, C.p, 0.3), cir(130, 40, 10, C.p, 0.3), cir(80, 85, 10, C.p, 0.3));
      els.push(bar(55, 35, 30, 6, C.p), bar(155, 35, 30, 6, C.p), bar(105, 80, 30, 6, C.p));
      els.push(bar(55, 45, 30, 4, C.s), bar(155, 45, 30, 4, C.s), bar(105, 90, 30, 4, C.s));
    } else if (title.includes("Logo bar") || title.includes("combo")) {
      els.push(box(20, 15, 160, 25, "#fff"), bar(30, 22, 30, 10, C.s), bar(70, 22, 30, 10, C.s), bar(110, 22, 30, 10, C.s), bar(150, 22, 20, 10, C.s));
      els.push(box(20, 55, 70, 40, "#fff"), box(110, 55, 70, 40, "#fff"));
    } else if (title.includes("Vertical")) {
      els.push(box(60, 10, 80, 100, "#fff", 6), line(75, 60, 125, 60));
    } else if (title.includes("full-bleed") || title.includes("image")) {
      els.push(<defs key="defs"><linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={C.p} stopOpacity={isDark ? 0.6 : 0.5} /><stop offset="100%" stopColor={C.a} stopOpacity={isDark ? 0.8 : 0.7} /></linearGradient></defs>);
      els.push(<rect key="bg" width="200" height="120" fill="url(#sg1)" rx="4" />);
    } else if (title.includes("Card-based")) {
      els.push(box(10, 25, 55, 70, "#fff"), box(72, 25, 56, 70, "#fff"), box(135, 25, 55, 70, "#fff"));
      els.push(box(37, 55, 20, 12, C.p, 2), box(100, 55, 20, 12, C.p, 2), box(162, 55, 20, 12, C.p, 2));
    }
  } else if (cat === "Nav Bars") {
    if (title.includes("Minimal") || title.includes("logo + links")) {
      els.push(box(10, 15, 180, 30, "#fff"), box(20, 25, 30, 10, C.p, 2));
      els.push(bar(70, 25, 20, 8, C.s), bar(100, 25, 20, 8, C.s), bar(130, 25, 20, 8, C.s), box(160, 22, 25, 14, C.p, 4));
    } else if (title.includes("Centered logo")) {
      els.push(box(10, 15, 180, 30, "#fff"), bar(20, 25, 20, 8, C.s), bar(50, 25, 20, 8, C.s), box(80, 22, 40, 14, C.p, 2), bar(130, 25, 20, 8, C.s), bar(160, 25, 20, 8, C.s));
    } else if (title.includes("Mega menu")) {
      els.push(box(10, 10, 180, 25, "#fff"), box(20, 18, 25, 8, C.p, 2), bar(60, 18, 20, 8, C.s), bar(90, 18, 20, 8, C.s));
      els.push(box(10, 38, 180, 70, "#fff", 4, 1.5), bar(20, 48, 50, 8, C.s), bar(20, 62, 40), bar(20, 70, 40), bar(20, 78, 40), bar(80, 48, 50, 8, C.s), bar(80, 62, 40), bar(80, 70, 40));
    } else if (title.includes("Sidebar")) {
      els.push(box(10, 10, 50, 100, "#fff"), box(18, 20, 35, 8, C.p, 2), bar(18, 35, 35, 6, C.s), bar(18, 47, 35, 6, C.s), bar(18, 59, 35, 6, C.s), bar(18, 71, 35, 6, C.s), cir(27, 95, 5, C.s));
      els.push(box(65, 10, 125, 100, "#fff"));
    } else if (title.includes("Floating pill")) {
      els.push(box(40, 15, 120, 25, "#fff", 12), box(50, 22, 25, 10, C.p, 2), bar(85, 24, 15, 6, C.s), bar(108, 24, 15, 6, C.s), box(131, 22, 20, 10, C.p, 4));
    } else if (title.includes("Transparent")) {
      els.push(<defs key="defs"><linearGradient id="tg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={C.p} stopOpacity={isDark ? 0.5 : 0.3} /><stop offset="100%" stopColor={C.a} stopOpacity={isDark ? 0.7 : 0.5} /></linearGradient></defs>);
      els.push(<rect key="bg" width="200" height="120" fill="url(#tg1)" rx="4" />);
      els.push(box(10, 10, 180, 25, cardBg, 4, 0), bar(20, 17, 25, 10, cardBg), bar(60, 19, 15, 6, cardBg), bar(85, 19, 15, 6, cardBg), box(155, 17, 25, 10, cardBg, 4));
    } else if (title.includes("Command-palette")) {
      els.push(box(10, 15, 180, 25, "#fff"), box(20, 22, 25, 10, C.p, 2), box(60, 20, 80, 14, C.l, 4), bar(160, 22, 20, 10, C.s));
    } else if (title.includes("Bottom mobile")) {
      els.push(box(10, 80, 180, 30, "#fff"));
      els.push(cir(40, 92, 6, C.p, 0.3), cir(80, 92, 6, C.s, 0.3), cir(120, 92, 6, C.s, 0.3), cir(160, 92, 6, C.s, 0.3));
      els.push(bar(30, 103, 20, 4, C.s), bar(70, 103, 20, 4, C.s), bar(110, 103, 20, 4, C.s), bar(150, 103, 20, 4, C.s));
    }
  } else if (cat === "Testimonials") {
    if (title.includes("3-column") || title.includes("quote")) {
      els.push(box(10, 20, 55, 80, "#fff"), box(72, 20, 56, 80, "#fff"), box(135, 20, 55, 80, "#fff"));
      els.push(cir(37, 40, 8, C.s), cir(100, 40, 8, C.s), cir(162, 40, 8, C.s));
      els.push(bar(25, 55, 25, 4, C.s), bar(87, 55, 25, 4, C.s), bar(150, 55, 25, 4, C.s));
      els.push(bar(20, 65, 35), bar(20, 72, 35), bar(20, 79, 35));
      els.push(bar(82, 65, 35), bar(82, 72, 35), bar(82, 79, 35));
      els.push(bar(145, 65, 35), bar(145, 72, 35), bar(145, 79, 35));
    } else if (title.includes("Marquee")) {
      els.push(box(10, 30, 80, 60, "#fff"), box(95, 30, 80, 60, "#fff"));
      els.push(cir(50, 50, 10, C.s), bar(35, 65, 30, 4, C.s), cir(135, 50, 10, C.s), bar(120, 65, 30, 4, C.s));
    } else if (title.includes("Masonry")) {
      els.push(box(10, 10, 55, 50, "#fff"), box(72, 10, 56, 70, "#fff"), box(135, 10, 55, 40, "#fff"));
      els.push(box(10, 65, 55, 45, "#fff"), box(72, 85, 56, 25, "#fff"), box(135, 55, 55, 55, "#fff"));
      els.push(cir(37, 25, 6, C.s), cir(100, 25, 6, C.s), cir(162, 25, 6, C.s));
    } else if (title.includes("Single featured")) {
      els.push(box(30, 20, 140, 80, "#fff", 6), bar(50, 45, 100, 4, C.s), bar(50, 53, 100, 4, C.s), bar(50, 61, 80, 4, C.s));
      els.push(cir(80, 80, 8, C.s), bar(95, 76, 40, 4, C.s), bar(95, 83, 30, 3, C.s));
    } else if (title.includes("Video")) {
      els.push(box(10, 15, 85, 45, "#fff"), box(105, 15, 85, 45, "#fff"), box(10, 65, 85, 45, "#fff"), box(105, 65, 85, 45, "#fff"));
      els.push(<polygon key="p1" points="45,30 45,48 58,39" fill={C.p} />);
      els.push(<polygon key="p2" points="140,30 140,48 153,39" fill={C.p} />);
      els.push(<polygon key="p3" points="45,80 45,98 58,89" fill={C.p} />);
      els.push(<polygon key="p4" points="140,80 140,98 153,89" fill={C.p} />);
    } else if (title.includes("Tweet")) {
      els.push(box(10, 10, 85, 50, "#fff"), box(105, 10, 85, 50, "#fff"), box(10, 65, 85, 45, "#fff"), box(105, 65, 85, 45, "#fff"));
      els.push(cir(25, 22, 6, C.s), bar(35, 18, 30, 4, C.s), bar(35, 25, 20, 3, C.s));
      els.push(cir(120, 22, 6, C.s), bar(130, 18, 30, 4, C.s), bar(130, 25, 20, 3, C.s));
    } else if (title.includes("Logo cloud")) {
      els.push(box(20, 40, 40, 20, "#fff"), box(70, 40, 40, 20, "#fff"), box(120, 40, 40, 20, "#fff"));
      els.push(box(20, 70, 40, 20, "#fff"), box(70, 70, 40, 20, "#fff"), box(120, 70, 40, 20, "#fff"));
    } else if (title.includes("Carousel")) {
      els.push(box(30, 20, 140, 70, "#fff", 6), bar(50, 50, 100, 4, C.s), bar(50, 58, 100, 4, C.s));
      els.push(cir(80, 75, 6, C.s), bar(90, 72, 40, 4, C.s));
      els.push(cir(85, 100, 4, C.p), cir(100, 100, 4, C.s), cir(115, 100, 4, C.s));
    }
  } else if (cat === "Footer") {
    if (title.includes("Multi-column") || title.includes("sitemap")) {
      els.push(box(10, 10, 180, 100, "#fff"), box(20, 20, 30, 10, C.p, 2));
      els.push(bar(20, 40, 25), bar(20, 48, 25), bar(20, 56, 25));
      els.push(bar(70, 35, 30, 6, C.s), bar(70, 48, 25), bar(70, 56, 25), bar(70, 64, 25));
      els.push(bar(120, 35, 30, 6, C.s), bar(120, 48, 25), bar(120, 56, 25), bar(120, 64, 25));
      els.push(line(20, 90, 180, 90), bar(20, 98, 80));
    } else if (title.includes("Minimal")) {
      els.push(box(10, 80, 180, 25, "#fff"), box(20, 88, 25, 8, C.p, 2), bar(55, 90, 20, 4, C.s), bar(80, 90, 20, 4, C.s), bar(105, 90, 20, 4, C.s), bar(145, 88, 35, 8, C.s));
    } else if (title.includes("Giant logo")) {
      els.push(box(75, 85, 50, 12, C.p, 4));
      els.push(bar(40, 70, 20), bar(70, 70, 20), bar(100, 70, 20), bar(130, 70, 20));
    } else if (title.includes("Newsletter")) {
      els.push(box(10, 10, 180, 100, "#fff"), box(40, 55, 90, 14, C.l, 4), box(135, 55, 30, 14, C.p, 4));
      els.push(bar(20, 80, 30), bar(20, 88, 30), bar(70, 80, 30), bar(70, 88, 30), bar(120, 80, 30), bar(120, 88, 30));
    } else if (title.includes("Status")) {
      els.push(box(10, 80, 180, 30, "#fff"), cir(25, 92, 4, "#22c55e"));
      els.push(bar(110, 88, 20), bar(135, 88, 20), bar(160, 88, 20));
    }
  } else if (cat === "FAQ") {
    if (title.includes("Accordion single")) {
      els.push(box(30, 10, 140, 20, "#fff"), bar(40, 16, 100, 4, C.s));
      els.push(box(30, 35, 140, 50, "#fff", 4, 1.5), bar(40, 41, 100, 4, C.s), bar(40, 55, 120), bar(40, 62, 120), bar(40, 69, 80));
      els.push(box(30, 90, 140, 20, "#fff"), bar(40, 96, 100, 4, C.s));
    } else if (title.includes("Two-column")) {
      els.push(box(10, 10, 85, 25, "#fff"), box(105, 10, 85, 25, "#fff"), box(10, 40, 85, 25, "#fff", 4, 1.5), box(105, 40, 85, 25, "#fff"), box(10, 70, 85, 25, "#fff"), box(105, 70, 85, 25, "#fff"));
      els.push(bar(20, 17, 65), bar(115, 17, 65), bar(20, 47, 65), bar(115, 47, 65), bar(20, 77, 65), bar(115, 77, 65));
    } else if (title.includes("Chat-bubble")) {
      els.push(box(20, 10, 70, 25, "#fff"), box(110, 10, 70, 25, C.l, 4, 0));
      els.push(box(20, 45, 70, 25, "#fff"), box(110, 45, 70, 25, C.l, 4, 0));
      els.push(box(20, 80, 70, 25, "#fff"), box(110, 80, 70, 25, C.l, 4, 0));
      els.push(bar(30, 18, 50), bar(120, 18, 50), bar(30, 53, 50), bar(120, 53, 50));
    } else if (title.includes("Searchable")) {
      els.push(box(40, 10, 120, 18, "#fff"), cir(55, 19, 4, "#fff"), box(40, 35, 120, 15, "#fff"), box(40, 55, 120, 15, "#fff"), box(40, 75, 120, 15, "#fff"));
      els.push(bar(50, 40, 100), bar(50, 60, 100), bar(50, 80, 100));
    } else if (title.includes("Categorized")) {
      els.push(box(20, 10, 40, 14, C.p, 4), box(65, 10, 40, 14, C.s, 4), box(110, 10, 40, 14, C.s, 4));
      els.push(box(20, 35, 160, 15, "#fff"), box(20, 55, 160, 15, "#fff"), box(20, 75, 160, 15, "#fff"));
      els.push(bar(30, 40, 140), bar(30, 60, 140), bar(30, 80, 140));
    }
  } else if (cat === "Dashboards") {
    if (title.includes("Sidebar + main")) {
      els.push(box(10, 10, 50, 100, "#fff"), box(18, 20, 35, 8, C.p, 2), bar(18, 35, 35, 6, C.s), bar(18, 47, 35, 6, C.s), bar(18, 59, 35, 6, C.s));
      els.push(box(65, 10, 125, 100, "#fff"), bar(75, 20, 40, 8, C.s), box(75, 35, 105, 25, C.l, 4, 0), box(75, 65, 50, 35, C.l, 4, 0), box(130, 65, 50, 35, C.l, 4, 0));
    } else if (title.includes("Top nav")) {
      els.push(box(10, 10, 180, 25, "#fff"), box(20, 18, 25, 8, C.p, 2), bar(60, 20, 15, 6, C.s), bar(80, 20, 15, 6, C.s), bar(160, 18, 20, 10, C.s));
      els.push(box(10, 40, 180, 70, "#fff"), bar(20, 50, 40, 8, C.s), box(20, 65, 70, 35, C.l, 4, 0), box(100, 65, 80, 35, C.l, 4, 0));
    } else if (title.includes("Three-pane")) {
      els.push(box(10, 10, 40, 100, "#fff"), box(55, 10, 60, 100, "#fff"), box(120, 10, 70, 100, "#fff"));
      els.push(box(18, 20, 25, 8, C.p, 2), bar(18, 35, 25, 6, C.s), bar(18, 47, 25, 6, C.s));
      els.push(bar(65, 20, 40, 6, C.s), bar(65, 32, 40, 6, C.s), bar(65, 44, 40, 6, C.s));
    } else if (title.includes("Kanban")) {
      els.push(box(10, 10, 55, 100, "#fff"), box(72, 10, 56, 100, "#fff"), box(135, 10, 55, 100, "#fff"));
      els.push(bar(18, 20, 40, 6, C.s), bar(80, 20, 40, 6, C.s), bar(143, 20, 40, 6, C.s));
      els.push(box(18, 35, 40, 20, C.l), box(18, 60, 40, 20, C.l), box(80, 35, 40, 20, C.l, 4, 1.5), box(80, 60, 40, 20, C.l));
    } else if (title.includes("Metric cards")) {
      els.push(box(10, 10, 40, 25, "#fff"), box(55, 10, 40, 25, "#fff"), box(100, 10, 40, 25, "#fff"), box(145, 10, 45, 25, "#fff"));
      els.push(box(10, 45, 180, 65, "#fff"));
      els.push(<polyline key="chart" points="20,100 40,80 60,90 80,70 100,75 120,60 140,65 160,50 180,55" fill="none" stroke={C.p} strokeWidth="2" />);
    } else if (title.includes("Empty state")) {
      els.push(cir(100, 45, 20, C.s, 0.3), box(85, 40, 30, 10, C.s, 2), box(75, 90, 50, 14, C.p, 4));
    }
  } else if (cat === "Onboarding") {
    if (title.includes("Checklist")) {
      els.push(box(40, 10, 120, 100, "#fff", 6));
      els.push(box(50, 40, 10, 10, C.p, 2), bar(65, 42, 70), box(50, 55, 10, 10, C.p, 2), bar(65, 57, 70));
      els.push(box(50, 70, 10, 10, "#fff", 2), bar(65, 72, 70), box(50, 85, 10, 10, "#fff", 2), bar(65, 87, 70));
    } else if (title.includes("Tour")) {
      els.push(box(10, 10, 180, 100, "#fff"), bar(20, 20, 40, 10, C.s), bar(70, 20, 40, 10, C.s), bar(120, 20, 40, 10, C.s));
      els.push(box(60, 50, 80, 40, C.l, 6, 1.5));
      els.push(box(80, 80, 40, 8, C.p, 4));
    } else if (title.includes("Video") && cat === "Onboarding") {
      els.push(box(30, 15, 140, 80, "#fff", 6), box(50, 30, 100, 50, C.s, 4, 0));
      els.push(<polygon key="vp" points="95,45 95,65 115,55" fill={C.p} />);
      els.push(box(70, 90, 60, 12, C.p, 4));
    } else if (title.includes("Illustrated")) {
      els.push(cir(100, 40, 25, C.s, 0.3), cir(100, 40, 15, C.p, 0.2), box(75, 100, 50, 12, C.p, 4));
    }
  } else if (cat === "Blog / Content") {
    if (title.includes("Magazine")) {
      els.push(box(10, 10, 180, 50, "#fff"), bar(20, 20, 80, 8, C.s), bar(20, 35, 160), bar(20, 42, 160));
      els.push(box(10, 65, 55, 45, "#fff"), box(72, 65, 56, 45, "#fff"), box(135, 65, 55, 45, "#fff"));
    } else if (title.includes("Single column") || title.includes("reading")) {
      els.push(box(40, 10, 120, 100, "#fff"), bar(55, 20, 90, 8, C.s));
      for (let i = 0; i < 7; i++) els.push(bar(55, 35 + i * 9, 90));
    } else if (title.includes("Sidebar TOC")) {
      els.push(box(10, 10, 50, 100, "#fff"), box(65, 10, 125, 100, "#fff"));
      els.push(bar(18, 20, 35, 6, C.p), bar(18, 32, 35, 6, C.s), bar(18, 44, 35, 6, C.s));
      els.push(bar(75, 20, 105, 8, C.s), bar(75, 35, 105), bar(75, 42, 105), bar(75, 53, 105, 8, C.s));
    } else if (title.includes("Card grid") || title.includes("filters")) {
      els.push(box(20, 10, 30, 10, C.p, 4), box(55, 10, 30, 10, C.s, 4), box(90, 10, 30, 10, C.s, 4));
      els.push(box(10, 28, 55, 40, "#fff"), box(72, 28, 56, 40, "#fff"), box(135, 28, 55, 40, "#fff"));
      els.push(box(10, 75, 55, 35, "#fff"), box(72, 75, 56, 35, "#fff"), box(135, 75, 55, 35, "#fff"));
    }
  } else if (cat === "Contact") {
    if (title.includes("Split form")) {
      els.push(box(10, 15, 90, 90, "#fff"), box(105, 15, 85, 90, C.l, 4, 0));
      els.push(bar(20, 25, 70, 8, C.s), box(20, 40, 70, 10, C.l), box(20, 55, 70, 10, C.l), box(20, 75, 70, 14, C.p, 4));
    } else if (title.includes("Support channel")) {
      els.push(box(10, 20, 85, 45, "#fff"), box(105, 20, 85, 45, "#fff"), box(10, 70, 85, 40, "#fff"), box(105, 70, 85, 40, "#fff"));
      els.push(cir(52, 40, 8, C.p, 0.3), cir(147, 40, 8, C.p, 0.3), cir(52, 85, 8, C.p, 0.3), cir(147, 85, 8, C.p, 0.3));
    } else if (title.includes("Full-page") || title.includes("minimal form")) {
      els.push(box(50, 15, 100, 80, "#fff", 6), bar(70, 25, 60, 8, C.s), box(70, 40, 60, 10, C.l), box(70, 55, 60, 10, C.l), box(70, 75, 60, 14, C.p, 4));
    }
  } else if (cat === "Bonus") {
    if (title.includes("Comparison table")) {
      els.push(box(10, 15, 90, 50, "#fff"), box(105, 15, 85, 50, "#fff", 4, 1.5), bar(20, 30, 70, 6, C.s), bar(20, 45, 70));
      els.push(bar(115, 30, 60, 6, C.p), bar(115, 45, 60));
      els.push(box(10, 70, 180, 40, "#fff"), bar(20, 80, 160, 4, C.s), bar(20, 90, 160, 4, C.s), bar(20, 100, 160, 4, C.s));
    } else if (title.includes("Notification")) {
      els.push(box(10, 10, 180, 25, "#fff"), box(10, 40, 180, 25, C.l, 4, 0), box(10, 70, 180, 25, "#fff"));
      els.push(cir(25, 52, 5, C.p, 0.5), bar(35, 48, 80, 6, C.s), bar(35, 58, 120, 4, C.s));
    } else if (title.includes("Search results")) {
      els.push(box(40, 10, 120, 15, "#fff"), box(40, 30, 120, 25, "#fff"), box(40, 60, 120, 25, "#fff"), box(40, 90, 120, 25, "#fff"));
      els.push(bar(50, 35, 100, 6, C.s), bar(50, 45, 100, 4, C.s));
      els.push(bar(50, 65, 100, 6, C.s), bar(50, 75, 100, 4, C.s));
    } else if (title.includes("Settings")) {
      els.push(box(10, 10, 50, 100, "#fff"), box(65, 10, 125, 100, "#fff"));
      els.push(bar(18, 20, 35, 6, C.p), bar(18, 32, 35, 6, C.s), bar(18, 44, 35, 6, C.s));
      els.push(bar(75, 20, 105, 8, C.s), box(75, 35, 105, 20, C.l, 4, 0), bar(75, 62, 105, 8, C.s), box(75, 75, 105, 20, C.l, 4, 0));
    } else if (title.includes("Table")) {
      els.push(box(10, 10, 180, 100, "#fff"), line(10, 35, 190, 35), line(10, 55, 190, 55), line(10, 75, 190, 75), line(10, 95, 190, 95));
      els.push(line(70, 10, 70, 110), line(130, 10, 130, 110));
      els.push(bar(15, 17, 50, 6, C.p), bar(75, 17, 50, 6, C.p), bar(135, 17, 50, 6, C.p));
      for (let r = 0; r < 3; r++) {
        els.push(bar(15, 42 + r * 20, 45), bar(75, 42 + r * 20, 45), bar(135, 42 + r * 20, 45));
      }
    }
  }

  if (els.length === 0) {
    els.push(cir(100, 60, 20, C.p, 0.15));
    els.push(box(70, 50, 60, 20, C.p, 4));
  }

  return els;
}
