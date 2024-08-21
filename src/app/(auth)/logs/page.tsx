import { type Metadata } from "next";

import { PageLayout } from "@/components/layout/page";
import { EmptyCard } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Logsstatus } from "@/lib/statusBadge";
import Link from "next/link";
import { timeDifference } from "@/lib/timeDifference";
import { CustomLink } from "@/components/ui/link";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

export const metadata: Metadata = {
    title: "Logs",
};

// server side
export default async function Logs() {
    const logs = await db.log.findMany();

    const statuses = ["All Statuses", "Info", "Success", "Warning", "Error"];
    const lastDays = ["Last 3 days", "Last 7 days", "Last 15 days", "Last 30 days"];
    const SelectOption = [
        { name: "Status", options: statuses.map((status) => ({ name: status, value: status })) },
        { name: "Last Days", options: lastDays.map((day) => ({ name: day, value: day })) },
    ];

    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Logs</h1>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-end gap-2">
                    {SelectOption.map((option, index) => (
                        <Select key={index}>
                            <SelectTrigger className="mt-1 bg-zinc-100 dark:bg-zinc-900" defaultChecked={index === 0}>
                                <SelectValue placeholder={option.options[0]?.name}></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {option.options.map((item, index) => (
                                    <SelectItem key={index} value={item.value}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}
                </div>
                {logs.length === 0 ? (
                    <EmptyCard>
                        <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                            <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">You don&apos;t have any logs yet</h2>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Logs are generated when you perform actions on your account.</span>
                        </div>
                    </EmptyCard>
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Endpoint</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Messages</TableHead>
                                    <TableHead className="text-right">Created</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.map((log) => (
                                    <>
                                        <TableRow key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                                            <TableCell className="font-medium">
                                                <CustomLink href={`/logs/${log.id}`} variant="primaryxs">{log.id}</CustomLink>
                                            </TableCell>
                                            <TableCell>{Logsstatus(log.status)}</TableCell>
                                            <TableCell>
                                                <span>{log.message}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <time dateTime={log.createdAt.toISOString()}>{timeDifference(Date.now(), Date.parse(log.createdAt.toISOString()))}</time>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">Page 1 of 1</div>
                    </>
                )}
            </div>
        </PageLayout>
    );
}
