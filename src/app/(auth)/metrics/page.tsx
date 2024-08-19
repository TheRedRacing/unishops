import { PageLayout } from "@/components/layout/page";
import { EmptyCard } from "@/components/ui/card";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Metrics",
};

// server side
export default function Metrics() {
    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Metrics</h1>
            </div>
            <div>
                <EmptyCard></EmptyCard>
            </div>
        </PageLayout>
    );
}
