import { Sheet, SheetContent, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { BugAntIcon } from "@heroicons/react/24/solid";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { ScrollArea } from "../ui/scroll-area";
import Stripe from "stripe";
import { getUniShops } from "@/lib/apiCall";

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


    const debugUniShops = async () => {
        const shop = await getUniShops();
        if (shop) {
            const stripe = new Stripe(shop.stripeSecret);
            const orders = await stripe.balanceTransactions.list();
            const balance = await stripe.balance.retrieve();
            return (
                <>
                    <div className="flex flex-col">
                        <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold">Stripe</div>
                        <pre className="whitespace-pre-wrap break-all rounded-b-lg bg-zinc-900/20 px-4 py-6">{JSON.stringify(orders, null, 2)}</pre>
                    </div>
                    <div className="flex flex-col">
                        <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold">UniShops</div>
                        <pre className="whitespace-pre-wrap break-all rounded-b-lg bg-zinc-900/20 px-4 py-6">{JSON.stringify(shop, null, 2)}</pre>
                    </div>
                </>
            )
        } else {
            return (
                <div className="flex flex-col">
                    <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold">debugUniShops() not found</div>                    
                </div>
            );
        }        
        
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"} asChild>
                    <Link href="#">
                        <BugAntIcon className="h-5 w-5" />
                    </Link>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[600px] max-h-screen overflow-y-scroll">
                <SheetDescription className="space-y-4">
                    {debugUniShops()}                    
                    <div className="flex flex-col">
                        <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold">Current Session</div>
                        <pre className="whitespace-pre-wrap break-all rounded-b-lg bg-zinc-900/20 px-4 py-6">{JSON.stringify(user, null, 2)}</pre>
                    </div>
                </SheetDescription>
            </SheetContent>
        </Sheet >
    );
}
