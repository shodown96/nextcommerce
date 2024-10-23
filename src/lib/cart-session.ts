interface CartItem {
    productId: string;
    quantity: number;
}

interface Cart {
    id: string;
    items: CartItem[];
    metadata?: any;
}

export const Commerce: any = {
    cartKey: "cart", // Key to store the cart in sessionStorage

    // Generate a unique ID for the cart
    generateCartId(): string {
        return 'cart_' + Date.now();
    },

    // Save cart data to session storage
    saveCartToSession(cart: Cart): void {
        if (cart) {
            sessionStorage.setItem(this.cartKey, JSON.stringify(cart));
        }
    },

    // Load cart from session storage
    loadCartFromSession(): Cart | null {
        const cartData = sessionStorage.getItem(this.cartKey);
        return cartData ? JSON.parse(cartData) : null;
    },

    // Create a new cart
    async createCart(): Promise<Cart> {
        const newCart: Cart = {
            id: this.generateCartId(),
            items: [],
        };
        this.saveCartToSession(newCart);
        return newCart;
    },

    // Get the current cart, or create a new one if it doesn't exist
    async getCart(): Promise<Cart> {
        let cart = this.loadCartFromSession();
        if (!cart) {
            cart = await this.createCart();
        }
        return cart;
    },

    // Add a product to the cart
    async addToCart(productId: string): Promise<Cart> {
        const cart = await this.getCart();
        const existingItem = cart.items.find((item: { productId: string }) => item.productId === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.items.push({ productId, quantity: 1 });
        }

        this.saveCartToSession(cart);
        return cart;
    },

    // Get the total number of items in the cart
    getCartItemCount(): number {
        const cart = this.loadCartFromSession();
        if (cart) {
            return cart.items.reduce((count: number, item: { quantity: number }) => count + item.quantity, 0);
        }
        return 0;
    },

    // Change the quantity of a product in the cart
    async changeQuantity(productId: string, operation: "INCREASE" | "DECREASE"): Promise<Cart> {
        const cart = await this.getCart();
        const item = cart.items.find((i: { productId: string }) => i.productId === productId);

        if (item) {
            if (operation === "INCREASE") {
                item.quantity++;
            } else if (operation === "DECREASE") {
                item.quantity = Math.max(0, item.quantity - 1);

                if (item.quantity === 0) {
                    cart.items = cart.items.filter((i: { productId: string }) => i.productId !== productId);
                }
            }

            this.saveCartToSession(cart);
        }

        return cart;
    },

    // Set the quantity of a specific product directly
    async setProductQuantity(productId: string, quantity: number): Promise<Cart> {
        const cart = await this.getCart();
        const item = cart.items.find((i: { productId: string }) => i.productId === productId);

        if (item) {
            if (quantity <= 0) {
                cart.items = cart.items.filter((i: { productId: string }) => i.productId !== productId);
            } else {
                item.quantity = quantity;
            }
        } else if (quantity > 0) {
            cart.items.push({ productId, quantity });
        }

        this.saveCartToSession(cart);
        return cart;
    }
};
