"use client";

import Script from "next/script";

interface GoogleTagManagerProps {
  gtmId: string;
}

/**
 * Google Tag Manager コンポーネント
 *
 * 使い方:
 * 1. Google Tag Manager でコンテナを作成
 * 2. コンテナID (GTM-XXXXXXX) を .env.local の NEXT_PUBLIC_GTM_ID に設定
 * 3. このコンポーネントを layout.tsx に追加
 *
 * @param gtmId - GTMコンテナID (例: GTM-XXXXXXX)
 */
export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  if (!gtmId) {
    console.warn("GTM ID が設定されていません");
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - Head */}
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />

      {/* Google Tag Manager - Body (noscript fallback) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
