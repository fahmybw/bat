import React from "react";
import { cn } from "@/lib/utils";

type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
  const context = React.useContext(DropdownContext);
  if (!context) return children;
  const triggerProps = {
    onClick: () => context.setOpen(!context.open),
  };

  if (asChild) {
    return React.cloneElement(children, {
      ...triggerProps,
      ...children.props,
    });
  }

  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DropdownContext);
  if (!context?.open) return null;
  return (
    <div
      className={cn(
        "absolute right-0 mt-2 w-48 rounded-xl border bg-background p-2 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-1 text-xs font-semibold", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-1 h-px bg-border", className)} {...props} />;
}

export function DropdownMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-muted",
        className
      )}
      {...props}
    />
  );
}
