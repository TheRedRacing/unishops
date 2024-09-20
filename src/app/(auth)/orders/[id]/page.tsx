import React from "react";
import { redirect } from "next/navigation";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/page";
import TimeTable from "@/components/timeTable";

import { OrdersStatus } from "@/lib/statusBadge";
import { type Metadata } from "next";
import { generateOneFakeOrder } from "@/lib/apiCall";
import getDecimals from "@/lib/getDecimals";
import { CustomLink } from "@/components/ui/link";

export const metadata: Metadata = {
    title: "Orders",
};

export default async function OrderDetail({ params }: { params: { id: string } }) {
    const order = await generateOneFakeOrder();

    if (!params.id || !order) {
        redirect("/orders");
    }

    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-base text-gray-600 dark:text-zinc-400">Order</p>
                    <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">{order.id}</h1>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col items-start gap-2">
                    <Label>ID</Label>
                    <Badge>{order.id}/{order.status}</Badge>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <Label>Date</Label>
                    <div className="inline-flex items-center rounded-md text-sm font-medium text-gray-600 dark:text-zinc-400">
                        <TimeTable time={order.date} />
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <Label>Status</Label>
                    {OrdersStatus(order.status)}
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                    <Label>Products</Label>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>                                
                                <TableHead>Name</TableHead> 
                                <TableHead>Description</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.products.map((product) => (
                                <>
                                    <TableRow key={product.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
                                        <TableCell className="font-medium">
                                            <CustomLink href={`/orders/${order.id}`}>{product.id}</CustomLink>
                                        </TableCell>                                        
                                        <TableCell>{product.name}</TableCell>                                        
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>                                      
                                        <TableCell>{getDecimals(product.price)} {"chf".toUpperCase()}</TableCell>
                                        <TableCell>{getDecimals(product.price * product.quantity)} {"chf".toUpperCase()}</TableCell>                                     
                                    </TableRow>
                                </>
                            ))}
                            <TableRow className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
                                <TableCell>Total</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>{getDecimals(order.price)} {"chf".toUpperCase()}</TableCell>                                
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            
        </PageLayout>
    );
}
