import { ResetPasswordType } from "@/lib/validations/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  resetPasswordParams: ResetPasswordType;
}
export interface InitState {
  resetPasswordParams: ResetPasswordType
}
interface Actions {
  initialize: (params: InitState) => void;
  setResetPasswordParams: (params: ResetPasswordType) => void;
  reset: () => void;
}
// Not being used anymore for authentication
export const useAuthStore = create(
  persist<Actions & State>(
    (set, get) => ({
      resetPasswordParams: { email: "", code: "" },
      initialize: (params: InitState) => set(params),
      setResetPasswordParams: (params: ResetPasswordType) =>
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
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
