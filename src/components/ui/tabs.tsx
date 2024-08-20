"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(({ className, ...props }, ref) => <TabsPrimitive.List ref={ref} className={cn("inline-flex h-10 items-center justify-center gap-2 rounded-md text-zinc-500 dark:text-zinc-400", className)} {...props} />);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "hover:bg-zinc-900/2.5 inline-flex h-8 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium text-zinc-700 ring-1 ring-inset ring-zinc-900/20 transition hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:shadow-sm dark:text-zinc-400 dark:ring-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:data-[state=active]:bg-emerald-400/10 dark:data-[state=active]:text-emerald-400 dark:data-[state=active]:dark:ring-emerald-400/20",
            className,
        )}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn("mt-4 space-y-4 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300", className)} {...props} />);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
