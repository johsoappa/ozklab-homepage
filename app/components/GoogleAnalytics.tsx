import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/* G-XXXXXXXXXX 형식만 허용해 인라인 스크립트에 임의 문자열이 들어가지 않게 한다. */
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;
  if (!GA_ID || !GA_ID_PATTERN.test(GA_ID)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
