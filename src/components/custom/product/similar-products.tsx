"use client"

import { getSimilarProducts } from "@/actions/product/get-similar-products";
import { PATHS } from "@/lib/constants/paths";
import { formatMoney } from "@/lib/utils";
import { GetProductsResponseProps } from "@/types/product";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { YnsLink } from "../yns-link";

function SimilarProducts({ productId }: { productId: string }) {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<GetProductsResponseProps['products'] | null>(null);
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            if (!products) {
                const result = await getSimilarProducts(productId)
                if (result) {
                    setProducts(result.products)
                }
            }
            setLoading(false)
        }
        fetchProduct()
    }, [products])

    if (loading) return (
        <div className="flex items-center justify-center p-2">
            <Loader2 className="animate-spin" />
        </div>
    )

    return (
        <section className="py-12">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.length ? products.map((product) => {
                    const link = `${PATHS.PRODUCTS}/${product.id}`
                    return (
                        <div key={product.id} className="bg-card rounded overflow-hidden shadow group">
                            {product.images.length && (
                                <YnsLink href={link} className="block" prefetch={false}>
                                    <Image
                                        className={
                                            "w-full rounded-lg bg-neutral-100 object-cover object-center group-hover:opacity-80 transition-opacity"
                                        }
                                        src={product.images[0]}
                                        width={300}
                                        height={300}
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                                        alt=""
                                    />
                                </YnsLink>
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    <YnsLink
                                        href={link}
                                        className="hover:text-primary"
                                        prefetch={false}>
                                        {product.name}
                                    </YnsLink>
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span>
                                        {formatMoney({ amount: product.price })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                }) : null}
            </div>
        </section>
    )
}

export default SimilarProducts