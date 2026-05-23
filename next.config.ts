import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  typescript: {
    ignoreBuildErrors: true,
  },

  // Compress responses
  compress: true,

  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Bundle analyzer can be enabled: ANALYZE=true next build
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "react-icons"],
  },
};

export default nextConfig;
