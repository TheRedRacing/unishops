"use client";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/link";
import Link from "next/link";

export default function notFound() {
    return (
        <main className="patern grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-9xl font-semibold text-zinc-800 dark:text-zinc-200">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200 sm:text-5xl">Page not found!</h1>
                <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-300">The page you are looking for no longer exists or has been moved.</p>
                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">You can return to the home page by clicking on the button below.</p>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <Button size="lg" asChild>
                        <Link href="/">Return to Home Page</Link>
                    </Button>
                </div>
                <hr className="mb-4 mt-6 border-zinc-300 dark:border-zinc-700" />
                <p className="text-sm text-zinc-600 dark:text-zinc-300">If you think this is a mistake,</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">please contact us at the following address</p>
                <CustomLink href="mailto:info@unishops.ch">
                    info@unishops.ch
                </CustomLink>
            </div>
        </main>
    );
}
