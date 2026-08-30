import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OZ.K Lab | CRM·A/S·QC·업무자동화 시스템 구축",
  description:
    "OZ.K Lab은 고객관리, A/S·QC, 업무일지, 보고·정산 흐름을 현장에 맞게 연결하는 맞춤형 업무 시스템을 설계·구축합니다.",
  keywords: [
    "OZ.K Lab",
    "오즈케이랩",
    "CRM 구축",
    "고객관리 시스템",
    "A/S 관리",
    "QC 관리",
    "업무자동화",
    "업무일지 자동화",
    "맞춤형 웹앱",
    "운영관리 시스템",
  ],
  openGraph: {
    title: "OZ.K Lab | CRM·A/S·QC·업무자동화 시스템 구축",
    description:
      "OZ.K Lab은 고객관리, A/S·QC, 업무일지, 보고·정산 흐름을 현장에 맞게 연결하는 맞춤형 업무 시스템을 설계·구축합니다.",
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
