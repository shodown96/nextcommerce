"use server";

import prisma from "@/lib/prisma";
import { GetProductsResponseProps } from "@/types/product";
import { auth } from "@clerk/nextjs/server";

export const getUserProducts = async (): Promise<GetProductsResponseProps | null> => {
    try {
        const { userId } = auth()

        if (!userId) {
            console.error("User not logged in");
            return null
        }
        const products = await prisma.product.findMany({
            where: { clerkUserId: userId },
            include: { images: true }
        })
        if (!products.length) return null;

        return { products: products.map(v => ({ ...v, images: v.images.map(v => v.url) })) as any }
    } catch (error: unknown) {
        console.error("Error to get projects", error);
        return null;
    }
};
