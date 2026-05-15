import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OZ.K Lab — AI와 자동화로 현실에 쓰이는 서비스",
  description:
    "OZ.K Lab은 아이의 진로 탐색부터 작은 조직의 업무 자동화까지, 생활과 현장에서 바로 쓰이는 디지털 솔루션을 설계합니다.",
  keywords: ["OZ.K Lab", "업무자동화", "꿈따라", "명따라", "좋소아빠", "진로탐색", "AI솔루션"],
  openGraph: {
    title: "OZ.K Lab — AI와 자동화로 현실에 쓰이는 서비스",
    description:
      "OZ.K Lab은 아이의 진로 탐색부터 작은 조직의 업무 자동화까지, 생활과 현장에서 바로 쓰이는 디지털 솔루션을 설계합니다.",
    url: "https://ozklab.kr",
    siteName: "OZ.K Lab",
    locale: "ko_KR",
    type: "website",
  },
  metadataBase: new URL("https://ozklab.kr"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
