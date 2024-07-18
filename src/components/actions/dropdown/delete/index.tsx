"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DELETE_WORD = "DELETE";
interface DeleteDialogFormProps {
    shopId: string;
    shopName: string;
    setDropDownOpen: (open: boolean) => void;
    deleteDialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
}
export const DeleteDialogForm: React.FC<DeleteDialogFormProps> = ({ shopId, shopName, setDropDownOpen, deleteDialogOpen, setDialogOpen }) => {
    const router = useRouter();

    const form = useForm({ defaultValues: { confirmation: "", name: "" } });

    const { mutate: deleteShop } = api.shops.delete.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} deleted successfully`);
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
        <Dialog open={deleteDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="flex">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Delete shop</DialogTitle>
                    <DialogDescription className="flex flex-col">
                        <span>
                            Are you sure you want to delete this <span className="text-white">{`"${shopName}"`}</span> shop?
                        </span>
                        <span className="font-semibold text-red-500">This action cannot be undone.</span>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    </form>
                </Form>
            </DialogContent >
        </Dialog >
    );
};