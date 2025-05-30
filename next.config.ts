import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // 개발환경에서 요청 두 번씩 가는 것 방지
  
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
