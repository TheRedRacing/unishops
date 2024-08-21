import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { EnumLogStatus } from "@prisma/client";

export const logsRouter = createTRPCRouter({
    create: protectedProcedure.input(z.object({ endpoint: z.string(), message: z.string(), status: z.string().optional() })).mutation(async ({ ctx, input }) => {
        try {
            const userID = ctx.session.user.id;
            const log = await ctx.db.log.create({
                data: {
                    endpoint: input.endpoint,
                    message: input.message,
                    status: EnumLogStatus[input.status as keyof typeof EnumLogStatus] || EnumLogStatus.Info,
                    user: {
                        connect: {
                            id: userID,
                        },
                    },                    
                }
            });
            return log;
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create log" });
        }
    }),
});