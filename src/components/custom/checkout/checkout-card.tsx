"use client"

import { Cart } from "@/types/cart"
import { useEffect, useState } from "react"
import { StripeElementsContainer } from "./stripe-elements-container"
import { createPaymentIntent } from "@/actions/stripe/create-payment-intent"
import { Button } from "@/components/ui/button"
import StripePayment from "./stripe-payment"
import { calculateTotalCartAmount } from "@/lib/utils"

function CheckoutCard({ cart }: { cart: Cart }) {

    const [clientSecret, setClientSecret] = useState("")
    const [loading, setLoading] = useState(false)

    const getClientSecret = async () => {
        console.log(cart.items)
        setLoading(true)
        const cli = await createPaymentIntent({
            amount: calculateTotalCartAmount(cart.items)
        })
        if (cli?.clientSecret) {
            setClientSecret(cli.clientSecret)
        }
        setLoading(false)
    }
    

    if (!clientSecret) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-end mx-10">
                <Button onClick={getClientSecret} loading={loading}>Checkout</Button>
            </div>
        )
    }
    return (
        <div>
            <StripeElementsContainer clientSecret={clientSecret} >
                <section className="max-w-md pb-12">
                    <h2 className="text-3xl font-bold leading-none tracking-tight">Checkout</h2>
                    <p className="mb-4 mt-2 text-sm text-muted-foreground">Provide billing and shipping details below.</p>
                    <StripePayment
                    // shippingRateId={cart.metadata.shippingRateId}
                    // shippingRates={structuredClone(shippingRates)}
                    />
                </section>
            </StripeElementsContainer>
        </div>
    )
}

export default CheckoutCard