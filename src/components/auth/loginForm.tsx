import { signIn } from "next-auth/react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function LoginForm() {
    return (
        <form
            action={async (formData) => {
                "use server";
                await signIn("resend", { email: formData.get("email") });
            }}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Your email address</Label>
                <Input id="email" name="email" type="email" placeholder="steve.jobs@apple.com" />
                <Button type="submit" variant={"default"} className="w-full">
                    Continue
                </Button>
            </div>
        </form>
    );
}