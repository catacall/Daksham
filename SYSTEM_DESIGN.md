# Daksham Developers - System Design Document

## 1. Architecture Overview

The Daksham Developers website is built using a modern **Headless CMS architecture** blended with **Next.js App Router (v15)**. Instead of separating the CMS and the frontend into two different repositories or servers, **Payload CMS** is integrated natively into the Next.js application.

This provides:
- A single unified codebase.
- Zero network latency between the backend CMS logic and frontend rendering.
- Shared TypeScript types between the CMS models and frontend components.

## 2. Core Technologies

- **Frontend & Backend Server**: Next.js 15 (App Router, Turbopack)
- **Content Management System**: Payload CMS 3.0
- **Database**: PostgreSQL
- **UI Framework**: Tailwind CSS 4.0
- **Animation Libraries**: Framer Motion (for React-based physics animations) & GSAP (for scroll-trigger complex timeline animations).
- **Icons**: Lucide React

## 3. Data Flow & Rendering Strategy

- **Static Generation & Server-Side Rendering (SSR)**: Project pages (`/projects/ongoing`, `/projects/delivered`, `/projects/[slug]`) dynamically query Payload CMS via the Local API (`getPayload()`). These are Server Components, meaning database queries execute safely on the server without exposing credentials to the client.
- **Client Components**: Interactive sections of the site (Navbar dropdowns, GSAP Carousels, Framer Motion fade-ins, Enquiry Forms) use the `"use client"` directive.

## 4. CMS Collections

The database schema is defined in Payload CMS via collections in `/src/collections`:
- **Users**: Standard Payload administrators who manage the site content.
- **Projects**: Central entity containing fields like title, slug, status (ongoing/delivered), features, hero image, and gallery.
- **Enquiries**: Form submissions from users. It stores names, emails, phone numbers, the project of interest, and metadata.

## 5. Security & Forms

- The Enquiry form endpoint securely writes to the CMS database.
- Forms are validated on the client side using standard React states before submission to prevent spam.
- Database access is restricted. The Payload admin panel is accessible at `/admin` and requires authentication.

## 6. Design System

- **Colors**: Defined in `globals.css` using custom CSS variables (e.g., `--background`, `--foreground`, `--accent`). The theme relies on a premium "Navy & Champagne Gold" aesthetic.
- **Typography**: Uses `next/font/google` to inject the Cinzel (serif, display) and Outfit (sans-serif) fonts optimized at build time.
- **Animations**: Reusable `FadeIn.tsx` wrapper for server components, while hero sections use direct `motion.div` from Framer Motion.
