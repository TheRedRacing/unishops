"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.string().email(),
});

export default function WaitListForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate: addToAudience } = api.resend.addToAudience.useMutation({
        onSuccess({ message }) {
            toast.success(message);
            form.reset();
        },
        onError(error) {
            toast.error(error.message);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        addToAudience({
            email: values.email,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-10 max-w-md">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2">                                
                                <Input type="email" autoComplete="email" placeholder="Enter your email" required {...field} />
                                <Button type="submit" size={"lg"} className="w-2/3">
                                    Send me a notification
                                </Button>
                            </div>
                            <FormMessage {...field} className="mt-2" />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
