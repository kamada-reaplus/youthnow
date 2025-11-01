import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const cardVariants = cva(
  "rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-neutral-white border border-neutral-black/10",
        filled: "bg-neutral-white shadow-md",
        glass: "bg-neutral-white/80 backdrop-blur-sm border border-neutral-white/20",
        gradient: "bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20",
        outline: "bg-transparent border-2 border-brand-primary",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      hover: {
        none: "",
        lift: "hover:shadow-lg hover:-translate-y-1",
        glow: "hover:shadow-[0_0_20px_rgba(0,188,212,0.3)]",
        scale: "hover:scale-[1.02]",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hover: "none",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: "div" | "article" | "section";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, interactive, as, children, ...props }, ref) => {
    const Component = as || "div";
    return (
      <Component
        className={cn(cardVariants({ variant, padding, hover, interactive, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

// サブコンポーネント
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-h4 font-bold", className)} {...props}>
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-body-sm text-neutral-black/60", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
