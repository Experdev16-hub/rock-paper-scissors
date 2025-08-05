import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // For Docker deployments
  images: {
    unoptimized: true, // Disable if you're not using Next.js Image Optimization
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Remove after fixing all TS errors
  },
};

export default nextConfig;

