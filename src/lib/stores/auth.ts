
import { ResetPasswordType } from "@/lib/validations/auth";
import { Account } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  user: Account | null;
  resetPasswordParams: ResetPasswordType;
}

interface Actions {
  initialize: () => void;
  setUser: (user: Account) => void;
  setResetPasswordParams: (params: ResetPasswordType) => void;
}

export const useAuthStore = create(
  persist<Actions & State>(
    (set, get) => ({
      user: null,
      resetPasswordParams: { email: "", code: "" },
      setUser: (params) => set({ user: params }),
      initialize: () => set({
        user: null,
        resetPasswordParams: { email: "", code: "" }
      }),
      setResetPasswordParams: (params) =>
        set({
          resetPasswordParams: {
            ...get().resetPasswordParams,
            ...params,
          },
        }),
    }),
    {
      name: "auth-storage",
      skipHydration: true, // Requires the useStoreHydration usage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// useAuthStore.setState({
//   user: null,
//   resetPasswordParams: { email: "", code: "" },
// })