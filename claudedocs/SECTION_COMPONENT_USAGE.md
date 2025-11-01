# Section コンポーネント使用ガイド

## 概要

Compound Component Pattern を採用した、柔軟で型安全なセクションヘッダーコンポーネントです。
CVA (class-variance-authority) によるバリアント管理で、一貫性のあるデザインシステムを実現します。

## 基本的な使い方

### シンプルなタイトル

```tsx
<Section>
  <Section.Header>
    <Section.Title>若年層マーケティングの課題</Section.Title>
  </Section.Header>
</Section>
```

### ラベル付きタイトル

```tsx
<Section>
  <Section.Header>
    <Section.Label>PROBLEM</Section.Label>
    <Section.Title>
      若年層マーケティングで
      <br />
      こんな課題を感じていませんか?
    </Section.Title>
  </Section.Header>
</Section>
```

### タイトル + サブタイトル

```tsx
<Section>
  <Section.Header>
    <Section.Title size="lg" color="primary">
      私たちのソリューション
    </Section.Title>
    <Section.Subtitle size="md" color="muted">
      若年層の心理を深く理解し、効果的なマーケティング戦略を提供します
    </Section.Subtitle>
  </Section.Header>
</Section>
```

### 完全な例（全要素使用）

```tsx
<Section id="value" centered>
  <Section.Header spacing="lg">
    <Section.Label size="lg" color="secondary">
      VALUE
    </Section.Label>
    <Section.Title size="xl" color="black">
      データに基づいた
      <br />
      戦略的アプローチ
    </Section.Title>
    <Section.Subtitle size="lg" color="muted">
      3つの調査手法で、若年層の本音を可視化します
    </Section.Subtitle>
  </Section.Header>
</Section>
```

## Props リファレンス

### Section (Root)

| Prop      | Type      | Default | 説明                                |
| --------- | --------- | ------- | ----------------------------------- |
| id        | string    | -       | セクション ID（アクセシビリティ用） |
| centered  | boolean   | true    | コンテンツを中央揃え                |
| className | string    | -       | 追加の CSS クラス                   |
| children  | ReactNode | -       | 子要素                              |

### Section.Label

| Prop      | Type                                           | Default   | 説明              |
| --------- | ---------------------------------------------- | --------- | ----------------- |
| size      | "sm" \| "md" \| "lg"                           | "lg"      | ラベルサイズ      |
| color     | "primary" \| "secondary" \| "black" \| "white" | "primary" | ラベルカラー      |
| className | string                                         | -         | 追加の CSS クラス |
| children  | ReactNode                                      | -         | ラベルテキスト    |

### Section.Title

| Prop      | Type                                           | Default | 説明              |
| --------- | ---------------------------------------------- | ------- | ----------------- |
| size      | "sm" \| "md" \| "lg" \| "xl" \| "responsive"   | "md"    | タイトルサイズ    |
| color     | "primary" \| "secondary" \| "black" \| "white" | "black" | タイトルカラー    |
| as        | "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"   | "h2"    | HTML 要素         |
| className | string                                         | -       | 追加の CSS クラス |
| children  | ReactNode                                      | -       | タイトルテキスト  |

### Section.Subtitle

| Prop      | Type                                                      | Default | 説明                 |
| --------- | --------------------------------------------------------- | ------- | -------------------- |
| size      | "sm" \| "md" \| "lg" \| "responsive"                      | "md"    | サブタイトルサイズ   |
| color     | "primary" \| "secondary" \| "black" \| "white" \| "muted" | "muted" | サブタイトルカラー   |
| as        | "h3" \| "h4" \| "h5" \| "h6" \| "p"                       | "p"     | HTML 要素            |
| className | string                                                    | -       | 追加の CSS クラス    |
| children  | ReactNode                                                 | -       | サブタイトルテキスト |

### Section.Header

| Prop      | Type                         | Default | 説明              |
| --------- | ---------------------------- | ------- | ----------------- |
| spacing   | "sm" \| "md" \| "lg" \| "xl" | "md"    | 下部マージン      |
| className | string                       | -       | 追加の CSS クラス |
| children  | ReactNode                    | -       | 子要素            |

## バリアントサイズ対応表

### Section.Label サイズ

| Variant | モバイル | デスクトップ |
| ------- | -------- | ------------ |
| sm      | text-3xl | text-4xl     |
| md      | text-4xl | text-5xl     |
| lg      | text-5xl | text-6xl     |

### Section.Title サイズ

| Variant    | モバイル | タブレット | デスクトップ |
| ---------- | -------- | ---------- | ------------ |
| sm         | text-2xl | text-3xl   | -            |
| md         | text-3xl | text-4xl   | text-5xl     |
| lg         | text-4xl | text-5xl   | text-6xl     |
| xl         | text-5xl | text-6xl   | text-7xl     |
| responsive | text-lg  | text-4xl   | text-display |

### Section.Header スペーシング

| Variant | クラス           | ピクセル値 (mobile/desktop) |
| ------- | ---------------- | --------------------------- |
| sm      | mb-md            | 12px                        |
| md      | mb-lg md:mb-xl   | 16px / 24px                 |
| lg      | mb-xl md:mb-2xl  | 24px / 32px                 |
| xl      | mb-2xl md:mb-3xl | 32px / 48px                 |

## 旧コンポーネントからの移行

### SectionHeaderBlock からの移行

**旧実装:**

```tsx
<SectionHeaderBlock
  sectionTitle="PROBLEM"
  sectionTitleColor="text-brand-primary"
  title="若年層マーケティングで<br />こんな課題を感じていませんか?"
  textColor="text-neutral-black"
/>
```

**新実装:**

```tsx
<Section>
  <Section.Header>
    <Section.Label color="primary">PROBLEM</Section.Label>
    <Section.Title color="black">
      若年層マーケティングで
      <br />
      こんな課題を感じていませんか?
    </Section.Title>
  </Section.Header>
</Section>
```

### section-header からの移行

**旧実装:**

```tsx
<SectionHeader
  title="データ分析サービス"
  subtitle="若年層の行動パターンを可視化"
  highlightWord="データ"
  highlightColor="text-brand-secondary"
  responsive
/>
```

**新実装 (ハイライトは手動で span タグを使用):**

```tsx
<Section>
  <Section.Header>
    <Section.Title size="responsive">
      <span className="text-brand-secondary">データ</span>分析サービス
    </Section.Title>
    <Section.Subtitle size="responsive">
      若年層の行動パターンを可視化
    </Section.Subtitle>
  </Section.Header>
</Section>
```

## アクセシビリティ機能

1. **セマンティック HTML**: 適切な見出しレベル (h1-h6) を選択可能
2. **ARIA ラベル**: Section に ID を指定すると、aria-labelledby が自動設定
3. **スクリーンリーダー対応**: Section.Label に aria-label="セクションラベル" を自動付与
4. **キーボードナビゲーション**: 標準的な HTML 要素を使用し、キーボード操作に対応

## パフォーマンス最適化

- **軽量**: 依存関係は CVA と cn ユーティリティのみ
- **Tree-shaking**: 使用しないコンポーネントはバンドルから除外
- **静的スタイル**: CVA により、実行時のクラス生成を最小化
- **メモ化不要**: プリミティブコンポーネントのため、React.memo は不要

## デザインシステムとの統合

このコンポーネントは、プロジェクトのデザインシステム ([DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)) に完全準拠しています:

- **カラーパレット**: brand-primary, brand-secondary, neutral-black, neutral-white
- **タイポグラフィ**: text-h1 〜 text-h6, text-body など
- **スペーシング**: 8px ベースのスペーシングスケール

## ベストプラクティス

1. **Composition over Configuration**: 必要な要素のみを組み合わせて使用
2. **型安全性**: すべての props は TypeScript で型定義済み
3. **一貫性**: CVA によるバリアント管理で、デザインの一貫性を保証
4. **柔軟性**: className で追加スタイルを適用可能
5. **アクセシビリティ**: セマンティック HTML と ARIA 属性を活用

## トラブルシューティング

### Q: ハイライト機能はどうなったのか？

A: 旧 section-header の文字列分割によるハイライトは、脆弱性と複雑性のため削除しました。
代わりに、手動で span タグを使用する方が柔軟で安全です:

```tsx
<Section.Title>
  <span className="text-brand-secondary">重要</span>なメッセージ
</Section.Title>
```

### Q: responsive バリアントはどう使うのか？

A: size="responsive" を指定すると、画面サイズに応じて大きく変化します:

```tsx
<Section.Title size="responsive">
  モバイルでは小さく、デスクトップでは巨大に
</Section.Title>
```

### Q: 中央揃えを解除したい

A: Section コンポーネントで centered={false} を指定:

```tsx
<Section centered={false}>
  <Section.Header>
    <Section.Title>左揃えのタイトル</Section.Title>
  </Section.Header>
</Section>
```

## 更新履歴

- **v1.0.0** (2025-01-29): 初回リリース
  - Compound Component Pattern 採用
  - CVA によるバリアント管理
  - アクセシビリティ強化
  - 型安全性の向上
