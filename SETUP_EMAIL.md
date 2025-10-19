# メール送信機能セットアップガイド

このガイドでは、お問い合わせフォームのメール送信機能を有効化するための手順を説明します。

## 📋 概要

- **メール配信サービス**: Resend
- **送信元メールアドレス**: Resend 無料ドメイン(`onboarding@resend.dev`)
- **管理者メールアドレス**: kamada@reaplus.jp
- **月間無料枠**: 3,000 通まで無料

---

## 🚀 セットアップ手順

### ステップ 1: Resend アカウントの作成

1. **Resend 公式サイトにアクセス**

   - URL: https://resend.com

2. **サインアップ**

   - 右上の「Sign Up」をクリック
   - GitHub アカウントまたはメールアドレスで登録
   - メール認証を完了

3. **ログイン**
   - 登録したアカウントでログイン

---

### ステップ 2: API キーの取得

1. **API Keys ページに移動**

   - ダッシュボードにログイン後、左メニューから「API Keys」を選択
   - または直接アクセス: https://resend.com/api-keys

2. **新しい API キーを作成**

   - 「Create API Key」ボタンをクリック
   - Name: `Youth Now Production` (任意の名前)
   - Permission: `Full Access` (推奨)
   - 「Create」をクリック

3. **API キーをコピー**
   - 表示された API キーをコピー
   - **重要**: このキーは一度しか表示されないため、安全な場所に保存してください
   - 形式: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### ステップ 3: 環境変数の設定

#### ローカル開発環境の場合

1. **`.env.local`ファイルを作成**

   ```bash
   # プロジェクトルートで実行
   cp .env.example .env.local
   ```

2. **`.env.local`を編集**

   ```bash
   # エディタで開く
   nano .env.local
   # または
   code .env.local
   ```

3. **環境変数を設定**

   ```env
   # Resend API設定
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # ← ステップ2で取得したAPIキーを貼り付け

   # 管理者メールアドレス
   ADMIN_EMAIL=kamada@reaplus.jp

   # 送信元メールアドレス
   FROM_EMAIL=onboarding@resend.dev

   # アプリケーション名
   APP_NAME=Youth Now

   # 環境
   NODE_ENV=development
   ```

4. **ファイルを保存**

#### Vercel 本番環境の場合

1. **Vercel ダッシュボードにアクセス**

   - https://vercel.com/dashboard

2. **プロジェクトを選択**

   - デプロイしたプロジェクト「youthnow」を選択

3. **Settings > Environment Variables**

   - 左メニューから「Settings」をクリック
   - 「Environment Variables」タブを選択

4. **環境変数を追加**

   以下の環境変数を 1 つずつ追加:

   | Name             | Value                                | Environment                      |
   | ---------------- | ------------------------------------ | -------------------------------- |
   | `RESEND_API_KEY` | `re_xxxxxxxx...` (取得した API キー) | Production, Preview, Development |
   | `ADMIN_EMAIL`    | `kamada@reaplus.jp`                  | Production, Preview, Development |
   | `FROM_EMAIL`     | `onboarding@resend.dev`              | Production, Preview, Development |
   | `APP_NAME`       | `Youth Now`                          | Production, Preview, Development |

5. **再デプロイ**
   - 環境変数を追加後、自動的に再デプロイされます
   - または手動で「Deployments」タブから再デプロイ

---

### ステップ 4: 動作確認

#### ローカル環境でテスト

1. **開発サーバーを起動**

   ```bash
   npm run dev
   ```

2. **ブラウザでアクセス**

   ```
   http://localhost:3000
   ```

3. **フォームをテスト送信**

   - お問い合わせフォームに移動(ページ下部の「CONTACT」セクション)
   - すべての項目を入力
   - 「送信」ボタンをクリック

4. **メール受信確認**

   - **ユーザー宛メール**: フォームに入力したメールアドレス宛に資料が届くか確認
   - **管理者宛メール**: kamada@reaplus.jp 宛にお問い合わせ通知が届くか確認

5. **トラブルシューティング**

   **メールが届かない場合:**

   - 迷惑メールフォルダを確認
   - `.env.local`の API キーが正しいか確認
   - ターミナルのエラーログを確認
   - Resend ダッシュボードの「Logs」で送信履歴を確認

   **エラーが表示される場合:**

   - ブラウザの開発者ツール(Console)でエラー内容を確認
   - ターミナルでサーバーログを確認
   - API キーの権限が「Full Access」になっているか確認

#### 本番環境でテスト

1. **Vercel にデプロイ**

   ```bash
   git add .
   git commit -m "メール送信機能を追加"
   git push origin main
   ```

2. **デプロイ完了を確認**

   - Vercel ダッシュボードでデプロイステータスを確認
   - 「Ready」になるまで待機

3. **本番 URL でテスト**
   - 本番 URL にアクセス
   - フォームをテスト送信
   - メール受信を確認

---

## 📁 PDF ファイルの差し替え

現在はダミー PDF ファイルが設定されています。実際の資料に差し替える手順:

### 手順

1. **PDF ファイルを準備**

   - サービス紹介資料: `service-guide.pdf`
   - トレンドレポート: `trend-report.pdf`

2. **ファイルを配置**

   ```bash
   # プロジェクトルートで実行
   cp /path/to/your/service-guide.pdf public/downloads/service-guide.pdf
   cp /path/to/your/trend-report.pdf public/downloads/trend-report.pdf
   ```

3. **ファイルサイズの確認**

   - 推奨: 各ファイル 5MB 以下
   - Resend の添付ファイル上限: 40MB

4. **コミット & デプロイ**
   ```bash
   git add public/downloads/
   git commit -m "サービス資料とトレンドレポートPDFを更新"
   git push origin main
   ```

---

## 🔒 セキュリティ

### 重要事項

1. **API キーの管理**

   - ❌ `.env.local`を Git にコミットしない
   - ✅ `.gitignore`に`.env*.local`が含まれていることを確認済み
   - ✅ API キーは絶対に公開しない

2. **レート制限**

   - 同一 IP から 1 分以内の連続送信を防止する機能を実装済み
   - スパム対策として機能

3. **バリデーション**
   - フロントエンド・バックエンド両方でバリデーション実装済み
   - 不正なデータの送信を防止

---

## 📊 Resend ダッシュボードの使い方

### ログの確認

1. **Resend ダッシュボードにログイン**

   - https://resend.com/emails

2. **送信履歴を確認**

   - 「Emails」タブで全ての送信メールを確認可能
   - ステータス: `delivered`(配信成功)、`bounced`(エラー)など

3. **詳細情報**
   - 各メールをクリックすると詳細が表示される
   - 送信日時、宛先、件名、本文、添付ファイルなど

### 統計情報

- ダッシュボードで以下を確認可能:
  - 月間送信数
  - 配信成功率
  - エラー率
  - 無料枠の残り

---

## 🆙 今後のアップグレード

### 独自ドメインの設定 (オプション)

現在は Resend 無料ドメイン(`onboarding@resend.dev`)を使用していますが、独自ドメイン(例: `noreply@yourdomain.com`)に変更することも可能です。

#### 手順

1. **Resend ダッシュボードで「Domains」を選択**

   - https://resend.com/domains

2. **ドメインを追加**

   - 「Add Domain」をクリック
   - 自社ドメインを入力(例: `yourdomain.com`)

3. **DNS 設定**

   - Resend が提供する DNS レコードをドメインの DNS 設定に追加
   - SPF、DKIM、DMARC レコードを設定

4. **検証**

   - DNS 設定が反映されるまで待機(最大 48 時間)
   - Resend ダッシュボードで検証ステータスを確認

5. **環境変数を更新**

   ```env
   FROM_EMAIL=noreply@yourdomain.com
   ```

6. **再デプロイ**

### reCAPTCHA v3 の追加 (スパム対策強化)

スパムが発生した場合は、reCAPTCHA v3 を追加することで対策を強化できます。
詳細は別途ご相談ください。

---

## ❓ よくある質問

### Q1. メールが届かない場合は?

**A.** 以下を確認してください:

1. 迷惑メールフォルダをチェック
2. メールアドレスが正しいか確認
3. Resend ダッシュボードの「Logs」で送信履歴を確認
4. API キーが正しく設定されているか確認

### Q2. 月 3,000 通を超えたらどうなる?

**A.**

- 無料枠を超えると、それ以上のメールは送信できません
- 有料プラン($20/月で 50,000 通)へのアップグレードが必要です
- Resend ダッシュボードで事前に使用状況を確認できます

### Q3. テストメールを送りたい

**A.**

- ローカル環境(`npm run dev`)でフォームをテスト送信
- 自分のメールアドレスを入力して確認可能
- Resend のログで送信状況を確認

### Q4. 添付ファイルのサイズ上限は?

**A.**

- Resend: 1 通あたり 40MB まで
- 推奨: 各 PDF ファイル 5MB 以下(ユーザー体験向上のため)

### Q5. 管理者メールアドレスを変更したい

**A.**

1. `.env.local`(ローカル)または Vercel 環境変数(本番)を編集
2. `ADMIN_EMAIL`の値を変更
3. 再起動またはデプロイ

---

## 📞 サポート

### 問題が解決しない場合

1. **Resend 公式ドキュメント**

   - https://resend.com/docs

2. **Resend サポート**

   - https://resend.com/support

3. **開発者向け情報**
   - GitHub Issues: このプロジェクトのリポジトリ
   - プロジェクト管理者に問い合わせ

---

**セットアップ完了後は、必ずテスト送信を行って動作確認してください!**
