'use client';

import React, { type Dispatch, type SetStateAction, } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

interface EditFormProps {
    shopId: string;
    shopName: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditForm({ shopId, shopName, setIsOpen }: EditFormProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: shopName,
        },
    });

    const { mutate: EditShop, isPending: editShopIsPending } = api.shops.editName.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} edited successfully`);
            setIsOpen(false);
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (editShopIsPending) return;
        try {
            EditShop({
                id: shopId,
                name: values.name,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 md:px-0">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input {...field} placeholder="Shop name" />
                            <FormMessage />
                        </FormItem>
                    )}
                />                
                <div className="my-4 flex flex-col md:flex-row md:mb-0 md:mt-4  md:items-center md:justify-start md:gap-2">
                    <Button type="submit" disabled={editShopIsPending}>Save</Button>
                    <DialogClose asChild className="hide md:block">
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>                
                </div>
            </form>
        </Form>
    );
}; 