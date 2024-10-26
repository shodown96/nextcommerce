"use server"

import { stripe } from "@/lib/stripe"

export const createPaymentIntent = async ({
    amount,
    currency = "USD"
}: {
    amount: number,
    currency?: string
}): Promise<{
    clientSecret: string
} | null> => {
    try {
        const session = await stripe.checkout.sessions.create(
            {
              mode: 'payment',
              line_items: [
                {
                  price: '{{PRICE_ID}}',
                  quantity: 1,
                },
              ],
              payment_intent_data: {
                application_fee_amount: 123,
              },
              ui_mode: 'embedded',
              return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}',
            },
            {
              stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
            }
          );
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: currency.toLowerCase(),
            automatic_payment_methods: {
                enabled: true,
            },
            application_fee_amount:100
        });
        if (!paymentIntent.client_secret) {
            return null
        }
        return ({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        console.log(error)
        return null
    }
}