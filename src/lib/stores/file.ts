
import { ResetPasswordType } from "@/lib/validations/auth";
import { Account, File } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
    uploadedFiles: File[];
}

interface Actions {
    initialize: () => void;
    setUploadedFiles: (user: File[]) => void;
}

export const useFileStorage = create(
    persist<Actions & State>(
        (set, get) => ({
            uploadedFiles: [],
            initialize: () => set({ uploadedFiles: [] }),
            setUploadedFiles: (params) => set({ uploadedFiles: params }),
        }),
        {
            name: "files-storage",
            // skipHydration: true, // Requires the useStoreHydration usage
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

useFileStorage.setState({
    uploadedFiles: []
})