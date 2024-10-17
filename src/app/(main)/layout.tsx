
import Hydrant from '@/components/custom/hydrant';
import AuthGuard from '@/components/custom/navbar/auth-guard';
import { Navbar } from '@/components/custom/navbar/navbar';
import React from 'react';

function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <Hydrant>
                <AuthGuard>
                    <div className=''>{children}</div>
                </AuthGuard>
            </Hydrant>
        </>
    )
}

export default MainLayout