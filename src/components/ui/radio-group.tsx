"use client";

import * as React from "react";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
} | null>(null);

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    value?: string;
    defaultValue?: string; 
    onValueChange?: (value: string) => void 
  }
>(({ className = "", value: controlledValue, defaultValue, onValueChange, children, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const name = React.useId();

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback((newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }, [isControlled, onValueChange]);

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange, name }}>
      <div className={cn("grid gap-2", className)} ref={ref} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className = "", value: itemValue, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const isChecked = context?.value === itemValue;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked}
      data-state={isChecked ? "checked" : "unchecked"}
      value={itemValue}
      className={`aspect-square h-4 w-4 rounded-full border border-gray-900 text-gray-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        isChecked ? "bg-gray-900" : ""
      } ${className}`}
      onClick={() => context?.onValueChange?.(itemValue)}
      ref={ref}
      {...props}
    >
        {isChecked && (
            <span className="flex items-center justify-center">
                <Circle className="h-2.5 w-2.5 fill-white text-white" />
            </span>
        )}
    </button>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
