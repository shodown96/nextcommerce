
import { Cart, CartItem } from "@/types/cart";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { calculateTotalCartAmount } from "../utils";

interface State {
  cart: Cart;
}

interface Actions {
  clearCart: () => void;
  addToCart: (item: CartItem) => void;
  reduceQuantity: (item: CartItem) => void;
  removeProduct: (item: CartItem) => void;
}

export const useCartStore = create(
  persist<Actions & State>(
    (set, get) => ({
      cart: {
        items: [],
        totalAmount: 0
      },
      clearCart: () => set({
        cart: {
          items: [],
          totalAmount: 0
        }
      }),
      addToCart: (item) =>
        set(({ cart }) => {
          let newCart;
          const existingItem = cart.items.find((cartItem) => cartItem.id === item.id);
          if (existingItem) {
            const updatedCart = cart.items.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! + 1 };
              }
              return cartItem;
            });
            newCart = { cart: { ...cart, items: updatedCart } };
          } else {
            newCart = { cart: { ...cart, items: [...cart.items, { ...item, quantity: 1 }] } };
          }
          const totalAmount = calculateTotalCartAmount(newCart.cart.items)
          return { ...newCart, totalAmount }
        }),
      reduceQuantity: (item) =>
        set(({ cart }) => {
          let newCart;
          const existingItem = cart.items.find((cartItem) => cartItem.id === item.id);
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = cart.items.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            newCart = { cart: { ...cart, items: updatedCart } };
          } else {
            const filteredCart = cart.items.filter((cartItem) => cartItem.id !== item.id);
            newCart = { cart: { ...cart, items: filteredCart } };
          }
          const totalAmount = calculateTotalCartAmount(newCart.cart.items)
          return { ...newCart, totalAmount }
        }),
      removeProduct: (item) =>
        set(({ cart }) => {
          const filteredItems = cart.items.filter((cartItem) => cartItem.id !== item.id);
          const totalAmount = calculateTotalCartAmount(filteredItems)
          return { cart: { ...cart, items: filteredItems, totalAmount } };
        }),
    }),
    {
      name: "cart-storage",
      // skipHydration: true, // Requires the useStoreHydration usage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// useCartStore.setState({
//   cart: { items: [], totalAmount:0 }
// })