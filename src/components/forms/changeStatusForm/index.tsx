"use client";

import React, { useRef, type Dispatch, type SetStateAction, } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Status = {
    value: string
    label: string
    color: string
}

const statuses: Status[] = [
    { value: "DRAFT", label: "Draft", color: "fill-zinc-500" },
    { value: "MAINTENANCE", label: "Maintenance", color: "fill-yellow-500" },
    { value: "PUBLISHED", label: "Published", color: "fill-green-500" },
    { value: "ARCHIVED", label: "Archived", color: "fill-red-500" },
]

const formSchema = z.object({
    statuses: z.string({
        required_error: "Please select a status",
    }),
})

interface ChangeStatusFormProps {
    shopId: string;
    shopStatus: string;
}

export function ChangeStatusForm({ shopId, shopStatus }: ChangeStatusFormProps) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            statuses: shopStatus,
        },
    });

    const { mutate: ChangeStatus, isPending: ChangeStatupIsPending } = api.shops.editStatus.useMutation({
        onSuccess: (data) => {
            toast.success(`Shop ${data.name} edited successfully`);
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (ChangeStatupIsPending) return;
        try {
            ChangeStatus({
                id: shopId,
                status: values.statuses,
            });
        } catch (error) {
            console.log(error);
        }
    }    

    return (
        <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="statuses"
                    render={({ field }) => (
                        <FormItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <FormControl>
                                        <Button variant={"outline"}>
                                            Status
                                            <ChevronUpDownIcon className="ml-2 h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                                        </Button>
                                    </FormControl>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {statuses.map((status, IDXstatus) => (
                                        <>
                                            {IDXstatus === statuses.length - 1 && <DropdownMenuSeparator />}
                                            <DropdownMenuItem
                                                key={IDXstatus}
                                                className={cn(
                                                    "flex items-center gap-2",
                                                    // active
                                                    shopStatus === status.label && "bg-zinc-200 dark:bg-zinc-900",
                                                )}
                                                variant={IDXstatus === statuses.length - 1 ? "destructive" : "default"}
                                                onSelect={() => {
                                                    form.setValue("statuses", status.label);
                                                    formRef.current?.requestSubmit();
                                                }}
                                            >
                                                <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 ${status.color}`}>
                                                    <circle r={3} cx={3} cy={3} />
                                                </svg>
                                                <span>{status.label}</span>
                                            </DropdownMenuItem>
                                        </>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
