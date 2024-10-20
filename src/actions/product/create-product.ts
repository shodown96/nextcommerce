"use server";

import prisma from "@/lib/prisma";
import { CreateProductRequestProps, CreateProductResponseProps } from "@/types/product";
import { auth } from "@clerk/nextjs/server";

export const createProduct = async ({
    product
}: CreateProductRequestProps): Promise<CreateProductResponseProps | null> => {
    try {
        const { userId } = auth()

        if (!userId) {
            console.error("User not logged in");
            return null
        }

        const { images, ...rest } = product
        // not added clerkuserid
        const created = await prisma.product.create({
            data: {
                ...rest,
                clerkUserId: userId,
                images: { connect: images }
            },
            include: { images: true }
        })
        return { ...created, images: created.images.map(v => v.url) }
    } catch (error: unknown) {
        console.error("Error to create product", error);
        return null;
    }
};
