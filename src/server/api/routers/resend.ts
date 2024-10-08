import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Resend } from "resend";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { EmailTemplate } from "@/emails/signIn";

const resend = new Resend(env.RESEND_API_KEY);

export const resendRouter = createTRPCRouter({
    addToAudience: publicProcedure.input(z.object({ email: z.string().email() })).mutation(async ({ input }) => {
        try {
            await resend.contacts.create({
                email: input.email,
                audienceId: "a109a93e-e6bf-45b2-beaa-d166a496796a",
            });
            return { message: "You have been added to the waitlist" };
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to add to audience" });
        }
    }),
    sendSignInEmail: publicProcedure.input(z.object({ email: z.string().email() })).mutation(async ({ input }) => {
        try {
            const { data, error } = await resend.emails.send({
                from: `UniShops <${env.EMAIL_FROM}>`,
                to: input.email,
                subject: "Welcome to UniShops",
                react: EmailTemplate({ firstName: "Maxime" }) as React.ReactElement,
            });

            if (error) {
                return Response.json({ error }, { status: 500 });
            }

            return Response.json(data);
        } catch (error) {
            return Response.json({ error }, { status: 500 });
        }
    }),
});
