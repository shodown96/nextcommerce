import { useProductStore } from '@/lib/stores/product'

function ProductSummary() {
    const { productParams } = useProductStore()

    return (
        <div className='text-white p-5'>
            <h4 className='text-xl font-medium mb-4'>Summary</h4>
            <h4 className='text-base font-medium mb-2'>Details</h4>
            <div>Name: {productParams.name}</div>
            <div>Price: {productParams.price}</div>
            <div>Description: {productParams.description}</div>
            <div className="border-b my-4" />
            <h4 className='text-base font-medium mb-2'>Varitations</h4>
            {productParams.variations?.map(v => (
                <div key={v.label}>{v.label}: {v.options.map(o => o.label).join(", ")}</div>
            ))}
            <div className="border-b my-4" />
            <h4 className='text-base font-medium mb-2'>Metadata</h4>
            {productParams.metadata?.map(v => (
                <div key={v.label}>{v.label}: {v.value}</div>
            ))}
        </div>
    )
}

export default ProductSummary