import { getProducts } from '@/actions/product/get-products';
import { Navbar } from '@/components/custom/navbar/navbar';
import { ProductList } from '@/components/custom/product/product-list';
import { YnsLink } from '@/components/custom/yns-link';
import { PATHS } from '@/lib/constants/paths';
import Image from 'next/image';

export default async function HomePage() {
  const products = await getProducts({ pageSize: 6 });
  return (
    <div className='bg-[#f6f5f5]'>
      <Navbar />
      <main className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-6 sm:px-6 lg:px-8'>
        <section className="rounded bg-neutral-100 py-8 sm:py-12">
          <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
            <div className="max-w-md space-y-4">
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Discover our Curated Collection
              </h2>
              <p className="text-pretty text-neutral-600">Explore our carefully selected products for your home and lifestyle.</p>
              <YnsLink
                className="inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-6 text-white font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                href={PATHS.EXPLORE}
              >
                Shop Now
              </YnsLink>
            </div>
            <Image
              alt="Cup of Coffee"
              loading="eager"
              priority={true}
              className="rounded"
              height={450}
              width={450}
              src="/images/coffee.jpg"
              style={{
                objectFit: "cover",
              }}
              sizes="(max-width: 640px) 70vw, 450px"
            />
          </div>
        </section>

        <ProductList products={products} />

        {/* <section className="w-full py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            { categorySlug: "accessories", src: AccessoriesImage },
            { categorySlug: "apparel", src: ApparelImage },
          ].map(({ categorySlug, src }) => (
            <CategoryBox key={categorySlug} categorySlug={categorySlug} src={src} />
          ))}
        </div>
      </section> */}
      </main>
    </div>
  )
}
