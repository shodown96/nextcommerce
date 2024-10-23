"use client"
import { YnsLink } from "@/components/custom/yns-link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart";
import { formatMoney, formatProductName, totalPrice } from "@/lib/utils";
import Image from "next/image";
import { CartAsideContainer } from "./cart-aside";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartModalPage() {
	const { cart, addToCart, reduceQuantity, removeProduct } = useCartStore()

	return (
		<CartAsideContainer withAnimations={true}>
			<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold text-neutral-700">Shopping Cart</h2>
					<YnsLink replace href="/cart" className="text-sm text-muted-foreground underline">
						(open full view)
					</YnsLink>
				</div>

				<div className="mt-8">
					<ul role="list" className="-my-6 divide-y divide-neutral-200">
						{cart.items.map((item) => (
							<li
								key={item.id}
								className="grid grid-cols-[4rem,1fr,max-content] grid-rows-[auto,auto] gap-x-4 gap-y-2 py-6"
							>
								{item.images[0] ? (
									<div className="col-span-1 row-span-2 bg-neutral-100">
										<Image
											className="aspect-square rounded-md object-cover"
											src={item.images[0]}
											width={80}
											height={80}
											alt=""
										/>
									</div>
								) : (
									<div className="col-span-1 row-span-2" />
								)}

								<h3 className="-mt-1 font-semibold leading-tight">
									{formatProductName(item.name, item.variation?.value)}
								</h3>
								<p className="text-sm font-medium leading-none text-right">
									{formatMoney({ amount: item.price })}
								</p>
								<p className="self-end text-sm font-medium text-muted-foreground">
									Quantity: {item.quantity}
								</p>
								<div className="self-end flex gap-2 items-center">
									<Plus className="h-5 cursor-pointer" onClick={() => addToCart(item)} />
									<Minus className="h-5 cursor-pointer" onClick={() => reduceQuantity(item)} />
									<Trash2 className="h-5 cursor-pointer text-red-600" onClick={() => removeProduct(item)} />

								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="border-t border-neutral-200 px-4 py-6 sm:px-6">
				<div
					id="cart-overlay-description"
					className="flex justify-between text-base font-medium text-neutral-900"
				>
					<p>Total</p>
					<p>
						{formatMoney({ amount: totalPrice(cart.items) })}
					</p>
				</div>
				<p className="mt-0.5 text-sm text-neutral-500">Shipping and taxes will be added at the next step</p>
				<Button asChild={true} size={"lg"} className="mt-6 w-full rounded-full text-lg">
					<YnsLink href="/cart">Go to payment</YnsLink>
				</Button>
			</div>
		</CartAsideContainer>
	);
}
