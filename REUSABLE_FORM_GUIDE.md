# 再利用可能なコンタクトフォームの使い方

## 概要

`ReusableContactForm` は、様々なランディングページで使用できる汎用的なコンタクトフォームコンポーネントです。スタイル、コンテンツ、機能をすべて props で制御できます。

## 基本的な使い方

### 1. インポート

```typescript
import {
  ReusableContactForm,
  FormData,
} from "@/app/components/ui/ReusableContactForm";
```

### 2. 最小限の実装

```typescript
export function MyContactSection() {
  return (
    <ReusableContactForm
      onSubmit={async (data) => {
        // API呼び出しなど
        console.log(data);
      }}
    />
  );
}
```

## Props 一覧

### スタイル設定

| Prop                    | 型       | デフォルト                            | 説明                           |
| ----------------------- | -------- | ------------------------------------- | ------------------------------ |
| `backgroundColor`       | `string` | `"bg-neutral-light-cyan"`             | セクションの背景色             |
| `formBackgroundColor`   | `string` | `"bg-brand-primary/5"`                | フォームの背景色               |
| `borderColor`           | `string` | `"border-brand-primary/10"`           | フォームのボーダー色           |
| `textColor`             | `string` | `"text-brand-primary"`                | テキスト色                     |
| `labelColor`            | `string` | `"text-brand-primary"`                | ラベル色                       |
| `inputBackgroundColor`  | `string` | `"bg-brand-primary/10"`               | 入力欄の背景色                 |
| `inputBorderColor`      | `string` | `"border-brand-primary/20"`           | 入力欄のボーダー色             |
| `inputFocusBorderColor` | `string` | `"focus:border-brand-primary/40"`     | 入力欄フォーカス時のボーダー色 |
| `inputTextColor`        | `string` | `"text-brand-primary"`                | 入力欄のテキスト色             |
| `inputPlaceholderColor` | `string` | `"placeholder:text-brand-primary/40"` | プレースホルダーの色           |
| `buttonBackgroundColor` | `string` | `"bg-brand-secondary"`                | ボタンの背景色                 |
| `buttonTextColor`       | `string` | `"text-brand-primary"`                | ボタンのテキスト色             |
| `buttonHoverOpacity`    | `string` | `"hover:opacity-90"`                  | ボタンホバー時の透明度         |
| `errorColor`            | `string` | `"text-error"`                        | エラーメッセージの色           |
| `successColor`          | `string` | `"text-green-600"`                    | 成功メッセージの色             |

### コンテンツ設定

| Prop                | 型         | デフォルト                               | 説明                           |
| ------------------- | ---------- | ---------------------------------------- | ------------------------------ |
| `title`             | `string`   | `"お問い合わせ"`                         | フォームのタイトル             |
| `subtitle`          | `string`   | `"お気軽にご連絡ください"`               | サブタイトル                   |
| `completionTime`    | `string`   | `"60秒で完了"`                           | 完了時間の表示                 |
| `purposes`          | `string[]` | `["資料請求", "お問い合わせ", "その他"]` | 目的の選択肢                   |
| `interests`         | `string[]` | `[...]`                                  | 興味のある内容の選択肢         |
| `submitButtonText`  | `string`   | `"今すぐ無料で資料をダウンロード"`       | 送信ボタンのテキスト           |
| `bonusText`         | `string`   | `"🎁 今なら..."`                         | ボーナス特典のテキスト         |
| `bonusSubtext`      | `string`   | `"※資料DL後..."`                         | ボーナス特典の注釈             |
| `successTitle`      | `string`   | `"送信完了しました!"`                    | 成功時のタイトル               |
| `successMessage`    | `string`   | `"ご登録いただいた..."`                  | 成功時のメッセージ             |
| `privacyPolicyUrl`  | `string`   | `"#privacy"`                             | プライバシーポリシーの URL     |
| `privacyPolicyText` | `string`   | `"個人情報の取り扱い"`                   | プライバシーポリシーのテキスト |

### 機能設定

| Prop                   | 型         | デフォルト | 説明                           |
| ---------------------- | ---------- | ---------- | ------------------------------ |
| `showPurposeSelection` | `boolean`  | `true`     | 目的選択を表示するか           |
| `showPhoneField`       | `boolean`  | `true`     | 電話番号フィールドを表示するか |
| `phoneRequired`        | `boolean`  | `false`    | 電話番号を必須にするか         |
| `showBonusSection`     | `boolean`  | `true`     | ボーナスセクションを表示するか |
| `showResourceInfo`     | `boolean`  | `false`    | リソース情報を表示するか       |
| `resourceInfoItems`    | `string[]` | `[]`       | リソース情報の項目リスト       |

### イベントハンドラ

| Prop        | 型                                  | 説明                     |
| ----------- | ----------------------------------- | ------------------------ |
| `onSubmit`  | `(data: FormData) => Promise<void>` | フォーム送信時のハンドラ |
| `onSuccess` | `() => void`                        | 送信成功時のハンドラ     |
| `onError`   | `(error: Error) => void`            | エラー時のハンドラ       |

### その他

| Prop            | 型       | デフォルト | 説明                       |
| --------------- | -------- | ---------- | -------------------------- |
| `className`     | `string` | `""`       | セクションに追加するクラス |
| `formClassName` | `string` | `""`       | フォームに追加するクラス   |

## FormData 型

```typescript
type FormData = {
  company: string; // 会社名
  name: string; // 名前
  email: string; // メールアドレス
  phone: string; // 電話番号
  interest: string; // 興味のある内容
  purpose: string; // お問い合わせ目的
  agreement: boolean; // 同意
};
```

## 使用例

### 例 1: シンプルな問い合わせフォーム

```typescript
import { ReusableContactForm } from "@/app/components/ui/ReusableContactForm";

export function SimpleContactForm() {
  return (
    <ReusableContactForm
      title="お問い合わせ"
      subtitle="お気軽にご連絡ください"
      submitButtonText="送信する"
      showPurposeSelection={false}
      showBonusSection={false}
      showResourceInfo={false}
      onSubmit={async (data) => {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("送信に失敗しました");
      }}
    />
  );
}
```

### 例 2: ダークテーマのフォーム

```typescript
import { ReusableContactForm } from "@/app/components/ui/ReusableContactForm";

export function DarkContactForm() {
  return (
    <ReusableContactForm
      // ダークテーマのスタイル
      backgroundColor="bg-gray-900"
      formBackgroundColor="bg-gray-800"
      borderColor="border-gray-700"
      textColor="text-white"
      labelColor="text-white"
      inputBackgroundColor="bg-gray-700"
      inputBorderColor="border-gray-600"
      inputFocusBorderColor="focus:border-blue-500"
      inputTextColor="text-white"
      inputPlaceholderColor="placeholder:text-gray-400"
      buttonBackgroundColor="bg-blue-600"
      buttonTextColor="text-white"
      buttonHoverOpacity="hover:bg-blue-700"
      title="Get in Touch"
      submitButtonText="Send Message"
      onSubmit={async (data) => {
        console.log(data);
      }}
    />
  );
}
```

### 例 3: セミナー申し込みフォーム

```typescript
import { ReusableContactForm } from "@/app/components/ui/ReusableContactForm";

export function SeminarForm() {
  return (
    <ReusableContactForm
      title="セミナーに申し込む"
      subtitle="2025年11月開催"
      completionTime="30秒で完了"
      purposes={["対面参加", "オンライン参加", "録画視聴"]}
      interests={[
        "基礎から学びたい",
        "実践的なスキルを習得したい",
        "最新トレンドを知りたい",
        "ネットワーキング",
      ]}
      submitButtonText="今すぐ申し込む"
      showBonusSection={true}
      bonusText="🎁 参加者全員に電子書籍プレゼント"
      bonusSubtext="※当日限定"
      phoneRequired={true}
      showResourceInfo={true}
      resourceInfoItems={[
        "• セミナー資料(PDF)",
        "• 講師プロフィール",
        "• 過去参加者の声",
        "• 【特典】電子書籍",
      ]}
      onSubmit={async (data) => {
        // セミナー申し込みAPI
        await fetch("/api/seminar/register", {
          method: "POST",
          body: JSON.stringify(data),
        });
      }}
    />
  );
}
```

### 例 4: ニュースレター登録フォーム

```typescript
import { ReusableContactForm } from "@/app/components/ui/ReusableContactForm";

export function NewsletterForm() {
  return (
    <ReusableContactForm
      backgroundColor="bg-blue-50"
      buttonBackgroundColor="bg-blue-600"
      buttonTextColor="text-white"
      title="ニュースレター登録"
      subtitle="最新情報をお届けします"
      completionTime="15秒で完了"
      submitButtonText="今すぐ登録"
      showPurposeSelection={false}
      showPhoneField={false}
      showBonusSection={false}
      showResourceInfo={false}
      interests={["技術情報", "ビジネス情報", "マーケティング情報", "すべて"]}
      onSubmit={async (data) => {
        await fetch("/api/newsletter/subscribe", {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            name: data.name,
            interests: data.interest,
          }),
        });
      }}
      onSuccess={() => {
        // Google Analytics イベント
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "newsletter_signup");
        }
      }}
    />
  );
}
```

## 機能詳細

### バリデーション

フォームには以下のバリデーションが自動的に適用されます:

- **会社名**: 必須
- **名前**: 必須
- **メールアドレス**: 必須 + メール形式チェック
- **電話番号**: 任意（`phoneRequired=true`で必須化可能）+ 数字・記号のみ
- **興味**: 必須（ラジオボタン選択）
- **同意**: 必須（チェックボックス）

### アクセシビリティ

- `aria-invalid`: エラー状態を通知
- `aria-describedby`: エラーメッセージとの関連付け
- `role="alert"`: エラーメッセージの即座な通知
- キーボードナビゲーション対応
- スクリーンリーダー対応

### オートコンプリート

HTML5 の autocomplete 属性を使用:

- `company`: "organization"
- `name`: "name"
- `email`: "email"
- `phone`: "tel"

### エラーハンドリング

- リアルタイムバリデーション（フィールドから離れた時）
- インラインエラー表示
- 送信時に最初のエラーフィールドへ自動スクロール
- 視覚的フィードバック（赤枠、エラーアイコン）

## ベストプラクティス

1. **カラースキームの統一**: プロジェクトのデザインシステムに合わせてカラーを設定
2. **コンテンツの最適化**: 目的に応じて不要な項目は非表示に
3. **エラーハンドリング**: `onError`で適切なエラーメッセージを表示
4. **成功時の処理**: `onSuccess`で Analytics イベントや次のアクションを実装
5. **API 統合**: `onSubmit`で実際の API エンドポイントへ送信

## トラブルシューティング

### フォームが送信されない

- `onSubmit`が`Promise`を返しているか確認
- ネットワークエラーを`onError`でキャッチしているか確認

### スタイルが反映されない

- Tailwind CSS のクラス名が正しいか確認
- `className`または`formClassName`で上書きしている場合は優先順位を確認

### バリデーションエラーが表示されない

- フィールド名（`company`, `name`, `email`など）が正しいか確認
- `touched`状態がセットされているか確認（フィールドから離れた時）

## ライセンス

このコンポーネントはプロジェクト内で自由に使用・カスタマイズできます。
