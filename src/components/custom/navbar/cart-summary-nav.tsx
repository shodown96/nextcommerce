
"use client"
import { YnsLink } from "@/components/custom/yns-link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCartStore } from "@/lib/stores/cart";
import { formatMoney, calculateTotalCartAmount } from "@/lib/utils";
import { ShoppingBag, ShoppingBagIcon } from "lucide-react";

const CartFallback = () => (
	<div className="mr-2.5 h-6 w-6 opacity-30">
		<ShoppingBagIcon />
	</div>
);

export const CartSummaryNav = () => {
	return (
			<CartSummaryNavInner />
	);
};

const CartSummaryNavInner = () => {
	const { cart } = useCartStore()
	if (!cart) {
		return <CartFallback />;
	}
	if (!cart.items.length) {
		return <CartFallback />;
	}

	const total = calculateTotalCartAmount(cart.items)
	const totalItems = cart.items.reduce((acc, item) => acc + (item.quantity || 1), 0);

	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<div>
						<YnsLink
							href="/cart-overlay"
							scroll={false}
							className="relative mr-2.5 block h-6 w-6"
							prefetch={true}
						>
							<ShoppingBag className="text-white" />
							<span className="absolute bottom-0 right-0 inline-flex h-5 w-5 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-red-400 text-center text-xs">
								<span className="sr-only">Items in cart: </span>
								{totalItems}
							</span>
							<span className="sr-only">
								Total:{" "}
								{formatMoney({ amount: total })}
							</span>
						</YnsLink>
					</div>
				</TooltipTrigger>
				<TooltipContent side="left" sideOffset={25}>
					<p>Total items: {totalItems}</p>
					<p>
						Total: {formatMoney({ amount: total })}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
