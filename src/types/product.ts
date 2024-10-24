import { ProductWithoutImages } from "@/lib/validations/product";
import { File, Product } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface CreateProductRequestProps {
    product: ProductWithoutImages & { images: File[] },

}
export interface UpdateProductRequestProps extends CreateProductRequestProps {
    productId: string
}
export type CreateProductResponseProps = {
    name: string;
    price: number;
    description: string
    variations: any;
    metadata: any;
    id: string;
    images: string[];
    stock: number;
    discountAmount: number;
    clerkUserId: string | null;
    accountId: string | null;
}

export interface UpdateProductResponseProps extends CreateProductResponseProps {
}

export type Option = { label: string, value: string }

export type ProductResponseProps = CreateProductResponseProps

export interface ProductsResponseProps {
    images: string[];
    id: string;
    name: string;
    price: number;
    metadata: JsonValue;
    variations: JsonValue;
    description: string;
    stock: number;
    discountAmount: number;
    clerkUserId: string | null;
    accountId: string | null;
}[]

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

export interface Variation {
    label: string;
    options: Option[];
}


export interface SearchProps {
    pageSize ?: number
    page ?: number
    search ?: string
}