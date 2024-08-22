
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

import type { Shop } from "@prisma/client";

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

export { getShops};
