
import { ResetPasswordType } from "@/lib/validations/auth";
import { Account } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { NewProductDetailsSchemaType, NewProductSchemaType } from "../validations/product";

interface State {
  newProductParams: Partial<NewProductSchemaType>;
  newProductDetails: Partial<NewProductDetailsSchemaType>;
}

interface Actions {
  initialize: () => void;
  setNewProductParams: (user: Partial<NewProductSchemaType>) => void;
}

export const useProductStore = create(
  persist<Actions & State>(
    (set, get) => ({
      newProductParams: {
        name: "",
        description: "",
        price: 0,
        metadata: [{ label: "", value: "" }],
        variations: [
          {
            label: "",
            options: [{ label: "", value: "" }]
          }
        ],
        images: []
      },
      newProductDetails: {
        name: "",
        description: "",
        price: 0,
      },
      initialize: () => set({
        newProductParams: {}
      }),
      setNewProductParams: (params) => {
        set({
          newProductParams: {
            ...get().newProductParams,
            ...params,
          },
        }),
          set({
            newProductDetails: {
              name: params.name,
              description: params.description,
              price: params.price
            }
          })
      }
    }),
    {
      name: "product-storage",
      skipHydration: true, // Requires the useStoreHydration usage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

useProductStore.setState({
  newProductParams: {}
})