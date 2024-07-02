import updates from "@/assets/update.json";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Update() {
    updates.sort((a, b) => {
        return a.version < b.version ? 1 : -1;
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"} asChild>
                    <Link href="#">
                        <SparklesIcon className="h-6 w-6" />
                    </Link>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update</DialogTitle>
                    <DialogDescription>
                        <ul className="flex flex-col divide-y divide-zinc-300 dark:divide-zinc-800">
                            {updates.map((update, index) => (
                                <div key={index} className="flex flex-col gap-2 py-2">
                                    <div className="flex items-baseline gap-2">
                                        <h4 className="text-base font-semibold text-black dark:text-white">{update.date}</h4>
                                        <p className="text-xs text-zinc-800 dark:text-zinc-400">({update.version})</p>
                                    </div>
                                    <div className="text-sm text-black dark:text-zinc-300">
                                        {update.changes.map((change, index) => (
                                            <p key={index} className="block">
                                                {change}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </ul>
                        <div className="flex items-center justify-center gap-4 border-t border-zinc-300 pt-4 text-black dark:border-zinc-800 dark:text-zinc-300">
                            <div>🚀 : Feature</div>
                            <div>🔧 : Bug fix</div>
                            <div>🎨 : Design</div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
