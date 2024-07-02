import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getAllShops, getLoggedUserEmail } from "@/lib/db";
import { DocumentDuplicateIcon, EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// server side
export default async function Test() {
    // "cly3263ls0000yra0l485ily7"
    const userMail = await getLoggedUserEmail();
    const shops = await getAllShops();
    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto max-w-5xl px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Test</h1>
                <div className="mt-4 flex flex-col gap-4">
                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            <div className="flex items-center justify-between">
                                User email
                            </div>
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <pre className="whitespace-pre-wrap break-all rounded-lg bg-zinc-900 px-4 py-6">{JSON.stringify(userMail, null, 2)}</pre>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader variant={"bordered"} className="font-semibold">
                            <div className="flex items-center justify-between">
                                User shops
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisHorizontalIcon className="h-5 w-5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <PencilSquareIcon className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
                                            Duplicate
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <DropdownMenuItem variant="destructive">
                                                    <TrashIcon className="mr-2 h-4 w-4" />
                                                    Remove
                                                </DropdownMenuItem>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Delete Shop</DialogTitle>
                                                    <DialogDescription>
                                                        <div className="flex flex-col gap-1">
                                                            Are you sure you want to delete this shop?
                                                            <span className="text-red-400 font-semibold">This action cannot be undone.</span>
                                                        </div>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="shopname">
                                                        Type <span className="font-semibold">{`"${shops[0]?.name}"`}</span> to confirm deletion.
                                                    </Label>
                                                    <Input id="shopname" className="text-sm" />
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent variant={"bordered"}>
                            <pre className="whitespace-pre-wrap break-all rounded-lg bg-zinc-900 px-4 py-6">{JSON.stringify(shops, null, 2)}</pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section >
    )
}