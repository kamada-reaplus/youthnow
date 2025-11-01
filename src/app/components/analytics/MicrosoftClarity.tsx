"use client";

import Script from "next/script";

interface MicrosoftClarityProps {
  clarityId: string;
}

/**
 * Microsoft Clarity コンポーネント
 *
 * 機能:
 * - ヒートマップ (クリック、スクロール)
 * - セッション録画
 * - レイジクリック検知
 * - デッドクリック検知
 * - ユーザー行動分析
 *
 * 使い方:
 * 1. Microsoft Clarity (https://clarity.microsoft.com/) でプロジェクトを作成
 * 2. プロジェクトID (10文字の英数字) を .env.local の NEXT_PUBLIC_CLARITY_ID に設定
 * 3. このコンポーネントを layout.tsx に追加
 *
 * @param clarityId - ClarityプロジェクトID (例: abcdefghij)
 */
export default function MicrosoftClarity({
  clarityId,
}: MicrosoftClarityProps) {
  if (!clarityId) {
    console.warn("Clarity ID が設定されていません");
    return null;
  }

  return (
    <Script
      id="clarity-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}
