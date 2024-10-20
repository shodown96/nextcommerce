import { getProduct } from '@/actions/product/get-product'

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id)
    return (
        <div>
            <div>ProductPage</div>
            {JSON.stringify(product)}
        </div>
    )
}
