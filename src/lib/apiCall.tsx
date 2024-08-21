import { type EnumLogStatus, type PrismaClient } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

import type { Shop } from "@prisma/client";
import type { Log } from "@prisma/client";

const session = await getServerAuthSession();
const getShops = async () => {
    const shops: Shop[] = await db.shop.findMany({
        where: {
            userId: session?.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return shops;
};

const addLog = async (
    ctx: {
        session: { user: { id: string } };
        path: string;
        db: PrismaClient<
            {
                log: ("query" | "warn" | "error")[];
            },
            never,
            DefaultArgs
        >;
    },
    message: string,
    status: EnumLogStatus = "Info",
) => {
    return await ctx.db.log.create({
        data: {
            endpoint: ctx.path,
            message,
            status,
            userId: ctx.session.user.id,
        },
    });
};

export { addLog, getShops};