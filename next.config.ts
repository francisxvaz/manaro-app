import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vdxl.im',
        port: '',
        pathname: '/**',
      },
    ],

  }

};

export default nextConfig;
