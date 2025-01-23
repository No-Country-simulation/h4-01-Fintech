import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['lh3.googleusercontent.com'],
//   },
// }

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig;
