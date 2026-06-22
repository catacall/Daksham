# UI Registry

This registry tracks the design system tokens, CSS classes, and visual patterns across components to enforce UI consistency.

## Baseline — Established 2026-06-22

| Property         | Correct class / Value | Description |
| ---------------- | --------------------- | ----------- |
| Primary Dark Bg  | `bg-navy` / `#0a1628` | Main dark background for headers, footers, and dark sections |
| Secondary Dark   | `bg-navy-light` / `#122240` | Lighter dark variant for cards, inputs, and components in dark themes |
| Accent Accent 1  | `bg-gold` / `#d4af37` | Premium accent color for buttons, active elements, and highlights |
| Accent Accent 2  | `bg-cyan` / `#00d4ff` | Cyan highlight used for borders, hover states, and dynamic glow blurs |
| Light Background | `bg-off-white` / `#f0f4f8` | Primary light background color for main body and sections |
| Card Background  | `bg-white` / `bg-zinc-200/60` | Light-themed cards and containers |
| Light Border     | `border-border-light` / `#d4dde8` | Default border for light-themed inputs, panels |
| Dark Border      | `border-border-dark` / `#1e3054` | Default border for dark-themed elements |
| Primary Text     | `text-navy` or `text-white` | Primary copy color for headings and text |
| Secondary Text   | `text-muted` / `#8a9bb5` | Descriptive text color for paragraphs and labels |
| Display Font     | `font-display` (Cinzel) | Classy serif styling for headings, section titles |
| Sans Font        | `font-sans` (Outfit) | Clean sans-serif styling for paragraphs, forms, and UI controls |

---

### DeveloperProfile

File: [DeveloperProfile.tsx](file:///c:/Users/Admin/OneDrive/Desktop/Daksham/src/components/Frontend/DeveloperProfile.tsx)
Last updated: 2026-06-22

| Property         | Class           |
| ---------------- | --------------- |
| Background       | `bg-off-white` (section), `bg-zinc-200/60` (profile card container), `bg-white` (inner image boxes) |
| Border           | `border border-zinc-300/40` (card), `border border-zinc-300` (image boxes) |
| Border radius    | `rounded-[32px]` (card), `rounded-2xl` (image boxes) |
| Text — primary   | `text-navy` (headings, titles), `font-display` |
| Text — secondary | `text-muted` (body text), `font-sans` |
| Spacing          | `py-16 sm:py-20 md:py-24` (section padding), `p-6 sm:p-10 md:p-16` (card padding), `gap-8 md:gap-12 lg:gap-16` (grid gap) |
| Hover state      | None |
| Shadow           | `shadow-xl` (card), `shadow-lg` (image boxes) |
| Accent usage     | `text-gold` (badge), `bg-gold opacity-60` (divider line), `bg-cyan/5` (decorative glow blur) |

**Pattern notes:**
Used for presenting the visionary partnership and leadership profile with high-contrast, premium rounded containers.

---

### ShowCase

File: [ShowCase.tsx](file:///c:/Users/Admin/OneDrive/Desktop/Daksham/src/components/Frontend/ShowCase.tsx)
Last updated: 2026-06-22

| Property         | Class           |
| ---------------- | --------------- |
| Background       | `bg-navy` (section), `bg-navy-light` (project cards), `bg-transparent` (secondary button) |
| Border           | `border-white/10` (header divider), `border border-white/8` (project cards), `border-gold/40` (secondary button border) |
| Border radius    | `rounded-[20px]` (project cards), `rounded-xl` (action buttons) |
| Text — primary   | `text-white` (titles, labels), `font-display` |
| Text — secondary | `text-white/35` (scroll indicator label), `font-sans` |
| Spacing          | `py-12 sm:py-16 md:py-20` (section padding), `pb-6` (header padding), `px-4 sm:px-6 md:px-12 lg:px-16 pb-2` (carousel padding) |
| Hover state      | `group-hover:scale-105` (image transition), `hover:bg-gold hover:border-gold hover:text-navy` (secondary button), `hover:bg-gold-light` (download button) |
| Shadow           | `shadow-md` (cards/secondary button), `shadow-lg` (download button) |
| Accent usage     | `text-gold`, `bg-gold`, `hover:bg-gold-light` |

**Pattern notes:**
Provides a sleek, responsive horizontal scrollable carousel showcasing premium developments with an elegant dark theme contrast.

---

### ExploreVision

File: [ExploreVision.tsx](file:///c:/Users/Admin/OneDrive/Desktop/Daksham/src/components/Frontend/ExploreVision.tsx)
Last updated: 2026-06-22

| Property         | Class           |
| ---------------- | --------------- |
| Background       | `bg-off-white` (section), `bg-white` (cards), `bg-navy` (video container) |
| Border           | `bg-gold/20` (top accent border line), `border border-zinc-200/50` (cards), `border border-zinc-200/80` (video container) |
| Border radius    | `rounded-3xl` (cards), `rounded-[24px] sm:rounded-[32px]` (video container) |
| Text — primary   | `text-navy` (titles), `font-display` |
| Text — secondary | `text-muted` (descriptions), `font-sans` |
| Spacing          | `py-16 sm:py-20 md:py-24` (section padding), `p-6` (card padding), `gap-8 md:gap-12` (grid gap), `mt-16 sm:mt-20 md:mt-24` (video container) |
| Hover state      | None |
| Shadow           | `shadow-xs` (cards), `shadow-2xl` (video container) |
| Accent usage     | `bg-gold opacity-60` (card divider lines), `bg-gold/20` (top accent line) |

**Pattern notes:**
Standardizes a clean, minimal 3-column layout showcasing corporate vision, mission, and core values, immediately followed by the responsive YouTube brand video container.

---

### AdminLoginPage

File: [page.tsx](file:///c:/Users/Admin/OneDrive/Desktop/Daksham/src/app/(manage)/manage/login/page.tsx)
Last updated: 2026-06-22

| Property         | Class           |
| ---------------- | --------------- |
| Background       | `bg-navy` (screen container), `bg-navy-light/40` (glassmorphic card), `bg-navy/60` (input fields), `bg-red-500/10` (error alert) |
| Border           | `border border-white/5` (card), `border border-white/10` (inputs), `border border-red-500/20` (error alert) |
| Border radius    | `rounded-3xl` (card), `rounded-xl` (inputs/buttons), `rounded-full` (background blur spots) |
| Text — primary   | `text-white` (headings, inputs) |
| Text — secondary | `text-muted/80`, `text-muted/60` (labels, placeholder, subtitle) |
| Spacing          | `p-8` (card padding), `space-y-5` (form spacing), `py-3.5 px-4` (inputs) |
| Hover state      | `focus:border-gold focus:ring-1 focus:ring-gold/30` (inputs), `hover:bg-gold-light disabled:bg-gold/50` (button) |
| Shadow           | `shadow-2xl` (card), `shadow-lg shadow-gold/10` (button) |
| Accent usage     | `text-gold` (icons, loader), `bg-gold` (submit button), `bg-cyan/5` / `bg-gold/5` (blurred background spots) |

**Pattern notes:**
Glassmorphic dark card overlay on a rich background with animated blur shapes, following secure admin authentication patterns.

---

### Footer

File: [Footer.tsx](file:///c:/Users/Admin/OneDrive/Desktop/Daksham/src/components/Frontend/Footer.tsx)
Last updated: 2026-06-22

| Property         | Class           |
| ---------------- | --------------- |
| Background       | `bg-navy` (footer container) |
| Border           | `bg-cyan/30` (top accent border line), `border-t border-border-dark/50` (bottom copyright divider) |
| Border radius    | None |
| Text — primary   | `text-gold` (headings), `text-white` (general text/copyright) |
| Text — secondary | `text-muted`, `text-muted/50` (descriptions, links, copyright) |
| Spacing          | `py-12 md:py-16` (footer padding), `gap-10 md:gap-12` (grid gap), `mt-12 md:mt-16 pt-8` (copyright padding) |
| Hover state      | `hover:text-cyan transition-colors` (navigation/contact links) |
| Shadow           | None |
| Accent usage     | `text-gold` (titles), `hover:text-cyan` (interactive links), `bg-cyan/30` (top accent border) |

**Pattern notes:**
Clean, high-fidelity site footer supporting navigation, dynamic email/phone hover states with brand accents (cyan hover, gold headers).
