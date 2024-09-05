"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type Shop } from "@prisma/client";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export default function EditShop({ shop }: { shop: Shop }) {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: shop.name,
        },
    });

    const { mutate: EditShop, isPending: editShopIsPending } = api.shops.editName.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} edited successfully`);
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
                id: shop.id,
                name: values.name,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-zinc-800 dark:text-zinc-200">Shop name</FormLabel>
                                <div className="mt-1 flex items-center gap-2">
                                    <Input {...field} placeholder="Shop name" className="w-1/3" />
                                    <Button>Update shop</Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </>

    );
}

