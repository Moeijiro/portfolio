import type { NextConfig } from "next";

// Served from GitHub Pages at /portfolio; BASE_PATH="" for a root domain.
const basePath = process.env.BASE_PATH ?? "/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  devIndicators: false,
};

export default nextConfig;
