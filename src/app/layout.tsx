import "@/styles/globals.css";
import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

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
            <body className="relative isolate flex min-h-screen flex-col overflow-hidden bg-white text-black antialiased dark:bg-zinc-900 dark:text-white">
                <TRPCReactProvider>
                    <ThemeProvider attribute="class">{children}</ThemeProvider>
                </TRPCReactProvider>
                <Toaster />
                <Analytics />
            </body>
        </html>
    );
}
