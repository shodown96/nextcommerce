"use client"

import { useStoreHydration } from '@/lib/hooks/store-hydration';
import { useAuthStore } from '@/lib/stores/auth';
import { PropsWithChildren } from 'react';

function Hydrant({ children }: PropsWithChildren) {
    const hydrate = useAuthStore.persist?.rehydrate;
    const { hasHydrated } = useStoreHydration({ hydrate });

    if (!hasHydrated) {
        return null;
    }

    return children
}

export default Hydrant