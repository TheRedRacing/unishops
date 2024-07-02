'use client';

import { signIn } from "next-auth/react"
import { Apple } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function AppleButton() {
    return (
        <Button onClick={() => signIn("apple", { redirectTo: "/shops" })} type="submit" variant={"outline"} className="flex w-full items-center gap-2" disabled>
            <Apple />
            <span>Sign up with Apple</span>
        </Button>
    );
}