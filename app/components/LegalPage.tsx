import Link from "next/link";

export const LEGAL_EFFECTIVE_DATE = "2026년 11월 3일";

export type LegalSection = {
  title: string;
  body: React.ReactNode;
};

export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center min-h-11 font-bold text-xl text-gray-900">
            OZ.K <span className="ml-1 text-[#E85D30]">Lab</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center min-h-11 text-sm text-gray-600 hover:text-gray-900"
          >
            홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3"
          style={{ lineHeight: "1.32", letterSpacing: "-0.03em", wordBreak: "keep-all" }}
        >
          {title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">시행일: {LEGAL_EFFECTIVE_DATE}</p>
        <p
          className="text-sm sm:text-base text-gray-600 mb-10"
          style={{ lineHeight: "1.85", wordBreak: "keep-all" }}
        >
          {intro}
        </p>

        <div className="space-y-9">
          {sections.map((s, i) => (
            <section key={i}>
              <h2
                className="text-lg font-bold text-gray-900 mb-3"
                style={{ wordBreak: "keep-all" }}
              >
                {i + 1}. {s.title}
              </h2>
              <div
                className="text-sm sm:text-base text-gray-600 space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5"
                style={{ lineHeight: "1.85", wordBreak: "keep-all" }}
              >
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <nav
          aria-label="관련 문서"
          className="mt-14 pt-6 border-t border-gray-100 flex gap-5 text-sm"
        >
          <Link href="/terms" className="inline-block py-3 text-gray-600 hover:text-gray-900 hover:underline">
            이용약관
          </Link>
          <Link href="/privacy" className="inline-block py-3 text-gray-600 hover:text-gray-900 hover:underline">
            개인정보 처리방침
          </Link>
        </nav>
      </main>
    </div>
  );
}
