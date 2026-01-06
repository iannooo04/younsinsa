"use client";

import * as React from "react";
// standard button implementation

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    // Mock cva-like behavior
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-gray-950 focus-visible:ring-gray-300";
    
    let variantStyles = "";
    switch (variant) {
      case "destructive":
        variantStyles = "bg-red-500 text-gray-50 hover:bg-red-500/90";
        break;
      case "outline":
        variantStyles = "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900";
        break;
      case "secondary":
        variantStyles = "bg-gray-100 text-gray-900 hover:bg-gray-100/80";
        break;
      case "ghost":
        variantStyles = "hover:bg-gray-100 hover:text-gray-900";
        break;
      case "link":
        variantStyles = "text-gray-900 underline-offset-4 hover:underline";
        break;
      default: // default
        variantStyles = "bg-gray-900 text-gray-50 hover:bg-gray-900/90";
        break;
    }

    let sizeStyles = "";
    switch (size) {
      case "sm":
        sizeStyles = "h-9 rounded-md px-3";
        break;
      case "lg":
        sizeStyles = "h-11 rounded-md px-8";
        break;
      case "icon":
        sizeStyles = "h-10 w-10";
        break;
      default:
        sizeStyles = "h-10 px-4 py-2";
        break;
    }

    const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`;

    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
