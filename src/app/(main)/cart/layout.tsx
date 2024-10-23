
// import type { ReactNode } from "react";

// import { CartEmpty } from "@/components/custom/checkout/cart-empty";
// import { CartSummaryTable } from "@/components/custom/checkout/cart-summary-table";
// import { StripeElementsContainer } from "@/components/custom/checkout/stripe-elements-container";
// import { useCartStore } from "@/lib/stores/cart";

// export default function CartLayout({ children }: { children: ReactNode }) {
//   const { cart } = useCartStore();
//   if (
//     // !cart?.cart.client_secret || 
//     cart.items.length === 0) {
//     return <CartEmpty />;
//   }
//   // const { stripeAccount, publishableKey } = {};

//   return (
//     <StripeElementsContainer
//     // clientSecret={cart.cart.client_secret}
//     // publishableKey={publishableKey}
//     // stripeAccount={stripeAccount}
//     >
//       <div className="min-h-[calc(100dvh-7rem)] xl:grid xl:grid-cols-12 xl:gap-x-8">
//         <div className="my-8 xl:col-span-7">
//           <div className="sticky top-1">
//             <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight">Your cart</h1>
//             <CartSummaryTable cart={structuredClone(cart)} />
//           </div>
//         </div>
//         <div className="my-8 max-w-[65ch] xl:col-span-5">{children}</div>
//       </div>
//     </StripeElementsContainer>
//   );
// }

import React from 'react'

function Layout() {
  return (
	<div>Layout</div>
  )
}

export default Layout