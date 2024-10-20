import { ProductWithoutImages } from "@/lib/validations/product";
import { File, Product } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface CreateProductRequestProps {
    product: ProductWithoutImages & { images: File[] },

}

export type CreateProductResponseProps = {
    name: string;
    price: number;
    variations: JsonValue;
    metadata: JsonValue;
    id: string;
    images: string[];
}

export type ProductResponseProps = CreateProductResponseProps

export type ProductsResponseProps =  Product & {
    images: string[];
}