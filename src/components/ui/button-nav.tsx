import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonNavProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    active?: boolean;
}

const ButtonNav = React.forwardRef<HTMLButtonElement, ButtonNavProps>(({ className, active, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isActive = active ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900" : "dark:text-zinc-500 dark:hover:text-zinc-100";
    return <Comp className={cn(isActive, className, "ring-offset-none inline-flex items-center justify-center whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-medium leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300")} ref={ref} {...props} />;
});
ButtonNav.displayName = "ButtonNav";

export { ButtonNav };
