import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OZ.K Flow Check | 3분 업무자동화 자가진단 - OZ.K Lab",
  description:
    "3분 진단으로 반복 업무, 누락 위험, 현재 업무 흐름을 확인하고 OZ.K Lab의 권장 자동화 도입 방향을 무료로 받아보세요.",
  openGraph: {
    title: "OZ.K Flow Check | 3분 업무자동화 자가진단",
    description:
      "3분 진단으로 반복 업무, 누락 위험, 현재 업무 흐름을 확인하고 OZ.K Lab의 권장 자동화 도입 방향을 무료로 받아보세요.",
    url: "https://ozklab.kr/flow-check",
    siteName: "OZ.K Lab",
    locale: "ko_KR",
    type: "website",
  },
};

export default function FlowCheckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
