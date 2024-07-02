import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { DocumentDuplicateIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { timeDifference } from "@/lib/timeDifference";
import { db } from "@/server/db";

// server side
export default async function Shops() {  
    const shops = await db.shop.findMany();
    shops.sort((a, b) => Date.parse(b.createdAt.toISOString()) - Date.parse(a.createdAt.toISOString()));

    const status = (status: string) => {
        switch (status) {
            case "DRAFT":
                return <Badge>{status}</Badge>;
            case "MAINTENANCE":
                return <Badge variant={"warning"}>{status}</Badge>;
            case "PUBLISHED":
                return <Badge variant={"success"}>{status}</Badge>;
            case "ARCHIVED":
                return <Badge variant={"destructive"}>{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
                <h1 className="text-[28px] font-bold leading-[34px] tracking-[-0.416px] text-black dark:text-white">Shop</h1>
                {/* Button new shop */}
            </div>
            <div className="mx-auto max-w-5xl px-6">
                {shops.length === 0 ? (
                    <div className="flex h-80 flex-col items-center justify-center rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
                        <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                            <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">You don&apos;t have any shop yet</h2>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Create a shop to start selling your products and services online.</span>
                        </div>
                        {/* Button new shop */}
                    </div>
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[216px]">Name</TableHead>
                                    <TableHead className="w-[216px]">Status</TableHead>
                                    <TableHead className="w-[103px] text-right">Created</TableHead>
                                    <TableHead className="w-[70px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {shops.map((shop) => (
                                    <TableRow key={shop.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                                        <TableCell className="font-medium">
                                            <Link href={`/shops/${shop.id}`}>{shop.name}</Link>
                                        </TableCell>
                                        <TableCell>{status(shop.status)}</TableCell>
                                        <TableCell className="text-right">
                                            <time dateTime={shop.createdAt.toISOString()}>{timeDifference(Date.now(), Date.parse(shop.createdAt.toISOString()))}</time>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <EllipsisHorizontalIcon className="h-5 w-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        <PencilSquareIcon className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
                                                        Duplicate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive">
                                                        <TrashIcon className="mr-2 h-4 w-4" />
                                                        Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                )}
            </div>
        </section>
    );
}
