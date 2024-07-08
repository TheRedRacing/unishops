"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
})

export default function NewShop() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const { mutate: createShop } = api.shops.create.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} created successfully`);
            form.reset();
            router.push(`/shops/${data.id}`);
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        createShop({
            name: values.name,
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2" size={"lg"}>
                    <PlusIcon className="h-5 w-5" />
                    Create shop
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <DialogTitle>Create a new shop</DialogTitle>
                            <DialogDescription className="mt-1">
                                Create a shop to start selling your products and services online.
                            </DialogDescription>
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
                            <div className="flex items-center justify-end gap-2 mt-3">
                                <DialogClose asChild>
                                    <Button variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Create shop</Button>
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
