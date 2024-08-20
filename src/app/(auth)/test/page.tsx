import { Switch } from "@/components/ui/switch";

// server side
export default async function Test() {
    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto max-w-5xl px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Test</h1>
                <div className="mt-4 flex flex-col gap-4">
                    <Switch />
                </div>
            </div>
        </section>
    );
}
