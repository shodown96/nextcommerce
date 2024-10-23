import { Option } from "./product"

export type CartItem = {
    name: string,
    variation?: Option
    images: string[]
    id: string
    quantity?: number | 1
    price: number
}