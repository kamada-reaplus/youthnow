import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        full: "max-w-full",
      },
      padding: {
        none: "px-0",
        sm: "px-4 sm:px-6",
        md: "px-6 lg:px-8",
        lg: "px-8 lg:px-12",
      },
      center: {
        true: "flex flex-col items-center",
        false: "",
      },
    },
    defaultVariants: {
      size: "5xl",
      padding: "md",
      center: false,
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: "div" | "section" | "article" | "main";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, center, as, ...props }, ref) => {
    const Component = as || "div";
    return (
      <Component
        className={cn(containerVariants({ size, padding, center, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };
