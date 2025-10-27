interface SectionHeaderProps {
  title: string;
  className?: string;
  leadingTight?: boolean;
  textColor?: string;
  centered?: boolean;
  responsive?: boolean;
  subtitle?: string; // サブタイトル用
  highlightWord?: string; // ハイライトする単語
  highlightColor?: string; // ハイライトカラー
  highlightSize?: string; // ハイライトサイズ（タイトルとサブタイトル共通）
  subtitleHighlightWord?: string; // サブタイトルでハイライトする単語
}

export function SectionHeader({
  title,
  className = "mb-section-spacing",
  leadingTight = false,
  textColor = "text-neutral-dark",
  centered = true,
  responsive = false,
  subtitle,
  highlightWord,
  highlightColor = "text-brand-secondary",
  highlightSize = "text-5xl md:text-6xl lg:text-7xl",
  subtitleHighlightWord,
}: SectionHeaderProps) {
  // タイトルのハイライト処理
  const renderTitle = () => {
    if (!highlightWord) {
      return title.split("<br />").map((part, index, array) => (
        <span key={index}>
          {part}
          {index < array.length - 1 && <br />}
        </span>
      ));
    }

    const parts = title.split(highlightWord);
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className={`${highlightColor} ${highlightSize || ''}`}>{highlightWord}</span>
        )}
      </span>
    ));
  };

  // サブタイトルのハイライト処理
  const renderSubtitle = () => {
    if (!subtitle) return null;

    if (!subtitleHighlightWord) {
      return subtitle;
    }

    const parts = subtitle.split(subtitleHighlightWord);
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className={`${highlightColor} ${highlightSize}`}>
            {subtitleHighlightWord}
          </span>
        )}
      </span>
    ));
  };

  const textSizeClass = responsive
    ? "text-lg md:text-4xl lg:text-display"
    : "text-h2";

  const subtitleSizeClass = responsive
    ? "text-base md:text-3xl lg:text-4xl"
    : "text-h3";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <div className="relative inline-block">
        <h2
          className={`${textSizeClass} ${textColor} ${
            leadingTight ? "leading-tight" : ""
          } relative z-10 ${subtitle ? "mb-md" : ""}`}
        >
          {renderTitle()}
        </h2>
        {subtitle && (
          <h3
            className={`${subtitleSizeClass} ${textColor} ${
              leadingTight ? "leading-tight" : ""
            } relative z-10`}
          >
            {renderSubtitle()}
          </h3>
        )}
      </div>
    </div>
  );
}
