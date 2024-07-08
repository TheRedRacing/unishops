'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
    stripePublic: z.string().min(1, "Stripe public key is required"),
    stripeSecret: z.string().min(1, "Stripe secret key is required"),
})

export default function AddStripe() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            stripePublic: "",
            stripeSecret: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader variant={"bordered"} className="font-semibold">
                        <div className="flex items-center justify-between">
                            <span>Add API key to connect with Stripe</span>                            
                            <Button size={"sm"} variant={"link"}>
                                <Link href={""} className="">How to connect your Stripe account ?</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent variant={"bordered"} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="stripePublic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stripe public key</FormLabel>
                                    <Input {...field} placeholder="pk_test_1234567890" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stripePublic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stripe secret key</FormLabel>
                                    <Input {...field} placeholder="sk_test_1234567890" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter variant={"bordered"}>
                        <div className="flex items-center justify-start gap-2">
                            <Button type="submit">Test API</Button>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}