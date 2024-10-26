
import { ResetPasswordType } from "@/lib/validations/auth";
import { Account } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { NewProductDetailsSchemaType, NewProductSchemaType } from "../validations/product";
import { CreateProductResponseProps } from "@/types/product";

interface State {
  productParams: Partial<NewProductSchemaType>;
  selectedProduct: CreateProductResponseProps | null;
  newProductDetails: Partial<NewProductDetailsSchemaType>;
}

interface Actions {
  initialize: () => void;
  setProductParams: (productParams: Partial<NewProductSchemaType>) => void;
  selectProduct: (selectedProduct: CreateProductResponseProps) => void;
}

export const useProductStore = create(
  persist<Actions & State>(
    (set, get) => ({
      selectedProduct: null,
      productParams: {
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
        productParams: {}
      }),
      setProductParams: (params) => {
        set({
          productParams: {
            ...get().productParams,
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
      },
      selectProduct: (selectedProduct) => set({ selectedProduct })
    }),
    {
      name: "product-storage",
      skipHydration: true, // Requires the useStoreHydration usage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// useProductStore.setState({
//   productParams: {}
// })