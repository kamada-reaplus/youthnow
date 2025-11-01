import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwindクラスを安全にマージする
 * 競合するクラスを適切に処理
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// テキストマーカー関数は textUtils.tsx に移動しました
export { parseTextWithMarker } from "./textUtils";

/**
 * デバウンス処理
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
