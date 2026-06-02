# VibeUI Page Topology

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (complementary)                                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Logo + "Prompt Library"                                 ││
│  │ Collapse sidebar button                                 ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ Search input                                            ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ Category Navigation                                     ││
│  │  - All (92)                                             ││
│  │  - Auth Forms (6)                                       ││
│  │  - Pricing (8)                                          ││
│  │  - Features / Bento (8)                                 ││
│  │  - Hero Sections (8)                                    ││
│  │  - CTA Banners (7)                                      ││
│  │  - Stats Bars (7)                                       ││
│  │  - Nav Bars (8)                                         ││
│  │  - Testimonials (8)                                     ││
│  │  - Footer (5)                                           ││
│  │  - FAQ (5)                                              ││
│  │  - Dashboards (6)                                       ││
│  │  - Onboarding (4)                                       ││
│  │  - Blog / Content (4)                                   ││
│  │  - Contact (3)                                          ││
│  │  - Bonus (5)                                            ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ About link                                              ││
│  │ Theme toggle button                                     ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  MAIN CONTENT (main)                                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Header Section                                          ││
│  │  - Stats: "92 prompts · 15 categories"                  ││
│  │  - Title: "UI Prompt Library for Vibe Coders"           ││
│  │  - Description paragraph                                ││
│  │  - Sponsored link (GlowUp UI)                           ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ Category Section                                        ││
│  │  - Heading: "Browse prompts by category"                ││
│  │  - Category pills/tabs (horizontal scroll)              ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ Prompt Cards Grid                                       ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       ││
│  │  │ Card 1  │ │ Card 2  │ │ Card 3  │ │ Card 4  │       ││
│  │  │         │ │         │ │         │ │         │       ││
│  │  │ [Copy]  │ │ [Copy]  │ │ [Copy]  │ │ [Copy]  │       ││
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       ││
│  │  │ Card 5  │ │ Card 6  │ │ Card 7  │ │ Card 8  │       ││
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ Cross-Promotion Section                                 ││
│  │  - GlowUp UI advertisement                              ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ Footer                                                  ││
│  │  - "92 prompts · Built for vibe coders."                ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Z-Index Layers
1. Base content (z-index: auto)
2. Sidebar (z-index: auto, position: relative/fixed)
3. Dropdown/popover elements (z-index: 50+)
4. Notifications region (z-index: high)

## Fixed/Static Elements
- **Sidebar:** Fixed position on desktop, collapsible
- **Main Content:** Scrollable area

## Dependencies
- Sidebar navigation controls category filtering in main content
- Theme toggle affects entire page color scheme
- Search input filters prompt cards

## Component Hierarchy
```
Root Layout
├── Sidebar
│   ├── Logo
│   ├── Search Input
│   ├── Category Navigation
│   │   └── Category Buttons (16)
│   ├── About Link
│   └── Theme Toggle
└── Main Content
    ├── Header Section
    │   ├── Stats Text
    │   ├── Title (H1)
    │   ├── Description
    │   └── Sponsored Link
    ├── Category Section
    │   ├── Section Title (H2)
    │   └── Category Pills
    ├── Prompt Cards Grid
    │   └── Prompt Cards (N)
    │       ├── Card Preview
    │       └── Copy Button
    ├── Cross-Promotion
    └── Footer
```

## Responsive Breakpoints
- **Desktop (1440px):** Sidebar visible (287.2px), main content (1136.8px), 3-column grid
- **Tablet (768px):** Sidebar visible (287.2px), main content (464.8px), 2-column grid
- **Mobile (390px):** Sidebar hidden or overlay, single column grid
