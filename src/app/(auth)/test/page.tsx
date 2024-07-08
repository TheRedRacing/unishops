import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getServerAuthSession } from "@/server/auth";

// server side
export default async function Test() {
    const session = await getServerAuthSession();

    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto max-w-5xl px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Test</h1>
                <div className="mt-4 flex flex-col gap-4">
                    {/* <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            <div className="flex items-center justify-between">
                                Button
                            </div>
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <div className="rounded-lg bg-zinc-900 px-4 py-6 flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Button size={"sm"}>Default sm</Button>
                                    </div>
                                    <div>
                                        <Button>Default</Button>
                                    </div>
                                    <div>
                                        <Button size={"lg"}>Default lg</Button>
                                    </div>
                                    <div>
                                        <Button size={"icon"}>
                                            <CheckBadgeIcon className="w-6 h-6" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Button variant={"destructive"} size={"sm"}>Default sm</Button>
                                    </div>
                                    <div>
                                        <Button variant={"destructive"}>Default</Button>
                                    </div>
                                    <div>
                                        <Button variant={"destructive"} size={"lg"}>Default lg</Button>
                                    </div>
                                    <div>
                                        <Button variant={"destructive"} size={"icon"}>
                                            <CheckBadgeIcon className="w-6 h-6" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Button variant={"ghost"} size={"sm"}>Default sm</Button>
                                    </div>
                                    <div>
                                        <Button variant={"ghost"}>Default</Button>
                                    </div>
                                    <div>
                                        <Button variant={"ghost"} size={"lg"}>Default lg</Button>
                                    </div>
                                    <div>
                                        <Button variant={"ghost"} size={"icon"}>
                                            <CheckBadgeIcon className="w-6 h-6" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Button variant={"link"} size={"sm"}>Default sm</Button>
                                    </div>
                                    <div>
                                        <Button variant={"link"}>Default</Button>
                                    </div>
                                    <div>
                                        <Button variant={"link"} size={"lg"}>Default lg</Button>
                                    </div>
                                    <div>
                                        <Button variant={"link"} size={"icon"}>
                                            <CheckBadgeIcon className="w-6 h-6" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Button variant={"outline"} size={"sm"}>Default sm</Button>
                                    </div>
                                    <div>
                                        <Button variant={"outline"}>Default</Button>
                                    </div>
                                    <div>
                                        <Button variant={"outline"} size={"lg"}>Default lg</Button>
                                    </div>
                                    <div>
                                        <Button variant={"outline"} size={"icon"}>
                                            <CheckBadgeIcon className="w-6 h-6" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <Button variant={"secondary"} size={"sm"}>Default sm</Button>
                                    </div>
                                    <div>
                                        <Button variant={"secondary"}>Default</Button>
                                    </div>
                                    <div>
                                        <Button variant={"secondary"} size={"lg"}>Default lg</Button>
                                    </div>
                                    <div>
                                        <Button variant={"secondary"} size={"icon"}>
                                            <CheckBadgeIcon className="w-6 h-6" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            <div className="flex items-center justify-between">Session</div>
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <pre className="whitespace-pre-wrap break-all rounded-lg bg-zinc-900 px-4 py-6">{JSON.stringify(session, null, 2)}</pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
