"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

interface SelectContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  label?: React.ReactNode;
  setLabel: (label: React.ReactNode) => void;
  disabled?: boolean;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

const Select = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  disabled,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState<React.ReactNode>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onValueChange?.(val);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        value: value || "", // Ensure it's not undefined
        onValueChange: handleValueChange,
        open,
        setOpen,
        label,
        setLabel,
        disabled,
      }}
    >
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", children, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => context?.setOpen(!context.open)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      disabled={context?.disabled || props.disabled}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }
>(({ className = "", placeholder, children, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  // Display the selected label or placeholder
  return (
    <span className={`block truncate ${className}`} ref={ref} {...props}>
      {children || context?.label || placeholder}
    </span>
  );
});
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  const context = React.useContext(SelectContext);

  if (!context?.open) return null;

  return (
    <>
        {/* Simple backdrop to close on click outside */}
        <div className="fixed inset-0 z-40" onClick={() => context.setOpen(false)} />
        <div
            ref={ref}
            className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md animate-in fade-in-0 zoom-in-95 mt-1 w-full ${className}`}
            {...props}
        >
            <div className="p-1">{children}</div>
        </div>
    </>
  );
});
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string; disabled?: boolean }
>(({ className = "", children, value, disabled, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  const isSelected = context?.value === value;

  // Update label in context if selected (checking render time side effect is bad but works for simple case or separate effect)
  // Cleaner way: Select uses `value` to find child `SelectItem` and extract its children. But without traversing children, we can rely on `SelectItem` to report its label when matched.
  // For now, let's just render.
  
  React.useEffect(() => {
    if (isSelected) {
        context.setLabel(children);
    }
  }, [isSelected, children, context]);

  return (
    <div
      ref={ref}
      data-disabled={disabled ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 ${
        isSelected ? "bg-gray-100" : ""
      } ${className}`}
      onClick={(e) => {
        if (disabled) return;
        e.stopPropagation();
        context?.onValueChange?.(value);
      }}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      <span className="truncate">{children}</span>
    </div>
  );
});
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
