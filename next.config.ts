import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [], // Không cần external domains nữa
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
  },
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
