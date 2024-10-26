"use client"
import { CartEmpty } from "@/components/custom/checkout/cart-empty";
import { CartSummaryTable } from "@/components/custom/checkout/cart-summary-table";
import CheckoutCard from "@/components/custom/checkout/checkout-card";
import { useCartStore } from "@/lib/stores/cart";

export default function CartPage() {
  const { cart } = useCartStore();
  if (cart.items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <>
      <div className="my-8 xl:col-span-7">
        <div className="sticky top-1">
          <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight">Your cart</h1>
          <CartSummaryTable cart={structuredClone(cart)} />
        </div>
      </div>
      <div className="my-8 max-w-[65ch] xl:col-span-5">
        <CheckoutCard cart={cart} />
      </div>
    </>
  );
}