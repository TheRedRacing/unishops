import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, ListItem } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

import { Bars3BottomRightIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Github, Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import ThemeToogle from "@/components/header/themeToogle";
import Auth from "@/components/auth";
import Update from "@/components/header/update";

const themes: { title: string; href: string; description: string }[] = [
    {
        title: "Default",
        href: "/docs/theme/default",
        description: "The default theme for UniShops.",
    },
    {
        title: "Dark",
        href: "/docs/theme/dark",
        description: "The dark theme for UniShops.",
    },
    {
        title: "Light",
        href: "/docs/theme/light",
        description: "The light theme for UniShops.",
    },
    {
        title: "Minimal",
        href: "/docs/theme/minimal",
        description: "The minimal theme for UniShops.",
    },
];

export default function Header() {
    return (
        <>
            <div className="bg-zinc-900 dark:bg-zinc-950">
                <div className="container mx-auto flex items-center justify-between py-2 sm:px-6 lg:h-10 lg:px-8">
                    <div className="flex-1 text-center text-sm font-medium text-white">
                        This is a demo site for <span className="font-semibold">UniShops</span>.
                    </div>
                </div>
            </div>
            <header className="border-b bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <nav className="container mx-auto flex items-center justify-between px-6 py-2 lg:px-8" aria-label="Global">
                    <div className="flex lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={"ghost"} size={"icon"}>
                                    <Bars3BottomRightIcon className="h-6 w-6 rotate-180 text-gray-900" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <Logo />
                                </SheetHeader>
                                <div className="mt-4 flex flex-col gap-2.5 font-semibold">
                                    <div className="flex flex-col gap-2.5">
                                        <Link href="/">Getting started</Link>
                                        <Link className="font-medium" href="/">
                                            Introduction
                                        </Link>
                                        <Link className="font-medium" href="/">
                                            Installation
                                        </Link>
                                        <Link className="font-medium" href="/">
                                            Stripe
                                        </Link>
                                        <Link className="font-medium" href="/">
                                            FAQ
                                        </Link>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <Link href="/">Themes</Link>
                                        {themes.map((theme) => (
                                            <Link key={theme.title} className="font-medium" href={theme.href}>
                                                {theme.title}
                                            </Link>
                                        ))}
                                    </div>
                                    <Link href="/docs">Documentation</Link>
                                    <Link href="/pricing">Pricing</Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden items-center gap-4 lg:flex lg:flex-1">
                        <Logo />

                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Button variant={"ghost"} asChild>
                                        <NavigationMenuTrigger className="text-zinc-95 text-sm font-semibold leading-6">Getting started</NavigationMenuTrigger>
                                    </Button>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-4">
                                                <NavigationMenuLink asChild>
                                                    <a className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-blue-500 to-blue-300 p-6 no-underline outline-none focus:shadow-md" href="/">
                                                        <Logo />
                                                        <p className="text-sm leading-tight text-black">Your online store management tool.</p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <ListItem href="/docs" title="Introduction">
                                                Discover UniShops, your online store management tool.
                                            </ListItem>
                                            <ListItem href="/docs/installation" title="Installation">
                                                Learn how to use UniShops and set up your online store.
                                            </ListItem>
                                            <ListItem href="/docs/stripe" title="Stripe">
                                                Learn how to use Stripe to manage your online store.
                                            </ListItem>
                                            <ListItem href="/docs/faq" title="FAQ">
                                                Frequently asked questions about UniShops.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button variant={"ghost"} asChild>
                                        <NavigationMenuTrigger className="text-zinc-95 text-sm font-semibold leading-6">Themes</NavigationMenuTrigger>
                                    </Button>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {themes.map((theme) => (
                                                <ListItem key={theme.title} title={theme.title} href={theme.href}>
                                                    {theme.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button variant={"ghost"} asChild>
                                        <Link href="/docs" className="text-sm font-semibold leading-6 text-zinc-950">
                                            Documentation
                                        </Link>
                                    </Button>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button variant={"ghost"} asChild>
                                        <Link href="/pricing" className="text-sm font-semibold leading-6 text-zinc-950">
                                            Pricing
                                        </Link>
                                    </Button>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex flex-1 justify-end gap-2">
                        <Auth />
                        <Update />
                        <ThemeToogle />
                        <Button variant={"ghost"} size={"icon"} asChild>
                            <Link href="/docs/introduction" className="flex items-center gap-2">
                                <DocumentTextIcon className="h-6 w-6" />
                            </Link>
                        </Button>
                    </div>
                </nav>
            </header>
        </>
    );
}

export function HeaderWaitlist() {
    return (
        <>
            <header className="border-b bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <nav className="container mx-auto flex items-center justify-between px-6 py-2 lg:px-8" aria-label="Global">
                    <div className="flex flex-1 items-center gap-4">
                        <Logo />
                    </div>
                    <div className="flex flex-1 justify-end gap-2">                        
                        <ThemeToogle />
                    </div>
                </nav>
            </header>
        </>
    );
}
