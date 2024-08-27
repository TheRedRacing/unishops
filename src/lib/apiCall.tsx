
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

import type { Shop } from "@prisma/client";

const getShops = async () => {
    const session = await getServerAuthSession();
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

const getOneShop = async (id: string) => {
    const session = await getServerAuthSession();
    const shop = await db.shop.findFirst({
        where: {
            id,
            userId: session?.user.id,
        },
    });
    return shop;
};

const getUniShops = async () => {
    const session = await getServerAuthSession();
    const shop = await db.shop.findFirst({
        where: {
            name: "UniShops",
            userId: session?.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return shop;
}

const getLogs = async () => {
    const session = await getServerAuthSession();
    const logs = await db.log.findMany({
        where: {
            userId: session?.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return logs;
};

const getOneLog = async (id: string) => {
    const session = await getServerAuthSession();
    const log = await db.log.findFirst({
        where: {
            id,
            userId: session?.user.id,
        },
    });
    return log;
};

export { getShops, getOneShop, getUniShops, getLogs, getOneLog };
