import React from "react";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChangeStatusForm } from "@/components/forms/changeStatusForm";
import { PageLayout } from "@/components/layout/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Shopsstatus } from "@/lib/statusBadge";
import { type Metadata } from "next";
import { Card, CardContent, CardHeader, EmptyCard } from "@/components/ui/card";
import TimeTable from "@/components/timeTable";

type Props = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const shop = await db.shop.findUnique({ where: { id: params.id } });

    if (!params.id || !shop) {
        redirect("/shops");
    }

    return {
        title: shop.name,
    };
}

export default async function ShopDetail({ params }: { params: { id: string } }) {
    const shop = await db.shop.findUnique({ where: { id: params.id } });

    if (!params.id || !shop) {
        redirect("/shops");
    }

    const stripe = new Stripe(shop.stripeSecret);
    const balance = await stripe.balance.retrieve();
    const getProducts = async () => {
        const products = await stripe.products.list({ limit: 3 });
        const productsWithPrices = await Promise.all(
            products.data.map(async (product) => {
                const prices = await stripe.prices.list({ product: product.id, limit: 3 });
                return {
                    product: product,
                    prices: prices.data,
                };
            }),
        );
        return productsWithPrices;
    };
    const products = await getProducts();

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
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="customers">Customers</TabsTrigger>
                    <TabsTrigger value="satistics">Satistics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="grid grid-cols-4 gap-8">
                        <div className="flex flex-col items-start gap-2">
                            <Label>Status</Label>
                            {Shopsstatus(shop.status)}
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <Label>ID</Label>
                            <Badge>{`${shop.id.slice(0, 15)}...`}</Badge>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <Label>Timezone</Label>
                            <Badge>{shop.timezone}</Badge>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <Label>Created</Label>
                            <div className="inline-flex items-center rounded-md text-sm font-medium text-gray-600 dark:text-zinc-400">
                                <TimeTable time={shop.createdAt} />
                            </div>
                        </div>                        
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label>Stripe Secret</Label>
                        <Badge className="max-w-full truncate">{shop.stripeSecret ? shop.stripeSecret.slice(0, 20) + "..." : "Not connected"}</Badge>
                    </div>
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
            {/* <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Currency</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {balance.available.map((item, IDXitem) => (
                        <TableRow key={IDXitem}>
                            <TableCell>Available</TableCell>
                            <TableCell>{getDecimals(item.amount)}</TableCell>
                            <TableCell className="uppercase">{item.currency}</TableCell>
                        </TableRow>
                    ))}
                    {balance.pending.map((item, IDXitem) => (
                        <TableRow key={IDXitem}>
                            <TableCell>Pending</TableCell>
                            <TableCell>{getDecimals(item.amount)}</TableCell>
                            <TableCell className="uppercase">{item.currency}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <hr className="my-8 border-zinc-900/10 dark:border-white/10" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product, IDXproduct) => (
                        <TableRow key={IDXproduct}>
                            <TableCell>{product.product.id}</TableCell>
                            <TableCell>{product.product.name}</TableCell>
                            <TableCell className="flex flex-col">
                                {product.prices.map((price, IDXprice) => (
                                    <span key={IDXprice}>
                                        {getDecimals(price.unit_amount)} {price.currency.toUpperCase()}
                                    </span>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}
        </PageLayout>
    );
}
