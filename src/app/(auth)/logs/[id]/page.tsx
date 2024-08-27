import React from "react";
import { redirect } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/page";

import { Logsstatus } from "@/lib/statusBadge";
import { type Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import TimeTable from "@/components/timeTable";
import { getOneLog } from "@/lib/apiCall";

export const metadata: Metadata = {
    title: "Logs",
};

export default async function ShopDetail({ params }: { params: { id: string } }) {
    const log = await getOneLog(params.id);

    if (!params.id || !log) {
        redirect("/logs");
    }

    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-base text-gray-600 dark:text-zinc-400">Log</p>
                    <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">{log.endpoint}</h1>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col items-start gap-2">
                    <Label>ID</Label>
                    <Badge>{log.id}/{log.endpoint}</Badge>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <Label>Date</Label>
                    <div className="inline-flex items-center rounded-md text-sm font-medium text-gray-600 dark:text-zinc-400">
                        <TimeTable time={log.createdAt} />
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <Label>Status</Label>
                    {Logsstatus(log.status)}
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                    <Label>Message</Label>
                    <Card>
                        <CardContent className="bg-black/50">
                            <p className="text-sm text-gray-600 dark:text-zinc-400">{log.message}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
        </PageLayout>
    );
}
