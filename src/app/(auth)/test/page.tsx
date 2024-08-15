import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { env } from "@/env";
import getDecimals from "@/lib/getDecimals";
import Stripe from "stripe";

// server side
export default async function Test() {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    const organisation = await stripe.accounts.retrieve();
    const balance = await stripe.balance.retrieve();
    const getProducts = async () => {
        const products = await stripe.products.list({ limit: 3 });

        const productsWithPrices = await Promise.all(
            products.data.map(async (product) => {
                const prices = await stripe.prices.list({ product: product.id, limit: 3 });
                return {
                    product: product,
                    prices: prices.data,
                };
            }),
        );

        return productsWithPrices;
    };

    // Utilisation de la fonction
    const products = await getProducts();

    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto max-w-5xl px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Test</h1>
                <div className="mt-4 flex flex-col gap-4">
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            <div className="flex items-center justify-between">From Stripe Secret API get more information about the customer</div>
                        </CardHeader>
                        <CardContent variant={"bordered"} className="flex flex-col gap-y-4">
                            <div className="flex flex-col">
                                <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold text-white">Stripe Organisation</div>
                                <pre className="whitespace-pre-wrap break-all rounded-b-lg bg-zinc-900/20 px-4 py-6 text-white">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Status</TableHead>
                                                <TableHead>Data</TableHead>
                                                <TableHead>Details</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>{organisation.id}</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>{organisation.settings?.dashboard.display_name}</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Country</TableCell>
                                                <TableCell>{organisation.country}</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Currency</TableCell>
                                                <TableCell className="uppercase">{organisation.default_currency}</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Timezone</TableCell>
                                                <TableCell>{organisation.settings?.dashboard.timezone}</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </pre>
                            </div>
                            <div className="flex flex-col">
                                <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold text-white">Stripe Balance</div>
                                <pre className="whitespace-pre-wrap break-all rounded-b-lg bg-zinc-900/20 px-4 py-6 text-white">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Status</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Currency</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {balance.available.map((item, IDXitem) => (
                                                <TableRow key={IDXitem}>
                                                    <TableCell>Available</TableCell>
                                                    <TableCell>{getDecimals(item.amount)}</TableCell>
                                                    <TableCell className="uppercase">{item.currency}</TableCell>
                                                </TableRow>
                                            ))}
                                            {balance.pending.map((item, IDXitem) => (
                                                <TableRow key={IDXitem}>
                                                    <TableCell>Pending</TableCell>
                                                    <TableCell>{getDecimals(item.amount)}</TableCell>
                                                    <TableCell className="uppercase">{item.currency}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </pre>
                            </div>
                            <div className="flex flex-col">
                                <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold text-white">Stripe Product</div>
                                <pre className="whitespace-pre-wrap break-all rounded-b-lg bg-zinc-900/20 px-4 py-6 text-white">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">ID</TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Price</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {products.map((product, IDXproduct) => (
                                                <TableRow key={IDXproduct}>
                                                    <TableCell>{product.product.id}</TableCell>
                                                    <TableCell>{product.product.name}</TableCell>
                                                    <TableCell className="flex flex-col">
                                                        {product.prices.map((price, IDXprice) => (
                                                            <span key={IDXprice}>
                                                                {getDecimals(price.unit_amount)} {price.currency.toUpperCase()}
                                                            </span>
                                                        ))}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
