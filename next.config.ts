import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/thinking",
        destination: "/notes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
