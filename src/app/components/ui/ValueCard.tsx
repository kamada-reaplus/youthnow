"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { ArrowRight } from "lucide-react";

// カードの見た目をCVAで管理（視認性改善: 白ベース + 適切な境界/影）
const cardVariants = cva(
  "relative rounded-3xl md:rounded-[2.5rem] transition-colors",
  {
    variants: {
      tone: {
        // セクションが濃色（brand-primary）でも読みやすい白カード
        neutral: "bg-neutral-white border border-neutral-black/10 shadow-lg",
        // 若干透過して背景に馴染ませる（必要に応じて切替）
        translucent:
          "bg-white/90 backdrop-blur-md border border-white/30 shadow-lg",
      },
      padding: {
        sm: "p-5 md:p-6 lg:p-8",
        md: "p-6 md:p-8 lg:p-12",
        lg: "p-8 md:p-12 lg:p-16",
      },
    },
    defaultVariants: {
      tone: "neutral",
      padding: "md",
    },
  }
);

interface ValueCardRootProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof cardVariants> {}

const ValueCardRoot = React.forwardRef<HTMLElement, ValueCardRootProps>(
  ({ tone, padding, className, children, ...rest }, ref) => {
    return (
      <article
        ref={ref as React.RefObject<HTMLElement>}
        className={cn(cardVariants({ tone, padding }), className)}
        {...rest}
      >
        {children}
      </article>
    );
  }
);
ValueCardRoot.displayName = "ValueCard";

// 左カラム（番号・カテゴリ・Before）
const ValueCardLeft = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col h-full items-start gap-md md:gap-lg",
      className
    )}
  >
    {children}
  </div>
);

// 番号（円形デザイン）
const ValueNumber = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-primary rounded-full border-2 border-brand-primary">
    <span className="font-extrabold text-white text-xl">{children}</span>
  </div>
);

// カテゴリテキスト（シンプルな青文字）
const ProblemCategory = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold text-brand-primary text-base md:text-lg">
    {children}
  </span>
);

// 左上ヘッダー（番号+カテゴリ）
const LeftHeader = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-3 md:gap-4", className)}>
    {children}
  </div>
);

// Before バッジ
const BeforeBadge = () => (
  <div className="bg-muted-foreground text-neutral-white text-sm md:text-base px-4 md:px-5 py-1.5 md:py-2 rounded-full whitespace-nowrap">
    Before
  </div>
);

// 吹き出し（Beforeの発話バブル）
const BeforeBubble = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-neutral-light-cyan border border-neutral-black/20 rounded-2xl md:rounded-3xl px-4 md:px-5 py-4 md:py-5 shadow-sm max-w-[220px] md:max-w-[260px] lg:max-w-[300px] flex items-center">
    <p className="text-sm md:text-base text-neutral-black/80 leading-snug">
      {children}
    </p>
  </div>
);

// キャラクター画像
const ProblemImage = ({ src, alt }: { src: StaticImageData; alt: string }) => (
  <div className="flex-shrink-0 mb-2">
    <Image
      src={src}
      alt={alt}
      className="w-16 h-16 md:w-20 md:h-20 object-contain"
      loading="lazy"
    />
  </div>
);

// 左下（Beforeエリア）
const LeftBefore = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "relative flex flex-col items-start justify-center gap-sm flex-1",
      className
    )}
  >
    {children}
  </div>
);

// 右カラム（After）
const VALUECardRight = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-3 md:space-y-4 relative", className)}>
    {children}
  </div>
);

const AfterBadge = () => (
  <div className="inline-block">
    <div className="bg-brand-primary text-neutral-white text-sm md:text-base px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm">
      After
    </div>
  </div>
);

const VALUETitle = ({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) => (
  <h3
    id={id}
    className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight"
  >
    {children}
  </h3>
);

const VALUEDescription = ({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) => (
  <p
    id={id}
    className="text-sm font-normal text-gray-600 leading-relaxed whitespace-pre-line"
  >
    {children}
  </p>
);

const FeatureList = ({ children }: { children: React.ReactNode }) => (
  <ul
    role="list"
    className="space-y-2 md:space-y-3 pt-2 bg-neutral-light-cyan/40 p-4 md:p-5 rounded-xl md:rounded-2xl border"
  >
    {children}
  </ul>
);

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2.5 md:gap-3 items-start rounded-xl">
    <span
      className="bg-brand-primary text-neutral-white rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center flex-shrink-0 text-sm md:text-base shadow-sm"
      aria-hidden
    >
      ✓
    </span>
    <p className="text-sm font-bold text-gray-600 leading-relaxed">
      {children}
    </p>
  </li>
);

// Before → After の矢印
const TransitionArrow = () => (
  <div className="hidden md:flex items-center justify-center px-4 lg:px-6">
    <ArrowRight
      className="text-brand-primary w-12 h-12 lg:w-16 lg:h-16"
      strokeWidth={3}
      aria-hidden
    />
  </div>
);

// レイアウトグリッド（矢印を含む3カラム構成、Beforeを小さく、Afterを広く）
const TwoColumn = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,25%)_auto_1fr] gap-lg md:gap-md lg:gap-lg items-center">
    {children}
  </div>
);

export const ValueCard = Object.assign(ValueCardRoot, {
  TwoColumn,
  Left: ValueCardLeft,
  LeftHeader,
  Number: ValueNumber,
  Category: ProblemCategory,
  LeftBefore,
  BeforeBadge,
  BeforeBubble,
  Image: ProblemImage,
  Arrow: TransitionArrow,
  Right: VALUECardRight,
  AfterBadge,
  Title: VALUETitle,
  Description: VALUEDescription,
  FeatureList,
  FeatureItem,
});
