import Link from "next/link";
import { Logo } from "@/components/icons";
import { AuthMenu } from "@/components/auth/authMenu";
import ThemeToogle from "@/components/header/themeToogle";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

function TopLevelNavItem({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="inline-flex items-center gap-1.5 h-8 px-2 py-1.5 text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                {children}
            </Link>
        </li>
    );
}

interface layoutHeaderProps {
    pro: boolean;
}

export function LayoutHeader({ pro }: layoutHeaderProps) {
    return (
        <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 backdrop-blur-sm transition dark:backdrop-blur sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80">
            <div className="absolute inset-x-0 top-full h-px bg-zinc-900/10 transition dark:bg-white/10" />

            <div className="flex items-center gap-5 lg:hidden">
                <Logo pro={pro} />
            </div>
            <div className="flex flex-1 items-center justify-end gap-4">
                <nav className="hidden md:block">
                    <ul role="list" className="flex items-center gap-4">
                        <TopLevelNavItem href="#">Feedback</TopLevelNavItem>
                        <TopLevelNavItem href="#">
                            Documentation <ArrowUpRightIcon className="h-4 w-4" />
                        </TopLevelNavItem>
                        <TopLevelNavItem href="#">Support</TopLevelNavItem>
                    </ul>
                </nav>
                <div className="hidden md:block md:h-6 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                <div className="flex gap-4">
                    <AuthMenu />
                    <ThemeToogle />
                </div>
            </div>
        </div>
    );
}
