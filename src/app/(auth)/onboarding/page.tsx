import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type Metadata } from "next";
import { PageLayout } from "@/components/layout/page";
import { CustomLink } from "@/components/ui/link";
import { Resources } from "@/components/docs";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Onboarding",
};
// server side
export default function onboarding() {
    return (
        <PageLayout className="space-y-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Create your first shop</h1>
                <p className="text-base text-gray-600 dark:text-zinc-400">Follow the steps below to create your first shop. You can always skip any step and come back to it later.</p>
            </div>
            <div className="flex flex-col gap-8">
                <Card>
                    <CardHeader className="font-semibold">
                        <div className="flex items-center justify-between">
                            01. Connect your Stripe account
                            <CustomLink href={""}>How to connect your Stripe account ?</CustomLink>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <Label>Stripe Secret</Label>
                            <Input placeholder="Enter your Stripe Secret" />
                        </div>
                    </CardContent>
                    <CardFooter className="inline-flex gap-2">
                        <Button>Create shop</Button>
                        <Button variant={"secondary"} asChild>
                            <Link href={"/shops"}>Skip</Link>
                        </Button>
                    </CardFooter>
                </Card>                
                <Resources />
            </div>
        </PageLayout>
    );
}