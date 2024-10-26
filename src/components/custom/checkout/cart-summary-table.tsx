"use client";

import {
	CartAmountWithSpinner,
	CartItemLineTotal,
	CartItemQuantity,
} from "@/components/custom/checkout/cart-items.client";
import { formatMoney, formatProductName, calculateTotalCartAmount } from "@/lib/utils";
// import { FormatDeliveryEstimate } from "@/ui/checkout/shipping-rates-section";
import { PATHS } from "@/lib/constants/paths";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { YnsLink } from "../yns-link";
import { Cart } from "@/types/cart";

export const CartSummaryTable = ({ cart }: { cart: Cart }) => {
	const total = calculateTotalCartAmount(cart.items);

	return (
		<form>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="hidden w-24 sm:table-cell">
							<span className="sr-only"> Image </span>
						</TableHead>
						<TableHead className=""> Product </TableHead>
						<TableHead className="w-1/6 min-w-32"> Price </TableHead>
						<TableHead className="w-1/6 min-w-32"> Quantity </TableHead>
						<TableHead className="w-1/6 min-w-32 text-right"> Total </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{cart.items.map((item) => {
						return (
							<TableRow key={item.id}>
								<TableCell className="hidden sm:table-cell sm:w-24">
									{item.product.images[0] && (
										<Image
											className="aspect-square rounded-md object-cover"
											src={item.product.images[0]}
											width={96}
											height={96}
											alt=""
										/>
									)}
								</TableCell>
								<TableCell className="font-medium">
									<YnsLink
										className="transition-colors hover:text-muted-foreground"
										href={`${PATHS.PRODUCTS}/${item.product.id}`}
									>
										{formatProductName(
											item.product.name,
											item.selectedVariations
										)}
									</YnsLink>
								</TableCell>
								<TableCell>
									{formatMoney({ amount: item.product.price ?? 0, })}
								</TableCell>
								<TableCell>
									<CartItemQuantity
										quantity={item.quantity || 1}
										productId={item.id}
										onChange={() => { }}
									/>
								</TableCell>
								<TableCell className="text-right">
									<CartItemLineTotal
										quantity={item.quantity || 1}
										price={item.product.price ?? 0}
										productId={item.id}
									/>
								</TableCell>
							</TableRow>
						);
					})}
					{/* {cart.shippingRate && (
						<TableRow>
							<TableCell className="hidden sm:table-cell sm:w-24"></TableCell>
							<TableCell className="font-medium" colSpan={3}>
								{cart.shippingRate.display_name}{" "}
								<span className="text-muted-foreground">
									<FormatDeliveryEstimate estimate={cart.shippingRate.delivery_estimate} />
								</span>
							</TableCell>
							<TableCell className="text-right">
								{cart.shippingRate.fixed_amount &&
									formatMoney({
										amount: cart.shippingRate.fixed_amount.amount,
										currency: cart.shippingRate.fixed_amount.currency,
										locale,
									})}
							</TableCell>
						</TableRow>
					)} */}
				</TableBody>
				<TableFooter>
					{/* {optimisticCart.cart.taxBreakdown.map((tax, idx) => (
						<TableRow key={idx + tax.taxAmount} className="font-normal">
							<TableCell className="hidden w-24 sm:table-cell"></TableCell>
							<TableCell colSpan={3} className="text-right">
								{tax.taxType.toLocaleUpperCase()} {tax.taxPercentage}%
							</TableCell>
							<TableCell className="text-right">
								<CartAmountWithSpinner total={tax.taxAmount} currency={currency} />
							</TableCell>
						</TableRow>
					))} */}
					<TableRow className="text-lg font-bold">
						<TableCell className="hidden w-24 sm:table-cell"></TableCell>
						<TableCell colSpan={3} className="text-right">
							TOTAL
						</TableCell>
						<TableCell className="text-right">
							<CartAmountWithSpinner total={total} />
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</form>
	);
};
