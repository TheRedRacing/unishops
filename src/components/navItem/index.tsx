"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <Link href={href} className="h-8 rounded-md">
            <span className={cn(pathname === href ? "bg-zinc-500/10 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-600 hover:bg-zinc-500/15 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100", "group flex h-8 items-center gap-2 rounded-md px-2 text-sm font-medium transition-colors duration-75 ease-in-out")}>{children}</span>
        </Link>
    );
}
