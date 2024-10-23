"use client"

import { formatMoney } from '@/lib/utils';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { YnsLink } from '../yns-link';
import { PATHS } from '@/lib/constants/paths';

function ProductItem({
    item,
    // blurDataUrl,
}: {
    item: Product & {
        images: string[];
    },
    // blurDataUrl: string
}) {
    return (
        <div className="group">
            <YnsLink href={`${PATHS.PRODUCTS}/${item.id}`}>
                <article className="overflow-hidden rounded border bg-white">
                    {item.images[0] ? (
                        <div className="aspect-square w-full overflow-hidden bg-slate-100">
                            <Image
                                className="group-hover:rotate hover-perspective w-full h-full bg-slate-100 object-cover object-center transition-opacity group-hover:opacity-75"
                                src={item.images[0]}
                                width={768}
                                height={768}
                                // loading={idx < 3 ? "eager" : "lazy"}
                                // priority={idx < 3}
                                loading='lazy'
                                sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
                                alt=""
                            />
                        </div>
                    ) : (

                        <div className="aspect-square w-full overflow-hidden bg-slate-100">
                        </div>
                    )}
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-slate-700">{item.name}</h2>
                        <footer className="text-sm font-medium text-slate-900">
                            {item.price && (
                                <p>
                                    {formatMoney({
                                        amount: item.price,
                                        currency: 'USD',
                                    })}
                                </p>
                            )}
                        </footer>
                    </div>
                </article>
            </YnsLink>
        </div>
    )
}

export default ProductItem