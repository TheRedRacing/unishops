import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Auth from "@/components/auth";
import { ButtonNav } from "@/components/ui/button-nav";
import ThemeToogle from "@/components/header/themeToogle";

export default function Header() {
    const showBanner = false;
    return (
        <>
            {showBanner && (
                <div className="bg-zinc-950 dark:bg-zinc-900">
                    <div className="container mx-auto flex items-center justify-between py-2 sm:px-6 lg:h-10 lg:px-8">
                        <div className="flex-1 text-center text-sm font-medium text-white">
                            <span>
                                <span className="hidden sm:inline">Get started with UniShops</span>
                                <span className="sm:hidden">Get started</span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
            <header className="sticky top-0 z-40 border-b border-transparent transition duration-200 ease-in-out">
                <nav className="mx-auto w-full max-w-5xl px-6 md:max-w-7xl">
                    {/* Mobile nav */}
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
                                    <Link href="/about">About</Link>
                                    <Link href="/themes">Themes</Link>
                                    <Link href="/docs">Documentations</Link>
                                    <Link href="/pricing">Pricing</Link>
                                    <Link href="/exemples">Exemples</Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop nav */}
                    <div className="mx-auto hidden h-[58px] w-full items-center transition duration-500 ease-in-out md:flex">
                        <div className="flex-1">
                            <Logo />
                        </div>

                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <ButtonNav asChild>
                                        <Link href="/about">About</Link>
                                    </ButtonNav>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <ButtonNav asChild>
                                        <Link href="/docs">Documentations</Link>
                                    </ButtonNav>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <ButtonNav asChild>
                                        <Link href="/themes">Themes</Link>
                                    </ButtonNav>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <ButtonNav asChild>
                                        <Link href="/pricing">Pricing</Link>
                                    </ButtonNav>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <ButtonNav asChild>
                                        <Link href="/exemples">Exemples</Link>
                                    </ButtonNav>
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
        <header className="fixed inset-x-0 top-0 z-50 transition duration-200 ease-in-out backdrop-blur-md">
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
