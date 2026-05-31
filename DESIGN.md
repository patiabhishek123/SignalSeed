---
name: SignalSeed Terminal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#c6c7c0'
  on-tertiary: '#2f312c'
  tertiary-container: '#a2a39c'
  on-tertiary-container: '#383934'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e3e3db'
  tertiary-fixed-dim: '#c6c7c0'
  on-tertiary-fixed: '#1a1c18'
  on-tertiary-fixed-variant: '#464742'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  terminal-bg: '#131313'
  surface-raised: '#1c1b1b'
  graphite-stroke: '#2a2a2a'
  momentum-emerald: '#10b981'
  warm-ivory: '#f8f8f0'
  muted-gray: '#71717a'
  chart-blue: '#3b82f6'
  chart-indigo: '#6366f1'
  chart-slate: '#475569'
typography:
  header-display:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  header-lg:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  header-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  body-ui:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  body-ui-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.01em
  data-mono-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 12px
  margin-safe: 16px
---

## Brand & Style

The design system is an institutional-grade interface designed for high-velocity data analysis. It targets power users—investors, analysts, and founders—who require a "Terminal" environment that prioritizes information density and technical precision over decorative elements. 

The aesthetic is **Modern Brutalist** filtered through a **Corporate Technical** lens. It leverages a dark-mode-first architecture to reduce eye strain during long analytical sessions. The brand personality is authoritative, precise, and utilitarian, evoking the feeling of a high-frequency trading floor or a command center.

**Key Stylistic Principles:**
- **Data as UI:** Every pixel serves a functional purpose; whitespace is managed tightly to maximize "above-the-fold" data visibility.
- **Monochromatic Foundations:** A rigorous graphite palette ensures that color is only used where it carries meaning (e.g., signals, trends, alerts).
- **Technical Rigor:** Use of borders instead of shadows to define containment, maintaining a flat, architectural depth.

## Colors

The color system is optimized for a dark environment, utilizing a high-contrast ratio between technical backgrounds and functional highlights.

- **Foundations:** The background uses `#131313` (Neutral) to establish a true-dark canvas. Surfaces that require separation use `#1c1b1b` (Surface Raised).
- **Signals:** Emerald is the primary action and "positive growth" color. It is used sparingly for momentum scores, success states, and primary CTAs.
- **Highlights:** Warm Ivory (`#f8f8f0`) is used for primary text and high-level headers to provide a sophisticated, legible contrast that is softer on the eyes than pure white.
- **Data Visualization:** A secondary palette of Blues and Indigos is provided for multi-series charts, ensuring distinct visual separation without breaking the professional tone.

## Typography

This system uses a dual-type strategy to separate interface controls from raw data output.

- **Hanken Grotesk (UI/Navigation):** Chosen for its modern, clean proportions and exceptional legibility at small sizes. Use this for all functional text, navigation, and page headers.
- **JetBrains Mono (Data/Technical):** Used for all numerical values, code snippets, signal logs, and data grid contents. The monospaced nature ensures that columns of numbers align perfectly, aiding in rapid scanning and comparison.
- **Scaling:** On mobile devices, `header-display` scales down to 32px. Data-mono retains its 13px size to ensure precision is never sacrificed for layout.

## Layout & Spacing

The design system employs a **Fixed Grid** philosophy with a tight 4px base unit. This small increment allows for the "High Density" layout required by the terminal aesthetic.

- **Grid Model:** A 12-column system for desktop with 12px gutters.
- **Density:** Components use minimal internal padding (typically 8px or 12px) to pack information tightly.
- **Sidebars:** Side navigation is fixed at 64px (collapsed) or 240px (expanded). The `HiddenGemsSidebar` uses a 280px fixed width.
- **Mobile Adaption:** On mobile, the 12-column grid collapses to a 4-column fluid layout with 16px side margins. Data grids transition to a horizontally scrollable "Wide Table" view rather than stacking, preserving the technical integrity of the data.

## Elevation & Depth

In keeping with the Terminal aesthetic, the design system avoids soft ambient shadows. Depth is communicated through **Tonal Layers** and **Bold Borders**.

- **Level 0 (Background):** Pure `#131313`.
- **Level 1 (Card/Container):** Background `#1c1b1b` with a 1px solid border of `#2a2a2a`.
- **Level 2 (Pop-overs/Modals):** Same background as Level 1 but with a high-contrast border of `#10b981` or a brighter graphite.
- **Interactive States:** Hovering over a card or list item does not lift it; instead, the border color shifts to a more vibrant state (e.g., Graphite to Emerald).
- **Separators:** Subtle 1px lines are used between table rows and sidebar items to maintain structure without adding visual bulk.

## Shapes

The shape language is sharp and institutional. 

- **Radius:** A standard 2px radius is applied to buttons, input fields, and cards to soften the edges just enough for modern screens while maintaining a "hardware" feel. 
- **Pills:** Only used for status badges (e.g., `EmeraldBadge`) to distinguish metadata from interactive controls.
- **Interactive Elements:** Checkboxes and radio buttons maintain sharp 2px corners to align with the terminal grid.

## Components

### TerminalCard
The primary container. It features a `#1c1b1b` background and a 1px `#2a2a2a` border. No shadows. Titles within cards use `label-caps` typography in `muted-gray`.

### DataGrid & Tables
High-density grids. 
- **Header:** Background `#131313`, `label-caps` text, 1px bottom border.
- **Rows:** 32px height. Subtle hover state change to `#222222`.
- **Momentum Cells:** Numerical data uses `data-mono`. Positive trends are colored in `momentum-emerald` with a small up-arrow icon.

### Buttons
- **Primary:** Background `momentum-emerald`, text `terminal-bg` (for high contrast), 2px radius.
- **Secondary/Ghost:** No background, 1px `graphite-stroke` border, text `warm-ivory`.

### Input Fields
Dark backgrounds (`#131313`), 1px `graphite-stroke` borders. Focus state is indicated by an `emerald` border glow and a blinking "block" cursor in the style of a command line.

### Navigation
- **TopNavBar:** Persistent 48px height. Houses global search and breadcrumbs.
- **SideNavBar:** Darker than the main surface (`#0d0d0d`). Icons are stroke-based, 20px, with a 2px stroke width. Active states use a vertical emerald bar on the far left.

### ReplayController (Unique Component)
A custom media-player-style bar for the "Time Machine" experience. Uses a linear slider with `momentum-emerald` for the progress track and `warm-ivory` for the playback speed toggles (1x, 5x, 10x).
