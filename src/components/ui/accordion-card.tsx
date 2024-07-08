"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const AccordionCard = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>>(({ className, ...props }, ref) => <AccordionPrimitive.Root ref={ref} className={cn("rounded-lg border bg-zinc-100 dark:bg-zinc-900 shadow-sm border-zinc-300 dark:border-zinc-700 divide-y dark:divide-zinc-700", className)} {...props} />);
AccordionCard.displayName = "Accordion";

const AccordionCardItem = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn("px-4", className)} {...props} />);
AccordionCardItem.displayName = "AccordionItem";

const AccordionCardTriggerVariants = cva("h-6 w-6 rounded-full ring-1 ring-inset", {
  variants: {
    status: {
      default: "bg-zinc-200 ring-zinc-400 dark:bg-zinc-900 dark:ring-zinc-700",
      destructive: "bg-red-200 ring-red-400 dark:bg-red-900 dark:ring-red-700",
      warning: "bg-yellow-200 ring-yellow-400 dark:bg-yellow-900 dark:ring-yellow-700",
      success: "bg-green-200 ring-green-400 dark:bg-green-900 dark:ring-green-700",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

const AccordionCardTrigger = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & VariantProps<typeof AccordionCardTriggerVariants>>(({ className, status, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger ref={ref} className={cn("flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180", className)} {...props}>
      <div className="flex flex-1 items-center gap-2">
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        {children}
      </div>
      <div className={cn(AccordionCardTriggerVariants({ status }), className)} />
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
