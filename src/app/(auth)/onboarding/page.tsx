"use client"
import { updateMetadata } from '@/actions/user/update-metadata'
import AuthTitle from '@/components/custom/auth-title'
import { Button } from '@/components/ui/button'
import { PATHS } from '@/lib/constants/paths'
import { cn } from '@/lib/utils'
import { SignOutButton, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function OnboardingPage() {
    const [selected, setSelected] = useState<'consumer' | 'business'>('consumer')
    const router = useRouter()
    const { userId } = useAuth()

    const handleContinue = async () => {
        if (selected === 'consumer') {
            if (userId) {
                await updateMetadata({ userId, onboardingComplete: true })
            }
            router.push(PATHS.LANDING)
        } else {
            router.push(PATHS.ONBOARDING_BUSINESS)
        }
    }
    return (
        <div>
            <AuthTitle
                title='Onboarding'
                description='What type of account would you like to proceed with?' />
            <div className='flex flex-col gap-5'>
                <div className={cn("border p-4 rounded-lg transition-all cursor-pointer",
                    selected === 'consumer' ? 'border-primary' : ''
                )}
                    onClick={() => setSelected('consumer')}>
                    Personal
                </div>
                <div className={cn("border p-4 rounded-lg transition-all cursor-pointer",
                    selected === 'business' ? 'border-primary' : ''
                )}
                    onClick={() => setSelected('business')}>
                    Business
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-32">
                <Button onClick={handleContinue}>Continue</Button>
                <SignOutButton>
                    <Button variant={'outline'}>Log out</Button>
                </SignOutButton>
            </div>
        </div>
    )
}

export default OnboardingPage