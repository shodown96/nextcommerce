import ProductItem from "./product-item";

export const ProductList = async ({ products }: { products: PaginatedData }) => {
	return (
		<>
			<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{products.items.map((product, i) => (
					<ProductItem item={product} key={product.id} index={i} />
					// make an extension to be able to generate <ProductItem />
				))}
			</div>
		</>
	);
};
