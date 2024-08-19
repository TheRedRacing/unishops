"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function ThemeToogle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant={"ghost"} size={"icon"} className="group">
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
            </Button>
        );
    }

    return (
        <Button variant={"ghost"} size={"icon"} className="group" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
    );
}
