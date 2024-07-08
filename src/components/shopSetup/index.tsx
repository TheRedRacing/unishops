'use client';

import React, { useState } from "react";
import type { Shop } from "@prisma/client";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AccordionCard, AccordionCardContent, AccordionCardItem, AccordionCardTrigger } from "@/components/ui/accordion-card";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface ShopSetupProps {
    shop: Shop;
}

export const ShopSetup: React.FC<ShopSetupProps> = ({ shop }) => {
    const [currentStep, setCurrentStep] = useState(4);

    return (
        <AccordionCard type="single" collapsible>
            <AccordionCardItem value="item-1">
                <AccordionCardTrigger status={"success"}>
                    <span>Add API key to connect with Stripe</span>
                </AccordionCardTrigger>
                <AccordionCardContent>
                    <AddStripe />
                </AccordionCardContent>
            </AccordionCardItem>
            <AccordionCardItem value="item-2" className={cn(currentStep < 1 && "pointer-events-none select-none opacity-50")}>
                <AccordionCardTrigger status={"success"}>
                    <span>Setup your product</span>
                </AccordionCardTrigger>
                <AccordionCardContent>
                    <CheckProduct />
                </AccordionCardContent>
            </AccordionCardItem>
            <AccordionCardItem value="item-3" className={cn(currentStep < 2 && "pointer-events-none select-none opacity-50")}>
                <AccordionCardTrigger status={"warning"}>
                    <span>Setup your FAQ</span>
                </AccordionCardTrigger>
                <AccordionCardContent>
                    <FAQSetup />
                </AccordionCardContent>
            </AccordionCardItem>
            <AccordionCardItem value="item-4" className={cn(currentStep < 3 && "pointer-events-none select-none opacity-50")}>
                <AccordionCardTrigger status={"destructive"}>
                    <span>Choose your shop theme</span>
                </AccordionCardTrigger>
                <AccordionCardContent>
                    <ChooseTheme />
                </AccordionCardContent>
            </AccordionCardItem>
            <AccordionCardItem value="item-5" className={cn(currentStep < 4 && "pointer-events-none select-none opacity-50")}>
                <AccordionCardTrigger>
                    <span>Publish your shop</span>
                </AccordionCardTrigger>
                <AccordionCardContent>
                    <PublishShop />
                </AccordionCardContent>
            </AccordionCardItem>
        </AccordionCard>
    )
}

const AddStripeFormSchema = z.object({
    stripePublic: z.string().min(1, "Stripe public key is required"),
    stripeSecret: z.string().min(1, "Stripe secret key is required"),
});
function AddStripe() {
    const form = useForm<z.infer<typeof AddStripeFormSchema>>({
        resolver: zodResolver(AddStripeFormSchema),
        defaultValues: {
            stripePublic: "",
            stripeSecret: "",
        },
    });

    function onSubmit(values: z.infer<typeof AddStripeFormSchema>) {
        console.log(values);
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader variant={"bordered"}>
                        <Link href={""} className="text-zinc-600 hover:text-blue-600 hover:underline dark:text-zinc-200 dark:hover:text-blue-400">
                            How to connect your Stripe account ?
                        </Link>
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
    );
}

function CheckProduct() {
    return (
        <Card>
            <CardHeader variant={"bordered"} className="flex-row items-center justify-between">
                Fetch your product from Stripe
                <Button>Check product</Button>
            </CardHeader>
            <CardContent variant={"bordered"} className="min-h-40 space-y-4">

            </CardContent>
        </Card>
    );
}


const FAQSetupFormSchema = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
});
function FAQSetup() {
    const form = useForm<z.infer<typeof FAQSetupFormSchema>>({
        resolver: zodResolver(FAQSetupFormSchema),
        defaultValues: {
            question: "",
            answer: "",
        },
    });

    function onSubmit(values: z.infer<typeof FAQSetupFormSchema>) {
        console.log(values);
    }
    return (
        <>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader variant={"bordered"} className="flex-row items-center justify-between">
                            Add your FAQ
                            <Button>Add Answer</Button>
                        </CardHeader>
                        <CardContent variant={"bordered"} className="min-h-40">
                            <div className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="question"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question</FormLabel>
                                            <Input {...field} placeholder="What is your refund policy?" />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="answer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Answer</FormLabel>
                                            <Textarea
                                                placeholder="We offer a 30-day money-back guarantee on all products. If you're not satisfied with your purchase, you can return it for a full refund."
                                                className="resize-none"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </form>
                </Form>
            </Card>
        </>
    );
}

function ChooseTheme() {
    return (
        <Card>
            <CardHeader variant={"bordered"}>Choose your shop theme</CardHeader>
            <CardContent variant={"bordered"} className="min-h-40">
                <div className="grid grid-cols-3 gap-2">
                    <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-200 dark:ring-zinc-400/20">
                        Default Theme
                        <Button size={"icon"} variant={"ghost"}>
                            <CheckCircleIcon className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-200 dark:ring-zinc-400/20">
                        Dark Theme
                        <Button size={"icon"} variant={"ghost"}>
                            <CheckCircleIcon className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-200 dark:ring-zinc-400/20">
                        Light Theme
                        <Button size={"icon"} variant={"ghost"}>
                            <CheckCircleIcon className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-200 dark:ring-zinc-400/20">
                        Minimalist Theme
                        <Button size={"icon"} variant={"ghost"}>
                            <CheckCircleIcon className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-200 dark:ring-zinc-400/20">
                        Modern Theme
                        <Button size={"icon"} variant={"ghost"}>
                            <CheckCircleIcon className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="inline-flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-200 dark:ring-zinc-400/20">
                        Vintage Theme
                        <Button size={"icon"} variant={"ghost"}>
                            <CheckCircleIcon className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function PublishShop() {
    return (
        <Card>
            <CardContent variant={"bordered"} className="flex items-center gap-2">
                <Button className="gap-2">
                    <CheckCircleIcon className="h-5 w-5" />
                    Publish
                </Button>
                <Button variant={"ghost"}>                
                    Cancel
                </Button>
            </CardContent>
        </Card>
    );
}