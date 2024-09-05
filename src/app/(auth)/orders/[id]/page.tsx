import React from "react";
import { redirect } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/page";

import { OrdersStatus } from "@/lib/statusBadge";
import { type Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import TimeTable from "@/components/timeTable";
import { generateOneFakeOrder } from "@/lib/apiCall";
import getDecimals from "@/lib/getDecimals";

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
                    <Label>Product</Label>
                    <Card>
                        <CardContent className="bg-black/50">                            
                            <p className="text-sm text-gray-600 dark:text-zinc-400">{order.product.name}</p>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">{order.product.description}</p>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">{getDecimals(order.product.price)} {"chf".toUpperCase()}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
        </PageLayout>
    );
}
