import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
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
