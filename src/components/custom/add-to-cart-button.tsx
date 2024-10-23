"use client";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/constants/paths";
import { useCartStore } from "@/lib/stores/cart";
import { ClientProduct } from "@/types/product";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const AddToCartButton = ({
	product,
	disabled,
}: {
	product: ClientProduct;
	disabled?: boolean;
}) => {
	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const addToCart = useCartStore(s => s.addToCart)
	return (
		<Button
			size="lg"
			type="submit"
			className="w-full rounded-full text-lg"
			onClick={async () => {
				addToCart(product)
				startTransition(() => router.push(`${PATHS.CART_OVERLAY}`,{scroll:false}));
			}}
			aria-disabled={pending}
			disabled={pending || disabled}
		>
			{pending ? (
				<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
			) : disabled ? (
				"Disabled"
			) : (
				"Add to cart"
			)}
		</Button>
	);
};
