"use server";

import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getProducts = async ({
    pageSize = DEFAULT_PAGE_SIZE,
    page = 1,
    q: search = "",
    maxPrice = "",
    minPrice = "",
}): Promise<PaginatedData> => {
    try {
        const WHERE_QUERY: Prisma.ProductWhereInput = {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { price: minPrice ? { gte: Number(minPrice) } : undefined },
                { price: maxPrice ? { lte: Number(maxPrice) } : undefined },
            ],
        }

        const products = await prisma.product.findMany({
            where: WHERE_QUERY,
            include: { images: true },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
        })
        console.log(products.map(v => v.name), `"${search}"`)
        if (!products.length) return ({
            total: 0,
            pageSize,
            totalPages: 0,
            currentPage: page,
            items: []
        });

        const total = await prisma.product.count({
            where: WHERE_QUERY,
        });

        const totalPages = Math.ceil(total / pageSize);

        return ({
            total,
            pageSize,
            totalPages,
            currentPage: page,
            items: products.map(v => ({ ...v, images: v.images.map(v => v.url) })),
        })
    } catch (error: unknown) {
        console.error("Error to get projects", error);
        return ({
            total: 0,
            pageSize,
            totalPages: 0,
            currentPage: page,
            items: []
        });
    }
};
