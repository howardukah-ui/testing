import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          variant === "default" && "bg-primary text-primary-foreground hover:bg-[#ea580c] shadow-soft",
          variant === "outline" && "border border-border bg-white text-foreground hover:bg-[#ffedd5] hover:border-primary/50",
          variant === "ghost" && "bg-transparent text-foreground hover:bg-[#ffedd5]",
          variant === "secondary" && "bg-secondary text-foreground hover:bg-accent",
          size === "default" && "min-h-[44px] px-6 py-2.5 rounded-full text-sm",
          size === "sm" && "min-h-[34px] px-3 py-1.5 rounded-xl text-xs",
          size === "lg" && "min-h-[50px] px-8 py-3 rounded-full text-base",
          size === "icon" && "h-9 w-9 p-0 rounded-full",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
