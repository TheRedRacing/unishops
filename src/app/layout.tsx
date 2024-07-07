import "@/styles/globals.css";
import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "UniShops - Waitlist",
    description: "UniShops is a one page shop for all your needs.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    authors: [
        {
            name: "Maxime Sickenberg",
            url: "https://www.alpina-agency.ch/fr",
        },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={cn(roboto.className)} suppressHydrationWarning>
            <body className="bg-white text-black dark:bg-zinc-950 dark:text-white min-h-screen flex flex-col relative isolate overflow-hidden">
                <TRPCReactProvider>
                    <ThemeProvider attribute="class">
                        {children}
                    </ThemeProvider>
                </TRPCReactProvider>
                <Toaster />
            </body>
        </html>
    );
}
