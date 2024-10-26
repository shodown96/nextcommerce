import { ClientProduct, Option, Variation } from "./product"

export type CartItem = {
    // name: string,
    // variation?: Option
    // images: string[]
    // id: string
    // quantity?: number | 1
    // price: number
    id: string,
    product: ClientProduct,
    quantity?: number | 1,
    selectedVariations: Record<string, string>
}

export type Cart = {
    items: CartItem[],
    totalAmount: number
}