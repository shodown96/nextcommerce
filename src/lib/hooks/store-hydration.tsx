"use client";

import { useEffect, useState } from "react";

interface UseStoreHydrationProps {
  hydrate: () => Promise<void> | void;
}

/**
 * This hook should be used on the page load of all pages that use data from
 * a client-side persisted store. Otherwise, a hydration error will occur.
 *
 * Ref.: https://github.com/pmndrs/zustand/issues/938
 */
export const useStoreHydration = ({ hydrate }: UseStoreHydrationProps) => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const hydrateOnLoad = async () => {
      await hydrate();
      setHasHydrated(true);
    };

    hydrateOnLoad();
  }, [hydrate]);

  return { hasHydrated };
};
