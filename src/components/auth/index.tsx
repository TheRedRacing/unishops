import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";

export default async function Auth() {
    const session = await getServerAuthSession();

    if (session) {
        return (
            <Button variant="secondary" asChild>
                <Link href="/shops">Shops</Link>
            </Button>
        );
    }

    return (
        <>
            <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button variant="secondary" asChild>
                <Link href="/signup">Get Started</Link>
            </Button>
        </>
    );
}
