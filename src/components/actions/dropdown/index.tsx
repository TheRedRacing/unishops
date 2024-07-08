'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EllipsisHorizontalIcon, DocumentDuplicateIcon, PencilSquareIcon, TrashIcon, ArrowTopRightOnSquareIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DELETE_WORD = "DELETE";

interface DropdownMenuDeleteFormProps {
    shopId: string;
    shopName: string;
    dropdownOpen: boolean;
    setDropDownOpen: (open: boolean) => void;
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
}
const DropdownMenuDeleteForm: React.FC<DropdownMenuDeleteFormProps> = ({ shopId, shopName, dropdownOpen, setDropDownOpen, dialogOpen, setDialogOpen }) => {
    const router = useRouter();

    const form = useForm({ defaultValues: { confirmtest: "" } });

    const { mutate: deleteShop } = api.shops.delete.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} deleted successfully`);
            form.reset();
            setDropDownOpen(false);
            setDialogOpen(false);
            router.refresh();
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
        <DialogContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader>
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
                    </DialogHeader>
                    <FormField
                        rules={{ validate: value => value === DELETE_WORD || `You must enter "${DELETE_WORD}"` }}
                        control={form.control}
                        name="confirmtest"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-400">Type <span className="text-white">{DELETE_WORD}</span> to confirm.</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-start gap-2 mt-4">
                        <Button variant="destructive" type="submit" disabled={!form.formState.isValid}>Delete shop</Button>
                        <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                    </div>
                </form>
            </Form>
        </DialogContent>
    )
};

interface DropdownProps {
    shopId: string;
    shopName: string;
}
export const DropdownTable: React.FC<DropdownProps> = ({ shopId, shopName }) => {
    const [DropDownOpen, setDropDownOpen] = useState(false);
    const [DialogOpen, setDialogOpen] = useState(false);

    return (
        <DropdownMenu open={DropDownOpen} onOpenChange={(open) => { setDropDownOpen(open) }}>
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
                        <DropdownMenuDeleteForm shopId={shopId} shopName={shopName} dropdownOpen={DropDownOpen} setDropDownOpen={setDropDownOpen} dialogOpen={DialogOpen} setDialogOpen={setDialogOpen} />
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const DropdownDetail: React.FC<DropdownProps> = ({ shopId, shopName }) => {
    const [DropDownOpen, setDropDownOpen] = useState(false);
    const [DialogOpen, setDialogOpen] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <ArrowTopRightOnSquareIcon className="mr-2 h-5 w-5" />
                    Stripe details
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <DocumentTextIcon className="mr-2 h-5 w-5" />
                    Stripe docs
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger className="flex">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete shop
                        </DialogTrigger>
                        <DropdownMenuDeleteForm shopId={shopId} shopName={shopName} dropdownOpen={DropDownOpen} setDropDownOpen={setDropDownOpen} dialogOpen={DialogOpen} setDialogOpen={setDialogOpen} />
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
