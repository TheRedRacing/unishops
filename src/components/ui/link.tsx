import Link from "next/link";
import clsx from "clsx";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { type UrlObject } from "url";
import { type AnchorHTMLAttributes } from "react";

const variantStyles = {
    primary: "text-sm font-medium text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500 font-medium transition-colors duration-150 ease-in-out underline underline-offset-2 decoration-transparent hover:decoration-emerald-800",
    primaryxs: "text-xs text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500 font-medium text-sm transition-colors duration-150 ease-in-out underline underline-offset-2 decoration-transparent hover:decoration-emerald-800",
};

type CustomLinkProps = {
    variant?: keyof typeof variantStyles;
    arrow?: "left" | "right";
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
        href: string | UrlObject;
    };

export function CustomLink({ variant = "primary", arrow, className, ...props }: CustomLinkProps) {
    className = clsx("inline-flex gap-1.5 justify-center items-center overflow-hidden", variantStyles[variant], className);

    const arrowIcon = <ArrowLeftIcon className={clsx("inline-block h-4 w-4", arrow === "left" ? "" : "-rotate-180 transform")} />;

    return (
        <Link {...props} className={className}>
            {arrow === "left" && arrowIcon}
            {props.children}
            {arrow === "right" && arrowIcon}
        </Link>
    );
}
