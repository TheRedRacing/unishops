import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col overflow-hidden rounded-md ring-1 ring-zinc-900/20 dark:bg-zinc-900 dark:ring-white/20", className)} {...props} />);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("border-b border-zinc-900/20 p-4 dark:border-white/20", className)} {...props} />);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("p-4", className)} {...props} />);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("border-t border-zinc-900/20 p-4 dark:border-white/20", className)} {...props} />);
CardFooter.displayName = "CardFooter";

interface EmptyCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}
const EmptyCard = React.forwardRef<HTMLDivElement, EmptyCardProps>(({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex h-80 flex-col items-center justify-center rounded-lg border border-zinc-900/20 p-6 dark:border-white/20", className)} {...props}>
        {children}
    </div>
));
EmptyCard.displayName = "EmptyCard";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, EmptyCard };
