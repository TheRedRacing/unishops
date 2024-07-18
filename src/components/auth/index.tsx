import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";

export default async function Auth() {
    const session = await getServerAuthSession();

    if (session) {
        return (
            <>
                <Button variant="navlink" asChild>
                    <Link href="/shops">Sign In</Link>
                </Button>
                <Button variant="ghost" asChild>
                    <Link href="/shops">Get Started</Link>
                </Button>
            </>
        );
    }

    return (
        <>
            <Button variant="navlink" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/signup">Get Started</Link>
            </Button>
        </>
    );
}
