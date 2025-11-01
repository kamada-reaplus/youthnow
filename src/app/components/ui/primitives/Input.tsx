import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const inputVariants = cva(
  "w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-neutral-white border border-neutral-black/20 text-neutral-black",
        filled: "bg-neutral-white/10 border-0 text-neutral-white",
        outline: "bg-transparent border-2 border-brand-primary text-neutral-black",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-lg",
        md: "h-11 px-4 text-base rounded-xl",
        lg: "h-14 px-6 text-lg rounded-2xl",
      },
      error: {
        true: "border-red-500 focus:ring-red-500",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      error: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      error,
      label,
      helperText,
      errorMessage,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = error || !!errorMessage;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-black">
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(inputVariants({ variant, size, error: hasError, className }))}
          ref={ref}
          {...props}
        />
        {(helperText || errorMessage) && (
          <p className={cn("text-sm", errorMessage ? "text-red-500" : "text-neutral-black/60")}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
