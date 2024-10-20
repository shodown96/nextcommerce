"use client"

import { createProduct } from '@/actions/product/create-product';
import AuthTitle from '@/components/custom/auth-title';
import Tabs from '@/components/custom/tabs';
import ProductDetailsForm from '@/components/forms/product-details';
import ProductExtrasForm from '@/components/forms/product-extras';
import ProductImagesForm from '@/components/forms/product-images';
import ProductVariationsForm from '@/components/forms/product-variations';
import { MESSAGES } from '@/lib/constants/messages';
import { useProductStore } from '@/lib/stores/product';
import { useState } from 'react';
import toast from 'react-hot-toast';

const TAB_ITEMS = ['details', 'variations', 'metadata', 'images']
function NewProductPage() {
  const [tab, setTab] = useState(0)
  const { newProductParams } = useProductStore()

  const handleSubmit = async (values: any) => {
    if (tab < TAB_ITEMS.length - 1) {
      setTab(tab + 1)
    } else {
      const created = await createProduct(newProductParams as any)
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

  return (
    <div className='p-10'>
      <AuthTitle
        title='New Product'
        description='Tell us more about your product' />

      <Tabs
        activeTab={tab}
        setActiveTab={setTab}
        clickable={false}
        items={TAB_ITEMS}
      />
      <div className="flex gap-10">
        <div className="xl:flex-[0.5] pt-5">
          {tab === 0 ? (
            <ProductDetailsForm onSubmit={handleSubmit} initalValues={newProductParams} />
          ) : null}
          {tab === 1 ? (
            <ProductVariationsForm onSubmit={handleSubmit} initalValues={newProductParams} goBack={goBack} />
          ) : null}
          {tab === 2 ? (
            <ProductExtrasForm onSubmit={handleSubmit} initalValues={newProductParams} goBack={goBack} />
          ) : null}
          {tab === 3 ? (
            <ProductImagesForm onSubmit={handleSubmit} initalValues={newProductParams} goBack={goBack} />
          ) : null}
        </div>

        <div className='xl:flex-[0.5]'>

        </div>
      </div>
    </div>
  )
}

export default NewProductPage