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
  // Only use basePath in production/build
  ...(process.env.NODE_ENV === "production" && {
    basePath: "/docs/react",
    assetPrefix: "/docs/react",
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
