"use client";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/constants/paths";
import { useCartStore } from "@/lib/stores/cart";
import { generateUniqueId } from "@/lib/utils";
import { ClientProduct } from "@/types/product";
import { useAuth } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const AddToCartButton = ({
	product,
	disabled,
	selectedVariations
}: {
	product: ClientProduct;
	disabled?: boolean;
	selectedVariations: Record<string, string>
}) => {
	const router = useRouter();
	const { userId } = useAuth()
	const [pending, startTransition] = useTransition();
	const addToCart = useCartStore(s => s.addToCart)
	return (
		<Button
			size="lg"
			type="submit"
			className="rounded-full text-lg py-6"
			onClick={async () => {
				const id = generateUniqueId({ ...selectedVariations, id: product.id })
				addToCart({ product, selectedVariations, id })
				if (product.clerkUserId === userId) {
					startTransition(() => router.push(`${PATHS.PRODUCTS}/${product.id}/update`, { scroll: false }));
				} else {
					startTransition(() => router.push(`${PATHS.CART_OVERLAY}`, { scroll: false }));
				}
			}}
			aria-disabled={pending}
			disabled={pending || disabled}
		>
			{pending ? (
				<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
			) : product.clerkUserId === userId ? "Update" : "Add to cart"}
		</Button>
	);
};
