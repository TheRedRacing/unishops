'use client';

import { signIn } from "next-auth/react"
import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function GithubButton() {
    return (
        <Button onClick={() => signIn("github", { redirectTo: "/shops" })} type="submit" variant={"outline"} className="flex w-full items-center gap-2">
            <Github />
            <span>Sign up with GitHub</span>
        </Button>
    );
}