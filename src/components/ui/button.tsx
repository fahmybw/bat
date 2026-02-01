import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" &&
            "bg-primary text-primary-foreground hover:bg-primary/90",
          variant === "secondary" &&
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant === "ghost" && "hover:bg-muted/60",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 px-3",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
