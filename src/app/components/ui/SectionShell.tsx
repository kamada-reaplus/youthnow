import { DiagonalBackground } from "./DiagonalBackground";

type SectionShellProps = {
  id?: string;
  bgColor?: string; // セクション背景
  diagonalBgColor?: string; // 斜め背景の色（未指定で非表示）
  className?: string; // section に追加
  children: React.ReactNode;
};

export function SectionShell({
  id,
  bgColor = "bg-neutral-light-cyan",
  diagonalBgColor,
  className = "section-spacing px-lg relative overflow-hidden -mb-px",
  children,
}: SectionShellProps) {
  return (
    <section id={id} className={`${bgColor} ${className}`}>
      {diagonalBgColor ? (
        <DiagonalBackground bgColor={diagonalBgColor} />
      ) : null}
      {children}
    </section>
  );
}

export default SectionShell;
