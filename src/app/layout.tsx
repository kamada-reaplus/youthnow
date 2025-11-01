import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleTagManager from "@/app/components/analytics/GoogleTagManager";
import MicrosoftClarity from "@/app/components/analytics/MicrosoftClarity";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title:
    "Youth Now - 若年層インサイトマーケティング | 最短24時間で数千人から本音収集",
  description:
    "次世代型インサイトマーケティングサービス。最短24時間で若年層の本音を収集。多角的な調査で若年層のトレンドを把握し、効果的なマーケティング戦略を支援します。",
  keywords: [
    "インサイトマーケティング",
    "若年層",
    "市場調査",
    "インフルエンサー調査",
    "Youth Now",
    "若年層",
    "マーケティングリサーチ",
  ],
  openGraph: {
    title: "Youth Now - 若年層インサイトマーケティング",
    description:
      "最短24時間で数千人から本音収集。インフルエンサーへの直接調査で圧倒的なコストパフォーマンスを実現。",
    type: "website",
    locale: "ja_JP",
    siteName: "Youth Now",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youth Now - 若年層インサイトマーケティング",
    description: "最短24時間で数千人から本音収集",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console用（後で設定）
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 環境変数から計測ツールのIDを取得
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const enableAnalytics =
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" ||
    process.env.NODE_ENV === "production";

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-rounded-mplus antialiased`}
      >
        {/* 計測ツール: GTM経由でGA4やその他のタグを管理 */}
        {enableAnalytics && gtmId && <GoogleTagManager gtmId={gtmId} />}

        {/* Microsoft Clarity: ヒートマップ・セッション録画 */}
        {enableAnalytics && clarityId && (
          <MicrosoftClarity clarityId={clarityId} />
        )}

        {children}
      </body>
    </html>
  );
}
