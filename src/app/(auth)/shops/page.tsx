import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { timeDifference } from "@/lib/timeDifference";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { DropdownTablesMenu } from "@/components/dropdown/tables";
import NewShops from "@/components/forms/newForm";
import { status } from "@/lib/statusBadge";


// server side
export default async function Shops() {
    const session = await getServerAuthSession();
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

        const shops = user.shops;
        shops.sort((a, b) => Date.parse(b.createdAt.toISOString()) - Date.parse(a.createdAt.toISOString()));
        return shops;
    }

    const shops = await getShops();

    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Shop</h1>
                {shops.length > 0 && <NewShops />}
            </div>
            <div className="mx-auto max-w-5xl px-6">
                {shops.length === 0 ? (
                    <div className="flex h-80 flex-col items-center justify-center rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
                        <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                            <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">You don&apos;t have any shop yet</h2>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Create a shop to start selling your products and services online.</span>
                        </div>
                        <NewShops />
                    </div>
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[216px]">Name</TableHead>
                                    <TableHead className="w-[216px]">Status</TableHead>
                                    <TableHead className="w-[103px] text-right">Created</TableHead>
                                    <TableHead className="w-[70px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {shops.map((shop) => (
                                    <>
                                        <TableRow key={shop.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                                            <TableCell className="font-medium">
                                                <Link href={`/shops/${shop.id}`}>{shop.name}</Link>
                                            </TableCell>
                                            <TableCell>{status(shop.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <time dateTime={shop.createdAt.toISOString()}>{timeDifference(Date.now(), Date.parse(shop.createdAt.toISOString()))}</time>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <DropdownTablesMenu shopId={shop.id} shopName={shop.name} />
                                            </TableCell>
                                        </TableRow>                                        
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                )}
            </div>
        </section>
    );
}
