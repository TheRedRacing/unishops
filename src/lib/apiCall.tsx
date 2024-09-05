
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

const getOneShop = async (slug: string) => {
    const session = await getServerAuthSession();
    const shop = await db.shop.findFirst({
        where: {
            slug,
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

interface fakeOrders {
    id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
    }
    price: number;
    status: string;
    date: number;
}

async function generateFakeOrders(nb = 50): Promise<fakeOrders[]> {
    const data = [];

    // Define the possible values for the data
    const products = ["T-shirt", "Sneakers", "Laptop", "Phone", "Backpack", "Watch", "Headphones", "Camera", "Monitor", "Keyboard", "Mouse", "Tablet", "Chair", "Desk", "Lamp"];
    const statuses = ["charge", "pending", "failed"];
    const minPrices = 1000; // 10 chf
    const maxPrices = 100000; // 1000 chf
    const date = new Date().getTime();

    // Generate a random id
    const prefix = "od_";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < nb; i++) {
        let id = prefix;
        for (let i = 0; i < 24; i++) {
            // Generate a random character
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters[randomIndex];
        }

        data.push({
            id: id,
            product: {
                id: id,
                name: products[Math.floor(Math.random() * products.length)] ?? "T-shirt",
                description: "This is a description",
                price: Math.floor(Math.random() * (maxPrices - minPrices + 1) + minPrices),
            },
            price: Math.floor(Math.random() * (maxPrices - minPrices + 1) + minPrices),
            status: statuses[Math.floor(Math.random() * 10) < 8 ? 0 : Math.floor(Math.random() * 10) < 9 ? 1 : 2] ?? "failed",
            date: date / 1000,
            
        });
    }

    return data;
}

async function generateOneFakeOrder(): Promise<fakeOrders> {
    // Define the possible values for the data
    const products = ["T-shirt", "Sneakers", "Laptop", "Phone", "Backpack", "Watch", "Headphones", "Camera", "Monitor", "Keyboard", "Mouse", "Tablet", "Chair", "Desk", "Lamp"];
    const statuses = ["charge", "pending", "failed"];
    const minPrices = 1000; // 10 chf
    const maxPrices = 100000; // 1000 chf
    const date = new Date().getTime();

    // Generate a random id
    const prefix = "od_";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

    let id = prefix;
    for (let i = 0; i < 24; i++) {
        // Generate a random character
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }

    const data = {
        id: id,
        product: {
            id: id,
            name: products[Math.floor(Math.random() * products.length)] ?? "T-shirt",
            description: "This is a description",
            price: Math.floor(Math.random() * (maxPrices - minPrices + 1) + minPrices),
        },
        price: Math.floor(Math.random() * (maxPrices - minPrices + 1) + minPrices),
        status: statuses[Math.floor(Math.random() * 10) < 8 ? 0 : Math.floor(Math.random() * 10) < 9 ? 1 : 2] ?? "failed",
        date: date / 1000,
    };

    return data;
}



export { getShops, getOneShop, getUniShops, getLogs, getOneLog, generateFakeOrders, generateOneFakeOrder };
