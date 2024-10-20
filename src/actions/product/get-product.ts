"use server";

import prisma from "@/lib/prisma";
import { ProductResponseProps } from "@/types/product";

export const getProduct = async (productId: string): Promise<ProductResponseProps | null> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { images: true }
        })
        if (!product) return null;

        return { ...product, images: product.images.map(v => v.url) }
    } catch (error: unknown) {
        console.error("Error to update project", error);
        return null;
    }
};
