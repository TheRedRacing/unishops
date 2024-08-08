"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { api } from "@/trpc/react";

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
                            <div className="flex items-center gap-4">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input type="email" autoComplete="email" placeholder="Enter your email" required {...field} className="w-full min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus-visible:outline-white sm:text-sm sm:leading-6" />
                                <button type="submit" className="flex-none rounded-md bg-zinc-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-zinc-100 dark:focus-visible:outline-white">
                                    Notify me
                                </button>
                            </div>
                            <FormMessage {...field} className="mt-2" />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
