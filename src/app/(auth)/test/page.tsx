import { PageLayout } from "@/components/layout/page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getUniShops } from "@/lib/apiCall";
import { getServerAuthSession } from "@/server/auth";
import { Shop } from "@prisma/client";
import Stripe from "stripe";

// server side
export default async function Test() {

    const session = await getServerAuthSession();


    const debugUniShops = async () => {
        const shop = await getUniShops();
        if (shop) {
            const stripe = new Stripe(shop.stripeSecret);
            const data = await stripe.products.list({
                expand: ['data.default_price']
            });

            const display = [
                {
                    name: "Price",
                    data: data.data
                }
            ]

            return (
                <>
                    {display.map((item, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold">Stripe {item.name}</div>
                            <pre className="whitespace-pre-wrap break-all rounded-b-lg bg-zinc-900/20 px-4 py-6">{JSON.stringify(item.data, null, 2)}</pre>
                        </div>
                    ))}
                </>
            )
        } else {
            return (
                <div className="flex flex-col">
                    <div className="rounded-t-lg bg-zinc-900/40 p-4 font-bold">debugUniShops() not found</div>
                </div>
            );
        }

    }

    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Test Alert</h1>
            </div>
            <div>
                {/* {debugUniShops()} */}
            </div>
            <div>
                {session && (
                    <>
                        <div>{session.user.id}</div>
                        <div>{session.user.name}</div>
                        <div>{session.user.email}</div>
                        <div>{session.user.pro ? "True" : "False"}</div>
                    </>
                )}
            </div>
        </PageLayout>
    );
}
