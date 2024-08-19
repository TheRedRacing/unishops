import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { type Metadata } from "next";
import { PageLayout } from "@/components/layout/page";
import { EmptyCard } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Orders",
};

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
    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Orders</h1>
            </div>
            <div>
                {orders.length === 0 ? (
                    <EmptyCard>
                        <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                            <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">You don&apos;t have any order yet</h2>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Create a shop to start selling your products and services online.</span>
                        </div>
                        <Button className="gap-2">
                            <PlusIcon className="h-5 w-5" />
                            Create shop
                        </Button>
                    </EmptyCard>
                ) : (
                    <></>
                )}
            </div>
        </PageLayout>
    );
}
