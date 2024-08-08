import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { EnumShopStatus } from "@prisma/client";

export const shopsRouter = createTRPCRouter({
    // shops gestion section
    create: protectedProcedure.input(z.object({ name: z.string() })).mutation(async ({ ctx, input }) => {
        try {
            const userID = ctx.session.user.id;
            const shop = await ctx.db.shop.create({
                data: {
                    name: input.name,
                    slug: input.name.toLowerCase().replace(/ /g, "-"),
                    status: EnumShopStatus.Draft,
                    user: {
                        connect: {
                            id: userID,
                        },
                    },
                },
            });
            return shop;
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create shop" });
        }
    }),
    // edit shop section
    editName: protectedProcedure.input(z.object({ id: z.string(), name: z.string() })).mutation(async ({ ctx, input }) => {
        try {
            const userID = ctx.session.user.id;
            const shop = await ctx.db.shop.findFirst({
                where: {
                    userId: userID,
                    id: input.id,
                },
            });
            if (!shop) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Shop not found" });
            }
            await ctx.db.shop.update({
                where: {
                    id: shop.id,
                },
                data: {
                    name: input.name,                    
                },
            });
            return shop;
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete shop" });
        }
    }),
    editStatus: protectedProcedure.input(z.object({ id: z.string(), status: z.string() })).mutation(async ({ ctx, input }) => {
        try {
            const userID = ctx.session.user.id;
            const shop = await ctx.db.shop.findFirst({
                where: {
                    userId: userID,
                    id: input.id,
                },
            });
            if (!shop) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Shop not found" });
            }
            await ctx.db.shop.update({
                where: {
                    id: shop.id,
                },
                data: {
                    status: EnumShopStatus[input.status as keyof typeof EnumShopStatus],
                },
            });
            return shop;
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete shop" });
        }
    }),
    // delete shop section
    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        try {
            const userID = ctx.session.user.id;
            const shop = await ctx.db.shop.findFirst({
                where: {
                    userId: userID,
                    id: input.id,
                },
            });
            if (!shop) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Shop not found" });
            }
            await ctx.db.shop.delete({
                where: {
                    id: shop.id,
                },
            });
            return shop;
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete shop" });
        }
    }),
    // find shops section
    findMany: protectedProcedure.query(async ({ ctx }) => {
        try {
            const userID = ctx.session.user.id;
            const shops = await ctx.db.shop.findMany({
                where: {
                    userId: userID,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return shops;
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch shops" });
        }
    }),
    findOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        try {
            const userID = ctx.session.user.id;
            const shop = await ctx.db.shop.findFirst({
                where: {
                    userId: userID,
                    id: input.id,
                },
            });
            if (!shop) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Shop not found" });
            }
            return shop;
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch shop" });
        }
    }),
});
