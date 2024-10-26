import { ProductWithoutImages } from "@/lib/validations/product";
import { File, Product } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export type Option = { label: string, value: string }

export interface Variation {
    label: string;
    options: Option[];
}

export interface SearchProps {
    pageSize?: number
    page?: number
    search?: string
}

export interface ClientProduct {
    id: string;
    name: string;
    price: number;
    metadata: Option[];
    variations: Variation[];
    description: string;
    stock: number;
    discountAmount: number;
    clerkUserId: string | null;
    accountId: string | null;
    images: string[];
}

export type ProductWithImages = Product & { images: string[] }


export interface CreateProductRequestProps {
    product: ProductWithoutImages & { images: File[] },
}

export interface CreateProductResponseProps {
    product: ProductWithImages
}

export interface UpdateProductRequestProps extends CreateProductRequestProps {
    productId: string
}

export interface UpdateProductResponseProps extends CreateProductResponseProps { }

export interface GetProductResponseProps extends CreateProductResponseProps { }

export interface GetProductsResponseProps {
    products: ProductWithImages[]
}

