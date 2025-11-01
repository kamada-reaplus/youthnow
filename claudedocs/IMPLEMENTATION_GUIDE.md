# 実装ガイド: コンポーネント改善の具体例

## 📋 目次

1. [セットアップ](#セットアップ)
2. [Step-by-Step 実装](#step-by-step-実装)
3. [Before/After 比較](#beforeafter-比較)
4. [マイグレーション戦略](#マイグレーション戦略)

---

## セットアップ

### 1. 必要なパッケージのインストール

```bash
# CVA (Class Variance Authority) - バリアント管理
npm install class-variance-authority

# clsx - クラス名結合
npm install clsx

# tailwind-merge - Tailwindクラスのマージ
npm install tailwind-merge

# Storybookセットアップ（オプション）
npx storybook@latest init

# Testing Library（オプション）
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### 2. ユーティリティ関数の作成

```tsx
// src/app/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwindクラスを安全にマージする
 * 競合するクラスを適切に処理
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * デバウンス処理
 */
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
```

### 3. 型定義の整備

```tsx
// src/app/types/components.ts
export interface BaseComponentProps {
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type ContainerSize = "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
export type ColorVariant = "primary" | "secondary" | "black" | "white";

export interface SpacingProps {
  padding?: SpacingSize;
  margin?: SpacingSize;
}
```

### 4. デフォルト値の定義

```tsx
// src/app/config/component-defaults.ts
export const COMPONENT_DEFAULTS = {
  container: {
    size: "5xl" as const,
    padding: "px-lg" as const,
  },
  card: {
    padding: "p-lg" as const,
    rounded: "rounded-2xl" as const,
  },
  button: {
    variant: "primary" as const,
    size: "md" as const,
  },
  spacing: {
    section: "section-spacing" as const,
    sectionLg: "section-spacing-lg" as const,
  },
  animation: {
    duration: "duration-300" as const,
    timing: "ease-in-out" as const,
  },
} as const;
```

---

## Step-by-Step 実装

### Step 1: Button Primitive Component

#### 実装

```tsx
// src/app/components/ui/primitives/Button.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  // ベーススタイル（全バリアントに適用）
  "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary text-white hover:bg-brand-primary-dark focus-visible:ring-brand-primary",
        secondary:
          "bg-brand-secondary text-neutral-black hover:bg-brand-secondary-dark focus-visible:ring-brand-secondary",
        outline:
          "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 focus-visible:ring-brand-primary",
        ghost:
          "text-brand-primary hover:bg-brand-primary/10 focus-visible:ring-brand-primary",
        link: "text-brand-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-md py-sm text-body-sm rounded-lg",
        md: "px-xl py-md text-body rounded-xl",
        lg: "px-2xl py-lg text-body-lg rounded-2xl",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            処理中...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
```

#### 使用例

```tsx
import { Button } from "@/app/components/ui/primitives/Button";

// 基本的な使用
<Button>クリック</Button>

// バリアント
<Button variant="secondary">セカンダリ</Button>
<Button variant="outline">アウトライン</Button>
<Button variant="ghost">ゴースト</Button>

// サイズ
<Button size="sm">小</Button>
<Button size="lg">大</Button>

// フルワイド
<Button fullWidth>全幅ボタン</Button>

// ローディング状態
<Button isLoading>送信中</Button>

// カスタムクラス
<Button className="mt-4">マージン追加</Button>
```

---

### Step 2: Card Compound Component

#### 実装

```tsx
// src/app/components/ui/composite/Card/Card.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

// Context for Card
const CardContext = React.createContext<{
  variant?: string;
}>({});

const cardVariants = cva("rounded-2xl transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-neutral-white border border-neutral-black/10 shadow-sm",
      elevated: "bg-neutral-white shadow-lg hover:shadow-xl",
      outlined: "bg-transparent border-2 border-brand-primary",
      ghost: "bg-transparent",
    },
    padding: {
      none: "",
      sm: "p-md",
      md: "p-lg",
      lg: "p-xl",
      xl: "p-2xl",
    },
    interactive: {
      true: "cursor-pointer hover:shadow-xl hover:border-brand-primary/40",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    interactive: false,
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ variant }}>
        <div
          ref={ref}
          className={cn(
            cardVariants({ variant, padding, interactive, className })
          )}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-sm pb-md", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-h4 text-neutral-black leading-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body-sm text-neutral-black/70", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-md", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
```

#### 使用例

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/components/ui/composite/Card/Card";
import { Button } from "@/app/components/ui/primitives/Button";

// 基本的な使用
<Card>
  <CardHeader>
    <CardTitle>サービスタイトル</CardTitle>
    <CardDescription>サービスの説明文がここに入ります</CardDescription>
  </CardHeader>
  <CardContent>
    <p>コンテンツ本文</p>
  </CardContent>
  <CardFooter>
    <Button>詳細を見る</Button>
  </CardFooter>
</Card>

// バリアント
<Card variant="elevated">
  <CardHeader>
    <CardTitle>エレベーテッドカード</CardTitle>
  </CardHeader>
  <CardContent>影付きカード</CardContent>
</Card>

// インタラクティブカード
<Card interactive onClick={handleClick}>
  <CardHeader>
    <CardTitle>クリック可能カード</CardTitle>
  </CardHeader>
  <CardContent>クリックするとアクションが実行されます</CardContent>
</Card>

// パディングなし（カスタムレイアウト用）
<Card padding="none">
  <div className="relative h-48 overflow-hidden rounded-t-2xl">
    <Image src={image} alt="Card Image" fill className="object-cover" />
  </div>
  <div className="p-lg">
    <CardTitle>画像付きカード</CardTitle>
    <CardDescription>カスタムレイアウト例</CardDescription>
  </div>
</Card>
```

---

### Step 3: Section Compound Component

#### 実装

```tsx
// src/app/components/ui/composite/Section/Section.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const SectionContext = React.createContext<{ id?: string }>({});

const sectionVariants = cva("relative", {
  variants: {
    spacing: {
      none: "",
      sm: "py-2xl md:py-3xl",
      md: "py-3xl md:py-4xl",
      lg: "py-4xl md:py-5xl",
    },
    bgColor: {
      white: "bg-neutral-white",
      lightCyan: "bg-neutral-light-cyan",
      primary: "bg-brand-primary",
      secondary: "bg-brand-secondary",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    spacing: "md",
    bgColor: "white",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ id, className, spacing, bgColor, children, ...props }, ref) => {
    return (
      <SectionContext.Provider value={{ id }}>
        <section
          ref={ref}
          id={id}
          className={cn(sectionVariants({ spacing, bgColor, className }))}
          {...props}
        >
          {children}
        </section>
      </SectionContext.Provider>
    );
  }
);
Section.displayName = "Section";

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    centered?: boolean;
  }
>(({ className, centered = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-xl md:mb-2xl", centered && "text-center", className)}
    {...props}
  />
));
SectionHeader.displayName = "SectionHeader";

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    level?: 1 | 2 | 3;
  }
>(({ className, level = 2, ...props }, ref) => {
  const Comp = `h${level}` as const;
  return (
    <Comp
      ref={ref}
      className={cn(
        level === 1 && "text-h1",
        level === 2 && "text-h2",
        level === 3 && "text-h3",
        "text-neutral-black leading-tight mb-md",
        className
      )}
      {...props}
    />
  );
});
SectionTitle.displayName = "SectionTitle";

const SectionSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-body-lg text-neutral-black/70 max-w-3xl mx-auto",
      className
    )}
    {...props}
  />
));
SectionSubtitle.displayName = "SectionSubtitle";

const SectionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    containerSize?: "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  }
>(({ className, containerSize = "5xl", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "container mx-auto px-lg",
      `max-w-${containerSize}`,
      className
    )}
    {...props}
  />
));
SectionContent.displayName = "SectionContent";

export {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionContent,
};
```

#### 使用例

```tsx
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionContent,
} from "@/app/components/ui/composite/Section/Section";

// 基本的な使用
<Section id="services" bgColor="lightCyan">
  <SectionHeader>
    <SectionTitle>サービス一覧</SectionTitle>
    <SectionSubtitle>
      若年層マーケティングを加速させる調査サービス
    </SectionSubtitle>
  </SectionHeader>
  <SectionContent>
    {/* サービスカード群 */}
  </SectionContent>
</Section>

// スペーシング調整
<Section spacing="lg">
  {/* 大きなスペーシング */}
</Section>

// センタリングなし
<SectionHeader centered={false}>
  <SectionTitle>左寄せタイトル</SectionTitle>
</SectionHeader>

// コンテナサイズ調整
<SectionContent containerSize="7xl">
  {/* 広いコンテナ */}
</SectionContent>
```

---

## Before/After 比較

### 例 1: ServiceCard コンポーネント

#### Before（現在の実装）

```tsx
// 現在の ServiceCard.tsx
"use client";

import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  badge?: string;
  description: string;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  badge,
  description,
  className = "",
}: ServiceCardProps) {
  return (
    <div
      className={`bg-neutral-white border-2 border-neutral-black/10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-lg group hover:border-brand-primary/40 relative overflow-hidden flex flex-col h-[300px] ${className}`}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Badge */}
      {badge && (
        <div className="absolute top-md right-md">
          <span className="inline-block bg-brand-secondary text-neutral-black text-caption px-sm py-xs rounded-full">
            {badge}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="flex justify-center mb-md flex-shrink-0">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
          <Icon className="w-8 h-8 text-brand-primary" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-body text-neutral-black text-center mb-sm leading-tight whitespace-pre-line flex-shrink-0">
        {title}
      </h3>

      {/* Description */}
      <div className="flex-grow flex items-start justify-center overflow-hidden">
        <p className="text-body-sm text-neutral-black/70 text-center leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}
```

#### After（改善版）

```tsx
// 改善版 ServiceCard.tsx
"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/composite/Card/Card";

const serviceCardVariants = cva(
  "group relative overflow-hidden flex flex-col",
  {
    variants: {
      size: {
        sm: "h-[250px]",
        md: "h-[300px]",
        lg: "h-[350px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ServiceCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof serviceCardVariants> {
  icon: LucideIcon;
  title: string;
  badge?: string;
  description: string;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    { icon: Icon, title, badge, description, size, className, ...props },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        interactive
        className={cn(serviceCardVariants({ size, className }))}
        role="article"
        aria-label={`サービス: ${title}`}
        {...props}
      >
        {/* Accent bar on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-md right-md">
            <span className="inline-block bg-brand-secondary text-neutral-black text-caption px-sm py-xs rounded-full">
              {badge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="flex justify-center mb-md flex-shrink-0">
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors"
            aria-hidden="true"
          >
            <Icon className="w-8 h-8 text-brand-primary" />
          </div>
        </div>

        {/* Content */}
        <CardHeader className="pb-0">
          <CardTitle className="text-body text-center mb-sm whitespace-pre-line flex-shrink-0">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow flex items-start justify-center overflow-hidden">
          <p className="text-body-sm text-neutral-black/70 text-center leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </CardContent>
      </Card>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
```

#### 改善ポイント

1. **Compound Component の活用**: `Card` コンポーネントを使用して構造を明確化
2. **CVA でバリアント管理**: サイズバリアントを型安全に管理
3. **forwardRef 対応**: ref の転送に対応
4. **アクセシビリティ強化**: `role`, `aria-label` を追加
5. **型安全性向上**: VariantProps を使用して型を自動生成
6. **クラス名管理改善**: `cn()` を使用してクラス名を安全にマージ

---

### 例 2: ProblemSection の改善

#### Before（現在の実装）

```tsx
// 現在の ProblemSection.tsx
export function ProblemSection() {
  return (
    <SectionShell
      id="problem"
      bgColor="bg-neutral-light-cyan"
      diagonalBgColor="bg-brand-primary"
      className="px-lg pb-8 md:py-6 relative overflow-hidden -mb-px"
    >
      <HeaderBlock
        sectionTitle="PROBLEM"
        title="若年層マーケティングで<br />こんな課題を感じていませんか?"
        textColor="text-neutral-black"
        wrapperClassName="mb-2xl text-center md:mb-xl"
        headerClassName="mb-0 px-lg"
      />

      <Container size="5xl" padding="none" className="relative z-10">
        <MainContentCard />
        <ArrowDivider />
      </Container>
    </SectionShell>
  );
}

function MainContentCard() {
  return (
    <div className="mb-xl rounded-3xl border border-neutral-black/20 bg-neutral-white px-3xl py-2xl shadow-sm md:mb-lg md:rounded-[2.5rem] md:px-xl md:py-xl lg:px-2xl lg:py-lg">
      <ProblemList />
    </div>
  );
}

function ProblemList() {
  return (
    <div className="md:mx-auto md:max-w-3xl">
      <div className="mb-3xl space-y-xl md:mb-0 md:space-y-md lg:space-y-md">
        {PROBLEMS.map((problem, index) => (
          <ContentCard
            key={`problem-${index}`}
            text={problem.text}
            image={problem.image}
            imageAlt={`問題 ${index + 1}`}
            imagePosition={index % 2 === 0 ? "right" : "left"}
            category={problem.category}
            number={problem.number}
          />
        ))}
      </div>
    </div>
  );
}
```

#### After（改善版）

```tsx
// 改善版 ProblemSection.tsx
"use client";

import * as React from "react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionContent,
} from "@/app/components/ui/composite/Section/Section";
import { Card, CardContent } from "@/app/components/ui/composite/Card/Card";
import { ProblemCard } from "./ProblemCard";
import { ArrowDivider } from "@/app/components/ui/ArrowDivider";
import { PROBLEMS } from "@/app/content/problems";
import { useProblemSection } from "./useProblemSection";

export function ProblemSection() {
  const { activeIndex, handleCardClick } = useProblemSection();

  return (
    <Section
      id="problem"
      bgColor="lightCyan"
      spacing="lg"
      aria-labelledby="problem-heading"
    >
      <SectionHeader>
        <p className="text-caption text-brand-primary uppercase tracking-wider mb-md">
          PROBLEM
        </p>
        <SectionTitle
          id="problem-heading"
          dangerouslySetInnerHTML={{
            __html: "若年層マーケティングで<br />こんな課題を感じていませんか?",
          }}
        />
      </SectionHeader>

      <SectionContent containerSize="5xl">
        <Card variant="elevated" padding="xl" className="mb-xl">
          <CardContent className="md:max-w-3xl md:mx-auto">
            <ProblemList
              problems={PROBLEMS}
              activeIndex={activeIndex}
              onCardClick={handleCardClick}
            />
          </CardContent>
        </Card>

        <ArrowDivider />
      </SectionContent>
    </Section>
  );
}

// Presentational Component
interface ProblemListProps {
  problems: typeof PROBLEMS;
  activeIndex: number;
  onCardClick: (index: number) => void;
}

function ProblemList({ problems, activeIndex, onCardClick }: ProblemListProps) {
  return (
    <div className="space-y-xl md:space-y-md" role="list" aria-label="課題一覧">
      {problems.map((problem, index) => (
        <ProblemCard
          key={`problem-${problem.number}`}
          {...problem}
          imagePosition={index % 2 === 0 ? "right" : "left"}
          isActive={index === activeIndex}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}

// Custom Hook（ロジック分離）
// src/app/components/sections/ProblemSection/useProblemSection.ts
import { useState, useCallback } from "react";

export function useProblemSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = useCallback((index: number) => {
    setActiveIndex(index);
    // アナリティクスイベントを送信するなどの処理も可能
  }, []);

  return {
    activeIndex,
    handleCardClick,
  };
}
```

#### 改善ポイント

1. **Section Compound Component 使用**: 構造化されたセクションレイアウト
2. **ロジックの分離**: カスタム Hook でビジネスロジックを分離
3. **Presentational Component**: `ProblemList` を純粋な表示コンポーネントに
4. **アクセシビリティ強化**: `role="list"`, `aria-label` を追加
5. **状態管理**: アクティブなカードの追跡
6. **型安全性**: Props インターフェースの明確化
7. **再利用性**: ロジックと UI の分離により、テストとメンテナンスが容易に

---

## マイグレーション戦略

### 段階的な移行アプローチ

#### フェーズ 1: 基盤準備（1 週間）

**目標**: 新しいコンポーネントシステムの基盤を構築

**タスク**:

1. ✅ ユーティリティ関数作成（`cn()`, `debounce()`など）
2. ✅ 型定義ファイル作成
3. ✅ デフォルト値設定ファイル作成
4. ✅ Primitive Components ディレクトリ作成

**実装例**:

```bash
# ディレクトリ作成
mkdir -p src/app/lib
mkdir -p src/app/types
mkdir -p src/app/components/ui/primitives
mkdir -p src/app/components/ui/composite

# ファイル作成
touch src/app/lib/utils.ts
touch src/app/types/components.ts
touch src/app/config/component-defaults.ts
```

#### フェーズ 2: Primitive Components 実装（1 週間）

**目標**: 基本コンポーネントを実装

**優先順位**:

1. Button（最も使用頻度が高い）
2. Text
3. Input
4. Badge
5. Icon

**実装スケジュール**:

| 曜日 | コンポーネント | タスク                |
| ---- | -------------- | --------------------- |
| 月   | Button         | 実装 + Storybook      |
| 火   | Button         | テスト + ドキュメント |
| 水   | Text           | 実装 + Storybook      |
| 木   | Input, Badge   | 実装                  |
| 金   | Icon           | 実装 + 全体レビュー   |

#### フェーズ 3: Composite Components 実装（2 週間）

**目標**: 複合コンポーネントを実装

**優先順位**:

1. Card（多くの場所で使用）
2. Section
3. Modal/Dialog
4. Accordion

**並行作業**:

- 既存コンポーネントの段階的移行開始
- 新規機能は新しいシステムで実装

#### フェーズ 4: 既存コンポーネント移行（3 週間）

**目標**: 既存コンポーネントを新システムに移行

**移行順序**:

1. **Week 1: UI コンポーネント**

   - ServiceCard → 新 Card ベース Component
   - ContentCard → 新 Card ベース Component
   - QuoteBox → 新 Quote コンポーネント

2. **Week 2: Section コンポーネント**

   - ProblemSection → 新 Section ベース
   - VALUESection → 新 Section ベース
   - ServicesSection → 新 Section ベース

3. **Week 3: Layout コンポーネント + 最終調整**
   - Header → 新システム適用
   - Footer → 新システム適用
   - 全体テスト + バグ修正

**移行チェックリスト**:

```markdown
## コンポーネント移行チェックリスト

### 移行前

- [ ] 既存コンポーネントの使用箇所を特定
- [ ] 現在の Props インターフェースを文書化
- [ ] 既存の動作を記録（スクリーンショット）
- [ ] テストケースを作成

### 移行中

- [ ] 新コンポーネントを別ファイルで実装
- [ ] Storybook で視覚的に確認
- [ ] ユニットテスト作成
- [ ] アクセシビリティチェック

### 移行後

- [ ] 1 箇所で新コンポーネントを試験導入
- [ ] 動作確認
- [ ] 段階的に他の使用箇所も移行
- [ ] 旧コンポーネントファイルを削除
- [ ] ドキュメント更新
```

#### フェーズ 5: 最適化 & テスト（1 週間）

**目標**: パフォーマンス最適化とテスト強化

**タスク**:

1. パフォーマンス監視
2. バンドルサイズ最適化
3. E2E テスト追加
4. アクセシビリティ監査
5. ドキュメント完成

---

### 共存戦略（移行期間中）

**新旧コンポーネントの共存**:

```tsx
// 移行期間中の page.tsx
import { OldServiceCard } from "./components/ui/ServiceCard"; // 旧
import { ServiceCard as NewServiceCard } from "./components/ui/composite/ServiceCard"; // 新

export default function ServicesSection() {
  return (
    <>
      {/* 旧コンポーネント（既存の動作を保持）*/}
      <div className="mb-xl">
        <h3>既存実装</h3>
        {SERVICES.slice(0, 3).map((service) => (
          <OldServiceCard key={service.title} {...service} />
        ))}
      </div>

      {/* 新コンポーネント（段階的に移行）*/}
      <div>
        <h3>新実装</h3>
        {SERVICES.slice(3).map((service) => (
          <NewServiceCard key={service.title} {...service} />
        ))}
      </div>
    </>
  );
}
```

**エイリアス管理**:

```tsx
// src/app/components/ui/index.ts
// 段階的に export を切り替える

// 旧（まだ移行していない）
export { ServiceCard } from "./ServiceCard";

// 新（移行済み）
export { ServiceCard } from "./composite/ServiceCard/ServiceCard";

// または並行利用
export { ServiceCard as OldServiceCard } from "./ServiceCard";
export { ServiceCard as NewServiceCard } from "./composite/ServiceCard/ServiceCard";
export { ServiceCard } from "./composite/ServiceCard/ServiceCard"; // デフォルトは新
```

---

### ロールバック計画

**問題発生時の対応**:

```bash
# Git タグで安全なポイントをマーク
git tag -a v1.0-before-migration -m "Migration開始前の安定版"

# フィーチャーブランチで作業
git checkout -b feature/component-migration

# 問題が発生した場合、即座にロールバック可能
git checkout main
git revert <commit-hash>

# または安全なタグに戻る
git checkout v1.0-before-migration
```

**段階的デプロイ**:

```tsx
// Feature Flagを使用した段階的な展開
import { useFeatureFlag } from "@/app/hooks/useFeatureFlag";

export function ServiceCard(props: ServiceCardProps) {
  const useNewComponent = useFeatureFlag("new-service-card");

  if (useNewComponent) {
    return <NewServiceCard {...props} />;
  }

  return <OldServiceCard {...props} />;
}
```

---

## まとめ

このガイドに従うことで、以下を実現できます:

1. **型安全性**: TypeScript + CVA による完全な型推論
2. **保守性**: Compound Component パターンによる明確な構造
3. **拡張性**: バリアントシステムによる柔軟な拡張
4. **アクセシビリティ**: 標準準拠のセマンティック HTML
5. **テスタビリティ**: ロジックと UI の分離によるテストの容易性
6. **パフォーマンス**: 最適化されたレンダリングとバンドル

**次のステップ**:

1. フェーズ 1 の基盤整備から開始
2. 小さなコンポーネント（Button）で練習
3. 段階的に複雑なコンポーネントに展開
4. 常にテストとドキュメントを並行して作成

---

**作成日**: 2025 年 1 月
**対象プロジェクト**: Youth Now Landing Page
**バージョン**: 1.0.0
