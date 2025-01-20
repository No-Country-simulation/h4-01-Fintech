import type { NextConfig } from "next";
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const nextConfig: NextConfig = {
  webpack: (config, { isServer, dev }) => {
    // Solo aplica el plugin en desarrollo
    if (dev) {
      config.plugins.push(new CaseSensitivePathsPlugin());
    }
    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
