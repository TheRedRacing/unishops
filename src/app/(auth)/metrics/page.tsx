import { Card, CardContent } from "@/components/ui/card"; 

// server side
export default function Metrics() {
    return (
        <section className="space-y-8 py-8">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
                <h1 className="text-3xl font-bold leading-8 text-black dark:text-white">Metrics</h1>
            </div>
            <div className="mx-auto max-w-5xl px-6">
                <Card>
                    <CardContent variant={"bordered"} className="min-h-80 relative">
                        
                    </CardContent>
                </Card>                                
            </div>
        </section>
    );
}
