import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { type Metadata } from "next";
import { PageLayout } from "@/components/layout/page";

export const metadata: Metadata = {
    title: "Onboarding",
};

// server side
export default function onboarding() {
    return (
        <PageLayout className="space-y-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Create your first shop</h1>
                <p className="text-base text-gray-600 dark:text-zinc-400">Follow the steps below to create your first shop. You can always skip any step and come back to it later.</p>
            </div>
            <div className="flex flex-col gap-8">
                <Card>
                    <CardHeader className="font-semibold">01. Name your first shop</CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <Label>Name</Label>
                            <Input placeholder="Enter your shop name" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size={"sm"}>Next</Button>
                    </CardFooter>
                </Card>

                <Card className="pointer-events-none select-none opacity-50">
                    <CardHeader className="font-semibold">
                        <div className="flex items-center justify-between">
                            <div>02. Connect your Stripe account</div>
                            <Link href={""} className="ring-offset-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-zinc-900 underline-offset-4 transition-colors hover:text-blue-500 hover:underline dark:text-zinc-50 dark:hover:text-blue-500">
                                How to connect your Stripe account ?
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Stripe Id</Label>
                                <Input placeholder="Enter your Stripe Id" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Stripe Secret</Label>
                                <Input placeholder="Enter your Stripe Secret" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size={"sm"}>Next</Button>
                    </CardFooter>
                </Card>

                <Card className="pointer-events-none select-none opacity-50">
                    <CardHeader className="font-semibold">03. Add your first product</CardHeader>
                    <CardContent>
                        <Badge variant={"default"}>Complete last step to add your first product</Badge>
                    </CardContent>
                    <CardFooter>
                        <Button size={"sm"}>Next</Button>
                    </CardFooter>
                </Card>

                <Card className="pointer-events-none select-none opacity-50">
                    <CardHeader className="font-semibold">04. Choose your theme</CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20">
                                Default Theme
                                <Button size={"icon"} variant={"ghost"}>
                                    <CheckCircleIcon className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20">
                                Dark Theme
                                <Button size={"icon"} variant={"ghost"}>
                                    <CheckCircleIcon className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20">
                                Light Theme
                                <Button size={"icon"} variant={"ghost"}>
                                    <CheckCircleIcon className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20">
                                Minimalist Theme
                                <Button size={"icon"} variant={"ghost"}>
                                    <CheckCircleIcon className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20">
                                Modern Theme
                                <Button size={"icon"} variant={"ghost"}>
                                    <CheckCircleIcon className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20">
                                Vintage Theme
                                <Button size={"icon"} variant={"ghost"}>
                                    <CheckCircleIcon className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size={"sm"}>
                            <div className="flex items-center gap-1">
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                Publish
                            </div>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </PageLayout>
    );
}
