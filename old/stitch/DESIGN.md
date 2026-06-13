---
name: Technical Support Enterprise
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#1e1200'
  on-tertiary: '#ffffff'
  tertiary-container: '#35260c'
  on-tertiary-container: '#a38c6a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#fadfb8'
  tertiary-fixed-dim: '#ddc39d'
  on-tertiary-fixed: '#271902'
  on-tertiary-fixed-variant: '#564427'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  sidebar-width: 280px
  gutter: 1.5rem
  margin-page: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style
The design system focuses on high-utility, enterprise-grade reliability for technical support management. The aesthetic is **Corporate Modern**, prioritizing information density, clarity, and rapid cognitive processing. The UI evokes a sense of "organized control," essential for dispatchers and technicians managing critical infrastructure across multiple disciplines (TI, Electrical, Civil, etc.).

The interface uses a structured, systematic approach with clear visual hierarchies to reduce friction during high-stress support scenarios. It balances a deep professional foundation with vibrant, functional accents that serve as immediate visual cues for categorization.

## Colors
The palette is rooted in a professional **Deep Navy Blue** (#1e293b) used for primary navigation and high-level headers, providing a stable frame for the application. The background utilizes a very light **Slate Gray** (#f8fafc) to reduce eye strain and define card boundaries.

Functional accents are strictly mapped to technical categories to ensure immediate recognition:
- **TI (Blue):** Systematic and logical.
- **Electrical (Yellow):** Caution and energy.
- **Civil (Green):** Foundation and safety.
- **Security (Red):** Urgent and critical.
- **Telecom (Purple):** Connectivity and data.

Neutral tones should scale from the base Navy using transparency or specific hex values (#64748b, #94a3b8) for secondary text and borders.

## Typography
This design system utilizes **Inter** for its exceptional legibility in data-heavy environments. The typeface’s tall x-height and systematic spacing make it ideal for dashboard interfaces and technical tables.

- **Headlines:** Reserved for page titles and section headers. Use bold weights to anchor the layout.
- **Body:** Standardized at 14px for maximum information density without sacrificing readability.
- **Labels:** Used for table headers, status badges, and small metadata. Uppercase styling is applied to `label-md` to differentiate from interactive body text.

## Layout & Spacing
The layout follows a **Fixed-Fluid hybrid model**. The sidebar is fixed at 280px, while the main content area expands to a maximum of 1440px to ensure line lengths remain readable on ultra-wide monitors.

A strict **8px spacing grid** governs all margins and paddings. 
- **Desktop:** 32px (2rem) outer page margins with 24px (1.5rem) gutters between grid items.
- **Tablet:** 24px margins; sidebar collapses into a hamburger menu or icon-only rail.
- **Mobile:** 16px margins; content reflows into a single column.

Tables and data grids should utilize condensed vertical padding (8px to 12px) to maximize the "at-a-glance" capability of the dashboard.

## Elevation & Depth
To maintain a professional, "flat-modern" aesthetic, depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Background):** #f8fafc (Light Gray).
- **Level 1 (Cards/Surface):** White (#ffffff) with a 1px solid border in #e2e8f0. No shadow or a very subtle 2px blur "resting" shadow.
- **Level 2 (Dropdowns/Modals):** White with a medium-diffusion shadow (0 4px 6px -1px rgb(0 0 0 / 0.1)) to indicate clear separation from the workspace.
- **Navigation:** The primary sidebar uses a solid fill of #1e293b to create a strong vertical anchor on the left side of the screen.

## Shapes
The design system uses **Soft (0.25rem)** roundedness to maintain a precise, engineered feel. 

- **Buttons & Inputs:** 4px (0.25rem) corner radius.
- **Cards & Containers:** 8px (0.5rem) corner radius (`rounded-lg`) for a slightly softer container feel.
- **Status Badges:** Fully rounded (pill-shaped) to distinguish them from interactive buttons.

This subtle rounding prevents the interface from feeling "sharp" or aggressive while retaining a structured, geometric discipline.

## Components
Consistent application of these components ensures the dashboard remains intuitive:

- **Sidebar Navigation:** Use a dark theme (#1e293b). Active states should use a left-aligned 4px primary blue border accent and a slight background highlight.
- **Data Tables:** Use #f8fafc for header backgrounds. Rows should have a subtle hover state (#f1f5f9). Use "Status Badges" within cells for technical categories.
- **Status Badges:** Small, pill-shaped elements with low-opacity backgrounds (10-15%) and high-contrast text using the category colors defined in the Color section.
- **Global Search:** Positioned in the top bar. Use a light gray background (#f1f5f9) and a "Heroicons" magnifying glass icon. Include a keyboard shortcut hint (e.g., "⌘K").
- **Cards:** White background, 1px border (#e2e8f0). Use for KPI summaries (e.g., "Chamados Abertos", "Média de Resposta").
- **Buttons:** 
    - *Primary:* Solid #1e293b or #3b82f6 with white text.
    - *Secondary:* Ghost style with 1px border and primary color text.
- **Input Fields:** Clear labels above the field, 1px border, 4px radius. Use #3b82f6 for focus states.
- **Icons:** Use 20px "Heroicons" (Outline style) for navigation and 16px (Solid style) for status indicators within the UI.