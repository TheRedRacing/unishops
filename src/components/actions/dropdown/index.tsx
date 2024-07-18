"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EllipsisHorizontalIcon, DocumentDuplicateIcon, PencilSquareIcon, TrashIcon, ArrowTopRightOnSquareIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DropdownMenuEditFormProps {
    shopId: string;
    shopName: string;
    setDropDownOpen: (open: boolean) => void;
    setDialogOpen: (open: boolean) => void;
}

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

const DropdownMenuEditForm: React.FC<DropdownMenuEditFormProps> = ({ shopId, shopName, setDropDownOpen, setDialogOpen }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: shopName,
        },
    });

    const { mutate: EditShop } = api.shops.editName.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} edited successfully`);
            setDropDownOpen(false);
            setDialogOpen(false);
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        EditShop({
            id: shopId,
            name: values.name,
        });
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit shop name</DialogTitle>
                <DialogDescription>Edit the name of the shop.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>Name</FormLabel>
                                <Input {...field} placeholder="Shop name" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-3 flex items-center justify-start gap-2">
                        <Button type="submit">Save</Button>
                        <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                    </div>
                </form>
            </Form>
        </DialogContent>
    );
};

const DELETE_WORD = "DELETE";
interface DropdownMenuDeleteFormProps {
    shopId: string;
    shopName: string;
    setDropDownOpen: (open: boolean) => void;
    setDialogOpen: (open: boolean) => void;
}
const DropdownMenuDeleteForm: React.FC<DropdownMenuDeleteFormProps> = ({ shopId, shopName, setDropDownOpen, setDialogOpen }) => {
    const router = useRouter();

    const form = useForm({ defaultValues: { confirmation: "", name: "" } });

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
    });

    function onSubmit() {
        deleteShop({
            id: shopId,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete shop</DialogTitle>
                        <DialogDescription className="flex flex-col">
                            <span>
                                Are you sure you want to delete this <span className="text-white">{`"${shopName}"`}</span> shop?
                            </span>
                            <span className="font-semibold text-red-500">This action cannot be undone.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <FormField
                        rules={{ validate: (value) => value === DELETE_WORD || `You must enter "${DELETE_WORD}"` }}
                        control={form.control}
                        name="confirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-400">
                                    Type <span className="text-white">{DELETE_WORD}</span> to confirm.
                                </FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-start gap-2">
                        <Button variant="destructive" type="submit" disabled={!form.formState.isValid}>
                            Delete shop
                        </Button>
                        <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </form>
        </Form>
    );
};

interface DropdownProps {
    shopId: string;
    shopName: string;
}
export const DropdownTable: React.FC<DropdownProps> = ({ shopId, shopName }) => {
    const [DropDownOpen, setDropDownOpen] = useState(false);
    const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [EditDialogOpen, setEditDialogOpen] = useState(false);

    return (
        <DropdownMenu
            open={DropDownOpen}
            onOpenChange={(open) => {
                setDropDownOpen(open);
            }}
        >
            <DropdownMenuTrigger>
                <EllipsisHorizontalIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Dialog open={EditDialogOpen} onOpenChange={setEditDialogOpen}>
                        <DialogTrigger className="flex">
                            <PencilSquareIcon className="mr-2 h-4 w-4" />
                            Edit
                        </DialogTrigger>
                        <DropdownMenuEditForm shopId={shopId} shopName={shopName} setDropDownOpen={setDropDownOpen} setDialogOpen={setEditDialogOpen} />
                    </Dialog>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <Dialog open={DeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <DialogTrigger className="flex">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete
                        </DialogTrigger>
                        <DropdownMenuDeleteForm shopId={shopId} shopName={shopName} setDropDownOpen={setDropDownOpen} setDialogOpen={setDeleteDialogOpen} />
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
        <DropdownMenu
            open={DropDownOpen}
            onOpenChange={(open) => {
                setDropDownOpen(open);
            }}
        >
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
                        <DropdownMenuDeleteForm shopId={shopId} shopName={shopName} setDropDownOpen={setDropDownOpen} setDialogOpen={setDialogOpen} />
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
