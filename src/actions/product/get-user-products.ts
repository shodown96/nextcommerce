"use server";

import prisma from "@/lib/prisma";
import { ProductsResponseProps } from "@/types/product";
import { auth } from "@clerk/nextjs/server";

export const getUserProducts = async (): Promise<ProductsResponseProps | any[]> => {
    try {
        const { userId } = auth()

        if (!userId) {
            console.error("User not logged in");
            return []
        }
        const products = await prisma.product.findMany({
            where: { clerkUserId: userId },
            include: { images: true }
        })
        if (!products.length) return [];

        return products.map(v => ({ ...v, images: v.images.map(v => v.url) }))
    } catch (error: unknown) {
        console.error("Error to get projects", error);
        return [];
    }
};
