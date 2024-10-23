
import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  cart: {
    items: CartItem[]
  };
}

interface Actions {
  initialize: () => void;
  addToCart: (item: CartItem) => void;
  reduceQuantity: (item: CartItem) => void;
  removeProduct: (item: CartItem) => void;
}

export const useCartStore = create(
  persist<Actions & State>(
    (set, get) => ({
      cart: {
        items: []
      },
      initialize: () => set({
        cart: {
          items: []
        }
      }),
      addToCart: (item) =>
        set(({ cart }) => {
          const existingItem = cart.items.find((cartItem) => cartItem.id === item.id);
          if (existingItem) {
            const updatedCart = cart.items.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! + 1 };
              }
              return cartItem;
            });
            return { cart: { ...cart, items: updatedCart } };
          } else {
            return { cart: { ...cart, items: [...cart.items, { ...item, quantity: 1 }] } };
          }
        }),
      reduceQuantity: (item) =>
        set(({ cart }) => {
          const existingItem = cart.items.find((cartItem) => cartItem.id === item.id);
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = cart.items.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            return { cart: { ...cart, items: updatedCart } };
          } else {
            const filteredCart = cart.items.filter((cartItem) => cartItem.id !== item.id);
            return { cart: { ...cart, items: filteredCart } };
          }
        }),
      removeProduct: (item) =>
        set(({ cart }) => {
          const filteredCart = cart.items.filter((cartItem) => cartItem.id !== item.id);
          return { cart: { ...cart, items: filteredCart } };
        }),
    }),
    {
      name: "cart-storage",
      // skipHydration: true, // Requires the useStoreHydration usage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

useCartStore.setState({
  cart: { items: [] }
})