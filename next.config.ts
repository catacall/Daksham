import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Accept any quality level
    qualities: [100, 75, 90],
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
    // Allow any image format — JPG, PNG, WebP, AVIF, GIF
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ['drizzle-kit', '@libsql', '@libsql/client', 'pg'],
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
