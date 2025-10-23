import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

// フォームデータの型定義
type ContactFormData = {
  company: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  purpose: string;
  agreement: boolean;
};

// レート制限用のストレージ(簡易版: メモリ)
// 本番環境ではRedisなどの永続化ストレージを推奨
const rateLimitStore = new Map<string, number>();

// レート制限チェック(同一IPから1分以内の連続送信を防止)
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastSubmit = rateLimitStore.get(ip);

  if (lastSubmit && now - lastSubmit < 60000) {
    return false; // 1分以内の再送信は拒否
  }

  rateLimitStore.set(ip, now);
  return true;
}

// バリデーション
function validateFormData(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // データがオブジェクトであることを確認
  if (!data || typeof data !== "object") {
    errors.push("不正なデータ形式です");
    return { valid: false, errors };
  }

  const formData = data as Record<string, unknown>;

  if (
    !formData.company ||
    typeof formData.company !== "string" ||
    formData.company.trim().length === 0
  ) {
    errors.push("会社名を入力してください");
  }

  if (
    !formData.name ||
    typeof formData.name !== "string" ||
    formData.name.trim().length === 0
  ) {
    errors.push("お名前を入力してください");
  }

  if (!formData.email || typeof formData.email !== "string") {
    errors.push("メールアドレスを入力してください");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push("正しいメールアドレスを入力してください");
  }

  if (
    formData.phone &&
    typeof formData.phone === "string" &&
    !/^[\d-+() ]+$/.test(formData.phone)
  ) {
    errors.push("正しい電話番号を入力してください");
  }

  if (!formData.agreement || formData.agreement !== true) {
    errors.push("個人情報の取り扱いに同意してください");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    // リクエストボディの取得
    const body = await request.json();
    const formData: ContactFormData = body;

    // バリデーション
    const validation = validateFormData(formData);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // レート制限チェック
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "送信間隔が短すぎます。1分以上空けて再度お試しください。",
        },
        { status: 429 }
      );
    }

    // PDFファイルの読み込み
    const serviceGuidePath = path.join(
      process.cwd(),
      "public/downloads/service-guide.pdf"
    );
    const trendReportPath = path.join(
      process.cwd(),
      "public/downloads/trend-report.pdf"
    );

    let serviceGuideBuffer: Buffer | undefined;
    let trendReportBuffer: Buffer | undefined;

    try {
      if (fs.existsSync(serviceGuidePath)) {
        serviceGuideBuffer = fs.readFileSync(serviceGuidePath);
      }
      if (fs.existsSync(trendReportPath)) {
        trendReportBuffer = fs.readFileSync(trendReportPath);
      }
    } catch (error) {
      console.error("PDF読み込みエラー:", error);
    }

    // ロゴ画像の読み込みとBase64エンコード
    let logoBase64 = "";
    try {
      const logoPath = path.join(process.cwd(), "src/app/assets/logo.png");
      if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath);
        logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;
      }
    } catch (error) {
      console.error("ロゴ読み込みエラー:", error);
    }

    // メール送信: ユーザー宛
    const userEmailHtml = `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Youth Now! - サービス資料送付</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- ヘッダー -->
          <div style="background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%); padding: 40px 20px; text-align: center;">
            ${
              logoBase64
                ? `<img src="${logoBase64}" alt="Youth Now Logo" style="max-width: 200px; height: auto; margin: 0 0 20px 0;" />`
                : ""
            }
            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: bold;">Youth Now</h1>
            <p style="color: #ffffff; font-size: 14px; margin: 10px 0 0 0; opacity: 0.9;">次世代型インサイトマーケティング</p>
          </div>

          <!-- メインコンテンツ -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1F2937; font-size: 22px; margin: 0 0 20px 0;">${
              formData.name
            } 様</h2>

            <p style="color: #4B5563; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
              この度は<strong style="color: #00BCD4;">Youth Now!</strong>にご興味をお持ちいただき、誠にありがとうございます。
            </p>

            <p style="color: #4B5563; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0;">
              ご請求いただきましたサービス資料と、特典の最新トレンドレポートをPDFファイルで添付いたしました。
            </p>

            <!-- 添付ファイル情報 -->
            <div style="background-color: #FFF9E6; border-left: 4px solid #FFD700; padding: 20px; margin: 0 0 30px 0; border-radius: 4px;">
              <p style="color: #1F2937; font-size: 14px; font-weight: bold; margin: 0 0 10px 0;">📎 添付ファイル</p>
              <ul style="color: #4B5563; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>サービス紹介資料.pdf</li>
                <li>Z世代トレンドレポート.pdf (特典)</li>
              </ul>
            </div>

            <p style="color: #4B5563; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0;">
              ご不明な点やご相談がございましたら、このメールに返信する形でお気軽にお問い合わせください。<br>
              24時間以内に担当者よりご連絡させていただきます。
            </p>

            <!-- CTA -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="color: #6B7280; font-size: 14px; margin: 0 0 15px 0;">さらに詳しく知りたい方は</p>
              <a href="https://youthnow.example.com" style="display: inline-block; background-color: #FFD700; color: #1F2937; text-decoration: none; padding: 14px 40px; border-radius: 50px; font-weight: bold; font-size: 16px;">
                公式サイトで詳細を見る
              </a>
            </div>
          </div>

          <!-- フッター -->
          <div style="background-color: #F9FAFB; padding: 30px 20px; text-align: center; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; font-size: 12px; line-height: 1.6; margin: 0 0 10px 0;">
              <strong>Youth Now 運営事務局</strong><br>
              Email: ${process.env.FROM_EMAIL || "onboarding@resend.dev"}<br>
              このメールに心当たりがない場合は、お手数ですが削除をお願いいたします。
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const attachments = [];
    if (serviceGuideBuffer) {
      attachments.push({
        filename: "Youth_Now_サービス紹介資料.pdf",
        content: serviceGuideBuffer,
      });
    }
    if (trendReportBuffer) {
      attachments.push({
        filename: "Z世代トレンドレポート_特典.pdf",
        content: trendReportBuffer,
      });
    }

    await resend.emails.send({
      from: `Youth Now <${process.env.FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: formData.email,
      subject: "【Youth Now】サービス資料をお送りします",
      html: userEmailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // メール送信: 管理者宛
    const adminEmailText = `
新しいお問い合わせがありました。

■ お問い合わせ目的
${formData.purpose}

■ 会社名
${formData.company}

■ お名前
${formData.name}

■ メールアドレス
${formData.email}

■ 電話番号
${formData.phone || "(未入力)"}

■ 最も知りたいこと
${formData.interest || "(未選択)"}

---
このメールは自動送信されています。
お問い合わせ者への返信は、上記メールアドレス宛にお願いいたします。
    `;

    await resend.emails.send({
      from: `Youth Now Contact Form <${
        process.env.FROM_EMAIL || "onboarding@resend.dev"
      }>`,
      to: process.env.ADMIN_EMAIL || "kamada@reaplus.jp",
      subject: `【お問い合わせ】${formData.company} ${formData.name}様 - ${formData.purpose}`,
      text: adminEmailText,
    });

    // 成功レスポンス
    return NextResponse.json({
      success: true,
      message: "お問い合わせを受け付けました。メールをご確認ください。",
    });
  } catch (error) {
    console.error("メール送信エラー:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "メール送信に失敗しました。しばらく時間をおいて再度お試しください。",
      },
      { status: 500 }
    );
  }
}

// GET リクエストは許可しない
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
