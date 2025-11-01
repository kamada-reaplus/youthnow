# LP コンポーネント設計 ベストプラクティス

## 📋 目次

1. [現状分析](#現状分析)
2. [設計原則](#設計原則)
3. [コンポーネントアーキテクチャ](#コンポーネントアーキテクチャ)
4. [具体的な改善提案](#具体的な改善提案)
5. [実装ガイドライン](#実装ガイドライン)
6. [パフォーマンス最適化](#パフォーマンス最適化)
7. [アクセシビリティ](#アクセシビリティ)
8. [テスト戦略](#テスト戦略)

---

## 現状分析

### ✅ 良い点

1. **明確なコンポーネント階層**

   - Layout（Header, Footer, FloatingCTAButton）
   - Sections（Hero, Problem, VALUE など）
   - UI（再利用可能な小コンポーネント）

2. **確立されたデザインシステム**

   - カラーパレット（brand-primary, brand-secondary）
   - タイポグラフィ（text-h1〜h6, text-body）
   - スペーシング（8px ベース）

3. **データと UI の分離**

   - `content/` でデータ管理
   - `config/` で設定管理
   - TypeScript 型定義

4. **パフォーマンス最適化**
   - 動的インポート（below-the-fold）
   - 画像遅延読み込み

### ⚠️ 改善の余地

1. **コンポーネント設計の一貫性**

   - Props の命名規則にばらつき
   - デフォルト値の管理が分散
   - Variants パターンの活用不足

2. **Composition Pattern**

   - コンポーネント合成の機会を逃している
   - Compound Component パターンの未活用

3. **アクセシビリティ**

   - ARIA 属性の不足
   - キーボード操作対応の不足
   - スクリーンリーダー対応が不十分

4. **エラーハンドリング**

   - Error Boundary の欠如
   - フォールバック UI の未実装

5. **テスト容易性**
   - テストファイルが存在しない
   - テスタブルな設計が不十分

---

## 設計原則

### 1. Single Responsibility Principle（単一責任の原則）

各コンポーネントは 1 つの明確な責任を持つ。

```tsx
// ❌ 悪い例: 複数の責任を持つ
function ProblemSection() {
  // データ取得、レイアウト、スタイリング、ビジネスロジックが混在
}

// ✅ 良い例: 責任を分離
function ProblemSection() {
  return (
    <SectionShell>
      <SectionHeaderBlock {...headerProps} />
      <Container>
        <ProblemList problems={PROBLEMS} />
      </Container>
    </SectionShell>
  );
}
```

### 2. Composition over Configuration（合成優先）

設定よりも合成を優先する。

```tsx
// ❌ 設定ベース
<Card
  showImage={true}
  imagePosition="left"
  showBadge={true}
  badgeText="人気"
/>

// ✅ 合成ベース
<Card>
  <Card.Image position="left" />
  <Card.Badge>人気</Card.Badge>
  <Card.Content />
</Card>
```

### 3. Progressive Enhancement（段階的な機能向上）

基本機能から段階的に拡張する。

```tsx
// 基本: 静的コンテンツ
<ServiceCard {...service} />

// 拡張: アニメーション
<ServiceCard {...service} animate />

// 拡張: インタラクション
<ServiceCard {...service} animate interactive />
```

### 4. Accessibility First（アクセシビリティ優先）

最初からアクセシビリティを考慮する。

```tsx
// ✅ セマンティックHTML + ARIA
<section aria-labelledby="problem-heading">
  <h2 id="problem-heading">課題セクション</h2>
  <div role="list" aria-label="課題一覧">
    {problems.map((problem, index) => (
      <article key={index} role="listitem">
        {/* ... */}
      </article>
    ))}
  </div>
</section>
```

---

## コンポーネントアーキテクチャ

### レイヤー構造

```
┌─────────────────────────────────────────┐
│  Page Layer (page.tsx)                  │
│  - ページ構成                            │
│  - SEO設定                               │
│  - データフェッチング                    │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Template Layer (未実装)                 │
│  - ページテンプレート                    │
│  - 共通レイアウトパターン                │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Section Layer (sections/)              │
│  - セクション単位の構成                  │
│  - ビジネスロジック                      │
│  - データ統合                            │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Composite Layer (未実装)                │
│  - 複合コンポーネント                    │
│  - コンテキスト提供                      │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  UI Layer (ui/)                         │
│  - 再利用可能コンポーネント              │
│  - プレゼンテーション専用                │
│  - ステートレス                          │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Primitive Layer (未実装)                │
│  - 基本要素（Button, Input, Text）      │
│  - デザイントークン適用                  │
└─────────────────────────────────────────┘
```

### コンポーネント分類

#### 1. Layout Components（レイアウトコンポーネント）

**目的**: ページ構造と配置を管理

**現在の実装**:

- `Header` - ナビゲーション
- `Footer` - フッター
- `FloatingCTAButton` - フローティング CTA
- `Container` - 最大幅制約
- `SectionShell` - セクションラッパー

**推奨改善**:

```tsx
// Grid System の追加
export function Grid({
  columns = { sm: 1, md: 2, lg: 3 },
  gap = "lg",
  children,
}: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        `gap-${gap}`,
        `grid-cols-${columns.sm}`,
        `md:grid-cols-${columns.md}`,
        `lg:grid-cols-${columns.lg}`
      )}
    >
      {children}
    </div>
  );
}

// Stack Component の追加
export function Stack({
  direction = "vertical",
  gap = "md",
  align = "start",
  children,
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        `gap-${gap}`,
        `items-${align}`
      )}
    >
      {children}
    </div>
  );
}
```

#### 2. Section Components（セクションコンポーネント）

**目的**: ページセクション単位の機能実装

**現在の実装**:

- `Hero`, `ProblemSection`, `VALUESection` など

**推奨パターン**:

```tsx
// セクションコンポーネントの標準構造
export function ProblemSection() {
  // 1. データ取得（将来的にはhooksに分離）
  const problems = PROBLEMS;

  // 2. ロジック（カスタムhooksに分離可能）
  const [activeIndex, setActiveIndex] = useState(0);

  // 3. レンダリング（Presentational Componentに分離可能）
  return (
    <SectionShell
      id="problem"
      bgColor="bg-neutral-light-cyan"
      diagonalBgColor="bg-brand-primary"
    >
      <SectionHeaderBlock
        sectionTitle="PROBLEM"
        title="若年層マーケティングで<br />こんな課題を感じていませんか?"
      />
      <Container>
        <ProblemList
          problems={problems}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
        />
      </Container>
    </SectionShell>
  );
}

// Presentational Component（推奨追加）
function ProblemList({ problems, activeIndex, onActiveChange }: Props) {
  return (
    <div className="space-y-xl">
      {problems.map((problem, index) => (
        <ContentCard
          key={`problem-${index}`}
          {...problem}
          isActive={index === activeIndex}
          onClick={() => onActiveChange(index)}
        />
      ))}
    </div>
  );
}
```

#### 3. UI Components（UI コンポーネント）

**目的**: 再利用可能なプレゼンテーションコンポーネント

**現在の実装**:

- `QuoteBox`, `ContentCard`, `ServiceCard` など

**推奨改善: Compound Component Pattern**

```tsx
// ❌ 現在: 設定ベース
export function QuoteBox({
  children,
  className,
  padding,
  rounded,
  gradientClass,
}: QuoteBoxProps) {
  return (
    <div className={`${gradientClass} ${rounded} ${padding} ${className}`}>
      {children}
    </div>
  );
}

// ✅ 推奨: Compound Component
export function Quote({ children, className }: QuoteProps) {
  return <div className={cn("relative", className)}>{children}</div>;
}

Quote.Box = function QuoteBox({
  children,
  variant = "primary",
}: QuoteBoxProps) {
  return (
    <div className={cn("rounded-2xl p-lg", variantStyles[variant])}>
      {children}
    </div>
  );
};

Quote.Text = function QuoteText({ children }: QuoteTextProps) {
  return <p className="text-body italic">{children}</p>;
};

Quote.Author = function QuoteAuthor({ children }: QuoteAuthorProps) {
  return <cite className="text-body-sm text-neutral-black/70">{children}</cite>;
};

// 使用例
<Quote>
  <Quote.Box variant="primary">
    <Quote.Text>これは引用文です</Quote.Text>
    <Quote.Author>著者名</Quote.Author>
  </Quote.Box>
</Quote>;
```

#### 4. Primitive Components（プリミティブコンポーネント）【推奨追加】

**目的**: デザインシステムの基本要素

```tsx
// Button Component
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-white hover:bg-brand-primary-dark",
        secondary:
          "bg-brand-secondary text-neutral-black hover:bg-brand-secondary-dark",
        outline:
          "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10",
      },
      size: {
        sm: "px-md py-sm text-body-sm",
        md: "px-xl py-md text-body",
        lg: "px-2xl py-lg text-body-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
}

// Text Component
const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
      body: "text-body",
      "body-lg": "text-body-lg",
      "body-sm": "text-body-sm",
      caption: "text-caption",
    },
    color: {
      primary: "text-brand-primary",
      secondary: "text-brand-secondary",
      black: "text-neutral-black",
      white: "text-neutral-white",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "black",
    align: "left",
  },
});

export function Text({
  variant,
  color,
  align,
  className,
  children,
  ...props
}: TextProps) {
  const Component = getComponent(variant);
  return (
    <Component
      className={cn(textVariants({ variant, color, align, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}
```

---

## 具体的な改善提案

### 1. Props 設計の標準化

#### 現在の問題

```tsx
// QuoteBox
padding?: string;
rounded?: string;
gradientClass?: string;

// Container
padding?: string;
size?: "3xl" | "4xl" | "5xl" | "6xl" | "7xl";

// ServiceCard
className?: string;
```

命名規則と型定義が統一されていない。

#### 推奨パターン

```tsx
// 共通のProps型定義
interface BaseComponentProps {
  className?: string;
  id?: string;
  "aria-label"?: string;
}

interface SpacingProps {
  padding?: SpacingSize;
  margin?: SpacingSize;
}

type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface VariantProps<T extends string> {
  variant?: T;
}

// 使用例
interface CardProps extends BaseComponentProps, SpacingProps {
  variant?: "default" | "elevated" | "outlined";
  interactive?: boolean;
}
```

### 2. デフォルト値の集中管理

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
    variant: "default" as const,
  },
  button: {
    variant: "primary" as const,
    size: "md" as const,
  },
  spacing: {
    section: "section-spacing" as const,
    sectionLg: "section-spacing-lg" as const,
  },
} as const;

// 使用例
export function Container({
  size = COMPONENT_DEFAULTS.container.size,
  padding = COMPONENT_DEFAULTS.container.padding,
  ...props
}: ContainerProps) {
  // ...
}
```

### 3. CVA（Class Variance Authority）の活用

```tsx
// src/app/components/ui/Card.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  // ベースクラス
  "rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-neutral-white border border-neutral-black/10",
        elevated: "bg-neutral-white shadow-lg",
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
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({
  className,
  variant,
  padding,
  interactive,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, interactive, className }))}
      {...props}
    />
  );
}
```

### 4. Composition Pattern の実装

```tsx
// src/app/components/ui/Section.tsx
import { createContext, useContext } from "react";

// Context for Section
const SectionContext = createContext<{ id?: string }>({});

// Root Component
export function Section({
  id,
  bgColor = "bg-white",
  children,
  className,
}: SectionProps) {
  return (
    <SectionContext.Provider value={{ id }}>
      <section id={id} className={cn("relative", bgColor, className)}>
        {children}
      </section>
    </SectionContext.Provider>
  );
}

// Sub Components
Section.Header = function SectionHeader({ children, className }: Props) {
  return <div className={cn("mb-xl", className)}>{children}</div>;
};

Section.Title = function SectionTitle({ children, className }: Props) {
  return <h2 className={cn("text-h2 text-center", className)}>{children}</h2>;
};

Section.Subtitle = function SectionSubtitle({ children, className }: Props) {
  return (
    <p
      className={cn(
        "text-body-lg text-center text-neutral-black/70",
        className
      )}
    >
      {children}
    </p>
  );
};

Section.Content = function SectionContent({ children, className }: Props) {
  return (
    <div className={cn("container mx-auto max-w-5xl px-lg", className)}>
      {children}
    </div>
  );
};

// 使用例
<Section id="problem" bgColor="bg-neutral-light-cyan">
  <Section.Header>
    <Section.Title>課題セクション</Section.Title>
    <Section.Subtitle>こんな悩みはありませんか？</Section.Subtitle>
  </Section.Header>
  <Section.Content>
    <ProblemList />
  </Section.Content>
</Section>;
```

### 5. カスタム Hooks の導入

```tsx
// src/app/hooks/useScrollReveal.ts
export function useScrollReveal(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// 使用例
function ProblemCard({ problem }: Props) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* ... */}
    </div>
  );
}
```

---

## 実装ガイドライン

### ディレクトリ構造（推奨）

```
src/app/
├── components/
│   ├── layout/           # レイアウトコンポーネント
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingCTAButton.tsx
│   ├── sections/         # セクションコンポーネント
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroContent.tsx
│   │   │   └── index.ts
│   │   └── ProblemSection/
│   │       ├── ProblemSection.tsx
│   │       ├── ProblemList.tsx
│   │       ├── ProblemCard.tsx
│   │       └── index.ts
│   ├── ui/               # 再利用可能UIコンポーネント
│   │   ├── primitives/   # 【新規】基本要素
│   │   │   ├── Button.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── composite/    # 【新規】複合コンポーネント
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── CardHeader.tsx
│   │   │   │   ├── CardContent.tsx
│   │   │   │   └── index.ts
│   │   │   └── Section/
│   │   │       ├── Section.tsx
│   │   │       └── index.ts
│   │   └── ...           # 既存のUIコンポーネント
│   └── providers/        # 【新規】Context Providers
│       ├── ThemeProvider.tsx
│       └── ErrorBoundary.tsx
├── hooks/                # 【新規】カスタムHooks
│   ├── useScrollReveal.ts
│   ├── useMediaQuery.ts
│   └── useIntersectionObserver.ts
├── lib/                  # 【新規】ユーティリティ
│   ├── utils.ts          # cn() など
│   └── constants.ts      # 定数
├── config/               # 設定ファイル
│   ├── navigation.ts
│   └── component-defaults.ts  # 【新規】
├── content/              # コンテンツデータ
│   ├── problems.ts
│   ├── services.ts
│   └── ...
└── types/                # 【新規】型定義
    ├── components.ts
    └── content.ts
```

### 命名規則

```tsx
// コンポーネント: PascalCase
export function ServiceCard() {}

// Props型: ComponentNameProps
interface ServiceCardProps {}

// カスタムHook: use + 機能名
export function useScrollReveal() {}

// ユーティリティ関数: camelCase
export function formatDate() {}

// 定数: UPPER_SNAKE_CASE
export const MAX_ITEMS = 10;

// 型: PascalCase
export type NavItem = {};
export interface User {}
```

### ファイル命名規則

```
// コンポーネント
Button.tsx          # シンプルなコンポーネント
ServiceCard.tsx     # 単一ファイル

// 複雑なコンポーネント（ディレクトリ構造）
Card/
  ├── Card.tsx
  ├── CardHeader.tsx
  ├── CardContent.tsx
  ├── Card.test.tsx
  └── index.ts

// Hooks
useScrollReveal.ts
useMediaQuery.ts

// ユーティリティ
utils.ts
constants.ts

// 型定義
types.ts
components.d.ts
```

---

## パフォーマンス最適化

### 1. コード分割と Lazy Loading

```tsx
// page.tsx - 既に実装済み（良い実践）
const VALUESection = dynamic(
  () =>
    import("./components/sections/VALUESection").then((mod) => ({
      default: mod.VALUESection,
    })),
  {
    loading: () => <div className="h-screen" />,
  }
);

// 推奨: より詳細なローディングUI
const VALUESection = dynamic(
  () => import("./components/sections/VALUESection"),
  {
    loading: () => <SectionSkeleton />,
    ssr: true, // SSR有効化
  }
);

// スケルトンコンポーネント
function SectionSkeleton() {
  return (
    <div className="section-spacing px-lg animate-pulse">
      <div className="h-12 bg-neutral-black/10 rounded w-1/2 mx-auto mb-xl" />
      <div className="space-y-md">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-neutral-black/5 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
```

### 2. 画像最適化

```tsx
// 現在
<Image
  src={image}
  alt={imageAlt}
  className="w-full h-full object-contain"
  loading="lazy"
/>

// 推奨: Next.js Image最適化の完全活用
<Image
  src={image}
  alt={imageAlt}
  width={128}
  height={128}
  sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
  className="w-full h-full object-contain"
  loading="lazy"
  placeholder="blur" // blurDataURLが必要
  quality={85}
/>
```

### 3. メモ化戦略

```tsx
// Expensive Componentのメモ化
export const ServiceCard = memo(function ServiceCard({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) {
  return <div className="...">{/* ... */}</div>;
});

// useCallbackでイベントハンドラーをメモ化
function ProblemSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return <ProblemList onCardClick={handleCardClick} />;
}

// useMemoで計算結果をメモ化
function ServicesList({ services }: Props) {
  const filteredServices = useMemo(() => {
    return services.filter((s) => s.badge === "人気");
  }, [services]);

  return (
    <div>
      {filteredServices.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  );
}
```

### 4. Virtual Scrolling（大量アイテム用）

```tsx
// react-virtual を使用
import { useVirtualizer } from "@tanstack/react-virtual";

function LargeList({ items }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <ServiceCard {...items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## アクセシビリティ

### 1. セマンティック HTML

```tsx
// ❌ 悪い例
<div onClick={handleClick}>クリック</div>

// ✅ 良い例
<button onClick={handleClick}>クリック</button>

// ❌ 悪い例
<div className="card">
  <div className="title">タイトル</div>
  <div className="content">コンテンツ</div>
</div>

// ✅ 良い例
<article className="card">
  <h3 className="title">タイトル</h3>
  <p className="content">コンテンツ</p>
</article>
```

### 2. ARIA 属性

```tsx
// Section Component
<section
  id="problem"
  aria-labelledby="problem-heading"
  aria-describedby="problem-description"
>
  <h2 id="problem-heading">課題セクション</h2>
  <p id="problem-description">若年層マーケティングの課題</p>
  {/* ... */}
</section>

// Interactive Card
<button
  className="card"
  aria-label={`${title}の詳細を見る`}
  aria-expanded={isExpanded}
  aria-controls={`card-content-${id}`}
  onClick={handleClick}
>
  <h3>{title}</h3>
</button>

// Navigation
<nav aria-label="メインナビゲーション">
  <ul role="list">
    {navItems.map(item => (
      <li key={item.id}>
        <a
          href={item.href}
          aria-current={isActive ? "page" : undefined}
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

### 3. キーボード操作

```tsx
// Accordion Component
export function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setActiveIndex(activeIndex === index ? null : index);
        break;
      case "ArrowDown":
        e.preventDefault();
        const nextIndex = Math.min(index + 1, items.length - 1);
        document.getElementById(`accordion-trigger-${nextIndex}`)?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex = Math.max(index - 1, 0);
        document.getElementById(`accordion-trigger-${prevIndex}`)?.focus();
        break;
    }
  };

  return (
    <div className="space-y-md">
      {items.map((item, index) => (
        <div key={index}>
          <button
            id={`accordion-trigger-${index}`}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-content-${index}`}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-full text-left"
          >
            {item.title}
          </button>
          <div
            id={`accordion-content-${index}`}
            role="region"
            aria-labelledby={`accordion-trigger-${index}`}
            hidden={activeIndex !== index}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 4. Focus Management

```tsx
// Modal Component
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 開く前のfocus要素を保存
      previousFocusRef.current = document.activeElement as HTMLElement;

      // モーダル内の最初のfocusable要素にfocus
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    } else {
      // 閉じたら元の要素にfocusを戻す
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50"
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

### 5. スクリーンリーダー対応

```tsx
// 視覚的に隠す（スクリーンリーダーには読み上げる）
<span className="sr-only">
  このボタンを押すとお問い合わせフォームが開きます
</span>

// ライブリージョン（動的更新の通知）
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {statusMessage}
</div>

// 読み上げ順序の制御
<div aria-label="サービスカード">
  <h3 id="service-title">アンケート調査</h3>
  <p aria-labelledby="service-title">
    若年層の意思決定パターンを可視化
  </p>
</div>
```

---

## テスト戦略

### 1. コンポーネントテスト（React Testing Library）

```tsx
// ServiceCard.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServiceCard } from "./ServiceCard";
import { BarChart3 } from "lucide-react";

describe("ServiceCard", () => {
  const defaultProps = {
    icon: BarChart3,
    title: "アンケート調査",
    description: "テスト説明文",
  };

  it("タイトルと説明文が表示される", () => {
    render(<ServiceCard {...defaultProps} />);

    expect(screen.getByText("アンケート調査")).toBeInTheDocument();
    expect(screen.getByText("テスト説明文")).toBeInTheDocument();
  });

  it("バッジが表示される", () => {
    render(<ServiceCard {...defaultProps} badge="人気" />);

    expect(screen.getByText("人気")).toBeInTheDocument();
  });

  it("ホバー時にスタイルが変更される", async () => {
    const { container } = render(<ServiceCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;

    await userEvent.hover(card);

    // hover状態のクラスが適用されているか確認
    expect(card).toHaveClass("group");
  });

  it("アクセシビリティ: 適切なセマンティクス", () => {
    render(<ServiceCard {...defaultProps} />);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("アンケート調査");
  });
});
```

### 2. ビジュアルリグレッションテスト（Storybook + Chromatic）

```tsx
// ServiceCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ServiceCard } from "./ServiceCard";
import { BarChart3, Users, MessageCircle } from "lucide-react";

const meta: Meta<typeof ServiceCard> = {
  title: "UI/ServiceCard",
  component: ServiceCard,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  args: {
    icon: BarChart3,
    title: "アンケート調査",
    description: "数で見抜く、購買行動のリアル。",
  },
};

export const WithBadge: Story = {
  args: {
    icon: Users,
    title: "インフルエンサーインタビュー",
    description: "発信者視点から、トレンドの芽を探る。",
    badge: "人気",
  },
};

export const LongContent: Story = {
  args: {
    icon: MessageCircle,
    title: "グループインタビュー【定性調査】",
    description:
      '共感の瞬間を、言葉で捉える。若年層4〜8名による座談会形式で、定量調査では見えない感情のトーンを可視化。会話の中から"本音"や"無意識のニーズ"を抽出します。',
  },
};

// インタラクション状態のストーリー
export const Hovered: Story = {
  args: Default.args,
  parameters: {
    pseudo: { hover: true },
  },
};
```

### 3. E2E テスト（Playwright）

```typescript
// e2e/landing-page.spec.ts
import { test, expect } from "@playwright/test";

test.describe("ランディングページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("全セクションが正しく表示される", async ({ page }) => {
    // Hero Section
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Problem Section
    await expect(page.locator("#problem")).toBeVisible();

    // Services Section
    await expect(page.locator("#services")).toBeVisible();
  });

  test("ナビゲーションが機能する", async ({ page }) => {
    // ナビゲーションリンクをクリック
    await page.getByRole("link", { name: "サービス" }).click();

    // Services Sectionまでスクロールされる
    await expect(page.locator("#services")).toBeInViewport();
  });

  test("CTAボタンが機能する", async ({ page }) => {
    await page.getByRole("button", { name: /お問い合わせ/ }).click();

    // お問い合わせフォームが表示される
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("レスポンシブデザイン: モバイル", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // モバイルメニューボタンが表示される
    await expect(page.getByRole("button", { name: "メニュー" })).toBeVisible();
  });

  test("アクセシビリティ: キーボード操作", async ({ page }) => {
    // Tabキーでナビゲーション
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // フォーカスが適切に移動
    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(["A", "BUTTON"]).toContain(focusedElement);
  });
});
```

### 4. パフォーマンステスト

```typescript
// e2e/performance.spec.ts
import { test, expect } from "@playwright/test";

test.describe("パフォーマンス", () => {
  test("ページロード時間が3秒以内", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000);
  });

  test("First Contentful Paint (FCP) が1.8秒以内", async ({ page }) => {
    await page.goto("/");

    const fcp = await page.evaluate(() => {
      const entries = performance.getEntriesByType("paint");
      const fcpEntry = entries.find((e) => e.name === "first-contentful-paint");
      return fcpEntry?.startTime;
    });

    expect(fcp).toBeLessThan(1800);
  });

  test("Cumulative Layout Shift (CLS) が0.1以下", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });

        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 3000);
      });
    });

    expect(cls).toBeLessThan(0.1);
  });
});
```

---

## まとめ

### 優先順位付き改善ロードマップ

#### フェーズ 1: 基盤整備（1-2 週間）

1. **ユーティリティ・型定義の整備**

   - `lib/utils.ts` に `cn()` 関数追加
   - `types/` ディレクトリ作成
   - `config/component-defaults.ts` 作成

2. **Primitive Components の実装**

   - `Button` コンポーネント（CVA 使用）
   - `Text` コンポーネント
   - `Input` コンポーネント

3. **エラーハンドリング**
   - `ErrorBoundary` コンポーネント
   - フォールバック UI

#### フェーズ 2: コンポーネント改善（2-3 週間）

1. **既存コンポーネントのリファクタリング**

   - CVA の適用
   - Props 標準化
   - Compound Component 化

2. **アクセシビリティ強化**

   - ARIA 属性追加
   - キーボード操作対応
   - フォーカス管理

3. **カスタム Hooks 実装**
   - `useScrollReveal`
   - `useMediaQuery`
   - `useIntersectionObserver`

#### フェーズ 3: 品質向上（2-3 週間）

1. **テスト実装**

   - コンポーネントテスト
   - Storybook 追加
   - E2E テスト基本シナリオ

2. **パフォーマンス最適化**

   - メモ化の適用
   - 画像最適化
   - バンドルサイズ削減

3. **ドキュメント整備**
   - コンポーネントガイド
   - 使用例の追加
   - ベストプラクティス文書

### 成功指標

- **パフォーマンス**: Lighthouse スコア 90+
- **アクセシビリティ**: WCAG 2.1 AA 準拠
- **テストカバレッジ**: 80%以上
- **バンドルサイズ**: First Load JS < 200KB
- **メンテナンス性**: コンポーネント再利用率 70%以上

---

**作成日**: 2025 年 1 月
**対象プロジェクト**: Youth Now Landing Page
**バージョン**: 1.0.0
