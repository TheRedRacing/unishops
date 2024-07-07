import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

import ThemeToogle from "@/components/header/themeToogle";
import Update from "@/components/header/update";
import { Github, Logo } from "@/components/icons";
import { NavItem } from "@/components/navItem";
import { AuthMenu } from "@/components/auth/authMenu";
import { AdjustmentsHorizontalIcon, ArrowRightIcon, ChartBarIcon, GlobeAltIcon, ListBulletIcon, ShoppingBagIcon, TruckIcon } from "@heroicons/react/24/outline";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerAuthSession();
    if (!session) {
        console.log("You need to be logged in to access this page.");
        redirect("/login");
    }

    const shops = await db.shop.findMany();
    shops.sort((a, b) => Date.parse(b.createdAt.toISOString()) - Date.parse(a.createdAt.toISOString()));

    const nav = [
        {
            title: "Shops",
            href: "/shops",
            icon: ShoppingBagIcon,
            count: shops.length,
        },
        {
            title: "Orders",
            href: "/orders",
            icon: TruckIcon,
        },
        {
            title: "Domains",
            href: "/domains",
            icon: GlobeAltIcon,
        },
        {
            title: "Metrics",
            href: "/metrics",
            icon: ChartBarIcon,
        },
        {
            title: "Logs",
            href: "/logs",
            icon: ListBulletIcon,
        },
        {
            title: "Settings",
            href: "/settings",
            icon: AdjustmentsHorizontalIcon,
        },
    ];

    return (
        <section className="flex h-screen w-full">
            <nav>
                <aside className="hidden h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r border-zinc-200 bg-zinc-50 px-4 pb-6 dark:border-zinc-800 dark:bg-zinc-950 md:flex">
                    <div className="flex h-[60px] items-center px-2">
                        <Logo />
                    </div>
                    <nav className="mt-6 flex-1">
                        <ul className="flex flex-col gap-2">
                            {nav.map((item) => (
                                <li key={item.title}>
                                    <NavItem href={item.href}>
                                        <item.icon className="h-5 w-5" />
                                        {item.title}
                                        {typeof item.count !== "undefined" && item.count !== null && item.count !== 0 && (
                                            <Badge variant={"default"} size={"xs"} className="ml-auto">
                                                {item.count}
                                            </Badge>
                                        )}                                            
                                    </NavItem>
                                </li>
                            ))}
                        </ul>
                        <hr className="my-3 border-zinc-200 dark:border-zinc-800" />
                        <ul className="flex flex-col gap-2">
                            <div className="flex items-center justify-between font-medium">
                                <div className="flex gap-1 text-xs">
                                    Shops
                                    <span className="text-2xs">({shops.length})</span>
                                </div>

                                <Link href={"/shops"} className="text-2xs hover:underline">
                                    See all
                                </Link>
                            </div>
                            {shops.length > 0 && (
                                <>
                                    {shops.slice(0, 5).map((shop, shopIDX) => (
                                        <li key={shopIDX}>
                                            <NavItem href={`/shops/${shop.id}`}>
                                                <div className="flex flex-1 items-center justify-between gap-2">
                                                    {shop.name}
                                                    <div>
                                                        <ArrowRightIcon className="h-3 w-3 opacity-0 transition-opacity duration-75 ease-in-out group-hover:opacity-100" />
                                                    </div>
                                                </div>
                                            </NavItem>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>
                    </nav>
                    <Card variant="elevated">
                        <CardHeader className="p-2 pt-0 md:p-4">
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>Unlock all features and get unlimited access to our platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                            <Button size="sm" className="w-full">
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </nav>
            <div className="w-full">
                <div className="flex h-[60px] items-center justify-end gap-2 border-b border-zinc-200 px-6 dark:border-zinc-800">
                    <AuthMenu />
                    <Update />
                    <Button variant={"ghost"} size={"icon"} asChild>
                        <Link href="#">
                            <Github />
                        </Link>
                    </Button>
                    <ThemeToogle />
                </div>
                <ScrollArea className="h-[calc(100vh-60px)] w-full">{children}</ScrollArea>
            </div>
        </section>
    );
}
