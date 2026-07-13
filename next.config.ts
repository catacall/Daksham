import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Quality levels available to the optimizer
    qualities: [75, 85, 90, 100],
    // Default quality for all Next.js <Image> components (sweet spot)
    // Individual components can override with quality prop
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],
    remotePatterns: [
      // Vercel Blob Storage (production)
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      // Local dev server
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      // Any https hostname — allows custom domains and CDN URLs from uploads
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Serve modern formats: browser gets AVIF first, falls back to WebP
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ['drizzle-kit', '@libsql', '@libsql/client', 'pg'],
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
