import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Proxy /api/django/** → Django backend
        // Change NEXT_PUBLIC_DJANGO_URL in .env.local for production
        source: "/api/django/:path*",
        destination: `${process.env.NEXT_PUBLIC_DJANGO_URL ?? "http://localhost:8000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
