import { cn } from "@/lib/utils";
import * as React from "react";

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(({ children, className, ...props }, ref) => (
    <section ref={ref} className={cn("mx-auto w-full max-w-2xl py-12 px-6 lg:max-w-5xl", className)} {...props}>
        {children}
    </section>
));
PageLayout.displayName = "PageLayout";

export { PageLayout };
