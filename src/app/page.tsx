import { AppFooter } from "@/components/footer/appFooter";
import WaitListForm from "@/components/forms/waitListForm";
import { WaitListHeader } from "@/components/header";
import { HeroPattern } from "@/components/HeroPattern";
import { PageLayout } from "@/components/layout/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Waitlist",
};

export default async function Home() {
    return (
        <>
            <WaitListHeader />
            <HeroPattern />
            <PageLayout className="flex-1 flex flex-col items-center py-52">
                <div className="">
                    <h2 className="text-center text-3xl font-bold tracking-tight dark:text-white sm:text-4xl">Get notified when we’re launching.</h2>
                    <p className="mt-2 text-center text-lg text-zinc-600 dark:text-gray-300">The next generation of e-commerce is coming soon.</p>
                    <p className="text-center text-lg text-zinc-600 dark:text-gray-300">Join our waitlist to get notified when we launch.</p>
                    <WaitListForm />
                </div>
            </PageLayout>            
            <AppFooter />
        </>
    );
}
