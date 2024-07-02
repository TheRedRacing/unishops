import { signIn } from "@/auth";
import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function GithubButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/shops" });
            }}
            className="block w-full"
        >
            <Button type="submit" variant={"outline"} className="flex w-full items-center gap-2">
                <Github />
                <span>Sign up with GitHub</span>
            </Button>
        </form>
    );
}
