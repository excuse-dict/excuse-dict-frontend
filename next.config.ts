import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 홈페이지 주소 변경
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ]
  },
};

export default nextConfig;
