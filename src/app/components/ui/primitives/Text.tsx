import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
      "body-lg": "text-body-lg",
      body: "text-body",
      "body-sm": "text-body-sm",
      caption: "text-caption",
    },
    color: {
      primary: "text-brand-primary",
      secondary: "text-brand-secondary",
      black: "text-neutral-black",
      white: "text-neutral-white",
      inherit: "text-inherit",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "inherit",
    align: "left",
    weight: "normal",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, color, align, weight, as, ...props }, ref) => {
    const Component = as || "p";
    return (
      <Component
        className={cn(textVariants({ variant, color, align, weight, className }))}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
