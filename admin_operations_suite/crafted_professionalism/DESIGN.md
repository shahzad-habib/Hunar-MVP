---
name: Crafted Professionalism
colors:
  primary: '#0F766E'
  primary-dark: '#115E59'
  navy: '#1A1A2E'
  gray: '#64748B'
  background: '#F8FAFC'
  surface: '#FFFFFF'
  border: '#E2E8F0'
  orange: '#F59E0B'
  success: '#16A34A'
  error: '#DC2626'
  on-primary: '#FFFFFF'
  on-surface: '#1A1A2E'
  on-background: '#1A1A2E'
typography:
  headline-2xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-2xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: '0'
  body-md-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 20px
  space-6: 24px
  space-8: 32px
  space-10: 40px
  space-12: 48px
  space-16: 64px
  gutter-mobile: 16px
  gutter-desktop: 24px
  container-max: 1280px
---

## Brand & Style

This design system expresses a fusion of institutional authority, trustworthy craftsmanship, and responsive modern utility. Tailored for skilled professionals, platforms requiring verifiable credentials, and operational workflows, the visual language balances authoritative structure with approachable clarity.

The visual direction draws from **Corporate / Modern** principles, reinforced with high-legibility interface structures and functional status semantics:
- **Authoritative & Reliable:** Grounded deep tones anchor navigation, brand markers, and key metrics to establish legitimacy and trust.
- **Action-Oriented & Safe:** High-clarity primary action points guide workflows without sensory overload.
- **Structured Precision:** Crisp delineation of states, unambiguous data density, and clear content containment allow users to scan high volumes of information safely and quickly.

## Colors

The palette uses a deliberate hierarchy to separate core structure, user actions, contextual alerts, and operational states.

- **Background vs. Surface Canvas:** The global viewport background is strictly off-white `#F8FAFC` to reduce glare and provide contrast against `#FFFFFF` elevated cards, data tables, and overlay surfaces. Surfaces should never blend seamlessly into the global background without either card backgrounds or structural borders.
- **Primary Navy (`#1A1A2E`):** Reserved for institutional anchor points—top-level navigation bars, typography headers, key metric values, and logo identity. It signals permanence and confidence.
- **Teal Action (`#0F766E`):** Reserved for progressive engagement, primary interaction triggers, active state confirmations, verified badges, and forward-moving workflows. Hover transitions drop to `#115E59`.
- **Secondary Orange (`#F59E0B`):** Dedicated to attention triggers, star ratings, system alerts, and pending statuses.
- **Semantic Feedback:**
  - **Success / Completed:** `#16A34A` text on `#16A34A15` background.
  - **Pending / Action Required:** `#F59E0B` text on `#F59E0B15` background.
  - **Verified / Primary State:** `#0F766E` text on `#0F766E15` background.
  - **In Progress / Neutral State:** `#1A1A2E` text on `#E2E8F0` background.
  - **Cancelled / Error:** `#DC2626` text on `#DC262615` background.

## Typography

The typographic hierarchy prioritizes rapid scanning, structured data, and high legibility across desktop and mobile screens.

- **Headings (`#1A1A2E`):** All headline tiers leverage heavy weights (700 to 800) rendered in Navy to assert clarity and brand structure. Letter spacing tightens slightly on larger headings to maintain visual density.
- **Body Copy (`#1A1A2E`):** Primary text uses weights 400 and 500 in deep slate-dark to maximize contrast without the harshness of pure black.
- **Secondary & Meta Text (`#64748B`):** Timestamps, column captions, labels, and placeholders utilize the neutral gray tone at sizes between 11px and 14px.
- **Numbers and Metrics:** Key financial figures, statistical counters, and capacity counts must be set in 700 or 800 weight Navy.

## Layout & Spacing

A strict 8px grid governs the spatial rhythm across components and views.

- **Base Unit:** Standard layout increments scale by 8px (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`). An exceptional 4px step (`space-1`) is allowed only for compact badge paddings, icons, and micro-alignments.
- **Grid Architecture:**
  - **Desktop (≥1024px):** 12-column responsive fluid grid with 24px gutters and maximum container constraint of 1280px. Page edge margins are minimum 32px.
  - **Tablet (768px - 1023px):** 8-column layout with 20px gutters and 24px margins.
  - **Mobile (<768px):** 4-column layout with 16px gutters and 16px horizontal margins.
- **Component Density:** Card internal padding conforms strictly to 16px for compact items (e.g., list widgets) and 24px for complex forms, tables, and detail screens.

## Elevation & Depth

Visual hierarchy uses a refined combination of crisp structural outlines and soft ambient shadows to keep views organized without unnecessary skeuomorphism.

- **Flat Canvas Separation:** Depth is established primarily by placing `#FFFFFF` surface containers on the `#F8FAFC` viewport background, bound by a crisp 1px border (`#E2E8F0`).
- **Ambient Shadow Levels:**
  - **Level 0 (Flat):** 0px offset. Used for standard inline input groups, neutral state buttons, and embedded table rows. Standard border: `1px solid #E2E8F0`.
  - **Level 1 (Cards & Panels):** `box-shadow: 0 1px 3px 0 rgba(18, 59, 93, 0.05), 0 1px 2px -1px rgba(18, 59, 93, 0.04);` with a `1px solid #E2E8F0` border. Shadows are faintly tinted with Navy (`rgba(18, 59, 93)`) to maintain color unity.
  - **Level 2 (Hovered Cards & Dropdowns):** `box-shadow: 0 4px 6px -1px rgba(18, 59, 93, 0.08), 0 2px 4px -2px rgba(18, 59, 93, 0.04);`.
  - **Level 3 (Modals, Overlays, Floating Sheets):** `box-shadow: 0 20px 25px -5px rgba(18, 59, 93, 0.12), 0 8px 10px -6px rgba(18, 59, 93, 0.08);`. Backdrop filter: `rgba(23, 32, 51, 0.4)` with 4px blur.

## Shapes

The design uses a clean, contemporary geometry governed by precise corner curvature rules:

- **Cards, Panels & Modals:** Standardized at `12px` border radius (`rounded-lg` level). This softens container boundaries while preserving structural density.
- **Interactive Controls & Indicators:** Buttons, input fields, dropdown toggles, and status badges consistently use an `8px` border radius.
- **Avatars & Indicator Dots:** Fully round (`9999px`) to immediately differentiate personnel photos, profile initials, and live status dots from functional rectangular UI elements.

## Components

### Buttons
- **Primary Action (Teal Solid):**
  - Background: `#0F766E`, Text: `#FFFFFF`, Border-radius: `8px`, Font: 14px weight 600.
  - Hover: `#115E59`. Active: `#115E59`.
  - Height: 40px (desktop), 44px (touch-first mobile). Horizontal padding: 16px.
- **Secondary / Outlined:**
  - Background: Transparent, Border: `1px solid #E2E8F0`, Text: `#1A1A2E`.
  - Hover: `#F8FAFC` background, Border: `#1A1A2E`.
- **Ghost / Tertiary:**
  - Background: Transparent, Text: `#0F766E`.
  - Hover: `#0F766E15` background.

### Navigation Links
- **Desktop Header Navigation:**
  - Inactive: Text `#1A1A2E`, hover `#0F766E`.
  - Active: Text `#0F766E`, background `#0F766E15`, border-radius `8px`, padding `6px 12px`. Alternatively, a solid `2px` bottom border in `#0F766E`.

### Status Badges & Chips
- Designed for compact tabular data and detail cards with an `8px` border-radius, font-size `11px` or `12px` (weight 600), and padding `4px 8px`:
  - **Pending:** Background `#F59E0B15`, Text `#F59E0B`.
  - **Accepted / Verified:** Background `#0F766E15`, Text `#0F766E`.
  - **In Progress:** Background `#E2E8F0`, Text `#1A1A2E`.
  - **Completed:** Background `#16A34A15`, Text `#16A34A`.
  - **Cancelled / Danger:** Background `#DC262615`, Text `#DC2626`.

### Cards & Surfaces
- Background: `#FFFFFF`.
- Border: `1px solid #E2E8F0`.
- Border-radius: `12px`.
- Padding: `20px` to `24px`.
- Elevation: Level 1 ambient shadow.

### Input Fields & Controls
- **Text Inputs:**
  - Height: 40px, Border-radius: `8px`, Border: `1px solid #E2E8F0`, Background: `#FFFFFF`.
  - Text: `#1A1A2E`, Placeholder: `#64748B`.
  - Focus: Border `#0F766E`, ring `2px solid rgba(15, 139, 141, 0.2)`.
- **Checkboxes & Radios:**
  - Checkbox radius `4px`, Radio radius `9999px`.
  - Unchecked border: `#E2E8F0`. Checked: `#0F766E` with white checkmark/dot.

### Star Ratings & Metric Accents
- Stars & Rating Glyphs: `#F59E0B`.
- Metric Counter Headers: `#1A1A2E`, weight 700 or 800.

# HUNAR Design System Specifications (colors.md Compliant)

## Color Palette

| Color Token | Hex Code | Semantic Role & Usage |
| :--- | :--- | :--- |
| **Navy** | `#1A1A2E` | Brand identity, main logo, page titles, section headings, prices, primary text |
| **Teal** | `#0F766E` | Primary call-to-actions, Post Job, Accept Offer, Pay, Approve, Verified badges |
| **Teal Dark** | `#115E59` | Interactive button hover states, active states |
| **Orange** | `#F59E0B` | Attention, pending status, quotes/offers waiting, ratings & stars, warnings |
| **Success** | `#16A34A` | Completed jobs, verified badges, online indicators, successful transactions |
| **Error** | `#DC2626` | Cancelled jobs, rejected disputes, failed payments, destructive delete actions |
| **Gray** | `#64748B` | Secondary descriptions, timestamps, metadata labels, inactive icons |
| **Background** | `#F8FAFC` | Global page background, subtle table hover states |
| **White** | `#FFFFFF` | Cards, modals, sidebars, navigation bars, dropdowns |
| **Border** | `#E2E8F0` | Structural dividers, card borders, form input borders |

## Typography Rules
- **Font Family**: Inter, sans-serif
- **Primary Text**: `#1A1A2E`
- **Secondary Text**: `#64748B`
