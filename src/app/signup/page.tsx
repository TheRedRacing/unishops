import Link from "next/link";
import { Logo } from "@/components/icons";
import { LoginForm } from "@/components/auth/loginForm";
import { AppleButton, GithubButton, GoogleButton, LinkedInButton } from "@/components/auth/buttons";
import { CustomLink } from "@/components/ui/link";
import { redirect } from "next/navigation";

export default function SignUp() {
    if (true) {
        redirect("/");
    }

    return (
        <>
            <Link href="/" className="absolute left-0 top-6 flex h-10 items-center justify-center rounded-full pl-2 pr-4 text-sm font-semibold text-zinc-800 transition duration-200 ease-in-out hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800 md:left-6">
                <span>
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.25 8.75L9.75 12L13.25 15.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                    </svg>
                </span>
                Home
            </Link>
            <div className="flex h-screen items-center justify-center">
                <main className="mx-auto min-h-[600px] w-full max-w-[450px]">
                    <Logo />
                    <h1 className="mb-1 mt-8 text-center text-xl font-bold tracking-[-0.16px] text-zinc-900 dark:text-zinc-200 sm:text-left">Create a UniShops account</h1>
                    <p className="mb-8 text-center text-base font-normal text-zinc-800 dark:text-zinc-300 sm:text-left">
                        {"Already have an account?"}{" "}
                        <CustomLink href="/login" arrow="right">
                            Log in
                        </CustomLink>
                    </p>
                    <LoginForm />
                    <div className="mb-6 mt-6 flex items-center justify-center">
                        <div aria-hidden="true" className="h-px w-full bg-zinc-200 dark:bg-zinc-800" data-orientation="horizontal" role="separator"></div>
                        <span className="mx-4 text-xs font-normal text-zinc-600 dark:text-zinc-400">OR</span>
                        <div aria-hidden="true" className="h-px w-full bg-zinc-200 dark:bg-zinc-800" data-orientation="horizontal" role="separator"></div>
                    </div>
                    <div className="mb-6 flex flex-col gap-4">
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <GithubButton />
                            <GoogleButton />
                        </div>
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <LinkedInButton />
                            <AppleButton />
                        </div>
                    </div>
                    <p className="text-xs font-normal text-zinc-900 dark:text-zinc-200">
                        By signing up, you agree to our{" "}
                        <CustomLink variant="primarysm" href="/legal/terms-of-service">
                            Terms
                        </CustomLink>
                        ,{" "}
                        <CustomLink variant="primarysm" href="/legal/terms-of-service">
                            acceptable use
                        </CustomLink>{" "}
                        and{" "}
                        <CustomLink variant="primarysm" href="/legal/privacy-policy">
                            Privacy Policy
                        </CustomLink>
                        .
                    </p>
                </main>
            </div>
        </>
    );
}
