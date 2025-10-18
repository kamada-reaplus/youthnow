import React from "react";

type DiagonalPosition = "upper" | "lower";

interface DiagonalBackgroundProps {
  /**
   * 背景色のクラス名 (例: "bg-neutral-light-cyan", "bg-brand-primary")
   */
  bgColor?: string;
  /**
   * プリセット位置 ("upper": 上位置, "lower": 下位置)
   */
  position?: DiagonalPosition;
  /**
   * SP版のclipPath設定 (positionを指定した場合は自動設定されます)
   */
  mobileClipPath?: string;
  /**
   * PC版のclipPath設定 (positionを指定した場合は自動設定されます)
   */
  desktopClipPath?: string;
  /**
   * 追加のクラス名
   */
  className?: string;
}

// プリセット設定
const PRESETS: Record<DiagonalPosition, { mobile: string; desktop: string }> = {
  upper: {
    mobile: "polygon(0 70%, 100% 50%, 100% 100%, 0 100%)",
    desktop: "polygon(0 90%, 100% 60%, 100% 100%, 0 100%)",
  },
  lower: {
    mobile: "polygon(0 95%, 100% 80%, 100% 100%, 0 100%)",
    desktop: "polygon(0 100%, 100% 70%, 100% 100%, 0 100%)",
  },
};

/**
 * 斜めの背景を表示するコンポーネント
 * SP版とPC版で異なるclipPathを適用可能
 * プリセット位置 ("upper", "lower") またはカスタムclipPathを指定できます
 */
export const DiagonalBackground: React.FC<DiagonalBackgroundProps> = ({
  bgColor = "bg-neutral-light-cyan",
  position = "upper",
  mobileClipPath,
  desktopClipPath,
  className = "",
}) => {
  // positionが指定されている場合はプリセットを使用、カスタムclipPathが優先
  const finalMobileClipPath = mobileClipPath || PRESETS[position].mobile;
  const finalDesktopClipPath = desktopClipPath || PRESETS[position].desktop;

  return (
    <>
      {/* SP版: 斜めの背景 */}
      <div
        className={`md:hidden absolute inset-0 ${bgColor} ${className}`}
        style={{
          clipPath: finalMobileClipPath,
        }}
      />

      {/* PC版: 斜めの背景 */}
      <div
        className={`hidden md:block absolute inset-0 ${bgColor} ${className}`}
        style={{
          clipPath: finalDesktopClipPath,
        }}
      />
    </>
  );
};
