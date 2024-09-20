
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

import type { Shop } from "@prisma/client";
import Stripe from "stripe";
import getDecimals from "./getDecimals";

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

interface Products {
    id: string;
    name: string;
    description: string;
    // price can be null so i changed it to string with a default value "Missing price" 
    price: number;
    date: number;
}

async function getProducts(shop: Shop): Promise<Products[]> {
    const stripe = new Stripe(shop.stripeSecret)
    const stripeProducts = await stripe.products.list();
    const products: Products[] = [];

    for (const product of stripeProducts.data) {

        // Gérer le cas où `default_price` est null ou undefined
        if (!product.default_price) {
            products.push({
                id: product.id,
                name: product.name,
                description: product.description ?? "",
                price: 0,
                date: product.created
            });
            continue;
        }

        let priceAmount = 0;

        // Si `default_price` est un objet de type Stripe.Price
        if (typeof product.default_price === 'object' && 'unit_amount' in product.default_price) {
            priceAmount = (product.default_price).unit_amount ?? 0;
        }
        // Si `default_price` est un string (l'ID du prix)
        else if (typeof product.default_price === 'string') {
            const stripePrice = await stripe.prices.retrieve(product.default_price);

            // Gérer le cas où la récupération du prix échoue
            if (!stripePrice || !stripePrice.unit_amount) {
                priceAmount = 0;
            } else {
                priceAmount = stripePrice.unit_amount;
            }
        }

        // Ajout du produit avec le prix récupéré ou calculé
        products.push({
            id: product.id,
            name: product.name,
            description: product.description ?? "",
            price: priceAmount,
            date: product.created
        });
    }
    return products;
}

interface Orders {
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

async function getOrders(shop: Shop): Promise<Orders[]> {
    const stripe = new Stripe(shop.stripeSecret)


    return [];
}






interface fakeOrders {
    id: string;
    products: {
        id: string;
        name: string;
        description: string;
        quantity: number;
        price: number;
    }[];
    status: string;
    price: number;
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

    let totalPrice = 0;

    for (let i = 0; i < nb; i++) {       
        // Generate the products data
        const nbProducts = Math.floor(Math.random() * 5) + 1;
        const quantity = Math.floor(Math.random() * 4) + 1;
        const price = Math.floor(Math.random() * (maxPrices - minPrices + 1) + minPrices);
        totalPrice += quantity * price;
        const productsData = [];
        for (let j = 0; j < nbProducts; j++) {
            productsData.push({
                id: generateID("pro_"),
                name: products[Math.floor(Math.random() * products.length)] ?? "T-shirt",
                description: "This is a description",
                quantity: quantity,
                price: price
            });
        }

        // Generate the order data
        data.push({
            id: generateID("od_"),
            products: productsData,
            price: totalPrice,
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
    const maxPrices = 8000; // 80 chf
    const date = new Date().getTime();    

    let totalPrice = 0;

    // Generate the products data
    const nbProducts = Math.floor(Math.random() * 5) + 1;
    const productsData = [];
    for (let j = 0; j < nbProducts; j++) {
        const quantity = Math.floor(Math.random() * 4) + 1;
        const price = Math.floor(Math.random() * (maxPrices - minPrices + 1) + minPrices);
        totalPrice += quantity * price;
        
        productsData.push({
            id: generateID("pro_"),
            name: products[Math.floor(Math.random() * products.length)] ?? "T-shirt",
            description: "This is a description",
            quantity: quantity,
            price: price
        });
    }


    const data = {
        id: generateID("od_"),
        products: productsData,
        status: statuses[Math.floor(Math.random() * 10) < 8 ? 0 : Math.floor(Math.random() * 10) < 9 ? 1 : 2] ?? "failed",
        price: totalPrice,
        date: date / 1000,

    };

    return data;
}

function generateID(prefix: string) {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = prefix;
    for (let i = 0; i < 24; i++) {
        // Generate a random character
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}


export { getShops, getOneShop, getUniShops, getLogs, getOneLog, getProducts, generateFakeOrders, generateOneFakeOrder };