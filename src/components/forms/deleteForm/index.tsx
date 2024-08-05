"use client";

import React, { type Dispatch, type SetStateAction, } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";


const DELETE_WORD = "DELETE";
interface DeleteFormProps {
    shopId: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const DeleteForm: React.FC<DeleteFormProps> = ({ shopId, setIsOpen }) => {
    const router = useRouter();

    const form = useForm({ defaultValues: { confirmation: "", name: "" } });

    const { mutate: deleteShop } = api.shops.delete.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} deleted successfully`);
            setIsOpen(false);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 md:px-0">
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
                <div className="my-4 flex flex-col md:flex-row md:mb-0 md:mt-4  md:items-center md:justify-start md:gap-2">
                    <Button variant="destructive" type="submit" disabled={!form.formState.isValid}>
                        Delete shop
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </div>
            </form>
        </Form>
    );
};