import { PageLayout } from "@/components/layout/page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// server side
export default async function Test() {
    return (
        <PageLayout className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Test Alert</h1>
            </div>            
        </PageLayout>
    );
}
