'use client';

import React from "react";
import { useForm } from "react-hook-form"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EllipsisHorizontalIcon, DocumentDuplicateIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { api } from "@/trpc/react";
import { toast } from "sonner";

interface DropdownProps {
    shopId: string;
    shopName: string;
}

export const DropdownTable: React.FC<DropdownProps> = ({ shopId, shopName }) => {
    const [DialogOpen, setDialogOpen] = React.useState(false);

    const form = useForm();

    const { mutate: deleteShop } = api.shops.delete.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} deleted successfully`);
            form.reset();
            setDialogOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })

    function onSubmit() {
        deleteShop({
            id: shopId,
        });
    }

    return (
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
                <DropdownMenuItem variant="destructive">
                    <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger className="flex">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <DialogTitle>
                                            Delete shop
                                        </DialogTitle>
                                        <DialogDescription className="mt-6 flex flex-col">
                                            <span>
                                                Are you sure you want to delete this <span className="text-white">{`"${shopName}"`}</span> shop?
                                            </span>
                                            <span className="mt-1 text-red-500 font-semibold">
                                                This action cannot be undone.
                                            </span>
                                        </DialogDescription>
                                        <FormField
                                            control={form.control}
                                            name="confirmtest"
                                            render={({ field }) => (
                                                <FormItem className="mt-4">
                                                    <FormLabel className="text-zinc-400">Type <span className="text-white">DELETE</span> to confirm.</FormLabel>
                                                    <Input {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex items-center justify-start gap-2 mt-4">
                                            <Button variant={"destructive"} type="submit">Delete shop</Button>
                                            <DialogClose asChild>
                                                <Button variant="ghost">Cancel</Button>
                                            </DialogClose>
                                        </div>
                                    </form>
                                </Form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
