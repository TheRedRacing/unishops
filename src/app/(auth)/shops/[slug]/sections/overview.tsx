import Stripe from "stripe";
import { type Shop } from "@prisma/client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CustomLink } from "@/components/ui/link";
import TimeTable from "@/components/timeTable";

import getDecimals from "@/lib/getDecimals";
import { OrdersStatus } from "@/lib/statusBadge";

// temporary
import { generateFakeOrders } from "@/lib/apiCall";

async function OverviewTabsSection({ shop }: { shop: Shop }) {
    const fakeOrders = await generateFakeOrders();

    const balanceAvailable = fakeOrders.map((order) => order.status === "charge" ? order.price : 0).reduce((a, b) => a + b, 0);
    const balancePending = fakeOrders.map((order) => order.status === "pending" ? order.price : 0).reduce((a, b) => a + b, 0);
    const balanceFailed = fakeOrders.map((order) => order.status === "failed" ? order.price : 0).reduce((a, b) => a + b, 0);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4">
                <Card>
                    <CardContent className="space-y-1">
                        <CardDescription>Orders</CardDescription>
                        <CardTitle>{fakeOrders.length}</CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="space-y-1">
                        <CardDescription>Balance available</CardDescription>
                        <CardTitle>
                            {getDecimals(balanceAvailable)}{" "}
                            <span className="text-sm font-normal tracking-normal uppercase text-zinc-600 dark:text-zinc-400">
                                {shop.currency}
                            </span>
                        </CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="space-y-1">
                        <CardDescription>Balance pending</CardDescription>
                        <CardTitle>
                            {getDecimals(balancePending)}{" "}
                            <span className="text-sm font-normal tracking-normal uppercase text-zinc-600 dark:text-zinc-400">
                                {shop.currency}
                            </span>
                        </CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="space-y-1">
                        <CardDescription>Balance failed</CardDescription>
                        <CardTitle>
                            {getDecimals(balanceFailed)}{" "}
                            <span className="text-sm font-normal tracking-normal uppercase text-zinc-600 dark:text-zinc-400">
                                {shop.currency}
                            </span>
                        </CardTitle>
                    </CardContent>
                </Card>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead> {/* charge, pending, failed */}
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fakeOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-black/1 dark:hover:bg-white/1 text-xs">
                            <TableCell>
                                <CustomLink href={`/orders/${order.id}`}>{order.id}</CustomLink>
                            </TableCell>
                            <TableCell>{order.product.name}</TableCell>
                            <TableCell>{`${getDecimals(order.price)} ${"chf".toUpperCase()}`}</TableCell>
                            <TableCell>{OrdersStatus(order.status)}</TableCell>
                            <TableCell className="text-right">
                                <TimeTable time={order.date} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">Page 1 of 1</div>
        </>
    )
}

export default OverviewTabsSection;