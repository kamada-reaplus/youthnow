import React from "react";

interface DiagonalBackgroundProps {
  /**
   * 背景色のクラス名 (例: "bg-neutral-light-cyan", "bg-brand-primary")
   */
  bgColor?: string;
  /**
   * 追加のクラス名
   */
  className?: string;
}

// 固定角度の高さ（全セクションで統一）
const DIAGONAL_HEIGHT = {
  mobile: 150, // モバイルで200pxの高さの斜め
  desktop: 200, // デスクトップで200pxの高さの斜め
};

/**
 * 斜めの背景を表示するコンポーネント
 * 全てのセクションで同じ固定角度を使用します
 */
export const DiagonalBackground: React.FC<DiagonalBackgroundProps> = ({
  bgColor = "bg-neutral-light-cyan",
  className = "",
}) => {
  // bgColorからborder-colorを生成（bg-を border-に置き換え）
  const borderColor = bgColor.replace('bg-', 'border-');

  return (
    <>
      {/* SP版: 固定角度の斜めの背景 */}
      <div
        className={`md:hidden absolute inset-0 ${bgColor} ${borderColor} border-t-2 ${className}`}
        style={{
          clipPath: `polygon(0 100%, 100% calc(100% - ${DIAGONAL_HEIGHT.mobile}px), 100% 100%, 0 100%)`,
        }}
      />

      {/* PC版: 固定角度の斜めの背景 */}
      <div
        className={`hidden md:block absolute inset-0 ${bgColor} ${borderColor} border-t-2 ${className}`}
        style={{
          clipPath: `polygon(0 100%, 100% calc(100% - ${DIAGONAL_HEIGHT.desktop}px), 100% 100%, 0 100%)`,
        }}
      />
    </>
  );
};
