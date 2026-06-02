# VibeUI Component Specifications

## Design Tokens

### Colors (oklch)
- Background: oklch(98.5% .005 85)
- Foreground: oklch(18% .01 60)
- Card: oklch(100% 0 0)
- Card Foreground: oklch(18% .01 60)
- Primary: oklch(18% .01 60)
- Primary Foreground: oklch(98.5% .005 85)
- Secondary: oklch(95% .008 85)
- Secondary Foreground: oklch(18% .01 60)
- Muted: oklch(95% .008 85)
- Muted Foreground: oklch(50% .015 70)
- Accent: oklch(95% .008 85)
- Accent Foreground: oklch(18% .01 60)
- Border: oklch(90% .012 80)
- Input: oklch(90% .012 80)
- Ring: oklch(18% .01 60)

### Typography
- Font Family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- H1: 60px, font-weight: 700, line-height: 60px, letter-spacing: -0.02em
- H2: 24px, font-weight: 700, line-height: 32px
- H3: 16px, font-weight: 600, line-height: 24px
- Body: 16px, font-weight: 400, line-height: 24px
- Small: 14px, font-weight: 400, line-height: 20px
- Caption: 12px, font-weight: 400, line-height: 16px

### Spacing
- Sidebar Width: 287px
- Content Padding: 40px
- Card Padding: 16px
- Section Gap: 32px
- Grid Gap: 24px

### Border Radius
- Card: 14px
- Button: 8px
- Input: 8px
- Badge: 9999px (full)

### Shadows
- Card Hover: 0 4px 12px rgba(0,0,0,0.08)
- Sidebar: none

### Transitions
- Default: all 0.15s ease
- Hover: background-color 0.15s ease, border-color 0.15s ease
- Active: transform 0.1s ease

## Component List

1. **Sidebar** - Navigation sidebar with categories
2. **Header** - Page header with stats and title
3. **CategoryFilter** - Category pills/tabs
4. **PromptCard** - Individual prompt card
5. **MainContent** - Main content wrapper
6. **Footer** - Page footer
