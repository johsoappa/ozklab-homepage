import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold tracking-widest text-[#E85D30] mb-3">404</p>
        <h1
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ lineHeight: "1.32", letterSpacing: "-0.03em", wordBreak: "keep-all" }}
        >
          찾으시는 페이지가 없습니다
        </h1>
        <p
          className="text-sm sm:text-base text-gray-600 mb-8"
          style={{ lineHeight: "1.85", wordBreak: "keep-all" }}
        >
          주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 메인 페이지에서 필요한 내용을 다시
          찾아보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-[#111827] bg-[#E85D30] hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E85D30]"
          >
            메인으로 돌아가기
          </Link>
          <Link
            href="/flow-check"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
          >
            업무 진단 해보기
          </Link>
        </div>
      </div>
    </main>
  );
}
