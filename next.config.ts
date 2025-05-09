import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/login",
      permanent: false,
    },
  ],
  rewrites: async () => [
    {
      source: "/api/v2/:path*",
      destination: `${process.env.BACKEND_URL}/api/:path*`,
    },
  ],
};

export default nextConfig;
