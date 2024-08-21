import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

import { Bars3BottomLeftIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Auth from "@/components/auth";
import ThemeToogle from "@/components/header/themeToogle";

export default function Header() {
    const showBanner = true;
    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
                {showBanner && (
                    <div className="bg-zinc-900 dark:bg-zinc-900/60">
                        <div className="container mx-auto flex items-center justify-between py-2 sm:px-6 lg:h-10 lg:px-8">
                            <div className="flex-1 text-center text-sm font-medium text-white">
                                <span>
                                    <span className="hidden sm:inline">
                                        New features are coming soon! 🚀
                                    </span>
                                    <span className="sm:hidden">
                                        New features are coming soon! 🚀
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                <div className="absolute inset-x-0 top-full h-px bg-zinc-900/10 transition dark:bg-white/10" />
                <nav className="mx-auto w-full max-w-5xl px-6 md:max-w-7xl">
                    {/* Mobile nav */}
                     <div className="flex items-center lg:hidden h-10">
                        <div className="flex-1">
                            <Logo />
                        </div>
                        <div className="flex items-center gap-2">
                            <ThemeToogle />
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant={"ghost"} size={"icon"}>
                                        <Bars3BottomLeftIcon className="h-6 w-6 rotate-180 text-black dark:text-white" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side={"right"}>
                                    <SheetHeader>
                                        <Logo />
                                    </SheetHeader>
                                    <div className="my-4 flex flex-col gap-2.5 font-semibold">
                                        <Link href="/login">Get Started</Link>
                                        <Link href="/docs">Documentations</Link>
                                        <Link href="/themes">Themes</Link>
                                        <Link href="/pricing">Pricing</Link>
                                        <Link href="/exemples">Exemples</Link>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <Auth />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    {/* Desktop nav */}
                    <div className="mx-auto hidden h-[58px] w-full items-center transition duration-500 ease-in-out md:flex">
                        <div className="flex-1">
                            <Logo />
                        </div>

                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Button variant={"text"} asChild>
                                        <Link href="/login">Get Started</Link>
                                    </Button>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button variant={"text"} asChild>
                                        <Link href="/docs">Documentations</Link>
                                    </Button>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button variant={"text"} asChild>
                                        <Link href="/themes">Themes</Link>
                                    </Button>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button variant={"text"} asChild>
                                        <Link href="/pricing">Pricing</Link>
                                    </Button>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button variant={"text"} asChild>
                                        <Link href="/exemples">Exemples</Link>
                                    </Button>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <div className="flex flex-1 justify-end gap-4">
                            <Auth />
                            <ThemeToogle />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export function WaitListHeader() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
            <div className="absolute inset-x-0 top-full h-px bg-zinc-900/10 transition dark:bg-white/10" />
            <nav className="mx-auto w-full max-w-5xl px-6 md:max-w-7xl">
                <div className="mx-auto h-[58px] w-full items-center transition duration-500 ease-in-out md:flex">
                    <div className="flex-1">
                        <Logo />
                    </div>

                    <div className="flex flex-1 justify-end gap-4">
                        <ThemeToogle />
                    </div>
                </div>
            </nav>
        </header>
    );
}
