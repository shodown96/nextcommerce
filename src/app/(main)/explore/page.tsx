import React from 'react'
import ExploreContainer from './container'
import { getProducts } from '@/actions/product/get-products';

async function ExplorePage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const products = await getProducts(searchParams)
    return (
        <ExploreContainer initialProducts={products} searchParams={searchParams} />
    )
}

export default ExplorePage