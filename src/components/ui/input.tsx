import * as React from "react";

// Assuming cn is a utility function for classNames
import { cn } from "@/lib/utils";

// Create the Input component with a forwarded ref
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type = "text", ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-700",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

// Set the display name for the Input component
Input.displayName = "Input";

// Export the Input component
export { Input };
