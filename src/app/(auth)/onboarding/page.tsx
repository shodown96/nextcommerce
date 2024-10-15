"use client"
import AuthTitle from '@/components/custom/auth-title'
import { Button } from '@/components/ui/button'
import { PATHS } from '@/lib/constants/paths'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function OnboardingPage() {
    const [selected, setSelected] = useState<'consumer' | 'business'>('consumer')
    const router = useRouter()

    const handleContinue = () => {
        if(selected === 'consumer'){
            router.push(PATHS.LANDING)
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
            <Button className='mt-10'>Continue</Button>
        </div>
    )
}

export default OnboardingPage