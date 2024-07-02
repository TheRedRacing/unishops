import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset", {
    variants: {
        variant: {
            default: "bg-gray-100 text-zinc-600 ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20",
            destructive: "bg-red-100 text-red-700 ring-red-500/10 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20",
            warning: "bg-yellow-100 text-yellow-700 ring-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-400/20",
            success: "bg-green-100 text-green-700 ring-green-500/10 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-400/20",
            ghost: "bg-transparent text-zinc-600 ring-transparent dark:text-zinc-400 dark:ring-transparent",
        },
        size: {
            xs: "text-xs",
            sm: "text-sm",
            md: "text-md",
            lg: "text-lg",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "xs",
    },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
