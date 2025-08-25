import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: undefined,
  },
  output: "export",
  trailingSlash: true,
  basePath: "/docs/react",
  assetPrefix: "/docs/react",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
