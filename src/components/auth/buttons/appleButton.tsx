"use client";

import { signIn } from "next-auth/react";
import { Apple } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function AppleButton() {
    return (
        <Button onClick={() => signIn("apple", { callbackUrl: "/shops" })} type="submit" variant={"outline"} size={"lg"} className="flex w-full items-center gap-2">
            <Apple />
            <span>Sign up with Apple</span>
        </Button>
    );
}
