"use client"

import { getProducts } from '@/actions/product/get-products'
import ProductItem from '@/components/custom/product-item'
import getBlurredImageUrl from '@/lib/images'
import { ProductsResponseProps } from '@/types/product'
import React, { useEffect, useState } from 'react'

export default function ExplorePage() {

    const [blurDataUrls, setBlurDataUrls] = useState<Record<string, string>>({})
    const [products, setProducts] = useState<ProductsResponseProps[]>([])
    useEffect(() => {
        const gget = async () => {
            const products = await getProducts()
            setProducts(products)
            // if (products.length) {
            //     products.map(async (v) => {
            //         const blurDataUrl = await getBlurredImageUrl(v.images?.[0])
            //         setBlurDataUrls({ ...blurDataUrls, [v.id]: blurDataUrl })
            //     })
            // }
        }
        gget()
    }, [])
    return (
        <div className='p-5'>
            <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {products.length ? products.map(product => (
                    <ProductItem item={product} key={product.id} />
                    // make an extension to be able to generate <ProductItem/>
                )) : null}
            </div>
        </div>
    )
}
