import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserIcon } from "@heroicons/react/20/solid";
import { UserIcon as UserIconOutline } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { SignOutButton } from "./buttons/signOutButton";
import { getServerAuthSession } from "@/server/auth";

export async function AuthMenu() {
    const session = await getServerAuthSession();

    if (session) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 text-zinc-600 hover:bg-zinc-500/15 hover:text-zinc-900">
                        <div className="flex items-center justify-center gap-2">
                            {session.user.image ? (
                                <Image src={session.user.image} alt="avatar" className="h-6 w-6 rounded-full" width={24} height={24} />
                            ) : (
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800">
                                    <UserIcon className="h-4 w-4 rounded-full" />
                                </div>
                            )}
                            <p className="truncate max-w-40">
                                {session.user.name ? session.user.name : session.user.email}
                            </p>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-[200px]">
                    <DropdownMenuItem>
                        <Link href="/onboarding" className="flex items-center gap-2">
                            <HomeIcon className="h-4 w-4" />
                            Onboarding
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/profile" className="flex items-center gap-2">
                            <UserIconOutline className="h-4 w-4" />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <SignOutButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
}
