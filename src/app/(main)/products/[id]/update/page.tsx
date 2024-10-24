"use client"
import { createProduct } from '@/actions/product/create-product';
import { getProduct } from '@/actions/product/get-product';
import AuthTitle from '@/components/custom/auth-title';
import LoaderContainer from '@/components/custom/loader-container';
import ProductSummary from '@/components/custom/product/product-summary';
import Tabs from '@/components/custom/tabs';
import ProductDetailsForm from '@/components/forms/product-details';
import ProductExtrasForm from '@/components/forms/product-extras';
import ProductImagesForm from '@/components/forms/product-images';
import ProductVariationsForm from '@/components/forms/product-variations';
import { Input } from '@/components/ui/input';
import { MESSAGES } from '@/lib/constants/messages';
import { useProductStore } from "@/lib/stores/product";
import { useAuth } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

const TAB_ITEMS = ['details', 'variations', 'metadata', 'images']

function UpdateProductPage({ params }: { params: { id: string } }) {
    const [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(false)
    const user = useAuth()
    const { productParams, setProductParams } = useProductStore()

    const handleSubmit = async (values: any) => {
        if (tab < TAB_ITEMS.length - 1) {
            setTab(tab + 1)
            setProductParams(values)
        } else {
            const created = await createProduct(productParams as any)
            if (created) {
                toast.success(MESSAGES.Success)
            }
        }
    }

    const goBack = () => {
        if (tab > 0) {
            setTab(tab - 1)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const result = await getProduct(params.id)
            if (result) {
                if (result.clerkUserId === user.userId)
                    setProductParams(result)
            }
            setLoading(false)
        }
        fetchProduct()
    }, [params.id])

    return (

        <LoaderContainer loading={loading}>
            <div className='p-10'>
                <div className="flex flex-wrap justify-center gap-10">
                    <div className="xl:flex-[0.6] pt-5">
                        <AuthTitle
                            title={'Update Product'}
                            description='Update details about your product' />

                        <div className="max-lg:hidden">
                            <Tabs
                                activeTab={tab}
                                setActiveTab={setTab}
                                clickable={false}
                                items={TAB_ITEMS}
                            />
                        </div>
                        <div className="lg:hidden">
                            <Input disabled value={TAB_ITEMS[tab]} className='capitalize' />
                        </div>
                        <br />
                        {tab === 0 ? (
                            <ProductDetailsForm onSubmit={handleSubmit} initalValues={productParams} productId={params.id} />
                        ) : null}
                        {tab === 1 ? (
                            <ProductVariationsForm onSubmit={handleSubmit} initalValues={productParams} goBack={goBack} productId={params.id} />
                        ) : null}
                        {tab === 2 ? (
                            <ProductExtrasForm onSubmit={handleSubmit} initalValues={productParams} goBack={goBack} productId={params.id} />
                        ) : null}
                        {tab === 3 ? (
                            <ProductImagesForm onSubmit={handleSubmit} initalValues={productParams} goBack={goBack} productId={params.id} />
                        ) : null}
                    </div>

                    <div className='xl:flex-[0.5]'>
                        <div className="bg-primary rounded-lg min-h-[80vh] w-full min-w-[300px]">
                            <ProductSummary />
                        </div>
                    </div>
                </div>
            </div>
        </LoaderContainer>
    )
}

export default UpdateProductPage