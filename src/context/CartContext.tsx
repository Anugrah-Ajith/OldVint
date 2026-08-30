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

            // Make request to our server-side API checkout endpoint
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lineItems }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create checkout via API");
            }

            const url = data.url;

            if (url && url !== "#") {
                window.location.href = url; // Redirect to actual Shopify checkout URL
            } else {
                // This should no longer happen since createCheckout now throws on errors
                console.error("Checkout returned empty URL. Cart items:", JSON.stringify(lineItems));
                alert("Unable to create checkout. Please try again.");
            }
        } catch (error: any) {
            console.error("Error creating checkout: ", error);
            if (error.message && typeof error.message === "string" && error.message.toLowerCase().includes("does not exist")) {
                alert("Your cart contained outdated items and has been cleared. Please add the items again.");
                clearCart();
            } else {
                alert(`Checkout error: ${error.message || "Please try again later."}`);
            }
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
