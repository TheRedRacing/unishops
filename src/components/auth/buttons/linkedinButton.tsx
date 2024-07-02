'use client';

import { signIn } from "next-auth/react"
import { LinkedIn } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function LinkedInButton() {
    return (
        <Button onClick={() => signIn("linkedin", { redirectTo: "/shops" })} type="submit" variant={"outline"} className="flex w-full items-center gap-2" disabled>
            <LinkedIn />
            <span>Sign up with Linkedin</span>
        </Button>
    );
}