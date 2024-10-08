import { PageLayout } from "@/components/layout/page";
import { EmptyCard } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Logs",
};

const SelectOption = [
    {
        name: "All Statuses",
        options: [
            {
                name: "All Statuses",
                value: "allstatuses",
                defaultChecked: true,
            },
            {
                name: "Success",
                value: "success",
            },
            {
                name: "Warning",
                value: "warning",
            },
            {
                name: "Error",
                value: "error",
            },
        ],
    },
    {
        name: "Last 3 days",
        options: [
            {
                name: "Last 3 days",
                value: "3days",
                defaultChecked: true,
            },
            {
                name: "Last 7 days",
                value: "7days",
            },
            {
                name: "Last 15 days",
                value: "15days",
            },
            {
                name: "Last 30 days",
                value: "30days",
            },
        ],
    },
    {
        name: "All Actions",
        options: [
            {
                name: "All Actions",
                value: "allactions",
                defaultChecked: true,
            },
            {
                name: "Create",
                value: "create",
            },
            {
                name: "Update",
                value: "update",
            },
            {
                name: "Delete",
                value: "delete",
            },
        ],
    },
    {
        name: "All Shops",
        options: [
            {
                name: "All Shops",
                value: "allshops",
                defaultChecked: true,
            },
        ],
    },
];

// server side
export default function Logs() {
    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Logs</h1>
            </div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-4 gap-2">
                    {SelectOption.map((option, index) => (
                        <Select key={index}>
                            <SelectTrigger className="mt-1 bg-zinc-100 dark:bg-zinc-900">
                                <SelectValue placeholder={option.name}></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {option.options.map((item, index) => (
                                    <SelectItem key={index} value={item.value} defaultChecked={item.defaultChecked}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}
                </div>
                <EmptyCard>
                    <div className="mb-8 flex max-w-md flex-col gap-2 text-center">
                        <h2 className="text-xl font-bold tracking-[-0.16px] text-black dark:text-white">You don&apos;t have any logs yet</h2>
                        <span className="text-sm font-normal text-zinc-600 dark:text-zinc-300">Logs are generated when you perform actions on your account.</span>
                    </div>
                </EmptyCard>
            </div>
        </PageLayout>
    );
}
