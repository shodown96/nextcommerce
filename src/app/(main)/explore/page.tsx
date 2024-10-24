"use client"

import { getProducts } from '@/actions/product/get-products';
import LoaderContainer from '@/components/custom/loader-container';
import CustomPagination from '@/components/custom/pagination';
import ProductItem from '@/components/custom/product/product-item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious
// } from "@/components/ui/pagination";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PATHS } from '@/lib/constants/paths';
import { delayDebounceFn } from '@/lib/utils';
import { SearchProps } from '@/types/product';
import { Filter, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

export default function ExplorePage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const router = useRouter()
    const [products, setProducts] = useState<PaginatedData>({} as PaginatedData)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState<StringMap>({
        search: "",
        page: 1,
        minPrice: "",
        maxPrice: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        if (id.includes("Price") && !Number(value)) {
            return
        }
        setQuery({
            [id]: value
        })
    }

    const fetchProducts = async (props: SearchProps) => {
        setLoading(true)
        const newProducts = await getProducts(props)
        // const minP = newProducts.items.reduce((prev, current) => {
        //     return current.price < prev ? current.price : prev.price;
        // });
        // const maxP = newProducts.items.reduce((prev, current) => {
        //     return current.price > prev ? current.price : prev.price;
        // });
        setProducts(newProducts)
        setLoading(false)
    }

    const handlePageChange = (page: number) => {
        setQuery({ ...query, page })
        fetchProducts({ ...searchParams, page })
    }


    const handleSearch = () => {
        fetchProducts(searchParams)
    }

    useEffect(() => {
        const { search, page, maxPrice, minPrice } = query
        const dbFn = delayDebounceFn(() => {
            if (search || maxPrice || minPrice) {
                router.push(`${PATHS.EXPLORE}/?q=${search}&page=${page || 1}&maxPrice=${maxPrice}&minPrice=${minPrice}`, {
                    scroll: false
                });
            } else if (page) {
                router.push(`${PATHS.EXPLORE}/?page=${page}`, {
                    scroll: false
                });
            } else {
                router.push(PATHS.EXPLORE, {
                    scroll: false
                });
            }
        })
        return () => clearTimeout(dbFn);
    }, [query]);

    useEffect(() => {
        fetchProducts(searchParams)
    }, [])

    return (
        <div className='p-5'>
            <div className="text-2xl text-center font-medium mb-4">Explore our amazing products</div>
            <div className="md:px-40 flex gap-2 items-center">
                <Input
                    id={'search'}
                    value={query.search}
                    onChange={handleChange}
                    containerClass='w-full flex-1'
                    className='outline-none flex-1 w-full'
                    placeholder='Search by product name, description, and other details.' />

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <Filter className='h-5 w-5' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Filter</h4>
                                <p className="text-sm text-muted-foreground">
                                    Set the filter options for the search.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="minPrice">Min. Price</Label>
                                    <Input
                                        id="minPrice"
                                        value={query.minPrice}
                                        containerClass="col-span-2"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="maxPrice">Max. Price</Label>
                                    <Input
                                        id="maxPrice"
                                        value={query.maxPrice}
                                        containerClass="col-span-2"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Button className='w-ful' onClick={handleSearch}>
                    <span className='max-md:hidden'>Search</span>
                    <Search className='md:hidden' />
                </Button>
            </div>
            <LoaderContainer loading={loading}>
                <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                    {products?.items?.length ? (
                        <>
                            {products.items.map((product, i) => (
                                <ProductItem item={product} key={product.id} index={i} />
                                // make an extension to be able to generate <ProductItem />
                            ))}
                            {/* <Pagination className='justify-end'>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination> */}
                            <CustomPagination
                                totalPages={products.totalPages}
                                currentPage={products.currentPage}
                                onPageChange={handlePageChange} />
                        </>
                    ) : null}
                </div>
            </LoaderContainer>
        </div>
    )
}

