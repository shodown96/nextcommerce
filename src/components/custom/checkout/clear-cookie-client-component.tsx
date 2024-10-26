"use client";

import { useCartStore } from "@/lib/stores/cart";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// if current order cartId is the same as the cookie, clear the cookie
export const ClearCookieClientComponent = ({
	cartId,
	cookieId,
}: {
	cartId: string;
	cookieId: string | undefined;
}) => {
	const router = useRouter();
	const { clearCart } = useCartStore()

	const isSameCart = cartId === cookieId;
	useEffect(() => {
		startTransition(async () => {
			// await clearCart();
			clearCart();
			router.refresh();
		});
	}, [isSameCart, router]);

	return null;
};
