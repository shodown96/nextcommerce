"use client"
import { PATHS } from '@/lib/constants/paths';
import { useAuth } from '@clerk/nextjs';
import { redirect, usePathname } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

function ProductLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const user = useAuth()
    useEffect(() => {
        if (pathname.includes("/new") || pathname.includes("/update")) {
            if (!user) {
                redirect(PATHS.SIGN_IN)
            }
        }
    }, [])
    return (
        <>
            <div className=''>{children}</div>
        </>
    )
}

export default ProductLayout