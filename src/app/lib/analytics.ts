/**
 * Analytics イベントトラッキングユーティリティ
 *
 * Google Tag Manager の dataLayer にイベントを送信します
 * GTM経由でGA4、Clarity、その他の計測ツールに自動的に連携されます
 */

// dataLayer の型定義
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

/**
 * イベントのカテゴリー
 */
export enum EventCategory {
  ENGAGEMENT = "engagement", // ユーザーエンゲージメント
  CONVERSION = "conversion", // コンバージョン
  NAVIGATION = "navigation", // ナビゲーション
  FORM = "form", // フォーム関連
  SCROLL = "scroll", // スクロール
  CLICK = "click", // クリック
}

/**
 * イベントパラメータの型
 */
interface EventParams {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * GTM dataLayer にイベントを送信
 *
 * @param eventName - イベント名
 * @param params - イベントパラメータ
 *
 * @example
 * trackEvent('button_click', {
 *   category: EventCategory.ENGAGEMENT,
 *   action: 'click',
 *   label: 'お問い合わせボタン',
 *   button_location: 'hero_section'
 * });
 */
export function trackEvent(eventName: string, params: EventParams): void {
  // 開発環境ではコンソールにログ出力
  if (process.env.NODE_ENV === "development") {
    console.log("📊 Analytics Event:", eventName, params);
  }

  // dataLayer が存在しない場合は初期化
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}

/**
 * よく使うイベントの便利関数
 */

/**
 * ボタンクリックイベント
 */
export function trackButtonClick(
  buttonLabel: string,
  location?: string
): void {
  trackEvent("button_click", {
    category: EventCategory.CLICK,
    action: "click",
    label: buttonLabel,
    button_location: location || "unknown",
  });
}

/**
 * 外部リンククリックイベント
 */
export function trackExternalLink(url: string, linkText?: string): void {
  trackEvent("external_link_click", {
    category: EventCategory.NAVIGATION,
    action: "click",
    label: linkText || url,
    url: url,
  });
}

/**
 * 電話番号クリックイベント
 */
export function trackPhoneClick(phoneNumber: string): void {
  trackEvent("phone_click", {
    category: EventCategory.CONVERSION,
    action: "click",
    label: phoneNumber,
  });
}

/**
 * フォーム開始イベント
 */
export function trackFormStart(formName: string): void {
  trackEvent("form_start", {
    category: EventCategory.FORM,
    action: "start",
    label: formName,
  });
}

/**
 * フォーム送信イベント
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent("form_submit", {
    category: EventCategory.FORM,
    action: success ? "submit_success" : "submit_error",
    label: formName,
  });
}

/**
 * フォーム完了イベント（サンクスページ表示時）
 */
export function trackFormComplete(formName: string): void {
  trackEvent("form_complete", {
    category: EventCategory.CONVERSION,
    action: "complete",
    label: formName,
  });
}

/**
 * セクション表示イベント（スクロールで表示された時）
 */
export function trackSectionView(sectionName: string): void {
  trackEvent("section_view", {
    category: EventCategory.SCROLL,
    action: "view",
    label: sectionName,
  });
}

/**
 * スクロール深度イベント
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent("scroll_depth", {
    category: EventCategory.SCROLL,
    action: "scroll",
    label: `${percentage}%`,
    value: percentage,
  });
}

/**
 * ページビューイベント（SPAなどでページ遷移時）
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  trackEvent("page_view", {
    category: EventCategory.NAVIGATION,
    action: "view",
    label: pageTitle || pagePath,
    page_path: pagePath,
  });
}

/**
 * カスタムコンバージョンイベント
 */
export function trackConversion(
  conversionName: string,
  value?: number
): void {
  trackEvent("conversion", {
    category: EventCategory.CONVERSION,
    action: "conversion",
    label: conversionName,
    value: value,
  });
}
