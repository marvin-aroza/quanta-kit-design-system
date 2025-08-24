import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable static generation to avoid prerendering issues
  generateStaticParams: false,
  experimental: {
    turbo: undefined,
  },
  output: "standalone",
};

export default nextConfig;
