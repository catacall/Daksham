# Daksham Developers & PGRO - Premium Real Estate Platform

A luxurious, high-performance web platform built for **Daksham Developers / PGRO**. This application serves as a digital storefront for premium real estate and transformative business ventures, featuring an animated, high-end user interface and a fully integrated headless CMS for content management.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **CMS**: [Payload CMS 3.0](https://payloadcms.com/) (Integrated natively into Next.js)
- **Database**: PostgreSQL (via Neon or local)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons**: Lucide React

## ✨ Key Features

- **High-End UI/UX**: Premium "Navy & Champagne Gold" theme featuring glassmorphism, dynamic scroll animations, and video hero sections.
- **Native CMS Integration**: Payload CMS runs directly inside the Next.js application, sharing the same server, routing, and database connection.
- **Dynamic Project Portfolios**: Fully manageable "Ongoing" and "Delivered" project showcases.
- **Integrated Enquiry System**: User enquiries from the frontend are validated and stored directly into the CMS database for easy tracking.
- **SEO Optimized**: Server-Side Rendering (SSR) and metadata management via Next.js App Router.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18.20.2+ or v20.9.0+)
- PostgreSQL Database

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Ensure your `.env` file is set up with your database and Payload secrets:
   ```env
   DATABASE_URI=postgresql://user:password@host:port/dbname
   PAYLOAD_SECRET=your-secure-secret
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *Note: On your first run, Payload may prompt you in the terminal to execute database migrations. Press `y` to accept.*

4. **Access the Application:**
   - **Frontend Site**: [http://localhost:3000](http://localhost:3000)
   - **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📂 Project Structure

- `/src/app/(app)` - The main Next.js frontend application routes.
- `/src/app/(payload)` - The Payload CMS admin panel and API routes.
- `/src/components` - Reusable React components (Navbar, Footer, ProjectCards, GSAP showcases).
- `/src/payload.config.ts` - Main configuration for Payload CMS.
- `/src/collections` - Database schema definitions for Projects, Users, and Enquiries.
