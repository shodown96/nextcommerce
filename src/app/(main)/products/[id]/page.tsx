"use client"

import { getProduct } from '@/actions/product/get-product';
import { AddToCartButton } from '@/components/custom/add-to-cart-button';
import ProductMetadata from '@/components/custom/product/product-metadata';
import ProductReviews from '@/components/custom/product/product-reviews';
import SimilarProducts from '@/components/custom/product/similar-products';
import { PATHS } from '@/lib/constants/paths';
import { cn, deslugify, formatMoney } from '@/lib/utils';
import { ClientProduct } from '@/types/product';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function ProductPage({ params }: {
    params: { id: string },
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [product, setProduct] = useState<ClientProduct | null>(null);
    const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});

    const handleVariationChange = (variant: string, option: string) => {
        if (selectedVariations?.[variant] === option) {
            setSelectedVariations(prev => ({
                ...prev,
                [variant]: ""
            }));
            return null
        }
        setSelectedVariations(prev => ({
            ...prev,
            [variant]: option
        }));
    };


    useEffect(() => {
        if (searchParams) {
            const initialVariations: Record<string, string> = {};
            // Extract variation info from URL query params
            for (const [key, value] of searchParams.entries()) {
                initialVariations[key] = value;
            }
            // Set the initial state with the URL params
            setSelectedVariations(initialVariations);
        }
    }, [searchParams]);

    // // Update URL when variations change
    useEffect(() => {
        if (product && !pathname.includes(PATHS.CART_OVERLAY)) {
            const queryParams = new URLSearchParams();

            Object.keys(selectedVariations).forEach(variant => {
                queryParams.append(variant, selectedVariations[variant]);
            });
            router.push(`${PATHS.PRODUCTS}/${product.id}?${queryParams.toString()}`, {});

        }
    }, [selectedVariations]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!product) {
                const result = await getProduct(params.id)
                if (result) {
                    setProduct(result)
                }
            }
        }
        fetchProduct()
    }, [product])

    if (!product) return null

    return (
        <div className='p-10'>
            <div className="mt-4 grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-5 lg:col-start-8">
                    <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
                        {product.name}
                    </h1>
                    {product.price && (
                        <p>{formatMoney({ amount: product.price, })}  </p>
                    )}
                    {/* <div className="mt-2">{product.stock <= 0 && <div>Out of stock</div>}</div> */}
                </div>

                <div className="lg:col-span-7 lg:row-span-3 lg:row-start-1">
                    <h2 className="sr-only">Images</h2>

                    <div className="grid gap-4 lg:grid-cols-3">
                        {product.images.map((image, idx) => (
                            <Image
                                key={image}
                                className={cn(
                                    idx === 0 ? "lg:col-span-3" : "col-span-1",
                                    "w-full rounded-lg bg-neutral-100 object-cover object-center transition-opacity",
                                )}
                                src={image}
                                width={idx === 0 ? 700 : 700 / 3}
                                height={idx === 0 ? 700 : 700 / 3}
                                sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
                                loading="eager"
                                priority
                                alt=""
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-8 lg:col-span-5">
                    <section>
                        <h2 className="sr-only">Description</h2>
                        <div className="prose text-secondary-foreground">
                            {product.description}
                        </div>
                    </section>

                    {product.variations.length ? (
                        <div className="grid gap-2">
                            <p className="text-base font-medium">
                                Variations
                            </p>
                            <ul role="list" className="flex flex-col gap-4" aria-labelledby="variant-label">
                                {product.variations.map((variant) => {
                                    return (
                                        <div key={variant.label}>
                                            <p className="text-[14px] font-medium">
                                                {variant.label}
                                            </p>
                                            <div className="flex flex-col gap-2">
                                                {variant.options.map((option, i) => {
                                                    const isSelected = selectedVariations?.[variant.label] === option.label
                                                    return (
                                                        <li key={option.label}>
                                                            <div
                                                                onClick={() => handleVariationChange(variant.label, option.label)}
                                                                className={cn(
                                                                    "flex cursor-pointer items-center justify-center gap-2 rounded-md border p-2 transition-colors hover:bg-neutral-100",
                                                                    isSelected && "border-black bg-neutral-50 font-medium",
                                                                )}
                                                                aria-selected={isSelected}
                                                            >
                                                                {deslugify(option.label)}
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : null}
                    <AddToCartButton product={product} />
                </div>
            </div>
            <ProductMetadata metadata={product.metadata} />
            <SimilarProducts productId={params.id} />
            {/* TODO SIMILAR PRODUCTS AND REVIEWS */}
            <ProductReviews />
        </div>
    )
}
