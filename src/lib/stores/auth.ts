"use client"
import { ResetPasswordType } from "@/lib/validations/auth";
import { Account } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  user: Account | null;
  resetPasswordParams: ResetPasswordType;
}
interface InitState extends State { }
interface Actions {
  initialize: (params: InitState) => void;
  setUser: (user: Account) => void;
  setResetPasswordParams: (params: ResetPasswordType) => void;
  reset: () => void;
}

export const useAuthStore = create(
  persist<Actions & State>(
    (set, get) => ({
      user: null,
      resetPasswordParams: { email: "", code: "" },
      setUser: (params) => set({ user: params }),
      initialize: (params) => set(params),
      setResetPasswordParams: (params) =>
        set({
          resetPasswordParams: {
            ...get().resetPasswordParams,
            ...params,
          },
        }),
      reset: () =>
        set({ resetPasswordParams: {} }),
    }),
    {
      name: "auth-storage",
      skipHydration: true, // Requires the useStoreHydration usage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
