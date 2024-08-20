"use client";

import { signIn } from "next-auth/react";
import { Google } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function GoogleButton() {
    return (
        <Button onClick={() => signIn("google", { callbackUrl: "/shops" })} type="submit" variant={"outlined"} size={"xl"} className="flex w-full items-center gap-2">
            <Google />
            <span>Sign up with Google</span>
        </Button>
    );
}
