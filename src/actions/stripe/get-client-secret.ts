"use server";

import { currentUser } from "@clerk/nextjs/server";

export const getClientSecret = async () => {

    // let customerId: any
    // const user = await currentUser()
    // if (user) {

    //     const { emailAddresses, fullName } = user;
    //     const emailAddress = emailAddresses[0].emailAddress;
    //     const 
    // }

    // if (!customerId) {
    //     const customer = await StripeService.createCustomer(req.user);
    //     if (customer && customer.id) {
    //         customerId = customer.id;
    //     }
    // }

    // try {
    //     // Create the subscription. Note we're expanding the Subscription's
    //     // latest invoice and that invoice's payment_intent
    //     // so we can pass it to the front end to confirm the payment
    //     const subscription: any = await StripeService.createSubscription(
    //         customerId,
    //         interval,
    //     );

    //     const data = {
    //         subscriptionId: subscription.id,
    //         clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    //     };
    }