"use server";

import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { updateMetadata } from "../user/update-metadata";

export const createOnboardingSession = async () => {
    try {
        const user = await currentUser()
        if (!user) return;
        const { emailAddresses, privateMetadata } = user;
        const emailAddress = emailAddresses[0].emailAddress;
        let stripeConnectAccountId: string = `${privateMetadata.stripeConnectAccountId}`;
        if (!stripeConnectAccountId) {

            const account = await stripe.accounts.create({
                email: emailAddress,
            });
            stripeConnectAccountId = account.id
            await updateMetadata({ userId: user.id, secure: true, stripeConnectAccountId: account.id })
        }

        const accountSession = await stripe.accountSessions.create({
            account: stripeConnectAccountId,
            components: {
                account_onboarding: {
                    enabled: true,
                    features: {
                        external_account_collection: true,
                    },
                },
            },
        });
        // For Stripe Hosted Onboarding
        // const accountLink = await stripe.accountLinks.create({
        //     account: '{{CONNECTED_ACCOUNT_ID}}',
        //     refresh_url: 'https://example.com/refresh',
        //     return_url: 'https://example.com/return',
        //     type: 'account_onboarding', // or 'account_update'
        //     collection_options: {
        //       fields: 'eventually_due',
        //     },
        //   });

        // TODO: Listen to webhook events: account.updated TO update accounts accordingly

        return ({
            clientSecret: accountSession.client_secret,
        })
    } catch (error) {
        return undefined
    }
}