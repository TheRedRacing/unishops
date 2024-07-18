"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditDialogFormProps {
    shopId: string;
    shopName: string;
    setDropDownOpen: (open: boolean) => void;
    getEditDialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
}

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export const EditDialogForm: React.FC<EditDialogFormProps> = ({ shopId, shopName, setDropDownOpen, getEditDialogOpen, setDialogOpen }) => {
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
        <Dialog open={getEditDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="flex">
                <PencilSquareIcon className="mr-2 h-4 w-4" />
                Edit
            </DialogTrigger>
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
        </Dialog>
    );
};