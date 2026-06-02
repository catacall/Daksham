# 📄 Website Overview

**PGRO** is a modern, premium‑looking web presence for the *PGRO Group* that showcases real‑estate projects, business ventures, and awards while providing smooth navigation and rich interactive experiences. The site blends a sleek UI with powerful back‑end services to deliver fast, SEO‑friendly, and mobile‑responsive pages.

---

### 🚀 Tech Stack

| Layer | Technology | Why it’s used |
|-------|------------|---------------|
| **Front‑end** | **Next.js 16** (React 19) | Server‑side rendering, static site generation, and built‑in routing for excellent performance and SEO. |
| | **Tailwind CSS ^4** | Utility‑first styling, rapid theming, and easy implementation of glass‑morphism, gradients, and dark‑mode. |
| | **Framer Motion** | Elegant micro‑animations for hover effects, menu transitions, and carousel motion. |
| | **lucide‑react** | Lightweight, customizable SVG icons (menu, close, social icons). |
| | **GSAP** | Advanced timeline‑based animations for carousel and scroll‑based effects. |
| | **Payload CMS** (via `@payloadcms/next`) | Headless CMS for managing content (projects, awards, news) with a clean admin UI. |
| | **Prisma + PostgreSQL** (`@prisma/client`, `@payloadcms/db-postgres`) | Type‑safe data access layer for persistent data (contact forms, newsletters). |
| | **Resend** (`resend`) | Transactional email service for contact‑form submissions and newsletters. |
| | **Sanity client** (`@sanity/client`) | Optional integration for real‑time content previews. |
| | **GraphQL** (`graphql`) | Efficient data fetching from the CMS when needed. |
| **Build & Dev** | **TypeScript 5** | Strong typing across the entire code base. |
| | **ESLint + Next lint config** | Consistent code style and early error detection. |
| | **Tailwind PostCSS** | Custom utilities and JIT compilation for optimal CSS size. |
| **Hosting / Deployment** | **Vercel / Next.js Edge Runtime** (default) | Zero‑config deployments, global CDN, and automatic SSL. |
| **Analytics & SEO** | **Next.js built‑in Head component** + meta tags | Dynamic page titles, meta descriptions, and Open Graph tags for each route. |
| **Accessibility** | **ARIA attributes + semantic HTML** | Ensures WCAG‑AA compliance for screen‑readers and keyboard navigation. |

---

### ✨ Core Features

| Feature | Description |
|---------|-------------|
| **Responsive Navbar** | Fixed header that becomes solid on scroll, with desktop links and a hamburger‑menu powered by `framer‑motion` animations. |
| **Dynamic Carousel** | Touch‑friendly image carousel (auto‑play, manual navigation) built with `gsap` for smooth transitions. |
| **Glass‑morphism Sections** | Modern UI sections using Tailwind’s backdrop‑blur utilities for a premium “glass” look. |
| **Interactive Footer** | Multi‑column layout with quick links, legal info, contact details, and social icons (`SocialLinks` component). |
| **CMS‑Driven Content** | All textual content (about, projects, awards) is stored in Payload CMS, enabling non‑technical editors to update the site. |
| **Contact Form** | Server‑less endpoint that sends emails via **Resend**, stores submissions in PostgreSQL, and shows success toast. |
| **SEO‑Optimized Pages** | Each page sets a unique `<title>` and `<meta description>` using Next’s `Head`. Structured data (JSON‑LD) is injected for rich results. |
| **Dark Mode Support** | Tailwind’s `dark:` variants toggle the whole theme based on user OS preference. |
| **Performance Optimizations** | - Image‑optimisation with Next `Image` component (lazy loading, responsive sizes). <br> - Automatic code‑splitting and static asset caching. |
| **Accessibility** | Keyboard‑navigable menus, adequate color contrast, and skip‑to‑content links. |
| **Analytics Ready** | Stubbed integration points for Google Analytics / Vercel Analytics. |
| **Future‑Ready Architecture** | Clean separation of UI components (`src/components/*`), page routes (`pages/`), and API routes (`pages/api/`). |

---

### 📚 Suggested Places for This Description

- **README.md** (project root) – gives developers a quick overview.  
- **About page** (`pages/about.tsx`) – present to visitors as the “Our Story”.  
- **Meta tags** – you can inject the short blurb into the `<meta name="description">` for SEO.

Feel free to copy‑paste the above sections wherever you need a concise yet comprehensive description of the PGRO website, its tech stack, and the feature set it delivers. 🎉
