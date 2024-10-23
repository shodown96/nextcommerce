"use client"

import AuthTitle from '@/components/custom/auth-title';
import ProductSummary from '@/components/custom/product/product-summary';
import Tabs from '@/components/custom/tabs';
import ProductDetailsForm from '@/components/forms/product-details';
import ProductExtrasForm from '@/components/forms/product-extras';
import ProductImagesForm from '@/components/forms/product-images';
import ProductVariationsForm from '@/components/forms/product-variations';
import { Input } from '@/components/ui/input';
import { useProductStore } from '@/lib/stores/product';
import { useState } from 'react';

const TAB_ITEMS = ['details', 'variations', 'metadata', 'images']
function NewProductPage() {
  const [tab, setTab] = useState(0)
  const { productParams } = useProductStore()

  const handleSubmit = async (values: any) => {
    if (tab < TAB_ITEMS.length - 1) {
      setTab(tab + 1)
    }
  }

  const goBack = () => {
    if (tab > 0) {
      setTab(tab - 1)
    }
  }

  return (
    <div className='p-10'>
      <div className="flex flex-wrap justify-center gap-10">
        <div className="xl:flex-[0.6] pt-5">
          <AuthTitle
            title='New Product'
            description='Tell us more about your product' />

          <div className="max-lg:hidden">
            <Tabs
              activeTab={tab}
              setActiveTab={setTab}
              clickable={false}
              items={TAB_ITEMS}
            />
          </div>
          <div className="lg:hidden">
            <Input disabled value={TAB_ITEMS[tab]} className='capitalize'/>
          </div>
          <br />
          {tab === 0 ? (
            <ProductDetailsForm onSubmit={handleSubmit} initalValues={productParams} />
          ) : null}
          {tab === 1 ? (
            <ProductVariationsForm onSubmit={handleSubmit} initalValues={productParams} goBack={goBack} />
          ) : null}
          {tab === 2 ? (
            <ProductExtrasForm onSubmit={handleSubmit} initalValues={productParams} goBack={goBack} />
          ) : null}
          {tab === 3 ? (
            <ProductImagesForm onSubmit={handleSubmit} initalValues={productParams} goBack={goBack} />
          ) : null}
        </div>

        <div className='xl:flex-[0.5]'>
          <div className="bg-primary rounded-lg min-h-[80vh] w-full min-w-[300px]">
            <ProductSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProductPage