import { signIn } from "@/auth";
import { LinkedIn } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function LinkedInButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("linkedin", { redirectTo: "/shops" });
            }}
            className="col-span-2 block w-full"
        >
            <Button type="submit" variant={"outline"} className="flex w-full items-center gap-2">
                <LinkedIn />
                <span>Sign up with Linkedin</span>
            </Button>
        </form>
    );
}
