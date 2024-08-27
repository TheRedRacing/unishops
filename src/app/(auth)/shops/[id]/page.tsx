import { type Metadata } from "next";
import React from "react";
import Stripe from "stripe";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/layout/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, EmptyCard } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChangeStatusForm } from "@/components/forms/changeStatusForm";
import { Button } from "@/components/ui/button";

import { getOneShop } from "@/lib/apiCall";
import getDecimals from "@/lib/getDecimals";

type Props = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const shop = await getOneShop(params.id);

    if (!params.id || !shop) {
        redirect("/shops");
    }

    return {
        title: shop.name,
    };
}

export default async function ShopDetail({ params }: { params: { id: string } }) {
    const shop = await getOneShop(params.id);

    if (!params.id || !shop) {
        redirect("/shops");
    }

    const stripe = new Stripe(shop.stripeSecret);
    const orders = await stripe.balanceTransactions.list();
    const balance = await stripe.balance.retrieve();

    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-base text-gray-600 dark:text-zinc-400">Shop</p>
                    <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">{shop.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={"outlined"}>Go to shop</Button>
                    <div className="hidden md:block md:h-6 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                    <Button variant={"outlined"}>Edit shop</Button>
                    <ChangeStatusForm shopId={shop.id} shopStatus={shop.status} />
                </div>
            </div>
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="balance">Balance</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="customers">Customers</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="satistics">Satistics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="grid grid-cols-3 w-full gap-4">
                        <Card>
                            <CardContent className="space-y-1">
                                <CardDescription>Orders</CardDescription>
                                <CardTitle>{orders.data.length}</CardTitle>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="space-y-1">
                                <CardDescription>Balance available</CardDescription>
                                <CardTitle>
                                    {getDecimals(balance.available[0]?.amount)}{" "}
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
                                    {getDecimals(balance.pending[0]?.amount)}{" "}
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
                                <TableHead>Product</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Created</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.data.map((order) => (
                                <TableRow key={order.id} className="hover:bg-black/ dark:hover:bg-white/1 text-xs">

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="balance">
                    <EmptyCard />
                </TabsContent>
                <TabsContent value="products">
                    <EmptyCard />
                </TabsContent>
                <TabsContent value="orders">
                    <EmptyCard />
                </TabsContent>
                <TabsContent value="customers">
                    <EmptyCard />
                </TabsContent>
                <TabsContent value="satistics">
                    <EmptyCard />
                </TabsContent>
                <TabsContent value="settings">
                    <EmptyCard />
                </TabsContent>
            </Tabs>
        </PageLayout>
    );
}
