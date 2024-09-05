import { type Shop } from "@prisma/client";

import { Card, CardContent, CardContentSep, CardContentSepItem, CardHeader } from "@/components/ui/card";
import EditShop from "@/components/forms/editForm/settingsPage";
import { Button } from "@/components/ui/button";

async function SettingsTabsSection({ shop }: { shop: Shop }) {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader className="font-semibold">General</CardHeader>
                <CardContent>
                <EditShop shop={shop} />
                </CardContent>
            </Card>
            <Card className="!ring-red-600/40 dark:!ring-red-400/40">
                <CardHeader className="font-semibold !border-red-600/40 dark:!border-red-400/40">Danger zone</CardHeader>
                <CardContentSep className="!divide-red-600/40 dark:!divide-red-400/40">
                    <CardContentSepItem>
                        <div className="flex flex-col">
                            <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
                                Transfer ownership
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                Transfer the ownership of this shop to another user.
                            </div>
                        </div>
                        <Button variant="destructive">Transfer shop</Button>
                    </CardContentSepItem>

                    <CardContentSepItem>
                        <div className="flex flex-col">
                            <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
                                Archive this shop
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                Mark this shop as archived and read-only.
                            </div>
                        </div>
                        <Button variant="destructive">Archive shop</Button>
                    </CardContentSepItem>

                    <CardContentSepItem>
                        <div className="flex flex-col">
                            <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
                                Delete shop
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                This action is irreversible. All data will be lost.
                            </div>
                        </div>
                        <Button variant="destructive">Delete shop</Button>
                    </CardContentSepItem>
                </CardContentSep>
            </Card>
        </div>
    );
}

export default SettingsTabsSection;