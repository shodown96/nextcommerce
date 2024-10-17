"use client"
import { createBusiness } from '@/actions/business/create-business';
import AuthTitle from '@/components/custom/auth-title';
import BusinessDetailsForm from '@/components/forms/business-details';
import BusinessSocialsForm from '@/components/forms/business-socials';
import { MESSAGES } from '@/lib/constants/messages';
import { PATHS } from '@/lib/constants/paths';
import { FullBusinessParams } from '@/lib/validations/business';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

function OnboardingBusiness() {
    const router = useRouter()
    const [params, setParams] = useState<FullBusinessParams>({} as FullBusinessParams)
    const [step, setStep] = useState<'account' | 'socials'>('account')
    const onSubmit = async (values: FullBusinessParams) => {
        if (step === "account") {
            setStep('socials')
            setParams({ ...params, ...values })
        } else {
            const business = await createBusiness({ params: { ...params, ...values } })
            if (business) {
                toast.success(MESSAGES.Success)
                router.push(PATHS.ONBOARDING_STRIPE)
            }
        }
    }

    return (
        <div>
            <AuthTitle
                title='Business details'
                description={step === 'account' ? 'Step 1/2' : 'Step 2/2'} />
            {step === 'account' ? (
                <BusinessDetailsForm onSubmit={onSubmit} />
            ) : (
                <BusinessSocialsForm setStep={setStep} onSubmit={onSubmit} />
            )}
        </div>
    )
}

export default OnboardingBusiness