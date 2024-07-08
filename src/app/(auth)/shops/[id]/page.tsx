import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowTopRightOnSquareIcon, DocumentTextIcon, EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { timeDifference } from "@/lib/timeDifference";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddStripe from "@/components/actions/addStripe";

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
                            <Button size={"icon"} variant={"outline"}>
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <ArrowTopRightOnSquareIcon className="mr-2 h-5 w-5" />
                                Stripe details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <DocumentTextIcon className="mr-2 h-5 w-5" />
                                Stripe docs
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                                <TrashIcon className="mr-2 h-5 w-5" />
                                Remove shop
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
                        <Badge className="truncate max-w-full">{shop.stripePublic ? shop.stripePublic.slice(0, 15) + "..." : "Not connected"}</Badge>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label>Stripe Secret</Label>
                        <Badge className="truncate max-w-full">{shop.stripeSecret ? shop.stripeSecret.slice(0, 15) + "..." : "Not connected"}</Badge>
                    </div>
                </div>
            </div>
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">               
                {shop.stripePublic && shop.stripeSecret ? (
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            Products
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <Badge variant={"warning"} size={"sm"}>You have no products in your shop</Badge>
                        </CardContent>
                    </Card>
                ) : (
                    <AddStripe />
                )}
                
            </div>
        </section>
    );
}