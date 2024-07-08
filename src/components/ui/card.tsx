import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("rounded-lg border shadow-sm", {
    variants: {
        variant: {
            default: "bg-white text-zinc-950 border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
            elevated: "bg-white text-zinc-950 border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ variant, className, ...props }, ref) => <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />);
Card.displayName = "Card";

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
    variants: {
        variant: {
            default: "p-6",
            bordered: "p-4 border-b border-zinc-200 dark:border-zinc-800",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardHeaderVariants> {}
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ variant, className, ...props }, ref) => <div ref={ref} className={cn(cardHeaderVariants({ variant }), className)} {...props} />);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />);
CardDescription.displayName = "CardDescription";

const CardContentVariants = cva("", {
    variants: {
        variant: {
            default: "p-6 pt-0",
            bordered: "p-4",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof CardContentVariants> {}
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ variant, className, ...props }, ref) => <div ref={ref} className={cn(CardContentVariants({ variant }), className)} {...props} />);
CardContent.displayName = "CardContent";

const CardFooterVariants = cva("", {
    variants: {
        variant: {
            default: "flex items-center p-6 pt-0",
            bordered: "px-4 py-2 text-xs border-t border-zinc-200 dark:border-zinc-800",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof CardFooterVariants> {}
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ variant, className, ...props }, ref) => <div ref={ref} className={cn(CardFooterVariants({ variant }), className)} {...props} />);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
