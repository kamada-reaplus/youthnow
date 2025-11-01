# コンポーネント設計ドキュメント

Youth Now ランディングページのコンポーネント設計改善に関する包括的なドキュメントです。

## 📚 ドキュメント一覧

### 1. [LP_COMPONENT_DESIGN_BEST_PRACTICES.md](./LP_COMPONENT_DESIGN_BEST_PRACTICES.md)

**概要**: LPコンポーネント設計のベストプラクティス全体像

**内容**:
- 現状分析（良い点と改善点）
- 設計原則（SOLID、Composition、Progressive Enhancement）
- コンポーネントアーキテクチャ（レイヤー構造）
- 具体的な改善提案
- 実装ガイドライン
- パフォーマンス最適化戦略
- アクセシビリティ基準
- テスト戦略
- 優先順位付きロードマップ

**対象読者**: 開発チーム全員、技術リード

**推奨読了時間**: 30-40分

---

### 2. [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)

**概要**: 具体的な実装手順とコード例

**内容**:
- セットアップ手順（パッケージインストール、ユーティリティ作成）
- Step-by-Step実装（Button, Card, Section）
- Before/After比較（ServiceCard, ProblemSection）
- マイグレーション戦略（段階的移行計画）
- 共存戦略（新旧コンポーネントの並行運用）
- ロールバック計画

**対象読者**: 実装担当者、開発者

**推奨読了時間**: 45-60分

---

## 🚀 クイックスタート

### 新しくプロジェクトに参加した方へ

1. **まず読むべきドキュメント**:
   - [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) - デザインシステムの基礎
   - [CLAUDE.md](../CLAUDE.md) - プロジェクト概要
   - このREADME

2. **設計を理解する**:
   - [LP_COMPONENT_DESIGN_BEST_PRACTICES.md](./LP_COMPONENT_DESIGN_BEST_PRACTICES.md) の「現状分析」と「設計原則」セクション

3. **実装を開始する**:
   - [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) の「セットアップ」から開始

### コンポーネントを改善したい方へ

1. **既存コンポーネントの改善**:
   - [LP_COMPONENT_DESIGN_BEST_PRACTICES.md](./LP_COMPONENT_DESIGN_BEST_PRACTICES.md) → 「具体的な改善提案」
   - [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) → 「Before/After比較」

2. **新しいコンポーネントの作成**:
   - [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) → 「Step-by-Step実装」
   - デザインシステムに準拠した実装パターンを参照

### プロジェクトリードの方へ

1. **全体戦略の把握**:
   - [LP_COMPONENT_DESIGN_BEST_PRACTICES.md](./LP_COMPONENT_DESIGN_BEST_PRACTICES.md) → 全体を通読

2. **ロードマップ確認**:
   - 同ドキュメント → 「まとめ」セクションの「優先順位付き改善ロードマップ」

3. **移行計画**:
   - [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) → 「マイグレーション戦略」

---

## 📖 推奨読了順序

### パターン1: 全体を理解したい

```
1. このREADME（10分）
   ↓
2. LP_COMPONENT_DESIGN_BEST_PRACTICES.md（40分）
   - 現状分析
   - 設計原則
   - コンポーネントアーキテクチャ
   ↓
3. IMPLEMENTATION_GUIDE.md（60分）
   - Before/After比較（理解を深める）
   - マイグレーション戦略
```

### パターン2: すぐに実装を始めたい

```
1. このREADME（10分）
   ↓
2. IMPLEMENTATION_GUIDE.md - セットアップ（15分）
   - 必要なパッケージのインストール
   - ユーティリティ関数の作成
   ↓
3. IMPLEMENTATION_GUIDE.md - Step-by-Step実装（30分）
   - Button Component（練習）
   ↓
4. LP_COMPONENT_DESIGN_BEST_PRACTICES.md - 設計原則（20分）
   - 理解を深めるため
```

### パターン3: 既存コンポーネントを改善したい

```
1. このREADME（10分）
   ↓
2. IMPLEMENTATION_GUIDE.md - Before/After比較（20分）
   - 具体例で改善点を理解
   ↓
3. LP_COMPONENT_DESIGN_BEST_PRACTICES.md - 具体的な改善提案（30分）
   - Props設計の標準化
   - CVAの活用
   - Composition Pattern
```

---

## 🎯 主要な改善ポイント（要約）

### 1. コンポーネント設計の一貫性

**現状の問題**:
- Propsの命名規則が統一されていない
- デフォルト値が分散している
- バリアントパターンが活用されていない

**改善策**:
- CVA（Class Variance Authority）の導入
- 統一されたProps設計パターン
- デフォルト値の集中管理

**実装例**:
```tsx
// Before
<QuoteBox padding="p-lg" rounded="rounded-2xl" />

// After
<Quote variant="primary" size="md" />
```

### 2. Composition Pattern

**現状の問題**:
- 設定ベースのコンポーネントが多い
- 柔軟性が低い
- カスタマイズが困難

**改善策**:
- Compound Componentパターンの採用
- コンポーネント合成による柔軟性向上

**実装例**:
```tsx
// Before
<Card title="タイトル" description="説明" showFooter={true} />

// After
<Card>
  <Card.Header>
    <Card.Title>タイトル</Card.Title>
    <Card.Description>説明</Card.Description>
  </Card.Header>
  <Card.Footer>
    <Button>アクション</Button>
  </Card.Footer>
</Card>
```

### 3. アクセシビリティ

**現状の問題**:
- ARIA属性が不足
- キーボード操作対応が不十分
- スクリーンリーダー対応が不完全

**改善策**:
- セマンティックHTMLの徹底
- ARIA属性の適切な使用
- キーボードナビゲーション対応

**実装例**:
```tsx
// Before
<div onClick={handleClick}>クリック</div>

// After
<button
  onClick={handleClick}
  aria-label="詳細を見る"
  aria-describedby="description"
>
  クリック
</button>
```

### 4. テスタビリティ

**現状の問題**:
- テストが存在しない
- ロジックとUIが混在
- テストが困難な構造

**改善策**:
- Presentational/Container Componentパターン
- カスタムHooksでロジック分離
- React Testing Library + Storybook

**実装例**:
```tsx
// Before
function ProblemSection() {
  const [active, setActive] = useState(0);
  return <div>{/* UI と ロジックが混在 */}</div>;
}

// After
function ProblemSection() {
  const { activeIndex, handleClick } = useProblemSection();
  return <ProblemList active={activeIndex} onClick={handleClick} />;
}
```

---

## 📊 改善ロードマップ

### フェーズ1: 基盤整備（1-2週間）
- ✅ ユーティリティ・型定義の整備
- ✅ Primitive Componentsの実装
- ✅ エラーハンドリング

### フェーズ2: コンポーネント改善（2-3週間）
- 🔄 既存コンポーネントのリファクタリング
- 🔄 アクセシビリティ強化
- 🔄 カスタムHooks実装

### フェーズ3: 品質向上（2-3週間）
- ⏳ テスト実装
- ⏳ パフォーマンス最適化
- ⏳ ドキュメント整備

**凡例**: ✅ 完了 | 🔄 進行中 | ⏳ 未着手

---

## 🛠️ 必要なツール・ライブラリ

### 必須
- `class-variance-authority` - バリアント管理
- `clsx` - クラス名結合
- `tailwind-merge` - Tailwindクラスのマージ

### 推奨
- `@storybook/react` - ビジュアルコンポーネント開発
- `@testing-library/react` - コンポーネントテスト
- `@playwright/test` - E2Eテスト

### インストール方法

```bash
# 必須パッケージ
npm install class-variance-authority clsx tailwind-merge

# 推奨パッケージ（開発用）
npm install --save-dev @storybook/react @testing-library/react @testing-library/jest-dom @playwright/test
```

---

## 💡 よくある質問

### Q1: なぜCompound Componentパターンを使うのですか？

**A**: 以下の利点があります:
1. **柔軟性**: 自由にカスタマイズ可能
2. **明確性**: 構造が一目でわかる
3. **型安全性**: TypeScriptとの相性が良い
4. **保守性**: 拡張しやすい

### Q2: 既存のコンポーネントはすぐに書き換える必要がありますか？

**A**: いいえ、段階的な移行を推奨します:
1. 新規機能は新しいパターンで実装
2. 既存コンポーネントは優先順位をつけて移行
3. 重要度の低いコンポーネントは後回し可
4. 新旧コンポーネントの共存期間を設ける

### Q3: CVAを使うメリットは何ですか？

**A**:
1. **型安全性**: バリアントが自動的に型推論される
2. **保守性**: バリアント定義が一箇所に集約
3. **拡張性**: 新しいバリアントの追加が容易
4. **標準化**: チーム全体で一貫したパターン

### Q4: パフォーマンスへの影響は？

**A**:
- CVAとtailwind-mergeは軽量（<5KB）
- 適切なメモ化により、むしろパフォーマンス向上
- コード分割により初期ロード時間が改善
- 総合的にはプラスの影響

### Q5: 学習コストはどのくらいですか？

**A**:
- **基本理解**: 1-2日（ドキュメント読了）
- **実装練習**: 3-5日（Buttonなど小規模コンポーネント）
- **実戦投入**: 1-2週間（既存コンポーネント改善）
- **習熟**: 1ヶ月（自然に使えるようになる）

---

## 📝 関連ドキュメント

### プロジェクト全体
- [CLAUDE.md](../CLAUDE.md) - プロジェクト概要と開発ガイド
- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) - デザインシステムガイド
- [package.json](../package.json) - 依存関係とスクリプト

### 技術スタック
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CVA Documentation](https://cva.style/docs)
- [React Testing Library](https://testing-library.com/react)

---

## 🤝 貢献

### コンポーネント改善の流れ

1. **Issue作成**: 改善したいコンポーネントを特定
2. **設計レビュー**: チームで設計方針を確認
3. **実装**: ガイドに従って実装
4. **レビュー**: コードレビュー + デザインレビュー
5. **テスト**: ユニットテスト + E2Eテスト
6. **マージ**: 段階的にデプロイ

### レビューチェックリスト

```markdown
- [ ] 設計原則に準拠しているか
- [ ] アクセシビリティ基準を満たしているか
- [ ] 型定義が適切か
- [ ] テストが書かれているか
- [ ] Storybookストーリーが作成されているか
- [ ] ドキュメントが更新されているか
- [ ] パフォーマンスへの影響を確認したか
```

---

## 📞 サポート

質問や提案がある場合:
1. このドキュメントを確認
2. 関連ドキュメントを参照
3. チームに相談
4. Issueを作成（必要に応じて）

---

**最終更新**: 2025年1月
**バージョン**: 1.0.0
**メンテナー**: Youth Now 開発チーム
