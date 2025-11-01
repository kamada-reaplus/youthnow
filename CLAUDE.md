# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**注意: Claude Code とのやり取りは常に日本語で行ってください。**

## プロジェクト概要

Youth Now は、TypeScript と Tailwind CSS で構築された Next.js 14 のランディングページアプリケーションです。シアン/ゴールドのカラースキームを使用した包括的なデザインシステムを実装しています。

## 開発コマンド

```bash
# 開発サーバー起動 (http://localhost:3000)
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# リント実行
npm lint
```

## アーキテクチャ

### コンポーネント構造

アプリは階層的なコンポーネント構成に従っています:

- **レイアウトコンポーネント** ([src/app/components/layout/](src/app/components/layout/)): サイト全体の構造 (Header, Footer, FloatingCTAButton)
- **セクションコンポーネント** ([src/app/components/sections/](src/app/components/sections/)): ページの全幅セクション (Hero, ProblemSection, VALUESection など)
- **UI コンポーネント** ([src/app/components/ui/](src/app/components/ui/)): 再利用可能な UI 要素 (SectionHeader, ContactButton, AbstractBackground, SectionDivider など)

### ページ構成パターン

メインページ ([src/app/page.tsx](src/app/page.tsx)) は以下のレイヤー構造を使用:

1. 抽象的な背景レイヤー (低い z-index)
2. Header、セクション、Footer、FloatingCTAButton を含むコンテンツレイヤー (z-index: 10)
3. セクション間は SectionDivider コンポーネントで区切られており、4 つのバリアント (wave, blob, geometric, curve) があります

### インポートエイリアス

プロジェクトでは `@/*` を `src/*` のエイリアスとして使用 ([tsconfig.json](tsconfig.json) で設定)

## デザインシステム

デザインシステムは [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) に詳しく記載されています。重要なポイント:

### ブランドカラー

- **プライマリー (シアン)**: `bg-brand-primary` (#00BCD4) - CTA、リンク、ブランド要素に使用
- **セカンダリー (ゴールド)**: `bg-brand-secondary` (#FFD700) - アクセントやハイライトに使用
- **ニュートラル**: `bg-neutral-white` (#F9FAFB), `bg-neutral-black` (#1F2937)

ネストされた色には `brand-primary-light`, `brand-primary-dark` などでアクセス可能

### タイポグラフィ

[tailwind.config.ts](tailwind.config.ts) でカスタムクラスとして設定:

- 見出し: `text-h1` から `text-h6` (48px〜18px、すべて Bold)
- 本文: `text-body-lg`, `text-body`, `text-body-sm`, `text-caption`
- すべてのテキストは「Rounded Mplus 1c」フォントファミリーを使用 (Futura/システムフォントへのフォールバック)

注意: デザインシステムでは「Rounded Mplus 1c」を指定していますが、Tailwind 設定では Futura がプライマリフォントになっています。グローバル CSS で `@layer base` を通じて「Rounded Mplus 1c」が適用されます。

### スペーシング

8px ベースのスペーシングスケールとカスタム値:

- `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (24px)
- セクションスペーシングユーティリティ: `.section-spacing` (モバイル 48px/デスクトップ 64px), `.section-spacing-lg` (64px/96px)

### カスタムユーティリティ

- テキストストローク: `.text-stroke-white`, `.text-stroke-black`, `.text-stroke-1/2/3`
- アニメーション: `animate-float-slow`, `animate-float-medium`, `animate-float-fast`

## スタイリングアプローチ

- 広範なカスタマイズを加えた Tailwind CSS を使用
- `darkMode: "class"` でダークモードサポートを設定
- shadcn/ui 互換性のための CSS 変数を [src/app/globals.css](src/app/globals.css) で定義
- `@layer base` を通じて HTML 要素 (h1-h6, p, button, input, label) にグローバルタイポグラフィスタイルを適用

## 主要な依存関係

- **next**: 14.2.33 (App Router アーキテクチャ)
- **react**: 18
- **tailwindcss**: 3.4.1 (カスタムデザイントークン付き)
- **lucide-react**: アイコンライブラリ
- **embla-carousel-react**: カルーセル機能
- **react-hook-form**: フォーム処理
- **next-themes**: ダークモードサポート
- **class-variance-authority**: コンポーネントバリアント
- **tailwind-merge**: Tailwind クラス結合ユーティリティ

## ファイル構成

```
src/app/
├── components/
│   ├── layout/        # サイト全体のレイアウトコンポーネント
│   ├── sections/      # ページセクションコンポーネント
│   └── ui/            # 再利用可能なUIコンポーネント
├── assets/            # 画像と静的アセット
├── fonts/             # ローカルフォントファイル (Geist)
├── globals.css        # グローバルスタイルとデザインシステムCSS
├── layout.tsx         # メタデータを含むルートレイアウト
└── page.tsx           # ホームページの構成
```

## 言語設定

プロジェクトは日本語優先です (layout で lang="ja")。すべてのコンポーネントテキスト、メタデータ、デザインシステムのドキュメントは日本語で記述されています。

## コンポーネントパターン

### SectionHeader コンポーネント

セクション用の再利用可能なヘッダーコンポーネント。以下の props を持ちます:

- `title`: 改行用の `<br />` タグを含めることができる文字列
- `centered`, `responsive`, `leadingTight`, `textColor`, `className`

### セクションコンポーネント

一貫したパターンに従います:

- セマンティック HTML (section, article) を使った全幅セクション
- 垂直方向のパディングには `.section-spacing` または `.section-spacing-lg` を使用
- 通常、最大幅制約のためにコンテナ div でラップされます

## Playwright MCP 使用ルール

### 絶対的な禁止事項

1. **いかなる形式のコード実行も禁止**

   - Python、JavaScript、Bash 等でのブラウザ操作
   - MCP ツールを調査するためのコード実行
   - subprocess やコマンド実行によるアプローチ

2. **利用可能なのは MCP ツールの直接呼び出しのみ**

   - playwright:browser_navigate
   - playwright:browser_screenshot
   - 他の Playwright MCP ツール

3. **エラー時は即座に報告**
   - 回避策を探さない
   - 代替手段を実行しない
   - エラーメッセージをそのまま伝える
