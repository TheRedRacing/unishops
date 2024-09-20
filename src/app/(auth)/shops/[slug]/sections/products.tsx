import Stripe from "stripe";
import { type Shop } from "@prisma/client";

import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardTitle, EmptyCard } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CustomLink } from "@/components/ui/link";
import TimeTable from "@/components/timeTable";

import getDecimals from "@/lib/getDecimals";
import { OrdersStatus } from "@/lib/statusBadge";
import { getServerAuthSession } from "@/server/auth";
import { getProducts } from "@/lib/apiCall";
import { Badge } from "@/components/ui/badge";

async function ProductsTabsSection({ shop }: { shop: Shop }) {
    const session = await getServerAuthSession();
    const products = await getProducts(shop);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
                <Card className="col-span-2">
                    <CardContent className="space-y-1">
                        <CardDescription>Products</CardDescription>
                        <CardTitle>{products.length}</CardTitle>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="space-y-1">
                        <CardDescription>{session?.user.pro ? "Unlimited" : "100"} </CardDescription>
                        <CardTitle>
                            {session?.user.pro ? "Unlimited" : "100"}
                        </CardTitle>
                    </CardContent>
                </Card>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id} className="hover:bg-black/1 dark:hover:bg-white/1 text-xs">
                            <TableCell>
                                <CustomLink href={`/shops/${shop.slug}/products/${product.id}`}>{product.id}</CustomLink>
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{getDecimals(product.price)} {"chf".toUpperCase()}</TableCell> 
                            <TableCell className="text-right">
                                <TimeTable time={product.date} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default ProductsTabsSection;