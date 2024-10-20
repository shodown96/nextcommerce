"use server";

import prisma from "@/lib/prisma";
import { ProductsResponseProps } from "@/types/product";
import { Product } from "@prisma/client";

export const getProducts = async () => {
    try {

        const products = await prisma.product.findMany({
            include: { images: true }
        })
        if (!products.length) return [];

        return products.map(v => ({ ...v, images: v.images.map(v => v.url) }))
    } catch (error: unknown) {
        console.error("Error to get projects", error);
        return [];
    }
};
