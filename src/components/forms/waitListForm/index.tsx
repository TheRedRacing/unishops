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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-5 md:mt-10 md:max-w-lg">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col gap-2 md:flex-row">                                
                                <Input type="email" autoComplete="email" placeholder="Enter your email" required {...field} />
                                <Button type="submit" size={"lg"} className="md:w-2/3">
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
