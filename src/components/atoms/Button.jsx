import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-primary/50",
    secondary: "bg-gradient-to-r from-secondary to-blue-400 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-secondary/50",
    accent: "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-accent/50",
    outline: "border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-blue-700 hover:text-white hover:scale-105 focus:ring-primary/50",
    ghost: "text-gray-600 hover:text-primary hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 focus:ring-primary/50"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;