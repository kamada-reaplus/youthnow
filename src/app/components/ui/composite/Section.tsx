import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

// ========================================
// Variants (CVA)
// ========================================

const sectionLabelVariants = cva(
  "font-black leading-none opacity-40 mb-sm md:mb-md",
  {
    variants: {
      size: {
        sm: "text-3xl md:text-4xl",
        md: "text-4xl md:text-5xl",
        lg: "text-5xl md:text-6xl",
      },
      color: {
        primary: "text-brand-primary",
        secondary: "text-brand-secondary",
        black: "text-neutral-black",
        white: "text-neutral-white",
      },
    },
    defaultVariants: {
      size: "lg",
      color: "primary",
    },
  }
);

const sectionTitleVariants = cva("font-bold leading-tight", {
  variants: {
    size: {
      sm: "text-2xl md:text-3xl",
      md: "text-3xl md:text-4xl lg:text-5xl",
      lg: "text-4xl md:text-5xl lg:text-6xl",
      xl: "text-5xl md:text-6xl lg:text-7xl",
      responsive: "text-lg md:text-4xl lg:text-display",
    },
    color: {
      primary: "text-brand-primary",
      secondary: "text-brand-secondary",
      black: "text-neutral-black",
      white: "text-neutral-white",
    },
  },
  defaultVariants: {
    size: "md",
    color: "black",
  },
});

const sectionSubtitleVariants = cva("font-medium", {
  variants: {
    size: {
      sm: "text-base md:text-lg",
      md: "text-lg md:text-xl",
      lg: "text-xl md:text-2xl",
      responsive: "text-base md:text-3xl lg:text-4xl",
    },
    color: {
      primary: "text-brand-primary",
      secondary: "text-brand-secondary",
      black: "text-neutral-black",
      white: "text-neutral-white",
      muted: "text-neutral-black/70",
    },
  },
  defaultVariants: {
    size: "md",
    color: "muted",
  },
});

// ========================================
// Root Component
// ========================================

interface SectionRootProps {
  id?: string;
  centered?: boolean;
  children: ReactNode;
  className?: string;
}

function SectionRoot({
  id,
  centered = true,
  children,
  className,
}: SectionRootProps) {
  return (
    <div
      data-section-id={id}
      data-centered={centered}
      className={cn(centered && "text-center", className)}
    >
      {children}
    </div>
  );
}

// ========================================
// Label Component (小さなセクションラベル)
// ========================================

interface SectionLabelProps
  extends VariantProps<typeof sectionLabelVariants> {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

function SectionLabel({
  children,
  size,
  color,
  className,
  centered = true,
}: SectionLabelProps) {
  return (
    <div className={cn(centered && "text-center", "mb-sm md:mb-md")}>
      <p
        className={cn(sectionLabelVariants({ size, color }), className)}
        aria-label="セクションラベル"
      >
        {children}
      </p>
    </div>
  );
}

// ========================================
// Title Component (メインタイトル)
// ========================================

interface SectionTitleProps extends VariantProps<typeof sectionTitleVariants> {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
  centered?: boolean;
}

function SectionTitle({
  children,
  size,
  color,
  className,
  as: Component = "h2",
  id,
  centered = true,
}: SectionTitleProps) {
  return (
    <Component
      id={id}
      className={cn(
        sectionTitleVariants({ size, color }),
        centered && "text-center",
        className
      )}
    >
      {children}
    </Component>
  );
}

// ========================================
// Subtitle Component
// ========================================

interface SectionSubtitleProps
  extends VariantProps<typeof sectionSubtitleVariants> {
  children: ReactNode;
  className?: string;
  as?: "h3" | "h4" | "h5" | "h6" | "p";
  centered?: boolean;
}

function SectionSubtitle({
  children,
  size,
  color,
  className,
  as: Component = "p",
  centered = true,
}: SectionSubtitleProps) {
  return (
    <Component
      className={cn(
        sectionSubtitleVariants({ size, color }),
        centered && "text-center",
        className
      )}
    >
      {children}
    </Component>
  );
}

// ========================================
// Header Component (統合ラッパー)
// ========================================

interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
  "aria-labelledby"?: string;
}

const spacingMap = {
  sm: "mb-md",
  md: "mb-lg md:mb-xl",
  lg: "mb-xl md:mb-2xl",
  xl: "mb-2xl md:mb-3xl",
};

function SectionHeader({
  children,
  className,
  spacing = "md",
  "aria-labelledby": ariaLabelledBy,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(spacingMap[spacing], className)}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </header>
  );
}

// ========================================
// Export
// ========================================

export const Section = Object.assign(SectionRoot, {
  Label: SectionLabel,
  Title: SectionTitle,
  Subtitle: SectionSubtitle,
  Header: SectionHeader,
});

// 型エクスポート
export type {
  SectionRootProps,
  SectionLabelProps,
  SectionTitleProps,
  SectionSubtitleProps,
  SectionHeaderProps,
};
