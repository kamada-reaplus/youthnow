type QuoteBoxProps = {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  rounded?: string;
  gradientClass?: string;
};

export function QuoteBox({
  children,
  className = "",
  padding = "p-lg",
  rounded = "rounded-2xl",
  gradientClass = "bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10",
}: QuoteBoxProps) {
  return (
    <div className={`${gradientClass} ${rounded} ${padding} ${className}`}>
      {children}
    </div>
  );
}

export default QuoteBox;
