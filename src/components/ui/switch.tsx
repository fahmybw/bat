import React from "react";
import { cn } from "@/lib/utils";

type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

export function Switch({ checked = false, onCheckedChange, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors",
        checked ? "bg-primary" : "bg-muted",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-background shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}
