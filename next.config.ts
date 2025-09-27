import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cjfoods.com.vn'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
  },
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
