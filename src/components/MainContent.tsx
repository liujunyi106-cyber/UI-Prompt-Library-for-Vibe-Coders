"use client";

import { useMemo } from "react";
import { Header } from "./Header";
import { PromptCard } from "./PromptCard";
import { motion } from "framer-motion";

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
}

const prompts: Prompt[] = [
  {
    id: "auth-1",
    title: "Split-screen with visual",
    description:
      "Form fields on one side, visual panel on the other — product screenshot or branded graphic",
    category: "Auth Forms",
    prompt:
      "Create an auth form as a split-screen layout. Place the form fields on one side and a visual panel on the other (product screenshot, illustration, or branded graphic area). Include email, password, and a primary CTA.",
  },
  {
    id: "auth-2",
    title: "Centered card on background",
    description:
      "Floating card with heading, email, password, CTA, and sign-up link on a full-page background",
    category: "Auth Forms",
    prompt:
      "Create an auth form as a centered floating card on a full-page background. Include heading, email, password, primary CTA, and a link to switch to sign up.",
  },
  {
    id: "auth-3",
    title: "Minimal single-column",
    description:
      "No card container — just logo, heading, fields, and CTA stacked cleanly",
    category: "Auth Forms",
    prompt:
      "Create an auth form as a minimal single-column layout with no card container — just the logo, heading, form fields, and CTA stacked cleanly down the page.",
  },
  {
    id: "pr-1",
    title: "Classic 3-tier cards",
    description:
      "Three side-by-side tier cards with the middle highlighted as recommended",
    category: "Pricing",
    prompt:
      "Create a pricing section with three side-by-side tier cards (e.g. Starter, Pro, Business) with the middle tier visually highlighted as the recommended option. Include plan names, prices, feature lists, and CTAs.",
  },
  {
    id: "pr-2",
    title: "Monthly/annual toggle",
    description:
      "Billing toggle at top with a 'save X%' badge, prices update based on selection",
    category: "Pricing",
    prompt:
      "Create a pricing section with a monthly/annual billing toggle at the top and a 'save X%' badge on the annual option. Prices should visibly update based on the toggle.",
  },
  {
    id: "ft-1",
    title: "3-column icon grid",
    description:
      "Three-column grid with icon, feature title, and short description",
    category: "Features / Bento",
    prompt:
      "Create a feature list as a three-column grid, each column containing an icon, feature title, and short description.",
  },
  {
    id: "ft-2",
    title: "Bento grid",
    description:
      "Asymmetric tiles of varying sizes, important features in larger tiles",
    category: "Features / Bento",
    prompt:
      "Create a feature list as an asymmetric bento grid — tiles of varying sizes arranged in an interesting layout, with the most important features occupying larger tiles.",
  },
  {
    id: "hr-1",
    title: "Centered text + screenshot",
    description:
      "Centered heading, subheading, CTAs at top, large product screenshot below",
    category: "Hero Sections",
    prompt:
      "Create a hero section with centered heading, subheading, and CTAs at the top, and a large product screenshot or visual positioned directly below.",
  },
  {
    id: "hr-2",
    title: "Split hero",
    description:
      "Heading and CTAs on one side, product mockup on the other",
    category: "Hero Sections",
    prompt:
      "Create a hero section as a split layout — heading, subheading, and CTAs on one side, and a product mockup or visual on the other.",
  },
  {
    id: "cta-1",
    title: "Full-bleed gradient banner",
    description:
      "Full-bleed section with gradient background, centered heading, and CTA",
    category: "CTA Banners",
    prompt:
      "Create a CTA banner as a full-bleed section with a gradient background, centered heading, short supporting line, and a prominent CTA button.",
  },
  {
    id: "st-1",
    title: "Horizontal 4-column numbers",
    description:
      "Four large numbers in a row with descriptive labels underneath",
    category: "Stats Bars",
    prompt:
      "Create a stats bar as a horizontal row of four large numbers, each with a small descriptive label underneath.",
  },
  {
    id: "nv-1",
    title: "Minimal logo + links + CTA",
    description:
      "Logo left, links center/right, CTA button far right",
    category: "Nav Bars",
    prompt:
      "Create a nav bar as a clean horizontal layout — logo on the left, navigation links in the middle or right, and a primary CTA button at the far right.",
  },
  {
    id: "ts-1",
    title: "3-column quote cards",
    description:
      "Three side-by-side quote cards with photo, name, role, and quote",
    category: "Testimonials",
    prompt:
      "Create a testimonial section as three side-by-side quote cards, each with a customer photo, name, role, and quote.",
  },
  {
    id: "ft-1f",
    title: "Multi-column sitemap",
    description:
      "Grouped links (Product, Company, Resources), logo, tagline, copyright",
    category: "Footer",
    prompt:
      "Create a footer as a multi-column sitemap with grouped links (Product, Company, Resources, Legal), the logo and tagline on the far left, and copyright at the bottom.",
  },
  {
    id: "fq-1",
    title: "Accordion single column",
    description:
      "Single-column accordion — each question expands its answer on click",
    category: "FAQ",
    prompt:
      "Create an FAQ section as a single-column accordion. Each question expands to reveal its answer on click.",
  },
  {
    id: "ds-1",
    title: "Sidebar + main content",
    description:
      "Vertical sidebar with nav, main content area filling the rest",
    category: "Dashboards",
    prompt:
      "Create a dashboard with a vertical sidebar on the left containing navigation, and the main content area filling the rest of the viewport.",
  },
  {
    id: "ob-1",
    title: "Checklist onboarding",
    description:
      "Checklist of setup tasks with progress indicators and expandable items",
    category: "Onboarding",
    prompt:
      "Create an onboarding flow as a checklist of setup tasks with progress indicators, each item expandable with instructions and a CTA to complete it.",
  },
  {
    id: "bl-1",
    title: "Magazine grid",
    description:
      "Large featured post at top with smaller cards in a grid beneath",
    category: "Blog / Content",
    prompt:
      "Create a blog layout as a magazine-style grid — one large featured post at the top and smaller post cards arranged in a grid beneath.",
  },
  {
    id: "ct-1",
    title: "Split form + details",
    description:
      "Contact form on one side, details (email, phone, address) on the other",
    category: "Contact",
    prompt:
      "Create a contact section as a split layout — the contact form on one side and contact details (email, phone, address, hours) on the other.",
  },
];

interface MainContentProps {
  activeCategory: string;
  searchQuery: string;
}

export function MainContent({ activeCategory, searchQuery }: MainContentProps) {
  const filteredPrompts = useMemo(() => {
    let filtered = prompts;
    
    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeCategory, searchQuery]);

  return (
    <main className="flex-1 overflow-y-auto min-w-0">
      <Header totalPrompts={92} totalCategories={15} />

      <section className="grid grid-cols-1 gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-10 md:px-10 md:py-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPrompts.map((prompt, index) => (
          <PromptCard
            key={prompt.id}
            title={prompt.title}
            description={prompt.description}
            category={prompt.category}
            prompt={prompt.prompt}
            index={index}
          />
        ))}
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-border px-4 py-6 text-center sm:px-10 sm:py-8"
      >
        <p className="text-sm text-muted-foreground">
          92 prompts · Built for vibe coders.
        </p>
      </motion.footer>
    </main>
  );
}
