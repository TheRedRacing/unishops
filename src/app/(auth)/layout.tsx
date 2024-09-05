import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

import { Logo } from "@/components/icons";
import { NavItem } from "@/components/navItem";
import { AdjustmentsHorizontalIcon, ArrowRightIcon, ChartBarIcon, GlobeAltIcon, ListBulletIcon, ShoppingBagIcon, TruckIcon } from "@heroicons/react/24/solid";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { LayoutHeader } from "@/components/layout/header";
import { AppFooter } from "@/components/footer/appFooter";
import { HeroPattern } from "@/components/HeroPattern";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerAuthSession();
    if (!session) {
        redirect("/login");
    }

    const getShops = async () => {
        const user = await db.user.findFirst({
            where: {
                email: session?.user.email,
            },
            include: {
                shops: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    };
    const user = await getShops();
    const shops = user.shops;
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

    // v2
    return (
        <section className="flex h-screen w-full">
            {/* Header */}
            <div className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex">
                <div className="contents lg:pointer-events-auto lg:flex lg:w-72 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
                    <div className="hidden lg:flex">
                        <Logo pro={user.proAccount} />
                    </div>
                    <LayoutHeader pro={user.proAccount} />
                    <nav className="hidden justify-between lg:mt-10 lg:flex lg:flex-1 lg:flex-col">
                        <ul className="flex flex-col gap-2">
                            {nav.map((item, itemIDX) => (
                                <li key={item.title}>
                                    <NavItem href={item.href} exact={itemIDX === 0}>
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
                            <hr className="my-3 border-zinc-200 dark:border-white/10" />
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
                                            <NavItem href={`/shops/${shop.slug}`}>
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
                        {!user.proAccount && (
                            <Card>
                                <CardContent>
                                    <CardTitle>Upgrade to Pro</CardTitle>
                                    <CardDescription className="mt-2">Unlock all features and get unlimited access to our platform.</CardDescription>
                                    <Button className="mt-2 w-full">Upgrade</Button>
                                </CardContent>
                            </Card>
                        )}
                    </nav>
                </div>
            </div>
            <div className="relative flex h-full flex-1 flex-col pt-14 lg:ml-72 xl:ml-80">
                <HeroPattern />
                <ScrollArea className="flex-1">
                    <div className="flex-auto">{children}</div>
                </ScrollArea>
                <AppFooter />
            </div>
        </section>
    );
}
