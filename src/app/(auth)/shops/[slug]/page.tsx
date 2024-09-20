import { type Metadata } from "next";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/layout/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangeStatusForm } from "@/components/forms/changeStatusForm";
import { Button } from "@/components/ui/button";

import { getOneShop } from "@/lib/apiCall";
import { Shopsstatus } from "@/lib/statusBadge";

import { OverviewTabsSection, ProductsTabsSection, SatisticsTabsSection, SettingsTabsSection, ThemesTabsSection, AwaitTabsSection } from "../[slug]/sections";

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const shop = await getOneShop(params.slug);

    if (!params.slug || !shop) {
        redirect("/shops");
    }

    return {
        title: shop.name,
    };
}

export default async function ShopDetail({ params }: { params: { slug: string } }) {
    const shop = await getOneShop(params.slug);

    if (!params.slug || !shop) {
        redirect("/shops");
    }

    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-base text-gray-600 dark:text-zinc-400">Shop</p>
                    <div className="flex items-end gap-2">
                        <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">{shop.name}</h1>
                        {Shopsstatus(shop.status)}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={"outlined"}>Go to shop</Button>
                    <div className="hidden md:block md:h-6 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                    <ChangeStatusForm shopId={shop.id} shopStatus={shop.status} />
                </div>
            </div>
            <Tabs defaultValue="products">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="satistics">Satistics</TabsTrigger>
                    <TabsTrigger value="themes">Themes</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Suspense fallback={<AwaitTabsSection element={3} />}>
                        <OverviewTabsSection shop={shop} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="products">
                    <Suspense fallback={<AwaitTabsSection element={5} />}>
                        <ProductsTabsSection shop={shop} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="satistics">
                    <Suspense fallback={<AwaitTabsSection element={5} />}>
                        <SatisticsTabsSection shop={shop} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="themes">
                    <Suspense fallback={<AwaitTabsSection element={5} />}>
                        <ThemesTabsSection shop={shop} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="settings">
                    <Suspense fallback={<AwaitTabsSection element={1} />}>
                        <SettingsTabsSection shop={shop} />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </PageLayout>
    );
}