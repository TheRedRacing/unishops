import Footer from "@/components/footer";
import { HeaderWaitlist } from "@/components/header";
import WaitListForm from "@/components/waitListForm";

export default async function Home() {
    return (
        <>
            <HeaderWaitlist />
            <main className="flex flex-1 justify-center py-40">
                <div className="">
                    <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight dark:text-white sm:text-4xl">Get notified when we’re launching.</h2>
                    <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-zinc-600 dark:text-gray-300">The new generation of e-commerce is coming soon.</p>
                    <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-zinc-600 dark:text-gray-300">Join our waitlist to get notified when we launch.</p>
                    <WaitListForm />
                </div>
            </main>
            <Footer />
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2" aria-hidden="true">
                <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                <defs>
                    <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
                        <stop stopColor="#7775D6" />
                        <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                    </radialGradient>
                </defs>
            </svg>
        </>
    );
}
