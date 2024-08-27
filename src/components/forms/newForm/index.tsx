"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ResponsiveDialog } from "@/components/responsiveDialog";
import { DialogClose } from "@/components/ui/dialog";
import Link from "next/link";

const formSchema = z.object({
    stripeSecret: z.string().min(1, "Stripe secret is required"),
});

export default function NewShops() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            stripeSecret: "",
        },
    });

    const { mutate: createShop, isPending: createShopIsPending } = api.shops.create.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} created successfully`);
            router.push(`/shops/${data.id}`);
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (createShopIsPending) return;
        createShop({
            stripeSecret: values.stripeSecret,
        });        
    }

    const [isNewShopOpen, setIsNewShopOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsNewShopOpen(true)}>New shop</Button>
            <ResponsiveDialog isOpen={isNewShopOpen} setIsOpen={setIsNewShopOpen} title="New shop" description="Create your new shop to make somes sales.">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-4 md:px-0">
                        <FormField
                            control={form.control}
                            name="stripeSecret"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-2 flex items-center justify-between">
                                        Stripe Secret
                                        <Link href={""} className="text-xs text-blue-500 hover:underline">
                                            How to get my Stripe Secret ?
                                        </Link>
                                    </FormLabel>
                                    <Input {...field} placeholder="Stripe secret" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col md:mb-0 md:mt-4 md:flex-row md:items-center md:justify-start md:gap-2">
                            <Button type="submit" disabled={createShopIsPending}>
                                Create shop
                            </Button>
                            <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
            </ResponsiveDialog>
        </>
    );
}
