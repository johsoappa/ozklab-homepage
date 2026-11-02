import type { NextConfig } from "next";

/*
 * HTTPS 강제: Vercel은 http 요청을 https로 자동 리다이렉트(308)하므로 앱 레벨 리다이렉트는 두지 않는다
 * (프록시 환경에서 리다이렉트 루프 위험). 대신 HSTS 헤더로 브라우저가 이후 https만 사용하게 한다.
 * 자체 서버(Nginx 등)로 옮기면 80 → 443 리다이렉트를 서버 설정에서 추가해야 한다.
 */
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
