import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/users",
      permanent: true,
    },
  ],
};

export default nextConfig;
