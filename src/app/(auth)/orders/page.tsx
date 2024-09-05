import { type Metadata } from "next";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import NewShops from "@/components/forms/newForm";
import { PageLayout } from "@/components/layout/page";
import { EmptyCard } from "@/components/ui/card";
import { CustomLink } from "@/components/ui/link";
import TimeTable from "@/components/timeTable";


import { generateFakeOrders } from "@/lib/apiCall";
import { OrdersStatus } from "@/lib/statusBadge";
import getDecimals from "@/lib/getDecimals";

export const metadata: Metadata = {
    title: "Orders",
};

// server side
export default async function Orders() {
    const fakeOrders = await generateFakeOrders(1);

    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Orders</h1>
            </div>
            <div>
                {fakeOrders.length === 0 ? (
                    <EmptyCard>
                        <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                            <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">You don&apos;t have any order yet</h2>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Create a shop to start selling your products and services online.</span>
                        </div>
                        <NewShops />
                    </EmptyCard>
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Shops</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fakeOrders.map((order) => (
                                    <>
                                        <TableRow key={order.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
                                            <TableCell className="font-medium">
                                                <CustomLink href={`/orders/${order.id}`}>{order.id}</CustomLink>
                                            </TableCell>
                                            <TableCell>
                                                <CustomLink href={`/shops/unishops`}>UniShops</CustomLink>
                                            </TableCell>
                                            <TableCell>{order.product.name}</TableCell>
                                            <TableCell>{OrdersStatus(order.status)}</TableCell>
                                            <TableCell>{`${getDecimals(order.price)} ${"chf".toUpperCase()}`}</TableCell>
                                            <TableCell className="text-right">
                                                <TimeTable time={order.date} />
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
