import React from "react";
import { cn } from "@/lib/utils";

type SelectProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
};

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
};

type SelectTriggerProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

const SelectTrigger = React.forwardRef<HTMLSelectElement, SelectTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          className
        )}
        {...props}
      />
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <option value="">{placeholder}</option>;
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SelectItem({ value, children }: SelectItemProps) {
  return <option value={value}>{children}</option>;
}

export function Select({ value, defaultValue, onValueChange, children }: SelectProps) {
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SelectTrigger
  ) as React.ReactElement<SelectTriggerProps> | undefined;

  const items: React.ReactElement<SelectItemProps>[] = [];
  let placeholder: string | undefined;

  const collectItems = (node: React.ReactNode) => {
    React.Children.forEach(node, (child) => {
      if (!React.isValidElement(child)) return;
      if (child.type === SelectItem) {
        items.push(child as React.ReactElement<SelectItemProps>);
      } else if (child.type === SelectValue) {
        placeholder = (child.props as { placeholder?: string }).placeholder;
      } else if (child.props?.children) {
        collectItems(child.props.children);
      }
    });
  };

  collectItems(children);

  return (
    <SelectTrigger
      {...trigger?.props}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onValueChange?.(event.target.value)}
    >
      {placeholder ? <SelectValue placeholder={placeholder} /> : null}
      {items.map((item) => (
        <SelectItem key={item.props.value} {...item.props} />
      ))}
    </SelectTrigger>
  );
}

export { SelectContent, SelectItem, SelectTrigger, SelectValue };
