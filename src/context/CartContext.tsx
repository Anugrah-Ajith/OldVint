"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "@/lib/products-data";
import { shopifyClient } from "@/lib/shopify";

export interface CartItem {
    id: string; // Composite ID: variantId + selected options serialized or just variantId
    product: Product;
    variant: ProductVariant;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    cartCount: number;
    cartTotal: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;
    checkoutUrl: string;
    initiateCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load cart from LocalStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("oldvint_cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart data:", e);
            }
        }
    }, []);

    // Sync cart to LocalStorage when modified
    const saveCartToStorage = (updatedCart: CartItem[]) => {
        setCart(updatedCart);
        localStorage.setItem("oldvint_cart", JSON.stringify(updatedCart));
    };

    const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
        const existingIndex = cart.findIndex((item) => item.variant.id === variant.id);

        if (existingIndex > -1) {
            const updatedCart = [...cart];
            updatedCart[existingIndex].quantity += quantity;
            saveCartToStorage(updatedCart);
        } else {
            const newItem: CartItem = {
                id: variant.id, // unique per variant
                product,
                variant,
                quantity,
            };
            saveCartToStorage([...cart, newItem]);
        }
        setIsOpen(true); // Open the drawer whenever an item is added
    };

    const removeFromCart = (cartItemId: string) => {
        saveCartToStorage(cart.filter((item) => item.id !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(cartItemId);
            return;
        }
        saveCartToStorage(
            cart.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        saveCartToStorage([]);
    };

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const cartTotal = cart.reduce(
        (total, item) => total + parseFloat(item.variant.price.amount) * item.quantity,
        0
    );

    // Generate checkout redirects (mocking handoff to Shopify checkout or a premium success sequence)
    const checkoutUrl = "#";

    const initiateCheckout = async () => {
        if (cart.length === 0) return;

        try {
            // Transform cart variants into Storefront API LineItems format
            const lineItems = cart.map((item) => ({
                variantId: item.variant.id,
                quantity: item.quantity,
            }));

            // Make live request to Shopify Storefront API 
            const url = await shopifyClient.createCheckout(lineItems);

            if (url && url !== "#") {
                window.location.href = url; // Redirect to actual Shopify checkout URL
            } else {
                // Fallback for mocked store data running locally without live env keys
                alert(
                    `[LOCAL MODE] Redirecting to Checkout\nTotal Items: ${cartCount}\nSubtotal: ₹${cartTotal.toFixed(
                        2
                    )}\n\n(Add real Shopify API keys to .env.local to redirect to live checkout)`
                );
                clearCart();
                setIsOpen(false);
            }
        } catch (error) {
            console.error("Error creating checkout: ", error);
            alert("Checkout temporarily unavailable. Please try again later.");
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                cartTotal,
                isOpen,
                setIsOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                checkoutUrl,
                initiateCheckout,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
