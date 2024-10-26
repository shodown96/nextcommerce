"use server";

import prisma from "@/lib/prisma";
import { GetProductsResponseProps } from "@/types/product";

export const getSimilarProducts = async (productId?: string): Promise<GetProductsResponseProps | null> => {
    try {
        const products = await prisma.product.findMany({
            include: { images: true }
        })
        if (!products.length) return null;

        return { products: products.map(v => ({ ...v, images: v.images.map(v => v.url) })) }
    } catch (error: unknown) {
        console.error("Error to get projects", error);
        return null;
    }
};
