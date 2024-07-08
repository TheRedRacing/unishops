import { ProBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@heroicons/react/24/outline";

// server side
export default async function Domains() {
    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto flex max-w-5xl items-center gap-4 px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Domains</h1>
                <ProBadge />
            </div>
            <div className="pointer-events-none relative mx-auto max-w-5xl select-none px-6 opacity-50">
                <Card>
                    <CardContent variant={"bordered"} className="flex h-80 flex-col items-center justify-center">
                        <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                            <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">Connect your domain to your shop</h2>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Requires that you verify your domain by adding a DNS record.</span>
                        </div>
                        <Button className="gap-2">
                            <PlusIcon className="h-5 w-5" />
                            Add domain
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
