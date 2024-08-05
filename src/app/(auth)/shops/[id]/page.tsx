import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { timeDifference } from "@/lib/timeDifference";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShopSetup } from "@/components/shopSetup";

export default async function ShopDetail({ params }: { params: { id: string } }) {
    const shop = await db.shop.findUnique({ where: { id: params.id } });

    if (!params.id || !shop) {
        redirect("/shops");
    }

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
                <div className="flex flex-col gap-1">
                    <p className="text-base text-gray-600 dark:text-zinc-400">Shop</p>
                    <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">{shop.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={"outline"}>Go to shop</Button>
                    <Button variant={"outline"}>Edit shop</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"outline"}>Status</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                                <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-green-500">
                                    <circle r={3} cx={3} cy={3} />
                                </svg>
                                <span>Publish</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-yellow-500">
                                    <circle r={3} cx={3} cy={3} />
                                </svg>
                                <span>Maintenance</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-zinc-500">
                                    <circle r={3} cx={3} cy={3} />
                                </svg>
                                <span>Draft</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2" variant="destructive">
                                <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-red-500">
                                    <circle r={3} cx={3} cy={3} />
                                </svg>
                                <span>Archive</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>                    
                </div>
            </div>
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
                <div className="grid grid-cols-3 gap-8">
                    <div className="flex flex-col items-start gap-2">
                        <Label>Status</Label>
                        {status(shop.status)}
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label>Shop ID</Label>
                        <Badge>{`${shop.id.slice(0, 10)}...`}</Badge>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label>Created</Label>
                        <p className="inline-flex items-center rounded-md text-sm font-medium text-gray-600 dark:text-zinc-400">{timeDifference(Date.now(), Date.parse(shop.createdAt.toISOString()))}</p>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label>Stripe ID</Label>
                        <Badge className="max-w-full truncate">{shop.stripePublic ? shop.stripePublic.slice(0, 15) + "..." : "Not connected"}</Badge>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label>Stripe Secret</Label>
                        <Badge className="max-w-full truncate">{shop.stripeSecret ? shop.stripeSecret.slice(0, 15) + "..." : "Not connected"}</Badge>
                    </div>
                </div>
            </div>
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
                <ShopSetup shop={shop} />
            </div>
        </section>
    );
}
