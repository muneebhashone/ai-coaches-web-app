import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Pass the path to your i18n config file directly as a string
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: false,
  redirects: async () => [
    {
      source: "/",
      destination: "/en/login",
      permanent: false,
    },
    {
      source: "/dashboard/:path*",
      destination: "/en/dashboard/:path*",
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

export default withNextIntl(nextConfig);
