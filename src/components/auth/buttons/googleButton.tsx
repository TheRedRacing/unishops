import { signIn } from "@/auth";
import { Google } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function GoogleButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/shops" });
            }}
            className="block w-full"
        >
            <Button type="submit" variant={"outline"} className="flex w-full items-center gap-2">
                <Google />
                <span>Sign up with Google</span>
            </Button>
        </form>
    );
}
