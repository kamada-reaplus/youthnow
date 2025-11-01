# LP計測環境セットアップガイド

このドキュメントでは、Youth Now LPの計測環境の設定方法と運用方法について説明します。

## 📋 目次

1. [導入済みツール](#導入済みツール)
2. [初期セットアップ](#初期セットアップ)
3. [計測できる項目](#計測できる項目)
4. [GTMでの設定方法](#gtmでの設定方法)
5. [Microsoft Clarityの使い方](#microsoft-clarityの使い方)
6. [カスタムイベントの追加方法](#カスタムイベントの追加方法)
7. [トラブルシューティング](#トラブルシューティング)

---

## 📊 導入済みツール

### 1. Google Tag Manager (GTM)
**役割**: 計測タグの一元管理システム

**できること**:
- コード変更なしでタグの追加・変更
- GA4、広告ピクセル、その他計測ツールの統合管理
- イベントトラッキングの柔軟な設定

### 2. Google Analytics 4 (GA4)
**役割**: 基本的なアクセス解析

**できること**:
- ページビュー、セッション、ユーザー数の計測
- 流入元（検索、SNS、広告など）の分析
- デバイス・ブラウザ情報の把握
- コンバージョン率の計測

### 3. Microsoft Clarity
**役割**: ユーザー行動の可視化（完全無料）

**できること**:
- **ヒートマップ**: クリック位置、スクロール深度の可視化
- **セッション録画**: 実際のユーザー操作の録画
- **レイジクリック検知**: 同じ場所を連打（UX問題の兆候）
- **デッドクリック検知**: クリックしても反応がない箇所の発見
- **GA4自動連携**: Clarityで見つけた問題をGA4データと照合

---

## 🚀 初期セットアップ

### ステップ1: Google Tag Manager の設定

1. **GTMアカウント作成**
   - https://tagmanager.google.com/ にアクセス
   - 「アカウントを作成」をクリック
   - アカウント名: `Youth Now`（任意）
   - コンテナ名: `Youth Now LP`
   - ターゲット プラットフォーム: **ウェブ** を選択

2. **コンテナIDの取得**
   - 作成完了後、`GTM-XXXXXXX` 形式のIDが表示される
   - このIDをコピー

3. **環境変数への設定**
   ```bash
   # .env.local ファイルを編集
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  # ← ここにコンテナIDを貼り付け
   ```

### ステップ2: Google Analytics 4 の設定

1. **GA4プロパティ作成**
   - https://analytics.google.com/ にアクセス
   - 管理 → プロパティを作成
   - プロパティ名: `Youth Now LP`
   - タイムゾーン: `日本`
   - 通貨: `日本円（¥）`

2. **測定IDの取得**
   - データストリームを作成（プラットフォーム: ウェブ）
   - 測定ID: `G-XXXXXXXXXX` が表示される

3. **GTMにGA4タグを追加**
   - GTMの管理画面に戻る
   - 「タグ」→「新規」をクリック
   - タグの種類: **Google アナリティクス: GA4 設定**
   - 測定ID: `G-XXXXXXXXXX` を入力
   - トリガー: **All Pages** を選択
   - 保存して「公開」

### ステップ3: Microsoft Clarity の設定

1. **Clarityプロジェクト作成**
   - https://clarity.microsoft.com/ にアクセス
   - Microsoftアカウントでログイン
   - 「新しいプロジェクト」をクリック
   - プロジェクト名: `Youth Now LP`
   - ウェブサイトURL: 本番環境のURL

2. **プロジェクトIDの取得**
   - 設定 → セットアップ
   - プロジェクトID（10文字の英数字）をコピー

3. **環境変数への設定**
   ```bash
   # .env.local ファイルを編集
   NEXT_PUBLIC_CLARITY_ID=abcdefghij  # ← プロジェクトIDを貼り付け
   ```

4. **GA4との連携（推奨）**
   - Clarity管理画面 → 設定 → 統合
   - Google Analytics を選択
   - GA4のプロパティを選択して連携

### ステップ4: 動作確認

1. **開発サーバー起動**
   ```bash
   npm run dev
   ```

2. **ブラウザのコンソールで確認**
   - http://localhost:3000 にアクセス
   - F12キーで開発者ツールを開く
   - コンソールタブで以下のメッセージを確認:
     ```
     📊 Analytics Event: page_view {...}
     ```

3. **GTMのプレビューモードで確認**
   - GTM管理画面 → 「プレビュー」
   - LPのURLを入力してテスト
   - Tags Fired（発火したタグ）を確認

---

## 📈 計測できる項目

### 自動計測されるイベント

| イベント | 説明 | トリガー |
|---------|------|---------|
| `page_view` | ページ表示 | ページ読み込み時 |
| `button_click` | ボタンクリック | お問い合わせボタン、CTAボタン |
| `form_start` | フォーム入力開始 | 初回フィールド入力時 |
| `form_submit` | フォーム送信 | 送信ボタンクリック |
| `form_complete` | フォーム完了 | 送信成功時 |

### イベントの詳細パラメータ

#### button_click イベント
```javascript
{
  event: "button_click",
  category: "click",
  action: "click",
  label: "お問い合わせはこちら",
  button_location: "contact_button" | "floating_cta_button"
}
```

#### form_start イベント
```javascript
{
  event: "form_start",
  category: "form",
  action: "start",
  label: "お問い合わせ"
}
```

#### form_submit イベント
```javascript
{
  event: "form_submit",
  category: "form",
  action: "submit_success" | "submit_error",
  label: "お問い合わせ"
}
```

#### form_complete イベント（コンバージョン）
```javascript
{
  event: "form_complete",
  category: "conversion",
  action: "complete",
  label: "お問い合わせ"
}
```

---

## 🏷️ GTMでの設定方法

### コンバージョンの設定

1. **GTMで変数を作成**
   - 変数 → ユーザー定義変数 → 新規
   - 変数の種類: **データレイヤーの変数**
   - データレイヤーの変数名: `event`

2. **トリガーを作成**
   - トリガー → 新規
   - トリガーの種類: **カスタム イベント**
   - イベント名: `form_complete`

3. **GA4イベントタグを作成**
   - タグ → 新規
   - タグの種類: **Google アナリティクス: GA4 イベント**
   - 設定タグ: 先ほど作成したGA4設定タグを選択
   - イベント名: `conversion`
   - イベント パラメータ（オプション）:
     - `conversion_type`: `form_submission`
   - トリガー: 上記で作成した `form_complete` トリガー

4. **GA4でコンバージョンとして登録**
   - GA4管理画面 → イベント
   - `conversion` イベントを探す
   - 「コンバージョンとしてマークを付ける」をON

### スクロール深度の計測

1. **GTMでトリガーを作成**
   - トリガー → 新規
   - トリガーの種類: **スクロール距離**
   - 垂直スクロールの割合: `25, 50, 75, 90`

2. **GA4イベントタグを作成**
   - イベント名: `scroll`
   - イベント パラメータ:
     - `percent_scrolled`: `{{Scroll Depth Threshold}}`

### 外部リンククリックの計測

1. **トリガーを作成**
   - トリガーの種類: **リンククリック**
   - タグの配信を待つ: チェック
   - 検証: チェック
   - このトリガーの条件:
     - `Click URL` - `含まない` - `youthnow.jp`（自サイトのドメイン）

2. **GA4イベントタグを作成**
   - イベント名: `click`
   - イベント パラメータ:
     - `link_url`: `{{Click URL}}`
     - `link_text`: `{{Click Text}}`

---

## 🔥 Microsoft Clarityの使い方

### ヒートマップの見方

1. **クリックマップ**
   - Clarity管理画面 → ヒートマップ → クリック
   - 赤いエリア: よくクリックされる箇所
   - 青いエリア: あまりクリックされない箇所

   **改善のヒント**:
   - CTAボタンが青い → デザインやコピーを改善
   - 画像が赤い → クリック可能と誤解されている可能性

2. **スクロールマップ**
   - ヒートマップ → スクロール
   - 色の変化: どこまでスクロールされているか
   - Fold（画面の境界線）を確認

   **改善のヒント**:
   - 重要なコンテンツが到達率50%以下 → 上部に移動を検討
   - 急激に離脱されるセクション → コンテンツの見直し

### セッション録画の活用

1. **録画の再生**
   - 録画 → フィルターで絞り込み
   - フィルター例:
     - `コンバージョンあり`: 成功パターンを学ぶ
     - `レイジクリック`: UX問題を発見
     - `デッドクリック`: 動作しない要素を発見

2. **問題の発見方法**
   - レイジクリック: ユーザーが困っている証拠
   - スクロールの往復: 情報が見つからない
   - フォームで長時間停止: 入力が難しい項目

### インサイトの確認

- インサイト → 自動で検出された問題点
- 例:
  - **過度なスクロール**: コンテンツが長すぎる
  - **クイック バック**: すぐに離脱している
  - **レイジ クリック**: ストレスを感じている

---

## 🛠️ カスタムイベントの追加方法

### 既存のイベント関数を使う

```typescript
// src/app/lib/analytics.ts からインポート
import {
  trackButtonClick,
  trackFormStart,
  trackScrollDepth,
  trackSectionView,
} from "@/app/lib/analytics";

// ボタンクリックを計測
trackButtonClick("資料ダウンロード", "hero_section");

// セクション表示を計測
trackSectionView("事例紹介");

// スクロール深度を計測
trackScrollDepth(75);
```

### カスタムイベントを作成

```typescript
import { trackEvent, EventCategory } from "@/app/lib/analytics";

// 独自のイベントを送信
trackEvent("video_play", {
  category: EventCategory.ENGAGEMENT,
  action: "play",
  label: "事例紹介動画",
  video_duration: 120, // カスタムパラメータ
});
```

### 電話番号クリックの計測例

```typescript
import { trackPhoneClick } from "@/app/lib/analytics";

function PhoneButton() {
  const handleClick = () => {
    trackPhoneClick("03-1234-5678");
  };

  return (
    <a href="tel:03-1234-5678" onClick={handleClick}>
      電話で問い合わせ
    </a>
  );
}
```

---

## 🎯 推奨KPI設定

### 主要KPI

1. **コンバージョン率 (CVR)**
   - 計算式: `form_complete / page_view × 100`
   - 目標値: 2-5%（業界平均）

2. **フォーム開始率**
   - 計算式: `form_start / page_view × 100`
   - 目標値: 10-20%

3. **フォーム完了率**
   - 計算式: `form_complete / form_start × 100`
   - 目標値: 50-70%

4. **平均セッション時間**
   - 目標値: 2-3分（LPの長さに依存）

5. **直帰率**
   - 目標値: 40-60%以下

### セクション別KPI

- **ファーストビュー通過率**: 90%以上
- **課題セクション到達率**: 70%以上
- **ソリューションセクション到達率**: 50%以上
- **フォームセクション到達率**: 30%以上

---

## 📊 レポート作成のコツ

### 週次レポートで確認すべき項目

1. **基本指標**
   - セッション数、ユーザー数
   - コンバージョン数、CVR
   - 流入元の内訳

2. **ユーザー行動**
   - スクロール深度の分布
   - CTAボタンのクリック率
   - フォーム開始→完了の離脱率

3. **Clarityインサイト**
   - 新規に検出された問題点
   - レイジクリックの発生箇所
   - セッション録画から見つけた改善点

### 月次レポートで分析すべき項目

1. **トレンド分析**
   - CVRの推移
   - 流入経路別のCVR比較
   - デバイス別のCVR比較

2. **改善施策の効果測定**
   - A/Bテストの結果
   - コンテンツ変更前後の比較
   - デザイン変更の影響

---

## ⚠️ トラブルシューティング

### GTMが動作しない

**症状**: イベントが送信されない

**確認項目**:
1. `.env.local` にGTM IDが正しく設定されているか
2. GTMコンテナが「公開」されているか
3. ブラウザのコンソールにエラーが出ていないか
4. GTMのプレビューモードで動作確認

**解決方法**:
```bash
# 環境変数が読み込まれているか確認
echo $NEXT_PUBLIC_GTM_ID

# 開発サーバーを再起動
npm run dev
```

### Clarityに録画が表示されない

**症状**: セッション録画が記録されない

**確認項目**:
1. プロジェクトIDが正しいか
2. サイトにトラフィックがあるか（初回は反映に数時間かかる）
3. ブラウザでJavaScriptが有効になっているか

### dataLayerが undefined エラー

**症状**: `window.dataLayer is undefined`

**原因**: GTMスクリプトが読み込まれる前にイベントを送信している

**解決方法**:
- `src/app/lib/analytics.ts` 内で自動的に初期化されるので、通常は発生しない
- もし発生した場合は、イベント送信を `useEffect` 内で実行

### 開発環境でイベントが多重送信される

**症状**: 1回のクリックで2回イベントが送信される

**原因**: Next.js の Fast Refresh による再レンダリング

**対策**: 本番環境では発生しないため、開発時は気にしなくてOK

---

## 🎓 学習リソース

### GTM
- [Google Tag Manager 公式ドキュメント](https://support.google.com/tagmanager)
- [GTM基礎ガイド（Google）](https://skillshop.exceedlms.com/student/catalog/list?category_ids=6431-google-tag-manager)

### GA4
- [Google Analytics 4 ヘルプ](https://support.google.com/analytics)
- [GA4イベント計測ガイド](https://developers.google.com/analytics/devguides/collection/ga4/events)

### Microsoft Clarity
- [Clarity公式ドキュメント](https://docs.microsoft.com/en-us/clarity/)
- [Clarityブログ（ベストプラクティス）](https://clarity.microsoft.com/blog)

---

## 📝 次のステップ

計測環境が整ったら、以下のステップで改善サイクルを回しましょう:

1. **データ収集（1-2週間）**
   - まずは十分なデータを集める
   - 最低100セッション以上が理想

2. **分析**
   - Clarityヒートマップで問題箇所を特定
   - GA4でCVRの低い流入元を確認

3. **仮説立案**
   - 「なぜCVRが低いのか？」を考える
   - Clarityの録画で実際のユーザー行動を観察

4. **改善施策実施**
   - 1つずつ変更を加える
   - GTMのA/Bテスト機能を活用

5. **効果測定**
   - 変更前後のデータを比較
   - 改善が見られたら次の施策へ

---

## 💡 改善施策のアイデア

### CVRが低い場合

- **CTAボタンの改善**
  - 色を変更（ヒートマップで確認）
  - サイズを大きく
  - コピーを具体的に（「無料相談」→「今すぐ無料で相談する」）

- **フォームの簡略化**
  - 項目数を減らす
  - 任意項目を増やす
  - プログレスバーを追加

### 直帰率が高い場合

- **ファーストビューの改善**
  - メッセージを明確に
  - 読み込み速度の改善
  - 動画やビジュアルで訴求

### スクロール率が低い場合

- **コンテンツの見直し**
  - 上部に重要な情報を配置
  - セクションを短く
  - 見出しを魅力的に

---

## 📞 サポート

設定でお困りの場合は、以下をご確認ください:

- このドキュメントのトラブルシューティングセクション
- 各ツールの公式ドキュメント
- プロジェクトの `CLAUDE.md` に質問を記載

---

**最終更新**: 2025-10-31
**バージョン**: 1.0.0
