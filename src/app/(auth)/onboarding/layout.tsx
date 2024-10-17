
import { PATHS } from '@/lib/constants/paths';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await currentUser()
    if (user?.publicMetadata?.onboardingComplete) {
        redirect(PATHS.PROFILE)
    }
    return children
}

export default MainLayout