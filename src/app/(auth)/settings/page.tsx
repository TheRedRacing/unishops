import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/server/db";

// server side
export default async function Settings() {
    const getUserWithRelations = async () => {
        const user = await db.user.findFirst({
            include: {
                shops: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    };

    const user = await getUserWithRelations();

    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Settings</h1>
            </div>
            <Tabs defaultValue="usage" className="mx-auto max-w-5xl px-6">
                <TabsList>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="usage">
                    <Card>
                        <CardHeader variant={"bordered"}>
                            <div className="font-semibold">Shops</div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">Intagrate shop into your app using the Stripe API.</div>
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <div className="flex flex-col">
                                <div className="font-semibold">Free</div>
                                <div className="my-2 flex justify-between text-sm">
                                    <div>Shops Limit</div>
                                    <div className="flex gap-1">
                                        <span>{user.shops.length}</span>
                                        <span>/</span>
                                        <span>5</span>
                                    </div>
                                </div>
                                <hr className="border-zinc-200 dark:border-zinc-800" />
                                <div className="my-2 flex justify-between text-sm">
                                    <div>Orders Limit</div>
                                    <Badge>unlimited</Badge>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter variant={"bordered"}>
                            <Button>Upgrade</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader variant={"bordered"}>
                            <div className="font-semibold">Products</div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">Limit products per store using Stripe API.</div>
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <div className="flex flex-col gap-4">
                                <div className="font-semibold">Free</div>
                                <div className="flex justify-between py-2 text-sm">
                                    <div>Products Limit</div>
                                    <div className="flex gap-1">
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter variant={"bordered"}>
                            <Button>Upgrade</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="billing">
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            Payment methods
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <Badge className="text-sm">You do not currently have any payment methods.</Badge>
                        </CardContent>
                        <CardFooter variant={"bordered"}>
                            <Button variant={"outline"}>Add payment method</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    );
}
