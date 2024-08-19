import { PageLayout } from "@/components/layout/page";
import { ProBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyCard } from "@/components/ui/card";
import { PlusIcon } from "@heroicons/react/24/outline";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Domains",
};

// server side
export default async function Domains() {
    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Domains</h1>
                <ProBadge />
            </div>
            <div className="pointer-events-none relative select-none opacity-50">
                <EmptyCard>
                        <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                            <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">Connect your domain to your shop</h2>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Requires that you verify your domain by adding a DNS record.</span>
                        </div>
                        <Button className="gap-2">
                            <PlusIcon className="h-5 w-5" />
                            Add domain
                        </Button>
                </EmptyCard>
            </div>
        </PageLayout>
    );
}
