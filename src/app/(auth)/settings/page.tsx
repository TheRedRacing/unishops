import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/server/db";
import { type Metadata } from "next";
import { PageLayout } from "@/components/layout/page";

export const metadata: Metadata = {
    title: "Settings",
};

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
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Settings</h1>
            </div>
            <Tabs defaultValue="usage">
                <TabsList>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="usage">
                    <Card>
                        <CardHeader>
                            <div className="font-semibold">Shops</div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">Intagrate shop into your app using the Stripe API.</div>
                        </CardHeader>
                        <CardContent>
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
                                <hr className="border-zinc-200 dark:border-zinc-800" />
                                <div className="my-2 flex justify-between text-sm">
                                    <div>Domaine Limit</div>
                                    <div className="flex gap-1">
                                        <span>0</span>
                                        <span>/</span>
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Upgrade</Button>                            
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="font-semibold">Products</div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">Limit products per store using Stripe API..</div>
                        </CardHeader>
                        <CardContent>
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
                        <CardFooter>
                            <Button>Upgrade</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="billing">
                    <Card>
                        <CardHeader className="font-semibold">
                            Payment methods
                        </CardHeader>
                        <CardContent>
                            <Badge className="text-sm">You do not currently have any payment methods.</Badge>
                        </CardContent>
                        <CardFooter>
                            <Button>Add payment method</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </PageLayout>
    );
}
