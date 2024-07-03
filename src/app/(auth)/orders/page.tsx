import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { timeDifference } from "@/lib/timeDifference";

// temp type for shop
type Shop = {
    id: string;
    name: string;
    status: string;
    createdAt: Date;
};

type order = {
    id: string;
    name: string;
    shop: Shop;
    status: string;
    total: number;
    createdAt: Date;
};

const orders: order[] = [];

// server side
export default async function Orders() {
    orders.sort((a, b) => Date.parse(b.createdAt.toISOString()) - Date.parse(a.createdAt.toISOString()));

    const status = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Badge>{status}</Badge>;
            case "SHIPPED":
                return <Badge variant="success">{status}</Badge>;
            case "PROCESSING":
                return <Badge variant="warning">{status}</Badge>;
            case "CANCELLED":
                return <Badge variant="destructive">{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Orders</h1>
            </div>
            <div className="mx-auto max-w-5xl px-6">
                {orders.length === 0 ? (
                    <div className="flex h-80 flex-col items-center justify-center rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
                        <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                            <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">You don&apos;t have any order yet</h2>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Create a shop to start selling your products and services online.</span>
                        </div>
                        <Button className="gap-2">
                            <PlusIcon className="h-5 w-5" />
                            Create shop
                        </Button>
                    </div>
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-2/6">Name</TableHead>
                                    <TableHead className="">Shop</TableHead>
                                    <TableHead className="">Status</TableHead>
                                    <TableHead className="">Total</TableHead>
                                    <TableHead className=" text-right">Created</TableHead>
                                    <TableHead className=""></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                                        <TableCell className="font-medium">
                                            <Link href="/order/433d5cb2-30e6-463f-bdc5-8ee0bc20dcf1">{order.name}</Link>
                                        </TableCell>
                                        <TableCell>{order.shop.name}</TableCell>
                                        <TableCell>{status(order.status)}</TableCell>
                                        <TableCell>${order.total}</TableCell>
                                        <TableCell className="text-right">
                                            <time dateTime={order.createdAt.toISOString()}>{timeDifference(Date.now(), Date.parse(order.createdAt.toISOString()))}</time>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <EllipsisHorizontalIcon className="h-5 w-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        <PencilSquareIcon className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSub>
                                                        <DropdownMenuSubTrigger>
                                                            <ListBulletIcon className="mr-2 h-4 w-4" />
                                                            Status
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent>
                                                                <DropdownMenuItem>
                                                                    <svg className="mr-2 h-1.5 w-1.5 fill-zinc-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                        <circle cx={3} cy={3} r={3} />
                                                                    </svg>
                                                                    Pending
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <svg className="mr-2 h-1.5 w-1.5 fill-yellow-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                        <circle cx={3} cy={3} r={3} />
                                                                    </svg>
                                                                    Processing
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <svg className="mr-2 h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                                                        <circle cx={3} cy={3} r={3} />
                                                                    </svg>
                                                                    Shipped
                                                                </DropdownMenuItem>
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        <TrashIcon className="mr-2 h-4 w-4" />
                                                        Cancel
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                )}
            </div>
        </section>
    );
}
