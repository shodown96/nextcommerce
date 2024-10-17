"use client"

import { getUser } from '@/actions/user/get-user';
import { useAuthStore } from '@/lib/stores/auth';
import { useUser } from '@clerk/nextjs';
import { PropsWithChildren, useEffect } from 'react';

function AuthGuard({ children }: PropsWithChildren) {
    const { user, setUser } = useAuthStore()
    const { user: clerkUser } = useUser()
    const getUserDetails = async () => {
        if (!user && clerkUser) {
            const u = await getUser({ clerkUserId: clerkUser.id })
            if (u) setUser(u)
        }
    }
    useEffect(() => {
        getUserDetails()
    }, [])

    return children
}

export default AuthGuard