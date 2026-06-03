"use client";

import { useMemo, useRef, useEffect } from "react";
import { Header } from "./Header";
import { PromptCard } from "./PromptCard";
import { motion } from "framer-motion";
import { t, type Language } from "@/lib/translations";

interface Prompt {
  id: string;
  title: string;
  titleCn: string;
  description: string;
  descriptionCn: string;
  category: string;
  prompt: string;
  promptCn: string;
}

const categoryTranslationKeys: Record<string, string> = {
  "All": "sidebar.all",
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

const prompts: Prompt[] = [
  {
    id: "auth-1",
    title: "Split-screen with visual",
    titleCn: "分屏视觉布局",
    description:
      "Form fields on one side, visual panel on the other — product screenshot or branded graphic",
    descriptionCn:
      "表单字段在一侧，视觉面板在另一侧——产品截图或品牌图形",
    category: "Auth Forms",
    prompt:
      "Create an auth form as a split-screen layout. Place the form fields on one side and a visual panel on the other (product screenshot, illustration, or branded graphic area). Include email, password, and a primary CTA. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个分屏布局的登录表单。将表单字段放在一侧，视觉面板放在另一侧（产品截图、插图或品牌图形区域）。包含邮箱、密码和主要操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "auth-2",
    title: "Centered card on background",
    titleCn: "背景居中卡片",
    description:
      "Floating card with heading, email, password, CTA, and sign-up link on a full-page background",
    descriptionCn:
      "全页背景上的浮动卡片，包含标题、邮箱、密码、操作按钮和注册链接",
    category: "Auth Forms",
    prompt:
      "Create an auth form as a centered floating card on a full-page background. Include heading, email, password, primary CTA, and a link to switch to sign up. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个全页背景上的居中浮动卡片登录表单。包含标题、邮箱、密码、主要操作按钮和切换到注册的链接。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "auth-3",
    title: "Minimal single-column",
    titleCn: "极简单列布局",
    description:
      "No card container — just logo, heading, fields, and CTA stacked cleanly",
    descriptionCn:
      "无卡片容器——Logo、标题、字段和操作按钮整洁堆叠",
    category: "Auth Forms",
    prompt:
      "Create an auth form as a minimal single-column layout with no card container — just the logo, heading, form fields, and CTA stacked cleanly down the page. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个极简单列布局的登录表单，没有卡片容器——只有Logo、标题、表单字段和操作按钮从上到下整洁排列。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "auth-4",
    title: "Social-first stack",
    titleCn: "社交优先堆叠",
    description:
      "Social login buttons primary at top, email/password secondary below a divider",
    descriptionCn:
      "社交登录按钮在顶部为主，邮箱/密码在分隔线下方为辅",
    category: "Auth Forms",
    prompt:
      'Create an auth form with social login buttons (Google, GitHub, Apple) as the primary option at the top, and email/password collapsed or secondary below a divider that says "or continue with email". Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.',
    promptCn:
      "创建一个以社交登录按钮（Google、GitHub、Apple）为主要选项的登录表单，邮箱/密码折叠或次要显示在分隔线下方，分隔线显示'或使用邮箱继续'。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "auth-5",
    title: "Magic link only",
    titleCn: "纯魔法链接",
    description:
      "Single email input and one CTA — no password field, magic link flow",
    descriptionCn:
      "单个邮箱输入框和一个操作按钮——无密码字段，魔法链接流程",
    category: "Auth Forms",
    prompt:
      "Create an auth form as a magic-link-only flow. A single email input and one primary CTA button — no password field. Include a short line of helper text explaining a login link will be sent to their email. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个纯魔法链接流程的登录表单。单个邮箱输入框和一个主要操作按钮——没有密码字段。包含一行简短的辅助文字说明登录链接将发送到他们的邮箱。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "auth-6",
    title: "Multi-step wizard",
    titleCn: "多步骤向导",
    description:
      "Progress indicator at top, signup split across 2–3 logical steps with back/next",
    descriptionCn:
      "顶部进度指示器，注册流程分成2-3个逻辑步骤，带返回/下一步",
    category: "Auth Forms",
    prompt:
      "Create an auth form as a multi-step wizard with a progress indicator at the top. Split signup across 2–3 logical steps (e.g. email → password → profile details) with back/next navigation. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个多步骤向导式登录表单，顶部有进度指示器。将注册流程分成2-3个逻辑步骤（例如 邮箱 → 密码 → 个人资料），带有返回/下一步导航。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "pr-1",
    title: "Classic 3-tier cards",
    titleCn: "经典三层卡片",
    description:
      "Three side-by-side tier cards with the middle highlighted as recommended",
    descriptionCn:
      "三张并排层级卡片，中间突出显示为推荐选项",
    category: "Pricing",
    prompt:
      "Create a pricing section with three side-by-side tier cards (e.g. Starter, Pro, Business) with the middle tier visually highlighted as the recommended option. Include plan names, prices, feature lists, and CTAs. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个包含三张并排层级卡片的定价区域（例如入门版、专业版、商业版），中间层级在视觉上突出显示为推荐选项。包含计划名称、价格、功能列表和操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "pr-2",
    title: "Monthly/annual toggle",
    titleCn: "月度/年度切换",
    description:
      "Billing toggle at top with a 'save X%' badge, prices update based on selection",
    descriptionCn:
      "顶部计费切换，年度选项有'节省X%'徽章，价格随选择更新",
    category: "Pricing",
    prompt:
      'Create a pricing section with a monthly/annual billing toggle at the top and a "save X%" badge on the annual option. Prices should visibly update based on the toggle. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.',
    promptCn:
      '创建一个顶部有月度/年度计费切换的定价区域，年度选项上有"节省X%"徽章。价格应根据切换明显更新。匹配我截图中显示的视觉风格、颜色、排版和整体美感。',
  },
  {
    id: "pr-3",
    title: "Comparison table",
    titleCn: "对比表格",
    description:
      "Plans as columns, features as rows with checkmarks and dashes",
    descriptionCn:
      "计划为列，功能为行，使用勾选号和破折号",
    category: "Pricing",
    prompt:
      "Create a pricing section as a detailed comparison table with plans as columns and features as rows, using checkmarks and dashes to show what's included in each tier. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个详细的比较表格式定价区域，计划作为列，功能作为行，使用勾选号和破折号显示每个层级包含的内容。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "pr-4",
    title: "Single-tier hero",
    titleCn: "单层英雄式",
    description:
      "One large centered card with price, full feature list, and prominent CTA",
    descriptionCn:
      "一张大型居中卡片，包含价格、完整功能列表和醒目操作按钮",
    category: "Pricing",
    prompt:
      "Create a pricing section as a single-tier hero layout — one large centered card with the price, a full feature list, and a prominent CTA. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个单层英雄式布局的定价区域——一张大型居中卡片，包含价格、完整功能列表和醒目的操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "pr-5",
    title: "Usage slider",
    titleCn: "使用滑块",
    description:
      "Interactive usage slider that dynamically updates the displayed price",
    descriptionCn:
      "交互式使用滑块，动态更新显示的价格",
    category: "Pricing",
    prompt:
      "Create a pricing section with an interactive usage slider at the top (e.g. users, requests, or seats) that dynamically updates the displayed price below. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个顶部有交互式使用滑块的定价区域（例如用户数、请求数或席位数），动态更新下方显示的价格。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "pr-6",
    title: "Credit pack grid",
    titleCn: "积分包网格",
    description:
      "Grid of credit pack tiles with amounts, prices, and badges",
    descriptionCn:
      "积分包网格，显示数量、价格和徽章",
    category: "Pricing",
    prompt:
      'Create a pricing section as a grid of credit pack tiles, each showing the credit amount, price, and a "best value" or "most popular" badge on one option. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.',
    promptCn:
      '创建一个积分包网格布局的定价区域，每个积分包显示积分数量、价格，其中一个选项有"最超值"或"最受欢迎"徽章。匹配我截图中显示的视觉风格、颜色、排版和整体美感。',
  },
  {
    id: "pr-7",
    title: "Free vs Pro split",
    titleCn: "免费版与专业版对比",
    description:
      "Two-column split with strong visual contrast between Free and Pro",
    descriptionCn:
      "两列分割，免费版与专业版有强烈视觉对比",
    category: "Pricing",
    prompt:
      "Create a pricing section as a two-column split between a Free tier and a Pro tier, with strong visual contrast between the two so the upgrade path is obvious. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个免费版和专业版两列分割的定价区域，两者之间有强烈的视觉对比，使升级路径一目了然。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "pr-8",
    title: "Stacked mobile-first cards",
    titleCn: "移动端优先堆叠卡片",
    description:
      "Full-width stacked cards, one per tier, each with its full feature list",
    descriptionCn:
      "全宽堆叠卡片，每层一张，各自显示完整功能列表",
    category: "Pricing",
    prompt:
      "Create a pricing section as full-width stacked cards, one per tier. No horizontal comparison — each card stands on its own with its full feature list visible. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个全宽堆叠卡片布局的定价区域，每个层级一张卡片。没有水平比较——每张卡片独立显示其完整功能列表。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-1",
    title: "3-column icon grid",
    titleCn: "三列图标网格",
    description:
      "Three-column grid with icon, feature title, and short description",
    descriptionCn:
      "三列网格，包含图标、功能标题和简短描述",
    category: "Features / Bento",
    prompt:
      "Create a feature list as a three-column grid, each column containing an icon, feature title, and short description. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个三列网格布局的功能列表，每列包含一个图标、功能标题和简短描述。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-2",
    title: "Bento grid",
    titleCn: "便当盒网格",
    description:
      "Asymmetric tiles of varying sizes, important features in larger tiles",
    descriptionCn:
      "非对称图块，重要功能占据更大图块",
    category: "Features / Bento",
    prompt:
      "Create a feature list as an asymmetric bento grid — tiles of varying sizes arranged in an interesting layout, with the most important features occupying larger tiles. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个非对称便当盒网格布局的功能列表——不同大小的图块以有趣的布局排列，最重要的功能占据更大的图块。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-3",
    title: "Alternating rows",
    titleCn: "交错排列",
    description:
      "Zigzag rows with text on one side and visual on the other, alternating",
    descriptionCn:
      "Zigzag排列，文字和视觉交替显示在两侧",
    category: "Features / Bento",
    prompt:
      "Create a feature list as alternating zigzag rows — each feature has text on one side and a visual/screenshot placeholder on the other, with sides swapping on each row. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个交错排列的功能列表——每个功能一侧是文字，另一侧是视觉/截图占位符，每行交替左右排列。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-4",
    title: "Tabbed features",
    titleCn: "选项卡功能",
    description:
      "Tabbed interface where each tab shows a different feature with visual",
    descriptionCn:
      "选项卡界面，每个选项卡显示不同功能和视觉效果",
    category: "Features / Bento",
    prompt:
      "Create a feature list as a tabbed interface where each tab switches between different features, with each tab revealing a screenshot or visual alongside the feature description. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个选项卡式界面的功能列表，每个选项卡切换到不同的功能，每个选项卡显示截图或视觉效果以及功能描述。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-5",
    title: "Accordion list",
    titleCn: "手风琴列表",
    description:
      "Vertical accordion of collapsible rows with full description on expand",
    descriptionCn:
      "垂直手风琴式可折叠行，展开显示完整描述",
    category: "Features / Bento",
    prompt:
      "Create a feature list as a vertical accordion of collapsible rows. Each row shows the feature title, with full description and visuals expanding on click. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个垂直手风琴式可折叠行的功能列表。每行显示功能标题，点击展开显示完整描述和视觉效果。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-6",
    title: "Scroll-triggered reveal",
    titleCn: "滚动触发显示",
    description:
      "Sticky visual on one side, feature descriptions scroll on the other",
    descriptionCn:
      "一侧固定视觉效果，另一侧功能描述滚动",
    category: "Features / Bento",
    prompt:
      "Create a feature list with a sticky visual on one side that stays in place while feature descriptions scroll past on the other side, with each feature highlighting in turn. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个功能列表，一侧是固定的视觉效果保持不动，另一侧的功能描述滚动经过，每个功能依次高亮显示。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-7",
    title: "Icon wall",
    titleCn: "图标墙",
    description:
      "Dense grid of small icon tiles — compact cards with icon and short label",
    descriptionCn:
      "密集小图标网格——紧凑卡片只有图标和简短标签",
    category: "Features / Bento",
    prompt:
      "Create a feature list as a dense grid of small icon tiles — compact cards with just an icon and short label, showing many features at a glance. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个密集的小图标网格布局的功能列表——紧凑的卡片只有图标和简短标签，一目了然地显示多个功能。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-8",
    title: "Before/after comparison",
    titleCn: "前后对比",
    description:
      "Side-by-side comparison showing without vs. with the product",
    descriptionCn:
      "并排对比，显示使用产品前后效果",
    category: "Features / Bento",
    prompt:
      "Create a feature list as a before/after comparison showing what things look like without the product on one side and with the product on the other. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个前后对比的功能列表，一侧显示没有产品时的样子，另一侧显示有产品时的样子。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "hr-1",
    title: "Centered text + screenshot",
    titleCn: "居中文字+截图",
    description:
      "Centered heading, subheading, CTAs at top, large product screenshot below",
    descriptionCn:
      "居中标题、副标题、操作按钮在顶部，下方大型产品截图",
    category: "Hero Sections",
    prompt:
      "Create a hero section with centered heading, subheading, and CTAs at the top, and a large product screenshot or visual positioned directly below. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个英雄区域，顶部是居中的标题、副标题和操作按钮，下方是大型产品截图或视觉效果。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "hr-2",
    title: "Split hero",
    titleCn: "分屏英雄区",
    description:
      "Heading and CTAs on one side, product mockup on the other",
    descriptionCn:
      "标题和操作按钮在一侧，产品模型在另一侧",
    category: "Hero Sections",
    prompt:
      "Create a hero section as a split layout — heading, subheading, and CTAs on one side, and a product mockup or visual on the other. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个分屏布局的英雄区域——一侧是标题、副标题和操作按钮，另一侧是产品模型或视觉效果。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "hr-3",
    title: "Video background",
    titleCn: "视频背景",
    description:
      "Looping video or animated background behind heading and CTAs",
    descriptionCn:
      "标题和操作按钮后面是循环视频或动画背景",
    category: "Hero Sections",
    prompt:
      "Create a hero section with a looping video or animated background behind the heading text and CTAs. Overlay the text clearly so it remains readable. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个英雄区域，标题文字和操作按钮后面是循环播放的视频或动画背景。文字覆盖要清晰可读。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "hr-4",
    title: "Animated gradient mesh",
    titleCn: "动画渐变网格",
    description:
      "Animated gradient mesh background with heading and CTAs on top",
    descriptionCn:
      "动画渐变网格背景，标题和操作按钮在上方",
    category: "Hero Sections",
    prompt:
      "Create a hero section with an animated gradient mesh background and the heading, subheading, and CTAs layered centrally on top. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个英雄区域，使用动画渐变网格背景，标题、副标题和操作按钮居中分层叠加在上面。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "hr-5",
    title: "Terminal/code hero",
    titleCn: "终端/代码英雄区",
    description:
      "Terminal or code-editor visual as central element with animated typing",
    descriptionCn:
      "终端或代码编辑器视觉为中心元素，带打字动画",
    category: "Hero Sections",
    prompt:
      "Create a hero section with a terminal or code-editor visual as the central element — featuring an animated typing effect or code snippet — alongside the heading and CTAs. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个英雄区域，以终端或代码编辑器视觉效果为中心元素——带有动画打字效果或代码片段——与标题和操作按钮并排显示。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "hr-6",
    title: "Floating UI elements",
    titleCn: "浮动UI元素",
    description:
      "Multiple product screenshots or UI cards floating around the central heading",
    descriptionCn:
      "多个产品截图或UI卡片围绕中心标题浮动",
    category: "Hero Sections",
    prompt:
      "Create a hero section with multiple product screenshots or UI cards floating, tilted, or layered around the central heading and CTAs. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个英雄区域，多个产品截图或UI卡片围绕中心标题和操作按钮浮动、倾斜或分层排列。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "hr-7",
    title: "Big bold typography",
    titleCn: "超大粗体排版",
    description:
      "Oversized, bold typography as the focal point with minimal supporting elements",
    descriptionCn:
      "超大粗体排版为焦点，辅助元素最少",
    category: "Hero Sections",
    prompt:
      "Create a hero section with oversized, bold typography as the focal point — the headline dominating the viewport with minimal supporting elements. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个英雄区域，以超大粗体排版为焦点——标题主导视口，辅助元素最少。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "hr-8",
    title: "Hero with inline form",
    titleCn: "内联表单英雄区",
    description:
      "Email capture form embedded directly under the heading",
    descriptionCn:
      "邮箱收集表单直接嵌入标题下方",
    category: "Hero Sections",
    prompt:
      "Create a hero section with an email capture form embedded directly under the heading — a single input and CTA button inline, instead of a separate button. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个英雄区域，标题下方直接嵌入邮箱收集表单——单个输入框和操作按钮内联显示，而不是单独的按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "cta-1",
    title: "Full-bleed gradient banner",
    titleCn: "全出血渐变横幅",
    description:
      "Full-bleed section with gradient background, centered heading, and CTA",
    descriptionCn:
      "全出血渐变背景区域，居中标题和操作按钮",
    category: "CTA Banners",
    prompt:
      "Create a CTA banner as a full-bleed section with a gradient background, centered heading, short supporting line, and a prominent CTA button. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个全出血渐变背景的CTA横幅，居中标题、简短辅助文字和醒目的操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "cta-2",
    title: "Split CTA card",
    titleCn: "分屏CTA卡片",
    description:
      "Contained card with heading on one side and CTA button on the other",
    descriptionCn:
      "包含卡片，一侧标题，另一侧操作按钮",
    category: "CTA Banners",
    prompt:
      "Create a CTA banner as a contained card with the heading and description on one side and the CTA button aligned on the other. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个包含卡片的CTA横幅，一侧是标题和描述，另一侧是操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "cta-3",
    title: "Sticky bottom bar",
    titleCn: "粘性底部栏",
    description:
      "Fixed bar at viewport bottom with message, CTA, and dismiss option",
    descriptionCn:
      "固定在视口底部的栏，包含消息、操作按钮和关闭选项",
    category: "CTA Banners",
    prompt:
      "Create a CTA as a sticky bar fixed to the bottom of the viewport, with a short message, CTA button, and a dismiss option. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个固定在视口底部的粘性CTA栏，包含简短消息、操作按钮和关闭选项。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "cta-4",
    title: "Patterned background",
    titleCn: "图案背景",
    description:
      "Subtle pattern or texture behind centered message and button",
    descriptionCn:
      "居中消息和按钮后面有微妙图案或纹理",
    category: "CTA Banners",
    prompt:
      "Create a CTA banner with a subtle pattern or texture in the background (dots, grid, noise) behind the centered message and button. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个CTA横幅，背景使用微妙的图案或纹理（点、网格、噪点），居中消息和按钮在上面。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "cta-5",
    title: "Dual-CTA",
    titleCn: "双CTA按钮",
    description:
      "Two buttons side by side — primary and secondary action",
    descriptionCn:
      "两个按钮并排——主要和次要操作",
    category: "CTA Banners",
    prompt:
      "Create a CTA banner with two buttons side by side — a primary action and a secondary action — under the heading and supporting text. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个CTA横幅，标题和辅助文字下方有两个并排按钮——主要操作和次要操作。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "cta-6",
    title: "Inline email capture CTA",
    titleCn: "内联邮箱收集CTA",
    description:
      "Email input and submit button inline beneath heading and subheading",
    descriptionCn:
      "邮箱输入框和提交按钮内联显示在标题下方",
    category: "CTA Banners",
    prompt:
      "Create a CTA banner with an inline email capture — heading, subheading, then an email input and submit button inline beneath. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个带内联邮箱收集的CTA横幅——标题、副标题，然后是邮箱输入框和提交按钮内联显示在下方。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "cta-7",
    title: "Testimonial + CTA combo",
    titleCn: "推荐语+CTA组合",
    description:
      "Customer quote above the heading and CTA for social proof",
    descriptionCn:
      "客户引言在标题和操作按钮上方，增加社会证明",
    category: "CTA Banners",
    prompt:
      "Create a CTA banner with a customer quote or testimonial positioned above the heading and CTA, reinforcing the action with social proof. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个CTA横幅，客户引言或推荐语位于标题和操作按钮上方，用社会证明强化行动号召。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "st-1",
    title: "Horizontal 4-column numbers",
    titleCn: "水平四列数字",
    description:
      "Four large numbers in a row with descriptive labels underneath",
    descriptionCn:
      "四个大数字水平排列，下方有描述性标签",
    category: "Stats Bars",
    prompt:
      "Create a stats bar as a horizontal row of four large numbers, each with a small descriptive label underneath. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个统计栏，水平排列四个大数字，每个数字下方有一个描述性小标签。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "st-2",
    title: "Animated count-up",
    titleCn: "动画递增",
    description:
      "Numbers animate counting up when scrolled into view",
    descriptionCn:
      "数字滚动到视图时动画递增",
    category: "Stats Bars",
    prompt:
      "Create a stats bar with numbers that animate counting up when scrolled into view, each with a supporting label. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个统计栏，数字在滚动到视图时动画递增，每个数字都有辅助标签。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "st-3",
    title: "Icon + stat pairs",
    titleCn: "图标+数据配对",
    description:
      "Relevant icon paired with each number and label",
    descriptionCn:
      "相关图标与每个数字和标签配对",
    category: "Stats Bars",
    prompt:
      "Create a stats bar with an icon next to each stat, pairing a relevant symbol with each number and label. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个统计栏，每个统计数据旁边都有图标，将相关符号与每个数字和标签配对。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "st-4",
    title: "Logo bar + stats combo",
    titleCn: "Logo栏+数据组合",
    description:
      "Customer logos above or beside key stats like '10k+ users'",
    descriptionCn:
      "客户Logo在关键统计数据上方或旁边",
    category: "Stats Bars",
    prompt:
      'Create a combined section with a row of customer/partner logos above or beside key stats like "10k+ users" or "trusted by 500+ teams". Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.',
    promptCn:
      '创建一个组合区域，客户/合作伙伴Logo行位于关键统计数据上方或旁边，如"10k+用户"或"500+团队信赖"。匹配我截图中显示的视觉风格、颜色、排版和整体美感。',
  },
  {
    id: "st-5",
    title: "Vertical stacked stats",
    titleCn: "垂直堆叠数据",
    description:
      "Vertical stack suited for a narrow column or sidebar",
    descriptionCn:
      "适合窄列或侧边栏的垂直堆叠布局",
    category: "Stats Bars",
    prompt:
      "Create a stats component as a vertical stack of stats suited for a narrow column or sidebar, with each number and label stacked. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个统计数据组件，适合窄列或侧边栏的垂直堆叠布局，每个数字和标签垂直堆叠。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "st-6",
    title: "Stats over full-bleed image",
    titleCn: "全出血图片上的数据",
    description:
      "Full-bleed image or gradient background with stats overlaid",
    descriptionCn:
      "全出血图片或渐变背景，统计数据叠加显示",
    category: "Stats Bars",
    prompt:
      "Create a stats bar as a full-bleed section with an image or gradient background, and the stats overlaid on top with strong contrast. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个全出血图片或渐变背景的统计栏，统计数据叠加在上面，形成强烈对比。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "st-7",
    title: "Card-based stats",
    titleCn: "卡片式数据",
    description:
      "Row of individual bordered cards, each containing one stat",
    descriptionCn:
      "一排独立带边框卡片，每张包含一个统计数据",
    category: "Stats Bars",
    prompt:
      "Create a stats bar as a row of individual bordered cards, each containing one stat and its label. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个统计栏，由一排独立的带边框卡片组成，每张卡片包含一个统计数据及其标签。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "nv-1",
    title: "Minimal logo + links + CTA",
    titleCn: "极简Logo+链接+CTA",
    description:
      "Logo left, links center/right, CTA button far right",
    descriptionCn:
      "Logo在左，链接居中/右，CTA按钮在最右",
    category: "Nav Bars",
    prompt:
      "Create a nav bar as a clean horizontal layout — logo on the left, navigation links in the middle or right, and a primary CTA button at the far right. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个简洁水平布局的导航栏——Logo在左侧，导航链接在中间或右侧，主要操作按钮在最右边。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "nv-2",
    title: "Centered logo split nav",
    titleCn: "居中Logo分割导航",
    description:
      "Logo centered with navigation links split evenly on either side",
    descriptionCn:
      "Logo居中，导航链接均匀分布在两侧",
    category: "Nav Bars",
    prompt:
      "Create a nav bar with the logo centered and navigation links split evenly on either side. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个Logo居中、导航链接均匀分布在两侧的导航栏。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "nv-3",
    title: "Mega menu",
    titleCn: "大型菜单",
    description:
      "Full-width mega menu dropdown with categorized sub-links",
    descriptionCn:
      "全宽大型菜单下拉框，包含分类子链接",
    category: "Nav Bars",
    prompt:
      "Create a nav bar where hovering a top-level link reveals a full-width mega menu dropdown with categorized sub-links and optional visuals. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个导航栏，悬停顶级链接时显示全宽大型菜单下拉框，包含分类子链接和可选视觉效果。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "nv-4",
    title: "Sidebar nav",
    titleCn: "侧边栏导航",
    description:
      "Vertical sidebar with logo at top, links stacked, user section at bottom",
    descriptionCn:
      "垂直侧边栏，Logo在顶部，链接堆叠，用户区域在底部",
    category: "Nav Bars",
    prompt:
      "Create a vertical sidebar navigation on the left side of the page, with the logo at the top, navigation links stacked, and a user/account section at the bottom. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个页面左侧的垂直侧边栏导航，顶部是Logo，导航链接垂直堆叠，底部是用户/账户区域。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "nv-5",
    title: "Floating pill nav",
    titleCn: "浮动药丸导航",
    description:
      "Rounded pill detached from top edge, centered with subtle shadow",
    descriptionCn:
      "圆角药丸形脱离顶部边缘，水平居中，带微妙阴影",
    category: "Nav Bars",
    prompt:
      "Create a nav bar as a floating rounded pill detached from the top edge of the page, centered horizontally with a subtle shadow. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个浮动圆角药丸形导航栏，脱离页面顶部边缘，水平居中，带有微妙阴影。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "nv-6",
    title: "Transparent over hero",
    titleCn: "透明覆盖英雄区",
    description:
      "Transparent when over hero, becomes solid on scroll",
    descriptionCn:
      "覆盖英雄区时透明，滚动时变为实心",
    category: "Nav Bars",
    prompt:
      "Create a nav bar that appears transparent when layered over the hero section, becoming solid on scroll. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个导航栏，覆盖在英雄区域时显示为透明，滚动时变为实心。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "nv-7",
    title: "Command-palette nav",
    titleCn: "命令面板导航",
    description:
      "Prominent search/command-palette input (⌘K) as central element",
    descriptionCn:
      "突出的搜索/命令面板输入框（⌘K样式）为中心元素",
    category: "Nav Bars",
    prompt:
      "Create a nav bar with a prominent search or command-palette input (⌘K style) as the central element, with minimal links around it. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个导航栏，以突出的搜索或命令面板输入框（⌘K样式）为中心元素，周围链接最少。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "nv-8",
    title: "Bottom mobile nav",
    titleCn: "移动端底部导航",
    description:
      "Bottom tab bar for mobile — icons with labels, app-style",
    descriptionCn:
      "移动端底部标签栏——图标和标签，应用风格",
    category: "Nav Bars",
    prompt:
      "Create a bottom tab bar for mobile — icons with labels fixed to the bottom of the viewport, app-style. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个移动端底部标签栏——图标和标签固定在视口底部，应用风格。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ts-1",
    title: "3-column quote cards",
    titleCn: "三列引言卡片",
    description:
      "Three side-by-side quote cards with photo, name, role, and quote",
    descriptionCn:
      "三张并排引言卡片，包含照片、姓名、职位和引言",
    category: "Testimonials",
    prompt:
      "Create a testimonial section as three side-by-side quote cards, each with a customer photo, name, role, and quote. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个三张并排引言卡片的推荐区域，每张包含客户照片、姓名、职位和引言。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ts-2",
    title: "Marquee scroll",
    titleCn: "跑马灯滚动",
    description:
      "Infinite horizontally scrolling marquee of testimonial tiles",
    descriptionCn:
      "无限水平滚动的推荐卡片跑马灯",
    category: "Testimonials",
    prompt:
      "Create a testimonial section as an infinite horizontally scrolling marquee of testimonial tiles. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个无限水平滚动的推荐区域，展示推荐卡片的跑马灯效果。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ts-3",
    title: "Masonry grid",
    titleCn: "瀑布流网格",
    description:
      "Masonry/Pinterest-style grid of varied-height testimonial cards",
    descriptionCn:
      "瀑布流/Pinterest风格的推荐卡片网格",
    category: "Testimonials",
    prompt:
      "Create a testimonial section as a masonry/Pinterest-style grid of varied-height testimonial cards. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个瀑布流/Pinterest风格的推荐区域，展示不同高度的推荐卡片网格。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ts-4",
    title: "Single featured testimonial",
    titleCn: "单条特色推荐",
    description:
      "One large featured quote with photo, name, role, and company logo",
    descriptionCn:
      "一条大型特色引言，包含照片、姓名、职位和公司Logo",
    category: "Testimonials",
    prompt:
      "Create a testimonial section as a single large featured quote with the customer's photo, name, role, and company logo prominently displayed. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个单独的大型特色引言推荐区域，突出显示客户的照片、姓名、职位和公司Logo。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ts-5",
    title: "Video testimonial grid",
    titleCn: "视频推荐网格",
    description:
      "Grid of clickable video thumbnails with play icon, name, and company",
    descriptionCn:
      "可点击视频缩略图网格，带播放图标、姓名和公司",
    category: "Testimonials",
    prompt:
      "Create a testimonial section as a grid of clickable video thumbnails, each with a play icon and the customer's name and company. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个可点击视频缩略图网格的推荐区域，每个缩略图有播放图标、客户姓名和公司。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ts-6",
    title: "Tweet wall",
    titleCn: "推文墙",
    description:
      "Cards styled like X/Twitter posts — avatar, handle, timestamp, content",
    descriptionCn:
      "卡片样式类似X/Twitter帖子——头像、用户名、时间戳和内容",
    category: "Testimonials",
    prompt:
      "Create a testimonial section as a wall of cards styled like X/Twitter posts — avatar, handle, timestamp, and quote content. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个推荐墙，卡片样式类似X/Twitter帖子——头像、用户名、时间戳和引言内容。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ts-7",
    title: "Logo cloud",
    titleCn: "Logo云",
    description:
      "Clean grid or row of customer/partner logos with heading above",
    descriptionCn:
      "整洁的网格或一行客户/合作伙伴Logo，上方有标题",
    category: "Testimonials",
    prompt:
      "Create a logo cloud — a clean grid or row of customer/partner logos with a short heading above. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个Logo云——整洁的网格或一行客户/合作伙伴Logo，上方有简短标题。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ts-8",
    title: "Carousel with dots",
    titleCn: "轮播带导航点",
    description:
      "Single-testimonial carousel with navigation dots or arrows",
    descriptionCn:
      "单条推荐轮播，带导航点或箭头",
    category: "Testimonials",
    prompt:
      "Create a testimonial section as a single-testimonial carousel with navigation dots or arrows to cycle through. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个单条推荐轮播区域，带有导航点或箭头用于切换。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-1f",
    title: "Multi-column sitemap",
    titleCn: "多列站点地图",
    description:
      "Grouped links (Product, Company, Resources), logo, tagline, copyright",
    descriptionCn:
      "分组链接（产品、公司、资源），Logo、标语、版权",
    category: "Footer",
    prompt:
      "Create a footer as a multi-column sitemap with grouped links (Product, Company, Resources, Legal), the logo and tagline on the far left, and copyright at the bottom. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个多列站点地图式页脚，包含分组链接（产品、公司、资源、法律），最左侧是Logo和标语，底部是版权信息。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-2f",
    title: "Minimal single-row",
    titleCn: "极简单行",
    description:
      "Logo, a few key links, and copyright text inline in one row",
    descriptionCn:
      "Logo、几个关键链接和版权文字内联显示在一行",
    category: "Footer",
    prompt:
      "Create a footer as a minimal single row — logo, a few key links, and copyright text inline. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个极简单行页脚——Logo、几个关键链接和版权文字内联显示。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-3f",
    title: "Giant logo footer",
    titleCn: "巨大Logo页脚",
    description:
      "Huge wordmark as centerpiece with links arranged around it",
    descriptionCn:
      "巨大文字商标为中心，链接排列在周围",
    category: "Footer",
    prompt:
      "Create a footer with a huge wordmark or logo as the centerpiece, and smaller supporting links arranged around or below it. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个以巨大文字商标或Logo为中心的页脚，较小的辅助链接排列在其周围或下方。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-4f",
    title: "Newsletter-first footer",
    titleCn: "新闻通讯优先页脚",
    description:
      "Newsletter signup as dominant element with nav links secondary below",
    descriptionCn:
      "新闻通讯订阅为主要元素，导航链接次要显示在下方",
    category: "Footer",
    prompt:
      "Create a footer with a newsletter signup as the dominant element — large heading, email input, CTA — with navigation links secondary below. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个以新闻通讯订阅为主要元素的页脚——大标题、邮箱输入框、操作按钮——导航链接次要显示在下方。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ft-5f",
    title: "Status indicator footer",
    titleCn: "状态指示器页脚",
    description:
      "Live system status indicator alongside the usual links and logo",
    descriptionCn:
      "实时系统状态指示器与常规链接和Logo并排显示",
    category: "Footer",
    prompt:
      'Create a footer that includes a live system status indicator (e.g. "All systems operational") alongside the usual links and logo. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.',
    promptCn:
      '创建一个包含实时系统状态指示器的页脚（例如"所有系统运行正常"），与常规链接和Logo并排显示。匹配我截图中显示的视觉风格、颜色、排版和整体美感。',
  },
  {
    id: "fq-1",
    title: "Accordion single column",
    titleCn: "手风琴单列",
    description:
      "Single-column accordion — each question expands its answer on click",
    descriptionCn:
      "单列手风琴——每个问题点击展开答案",
    category: "FAQ",
    prompt:
      "Create an FAQ section as a single-column accordion. Each question expands to reveal its answer on click. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个单列手风琴式FAQ区域。每个问题点击展开显示答案。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "fq-2",
    title: "Two-column accordion",
    titleCn: "两列手风琴",
    description:
      "Questions split across two columns in accordion layout",
    descriptionCn:
      "问题分布在两列手风琴布局中",
    category: "FAQ",
    prompt:
      "Create an FAQ section as a two-column accordion layout, splitting the questions across two columns. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个两列手风琴式布局的FAQ区域，将问题分布在两列中。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "fq-3",
    title: "Chat-bubble Q&A",
    titleCn: "聊天气泡问答",
    description:
      "Questions and answers in alternating chat bubbles",
    descriptionCn:
      "问题和答案以交替聊天气泡形式显示",
    category: "FAQ",
    prompt:
      "Create an FAQ section styled as a chat conversation — questions and answers in alternating chat bubbles. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个聊天对话样式的FAQ区域——问题和答案以交替的聊天气泡形式显示。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "fq-4",
    title: "Searchable FAQ",
    titleCn: "可搜索FAQ",
    description:
      "Search bar at top that filters the question list as user types",
    descriptionCn:
      "顶部搜索栏，用户输入时过滤问题列表",
    category: "FAQ",
    prompt:
      "Create an FAQ section with a search bar at the top that filters the question list as the user types. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个带搜索栏的FAQ区域，顶部搜索栏在用户输入时过滤问题列表。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "fq-5",
    title: "Categorized tabs",
    titleCn: "分类选项卡",
    description:
      "Category tabs at top that switch between filtered sets of questions",
    descriptionCn:
      "顶部分类选项卡，切换不同过滤集的问题",
    category: "FAQ",
    prompt:
      "Create an FAQ section with category tabs at the top (e.g. Billing, Product, Technical) that switch between filtered sets of questions. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个带分类选项卡的FAQ区域，顶部有分类选项卡（例如计费、产品、技术）用于切换不同过滤集的问题。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ds-1",
    title: "Sidebar + main content",
    titleCn: "侧边栏+主内容",
    description:
      "Vertical sidebar with nav, main content area filling the rest",
    descriptionCn:
      "垂直侧边栏带导航，主内容区域填充剩余空间",
    category: "Dashboards",
    prompt:
      "Create a dashboard with a vertical sidebar on the left containing navigation, and the main content area filling the rest of the viewport. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个仪表板，左侧有包含导航的垂直侧边栏，主内容区域填充剩余空间。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ds-2",
    title: "Top nav + content",
    titleCn: "顶部导航+内容",
    description:
      "Horizontal top nav with full-width content beneath — no sidebar",
    descriptionCn:
      "顶部水平导航，下方全宽内容——无侧边栏",
    category: "Dashboards",
    prompt:
      "Create a dashboard with a horizontal top navigation bar and the main content filling the full width beneath it — no sidebar. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个仪表板，顶部有水平导航栏，主内容填充其下方的全部宽度——没有侧边栏。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ds-3",
    title: "Three-pane layout",
    titleCn: "三窗格布局",
    description:
      "Sidebar, middle list/feed pane, and detail panel on the right",
    descriptionCn:
      "侧边栏、中间列表/信息流窗格和右侧详情面板",
    category: "Dashboards",
    prompt:
      "Create a dashboard as a three-pane layout — sidebar navigation, a middle list/feed pane, and a detail panel on the right. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个三窗格布局的仪表板——侧边栏导航、中间列表/信息流窗格和右侧详情面板。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ds-4",
    title: "Kanban board",
    titleCn: "看板",
    description:
      "Columns representing stages with draggable cards within each",
    descriptionCn:
      "列代表阶段，每列内有可拖动卡片",
    category: "Dashboards",
    prompt:
      "Create a dashboard as a kanban board with columns representing stages, and draggable cards within each column. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个看板式仪表板，列代表不同阶段，每列内有可拖动的卡片。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ds-5",
    title: "Metric cards + chart",
    titleCn: "指标卡片+图表",
    description:
      "Grid of metric cards at top with a larger chart below",
    descriptionCn:
      "顶部指标卡片网格，下方较大图表",
    category: "Dashboards",
    prompt:
      "Create a dashboard with a grid of metric cards at the top showing key numbers, and a larger chart or visualization below. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个仪表板，顶部是显示关键数字的指标卡片网格，下方是较大的图表或可视化。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ds-6",
    title: "Empty state",
    titleCn: "空状态",
    description:
      "Centered illustration or icon, heading, and CTA to get started",
    descriptionCn:
      "居中插图或图标、标题和开始使用按钮",
    category: "Dashboards",
    prompt:
      "Create an empty state with a centered illustration or icon, a short heading explaining what's missing, and a clear CTA to get started. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个空状态，居中显示插图或图标，简短标题说明缺少什么，以及一个明确的操作按钮开始使用。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ob-1",
    title: "Checklist onboarding",
    titleCn: "清单引导",
    description:
      "Checklist of setup tasks with progress indicators and expandable items",
    descriptionCn:
      "设置任务清单，带进度指示器和可展开项目",
    category: "Onboarding",
    prompt:
      "Create an onboarding flow as a checklist of setup tasks with progress indicators, each item expandable with instructions and a CTA to complete it. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个引导流程，以设置任务清单形式显示，带有进度指示器，每项可展开显示说明和完成操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ob-2",
    title: "Tour tooltips",
    titleCn: "导览提示",
    description:
      "Guided tour with tooltip callouts pointing to UI elements",
    descriptionCn:
      "导览式导览，提示框指向UI元素",
    category: "Onboarding",
    prompt:
      "Create an onboarding experience as a guided tour with tooltip callouts pointing to specific UI elements, each with a short explanation and next/skip buttons. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个引导式导览体验，使用工具提示指向特定UI元素，每个都有简短说明和下一步/跳过按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ob-3",
    title: "Video walkthrough modal",
    titleCn: "视频导览模态框",
    description:
      "Modal with embedded walkthrough video and get started CTA",
    descriptionCn:
      "嵌入式导览视频模态框，带开始使用按钮",
    category: "Onboarding",
    prompt:
      "Create an onboarding modal with an embedded walkthrough video as the centerpiece and a CTA to dismiss or get started. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个引导模态框，以嵌入式导览视频为中心，以及关闭或开始使用的操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ob-4",
    title: "Illustrated empty state",
    titleCn: "插图空状态",
    description:
      "Custom illustration, short heading, supporting sentence, and CTA",
    descriptionCn:
      "自定义插图、简短标题、辅助句子和操作按钮",
    category: "Onboarding",
    prompt:
      "Create an empty state with a custom illustration, short heading, supporting sentence, and a single clear CTA. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个空状态，包含自定义插图、简短标题、辅助句子和一个明确的操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "bl-1",
    title: "Magazine grid",
    titleCn: "杂志网格",
    description:
      "Large featured post at top with smaller cards in a grid beneath",
    descriptionCn:
      "顶部大型特色文章，下方网格排列小卡片",
    category: "Blog / Content",
    prompt:
      "Create a blog layout as a magazine-style grid — one large featured post at the top and smaller post cards arranged in a grid beneath. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个杂志风格网格博客布局——顶部是一个大型特色文章，下方是网格排列的较小文章卡片。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "bl-2",
    title: "Single column reading view",
    titleCn: "单列阅读视图",
    description:
      "Clean single-column with generous line spacing and readable width",
    descriptionCn:
      "简洁单列，行距宽松，文本宽度可读",
    category: "Blog / Content",
    prompt:
      "Create a blog post layout as a clean single-column reading view with generous line spacing and a readable text column width. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个简洁单列阅读视图的博客文章布局，行距宽松，文本列宽度可读。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "bl-3",
    title: "Sidebar TOC",
    titleCn: "侧边栏目录",
    description:
      "Sticky table of contents sidebar highlighting current section on scroll",
    descriptionCn:
      "固定目录侧边栏，滚动时高亮当前章节",
    category: "Blog / Content",
    prompt:
      "Create a blog post layout with a sticky table of contents sidebar that highlights the current section as the user scrolls. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个带固定目录侧边栏的博客文章布局，用户滚动时高亮显示当前章节。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "bl-4",
    title: "Card grid with filters",
    titleCn: "卡片网格带筛选",
    description:
      "Post card grid with category filter tags above",
    descriptionCn:
      "文章卡片网格，上方有分类筛选标签",
    category: "Blog / Content",
    prompt:
      "Create a blog layout as a grid of post cards with category filter tags above that filter the visible posts on click. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个文章卡片网格博客布局，上方有分类筛选标签，点击可过滤显示的文章。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ct-1",
    title: "Split form + details",
    titleCn: "分屏表单+详情",
    description:
      "Contact form on one side, details (email, phone, address) on the other",
    descriptionCn:
      "联系表单在一侧，联系方式在另一侧",
    category: "Contact",
    prompt:
      "Create a contact section as a split layout — the contact form on one side and contact details (email, phone, address, hours) on the other. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个分屏布局的联系区域——一侧是联系表单，另一侧是联系方式（邮箱、电话、地址、营业时间）。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ct-2",
    title: "Support channel cards",
    titleCn: "支持渠道卡片",
    description:
      "Grid of cards for different support channels — chat, email, docs, community",
    descriptionCn:
      "不同支持渠道卡片网格——聊天、邮箱、文档、社区",
    category: "Contact",
    prompt:
      "Create a contact section as a grid of cards for different support channels (live chat, email, docs, community), each with an icon and CTA. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个不同支持渠道卡片网格的联系区域（在线聊天、邮箱、文档、社区），每个都有图标和操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "ct-3",
    title: "Full-page minimal form",
    titleCn: "全页极简表单",
    description:
      "Full-page centered form with heading, minimal fields, and one submit button",
    descriptionCn:
      "全页居中表单，标题、最少字段和一个提交按钮",
    category: "Contact",
    prompt:
      "Create a contact section as a full-page centered form with a single heading, minimal fields, and one submit button. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个全页居中表单的联系区域，包含单个标题、最少字段和一个提交按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "bn-1",
    title: "Comparison table (us vs competitors)",
    titleCn: "对比表格（我们 vs 竞争对手）",
    description:
      "Your product vs competitors with checkmarks and dashes",
    descriptionCn:
      "你的产品与竞争对手对比，使用勾选号和破折号",
    category: "Bonus",
    prompt:
      "Create a comparison table with your product as one column and competitors as the others, using checkmarks and dashes to show feature differences. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个比较表，你的产品作为一列，竞争对手作为其他列，使用勾选号和破折号显示功能差异。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "bn-2",
    title: "Feature announcement banner",
    titleCn: "功能公告横幅",
    description:
      "Slim bar at top with 'new' tag, short message, link, and dismiss",
    descriptionCn:
      "顶部细条，带'新'标签、简短消息、链接和关闭",
    category: "Bonus",
    prompt:
      'Create an announcement banner as a slim bar at the top of the page with a "new" tag, short message, inline link, and a dismiss button. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.',
    promptCn:
      '创建一个公告横幅，作为页面顶部的细条，带有"新"标签、简短消息、内联链接和关闭按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。',
  },
  {
    id: "bn-3",
    title: "Cookie banner",
    titleCn: "Cookie横幅",
    description:
      "Bottom-corner card with message, accept/reject, and settings link",
    descriptionCn:
      "底部角落卡片，包含消息、接受/拒绝和设置链接",
    category: "Bonus",
    prompt:
      "Create a cookie banner as a clean bottom-corner card with a short message, accept/reject buttons, and a settings link. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个Cookie横幅，作为简洁的底部角落卡片，包含简短消息、接受/拒绝按钮和设置链接。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "bn-4",
    title: "404 page",
    titleCn: "404页面",
    description:
      "'Page not found' message, explanation, and CTAs for home/support",
    descriptionCn:
      "'页面未找到'消息、说明和返回首页/联系支持按钮",
    category: "Bonus",
    prompt:
      "Create a 404 page with a clear \"page not found\" message, a short explanation, and CTAs to go back home or contact support. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个404页面，包含清晰的'页面未找到'消息、简短说明，以及返回首页或联系支持的操作按钮。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
  {
    id: "bn-5",
    title: "Loading state",
    titleCn: "加载状态",
    description:
      "Skeleton layout mirroring final content structure with shimmer animation",
    descriptionCn:
      "骨架布局反映最终内容结构，带微光动画",
    category: "Bonus",
    prompt:
      "Create a loading state with a skeleton layout that mirrors the final content structure, using subtle shimmer animation on placeholder blocks. Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot.",
    promptCn:
      "创建一个加载状态，骨架布局反映最终内容结构，占位块使用微光动画。匹配我截图中显示的视觉风格、颜色、排版和整体美感。",
  },
];

const categories = [
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

interface MainContentProps {
  activeCategory: string;
  searchQuery: string;
  onCategoryVisible?: (category: string) => void;
  language?: Language;
}

export function MainContent({ activeCategory, searchQuery, onCategoryVisible, language = 'cn' }: MainContentProps) {
  const mainRef = useRef<HTMLElement>(null);

  const getCategoryAnchorId = (category: string) => {
    return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  };

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      const scrollTop = mainElement.scrollTop;
      const headerOffset = 200;

      for (let i = categories.length - 1; i >= 0; i--) {
        const element = document.getElementById(getCategoryAnchorId(categories[i].name));
        if (element && element.offsetTop - headerOffset <= scrollTop) {
          onCategoryVisible?.(categories[i].name);
          return;
        }
      }
      onCategoryVisible?.("All");
    };

    mainElement.addEventListener('scroll', handleScroll);
    return () => mainElement.removeEventListener('scroll', handleScroll);
  }, [onCategoryVisible]);

  const getPromptsByCategory = (category: string) => {
    return prompts.filter((p) => p.category === category);
  };

  const getFilteredPrompts = () => {
    if (searchQuery.trim()) {
      return prompts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.titleCn.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return prompts;
  };

  const getCategoryDisplayName = (categoryName: string) => {
    const key = categoryTranslationKeys[categoryName];
    return key ? t(key as any, language) : categoryName;
  };

  return (
    <main ref={mainRef} className="flex-1 overflow-y-auto min-w-0">
      <Header totalPrompts={92} totalCategories={15} language={language} />

      {searchQuery.trim() ? (
        <section className="grid grid-cols-1 gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-10 md:px-10 md:py-10 sm:grid-cols-2 lg:grid-cols-3">
          {getFilteredPrompts().map((prompt, index) => (
            <PromptCard
              key={prompt.id}
              title={prompt.title}
              titleCn={prompt.titleCn}
              description={prompt.description}
              descriptionCn={prompt.descriptionCn}
              category={prompt.category}
              prompt={prompt.prompt}
              promptCn={prompt.promptCn}
              language={language}
              index={index}
            />
          ))}
        </section>
      ) : (
        <>
          <section
            id={getCategoryAnchorId("All")}
            className="px-4 py-6 sm:px-6 sm:py-10 md:px-10 md:py-10"
          >
            <div className="mb-6 border-b border-border pb-3">
              <h2 className="text-[46px] font-bold text-foreground leading-tight">
                {getCategoryDisplayName("All")}
              </h2>
              <p className="text-[28px] text-muted-foreground/70 mt-2">
                {prompts.length} {t('main.promptsCount', language)}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {prompts.map((prompt, index) => (
                <PromptCard
                  key={prompt.id}
                  title={prompt.title}
                  titleCn={prompt.titleCn}
                  description={prompt.description}
                  descriptionCn={prompt.descriptionCn}
                  category={prompt.category}
                  prompt={prompt.prompt}
                  promptCn={prompt.promptCn}
                  language={language}
                  index={index}
                />
              ))}
            </div>
          </section>
          {categories.map((category) => (
            <section
              key={category.name}
              id={getCategoryAnchorId(category.name)}
              className="px-4 py-6 sm:px-6 sm:py-10 md:px-10 md:py-10"
            >
              <div className="mb-6">
                <h2 className="text-[46px] font-bold text-foreground leading-tight">
                  {getCategoryDisplayName(category.name)}
                </h2>
                <p className="text-[28px] text-muted-foreground/70 mt-2">
                  {category.count} {t('main.promptsCount', language)}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {getPromptsByCategory(category.name).map((prompt, index) => (
                  <PromptCard
                    key={prompt.id}
                    title={prompt.title}
                    titleCn={prompt.titleCn}
                    description={prompt.description}
                    descriptionCn={prompt.descriptionCn}
                    category={prompt.category}
                    prompt={prompt.prompt}
                    promptCn={prompt.promptCn}
                    language={language}
                    index={index}
                  />
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-border px-4 py-6 text-center sm:px-10 sm:py-8"
      >
        <p className="text-sm text-muted-foreground">
          92 {t('header.prompts', language)} · {language === 'cn' ? '为 vibe 编码者打造' : 'Built for vibe coders.'}
        </p>
      </motion.footer>
    </main>
  );
}
