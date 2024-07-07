"use client";

//import { useLocale } from "next-intl";
//import { useRouter, usePathname } from "next/navigation";
//import { useTransition } from "react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function LocalSwitcher() {
    //"Fr", "En", "De", "It", "Pt"
    const locales = [
        {
            name: "Français",
            value: "fr",
            flag: "fi fi-fr",
        },
        {
            name: "English",
            value: "en",
            flag: "fi fi-gb",
        },
        {
            name: "Deutsch",
            value: "de",
            flag: "fi fi-de",
        },
        {
            name: "Italiano",
            value: "it",
            flag: "fi fi-it",
        },
        {
            name: "Português",
            value: "pt",
            flag: "fi fi-pt",
        },
    ];

    const localActive = "fr"; //useLocale();

    /* const [isPending, startTransition] = useTransition();
    const router = useRouter();
    
    // get current route
    const pathname = usePathname();

    const onClickChange = (e: string, pathname: string) => {
        const nextLocale = e;

        if (nextLocale === localActive) {
            return;
        }

        pathname = pathname.replace(`/${localActive}`, e);

        startTransition(() => {
            router.replace(`/${pathname}`);
        });
    }; */

    return (
        <div className="flex flex-1 items-center">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger className="border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">
                        <span className={cn("flex items-center", locales.find((locale) => locale.value === localActive)?.flag)} />
                        <span className="ml-2">{locales.find((locale) => locale.value === localActive)?.name}</span>
                        <ChevronDownIcon className="ml-2 h-5 w-5" />
                    </MenubarTrigger>
                    <MenubarContent>
                        {locales.map((locale) => (
                            <MenubarItem key={locale.value} /* onClick={() => onClickChange(locale.value, pathname)} */>
                                <span className={cn("flex items-center", locale.flag)} />
                                <span className="ml-2">{locale.name}</span>
                            </MenubarItem>
                        ))}
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
}

/*
<span className="isolate inline-flex border border-dashed border-primary">
    <<button type="button" onClick={() => onClickChange("fr", pathname)} className="inline-flex h-8 w-16 items-center justify-center bg-white px-2 py-2 text-sm text-zinc-400 hover:bg-zinc-50 focus:z-10">
        FR
    </button>
    <button type="button" onClick={() => onClickChange("en", pathname)} className="-ml-px inline-flex h-8 w-16 items-center justify-center bg-white px-2 py-2 text-sm text-zinc-400 hover:bg-zinc-50 focus:z-10">
        EN
    </button>
</span>
*/
