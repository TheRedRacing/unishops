import { type Metadata } from "next";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownTablesMenu } from "@/components/dropdown/tables";
import NewShops from "@/components/forms/newForm";
import { PageLayout } from "@/components/layout/page";
import { EmptyCard } from "@/components/ui/card";

import { Shopsstatus } from "@/lib/statusBadge";
import { getShops } from "@/lib/apiCall";
import { CustomLink } from "@/components/ui/link";
import TimeTable from "@/components/timeTable";

export const metadata: Metadata = {
    title: "Shops",
};

// server side
export default async function Shops() {   
    const shops = await getShops();

    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Shop</h1>
                {shops.length > 0 && <NewShops />}
            </div>
            <div>
                {shops.length === 0 ? (
                    <EmptyCard>
                        <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                            <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">You don&apos;t have any shop yet</h2>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Create a shop to start selling your products and services online.</span>
                        </div>
                        <NewShops />
                    </EmptyCard>
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
                                                <CustomLink href={`/shops/${shop.id}`}>{shop.name}</CustomLink>
                                            </TableCell>
                                            <TableCell>{Shopsstatus(shop.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <TimeTable time={shop.createdAt} />
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
        </PageLayout>
    );
}
