import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg ring-1 ring-inset",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-600 ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20",
        ghost: "bg-transparent text-zinc-600 ring-zinc-500/10 dark:text-zinc-400 dark:ring-zinc-400/20",
        success: "bg-green-100 text-green-700 ring-green-500/10 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-400/20",
        warning: "bg-yellow-100 text-yellow-700 ring-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-400/20",
        destructive: "bg-red-100 text-red-700 ring-red-500/10 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20",
      },
      size: {
        default: "py-3 px-4 text-sm",
        md: "py-4 px-5 text-base",
        lg: "py-5 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
