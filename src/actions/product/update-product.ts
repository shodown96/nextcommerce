"use server";

import prisma from "@/lib/prisma";
import { UpdateProductRequestProps, UpdateProductResponseProps } from "@/types/product";
import { auth } from "@clerk/nextjs/server";

export const updateProduct = async ({
    product,
    productId

}: UpdateProductRequestProps): Promise<UpdateProductResponseProps | null> => {
    try {
        const { userId } = auth()

        if (!userId) {
            console.error("User not logged in");
            return null
        }

        const { images, ...rest } = product
        // not added clerkuserid
        const created = await prisma.product.update({
            where: { id: productId },
            data: {
                ...rest,
                clerkUserId: userId,
                images: images ? { connect: images } : undefined
            },
            include: { images: true }
        })
        return { ...created, images: created.images.map(v => v.url) }
    } catch (error: unknown) {
        console.error("Error to create product", error);
        return null;
    }
};
