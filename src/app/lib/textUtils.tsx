import React from "react";

/**
 * テキスト内の [[テキスト]] をマーカー風スタイルに変換
 * 使用例: parseTextWithMarker("通常のテキスト[[マーカー付き]]テキスト")
 */
export function parseTextWithMarker(text: string): React.ReactNode[] {
  // [[...]] のパターンを検出
  const parts = text.split(/(\[\[.*?\]\])/g);

  return parts.map((part, index) => {
    // [[...]] で囲まれている場合
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const content = part.slice(2, -2); // [[ と ]] を削除
      return (
        <span key={index} className="relative inline-block mx-0.5">
          <span className="relative z-10 font-extrabold">
            {content}
          </span>
          <span className="absolute bottom-0 left-0 w-full h-[35%] bg-brand-secondary/80 -z-0"></span>
        </span>
      );
    }
    // 通常のテキスト
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}
