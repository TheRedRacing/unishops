"use client";

import { signOut } from "next-auth/react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export function SignOutButton() {
    return (
        <button onClick={() => signOut({callbackUrl : '/'})} className="flex items-center gap-2">
            <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
            Logout
        </button>
    );
}
