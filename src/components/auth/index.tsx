import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Auth() {
    return (
        <>
            <Button variant={"primary"} asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button variant={"outlined"} asChild>
                <Link href="/signup">Get Started</Link>
            </Button>
        </>
    );
}
