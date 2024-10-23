
import Hydrant from '@/components/custom/hydrant';
import AuthGuard from '@/components/custom/navbar/auth-guard';
import { Navbar } from '@/components/custom/navbar/navbar';
import React from 'react';

function MainLayout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <Hydrant>
                <AuthGuard>
                    <main>
                        {children}
                        {modal}
                    </main>
                </AuthGuard>
            </Hydrant>
        </>
    )
}

export default MainLayout