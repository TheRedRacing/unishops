import { Sheet, SheetContent, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { BugAntIcon } from "@heroicons/react/24/solid";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

export default async function Debug() {
    const session = await getServerAuthSession();
    const getUserWithRelations = async () => {
        const user = await db.user.findFirst({
            where: {
                email: session?.user.email,
            },
            include: {
                accounts: true,
                sessions: true,
                shops: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    };

    const user = await getUserWithRelations();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"} asChild>
                    <Link href="#">
                        <BugAntIcon className="h-5 w-5" />
                    </Link>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[600px]">
                <SheetDescription>
                    <div className="flex flex-col">
                        <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold">Current Session</div>
                        <pre className="whitespace-pre-wrap break-all rounded-b-lg bg-zinc-900/20 px-4 py-6">{JSON.stringify(user, null, 2)}</pre>
                    </div>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}
