import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-neutral-white hover:bg-brand-primary-dark",
        secondary: "bg-brand-secondary text-neutral-black hover:bg-brand-secondary-dark",
        ghost: "bg-transparent hover:bg-neutral-white/10",
        outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-neutral-white",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-lg",
        md: "h-11 px-6 text-base rounded-xl",
        lg: "h-14 px-8 text-lg rounded-2xl",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
