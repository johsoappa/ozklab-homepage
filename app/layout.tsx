import type { Metadata } from "next";
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";

const SITE_TITLE = "오즈케이랩 (OZ.K Lab) | 고객관리·A/S·품질관리 자동화";
const SITE_DESCRIPTION =
  "오즈케이랩(OZ.K Lab)은 고객관리, A/S, 품질관리, 업무일지·보고를 현장에 맞게 연결하는 맞춤형 업무 자동화 시스템을 설계합니다.";

/* TODO: 1200×630 공유 썸네일 제작 후 /og-image.png 로 교체 (현재는 기존 로고 이미지를 임시 사용) */
const OG_IMAGE = "/images/ozk-lab-logo.png";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | OZ.K Lab",
  },
  description: SITE_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://ozklab.kr",
    siteName: "OZ.K Lab",
    locale: "ko_KR",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1254, height: 1254, alt: "OZ.K Lab" }],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  metadataBase: new URL("https://ozklab.kr"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "6g7Khas70m8f96ZFXTxqOPpHrqkL-zQGdtte20h609g",
    other: {
      "naver-site-verification": "f088e4f23aea5e759f47529c96544b96b4573b24",
    },
  },
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
      <body className="min-h-full">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
