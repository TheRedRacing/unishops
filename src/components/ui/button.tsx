import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function ArrowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9" />
        </svg>
    );
}

const buttonVariants = cva("inline-flex gap-1.5 justify-center items-center whitespace-nowrap overflow-hidden text-sm font-medium transition", {
    variants: {
        variant: {
            primary: "rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300",
            secondary: "rounded-md bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300",
            filled: "rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400",
            outlined: "rounded-md text-zinc-700 ring-1 ring-inset ring-zinc-900/20 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/20 dark:hover:bg-white/5 dark:hover:text-white",
            text: "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
            ghost: "rounded-md text-zinc-950 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
            destructive: "rounded-md bg-red-900 text-white hover:bg-red-700 dark:bg-red-400/10 dark:text-red-400 dark:ring-1 dark:ring-inset dark:ring-red-400/20 dark:hover:bg-red-400/10 dark:hover:text-red-300 dark:hover:ring-red-300",
        },
        size: {
            default: "px-3 py-1 h-8",
            sm: "px-2 py-1",
            lg: "px-3 py-2",
            xl: "px-4 py-3",
            icon: "w-8 h-8",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, ArrowIcon, buttonVariants };
