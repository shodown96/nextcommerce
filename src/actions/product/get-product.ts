"use server";

import prisma from "@/lib/prisma";
import { GetProductResponseProps } from "@/types/product";


const ProductsCache: any[] = []

export const getProduct = async (productId: string): Promise<GetProductResponseProps | null> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { images: true }
        })
        if (!product) return null;
        const result = { ...product, images: product.images.map(v => v.url) }

        return { product: result }
    } catch (error: unknown) {
        console.error("Error to get project", error);
        const cachedProduct = ProductsCache.find(v => v.id === productId)
        return { product: cachedProduct };
    }
};
