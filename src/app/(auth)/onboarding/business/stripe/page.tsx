"use client"
import { createOnboardingSession } from '@/actions/stripe/onboarding';
import { updateMetadata } from '@/actions/user/update-metadata';
import AuthTitle from '@/components/custom/auth-title';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/lib/constants/paths';
import { useAuth } from '@clerk/nextjs';
import { loadConnectAndInitialize, StripeConnectInstance } from '@stripe/connect-js';
import {
    ConnectAccountOnboarding,
    ConnectComponentsProvider
} from "@stripe/react-connect-js";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function StripeConnectPage() {
    // We use `useState` to ensure the Connect instance is only initialized once
    const router = useRouter()
    const { userId } = useAuth()
    const [
        stripeConnectInstance,
        setStripeConnectInstance
    ] = useState<StripeConnectInstance | null>(null);

    const handleConnect = async () => {
        // I left it like this, in case I want to switch back to useEffect instead of a button
        const fetchClientSecret = async (): Promise<string> => {
            // Fetch the AccountSession client secret
            const response = await createOnboardingSession()
            if (response?.clientSecret) {
                return response.clientSecret
            }
            return ""
        }
        const stripeConnectInstance = loadConnectAndInitialize({
            publishableKey: `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`,
            fetchClientSecret: fetchClientSecret
        })
        setStripeConnectInstance(stripeConnectInstance)
    }

    return (
        <div className=''>
            <AuthTitle
                title='Stripe Onboarding'
                description='Setup your stripe account so you can easily receive payouts.' />


            {!stripeConnectInstance ? (
                <div className="flex gap-4 items-center">
                    <Button onClick={handleConnect}>
                        Connect account
                    </Button>
                    <Button onClick={()=>router.push(PATHS.PROFILE)} variant={'secondary'}>
                        Skip
                    </Button>
                </div>
            ) : (
                <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
                    <ConnectAccountOnboarding
                        onExit={async () => {
                            console.log("The account has exited onboarding");
                            if (userId) {

                                // TODO: use webhooks instead
                                await updateMetadata({ userId, onboardingComplete: true })
                            }
                            router.push(PATHS.PROFILE)
                        }}
                    // Optional: make sure to follow our policy instructions above
                    // fullTermsOfServiceUrl="{{URL}}"
                    // recipientTermsOfServiceUrl="{{URL}}"
                    // privacyPolicyUrl="{{URL}}"
                    // skipTermsOfServiceCollection={false}
                    // collectionOptions={{
                    //   fields: 'eventually_due',
                    //   futureRequirements: 'include',
                    // }}
                    // onStepChange={(stepChange) => {
                    //   console.log(`User entered: ${stepChange.step}`);
                    // }}
                    />
                </ConnectComponentsProvider>
            )}
        </div>
    )
}

export default StripeConnectPage
// TODO: Route guarding against this page and onboarding