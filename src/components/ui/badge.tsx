import React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        variant === "default" && "bg-primary text-primary-foreground border-transparent",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    />
  );
}
