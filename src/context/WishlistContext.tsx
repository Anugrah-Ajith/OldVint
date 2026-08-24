"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/products-data";

interface WishlistContextType {
    wishlist: Product[];
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load wishlist from LocalStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem("oldvint_wishlist");
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (e) {
                console.error("Failed to parse wishlist data:", e);
            }
        }
    }, []);

    // Sync wishlist to LocalStorage
    const saveWishlistToStorage = (updatedWishlist: Product[]) => {
        setWishlist(updatedWishlist);
        localStorage.setItem("oldvint_wishlist", JSON.stringify(updatedWishlist));
    };

    const toggleWishlist = (product: Product) => {
        const exists = wishlist.some((item) => item.id === product.id);
        if (exists) {
            saveWishlistToStorage(wishlist.filter((item) => item.id !== product.id));
        } else {
            saveWishlistToStorage([...wishlist, product]);
        }
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((item) => item.id === productId);
    };

    const clearWishlist = () => {
        saveWishlistToStorage([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
