"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "@heroicons/react/24/solid";

const AccordionCard = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>>(({ className, ...props }, ref) => <AccordionPrimitive.Root ref={ref} className={cn("divide-y rounded-lg border border-zinc-300 bg-zinc-50 shadow-sm dark:divide-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/50", className)} {...props} />);
AccordionCard.displayName = "Accordion";

const AccordionCardItem = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn("px-4", className)} {...props} />);
AccordionCardItem.displayName = "AccordionItem";

const AccordionCardTriggerVariants = cva("h-6 w-6 flex items-center justify-center rounded-md ring-1 ring-inset", {
    variants: {
        status: {
            default: "bg-zinc-100 text-gray-600 ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20",
            destructive: "bg-red-100 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
            warning: "bg-yellow-100 text-yellow-800 ring-yellow-600/10 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
            success: "bg-green-100 text-green-700 ring-green-600/10 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-500/20",
        },
    },
    defaultVariants: {
        status: "default",
    },
});

const getIcon = (status: string | null | undefined) => {
    switch (status) {
        case "default":
            return <span>!</span>;
        case "destructive":
            return <span>!</span>;
        case "warning":
            return <span>!</span>;
        case "success":
            return <CheckIcon className="h-4 w-4" />;
        default:
            return <span>!</span>;
    }
};

const AccordionCardTrigger = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & VariantProps<typeof AccordionCardTriggerVariants>>(({ className, status, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger ref={ref} className={cn("flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180", className)} {...props}>
            <div className="flex flex-1 items-center gap-2">
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                {children}
            </div>
            <div className={cn(AccordionCardTriggerVariants({ status }), className)}>{getIcon(status)}</div>
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionCardTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionCardContent = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Content>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content ref={ref} className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
));

AccordionCardContent.displayName = AccordionPrimitive.Content.displayName;

export { AccordionCard, AccordionCardItem, AccordionCardTrigger, AccordionCardContent };
