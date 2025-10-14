# デザインシステムガイド

## 概要

このプロジェクトでは Tailwind CSS ベースのデザインシステムを採用しています。
一貫したデザインと開発効率を保つため、以下のルールに従ってください。

## カラーパレット

### プライマリーカラー（シアン）

```jsx
// 使用例
<button className="bg-brand-primary text-white">メインボタン</button>
<button className="bg-brand-primary-light text-white">ライトボタン</button>
<button className="bg-brand-primary-dark text-white">ダークボタン</button>
```

- `text-brand-primary` / `bg-brand-primary` - メイン (#00BCD4)
- `text-brand-primary-light` / `bg-brand-primary-light` - ライト (#4DD0E1)
- `text-brand-primary-dark` / `bg-brand-primary-dark` - ダーク (#0097A7)

### セカンダリーカラー（ゴールド）

```jsx
// 使用例
<div className="bg-brand-secondary text-black p-4">アクセント要素</div>
```

- `text-brand-secondary` / `bg-brand-secondary` - メイン (#FFD700)
- `text-brand-secondary-light` / `bg-brand-secondary-light` - ライト (#FFE44D)
- `text-brand-secondary-dark` / `bg-brand-secondary-dark` - ダーク (#FFC700)

### ニュートラルカラー

```jsx
// 使用例
<div className="bg-neutral-white text-neutral-black">
  <p>テキストコンテンツ</p>
</div>
```

- `text-neutral-white` / `bg-neutral-white` - ホワイト (#F9FAFB)
- `text-neutral-black` / `bg-neutral-black` - ブラック (#1F2937)

### セマンティックカラー

```jsx
// 使用例
<div className="text-success">成功メッセージ</div>
<div className="bg-error text-white p-2">エラーアラート</div>
```

- `text-success` / `bg-success` - 成功 (#10B981)
- `text-warning` / `bg-warning` - 警告 (#FFD700)
- `text-error` / `bg-error` - エラー (#FF4D4D)
- `text-info` / `bg-info` - 情報 (#00BCD4)

## タイポグラフィ

### 見出し

```jsx
// 使用例
<h1 className="text-h1">ヒーローセクション見出し</h1>
<h2 className="text-h2">セクション見出し</h2>
<h3 className="text-h3">サブセクション見出し</h3>
```

- `text-h1` - 48px / 行高 1.2 / Bold - ヒーローセクション、ページタイトル
- `text-h2` - 40px / 行高 1.3 / Bold - セクション見出し
- `text-h3` - 32px / 行高 1.4 / Bold - サブセクション見出し
- `text-h4` - 24px / 行高 1.4 / Bold - カード見出し
- `text-h5` - 20px / 行高 1.5 / Bold - 小見出し
- `text-h6` - 18px / 行高 1.5 / Bold - 最小見出し

### 本文テキスト

```jsx
// 使用例
<p className="text-body-lg">リード文</p>
<p className="text-body">標準的な本文</p>
<small className="text-body-sm">補足テキスト</small>
<span className="text-caption">キャプション</span>
```

- `text-body-lg` - 18px / 行高 1.7 / Regular - リード文
- `text-body` - 16px / 行高 1.7 / Regular - 標準本文
- `text-body-sm` - 14px / 行高 1.6 / Regular - 補足テキスト
- `text-caption` - 12px / 行高 1.5 / Regular - キャプション、注釈

## スペーシング

### スペーシングスケール（8px ベース）

```jsx
// 使用例
<div className="p-xs">最小パディング (4px)</div>
<div className="p-sm">小さなパディング (8px)</div>
<div className="p-lg">通常のパディング (16px)</div>
<div className="p-xl">大きなパディング (24px)</div>
```

- `p-xs` / `m-xs` - 4px (0.25rem)
- `p-sm` / `m-sm` - 8px (0.5rem)
- `p-md` / `m-md` - 12px (0.75rem)
- `p-lg` / `m-lg` - 16px (1rem)
- `p-xl` / `m-xl` - 24px (1.5rem)
- `p-2xl` / `m-2xl` - 32px (2rem)
- `p-3xl` / `m-3xl` - 48px (3rem)
- `p-4xl` / `m-4xl` - 64px (4rem)
- `p-5xl` / `m-5xl` - 96px (6rem)
- `p-6xl` / `m-6xl` - 120px (7.5rem)

### セクション間スペーシング

```jsx
// 使用例
<section className="section-spacing">
  {/* 48px mobile, 64px desktop */}
</section>
<section className="section-spacing-lg">
  {/* 64px mobile, 96px desktop */}
</section>
```

## ボタンスタイリング

### プライマリーボタン

```jsx
<button className="bg-brand-primary hover:bg-brand-primary-dark text-white px-xl py-md font-medium">
  プライマリーボタン
</button>
```

### セカンダリーボタン

```jsx
<button className="bg-brand-secondary hover:bg-brand-secondary-dark text-neutral-black px-xl py-md font-medium">
  セカンダリーボタン
</button>
```

## 使用ルール

1. **色の使用**:

   - プライマリーカラー(シアン)は CTA ボタン、リンク、ブランド要素に使用
   - セカンダリーカラー(ゴールド)はアクセント、重要な情報のハイライトに使用
   - テキストとバックグラウンドのコントラスト比は最低 4.5:1 を保つ

2. **スペーシング**:

   - コンポーネント内の余白は 8px の倍数を使用
   - セクション間の余白は最低 64px (デスクトップ)、48px (モバイル)
   - ボタン内のパディングは左右 24px、上下 12px

3. **タイポグラフィ**:
   - 本文は 16px 以上を使用
   - 行間は文字サイズの 1.5〜1.7 倍を基本とする
   - 見出しは Bold、本文は Regular を使用

## フォントファミリー

プロジェクト全体で「Rounded Mplus 1c」フォントが適用されます。

```css
font-family: "Rounded Mplus 1c", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
  sans-serif;
```

このガイドに従うことで、一貫したデザインシステムを保つことができます。
