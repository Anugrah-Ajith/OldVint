"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/lib/products-data";
import { Heart, ShoppingBag } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isFavorite = isInWishlist(product.id);

    const price = parseFloat(product.priceRange.minVariantPrice.amount);
    const currency = product.priceRange.minVariantPrice.currencyCode;
    const formattedPrice = price.toLocaleString("en-IN", {
        style: "currency",
        currency: currency === "INR" ? "INR" : currency,
        minimumFractionDigits: 0,
    });

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.variants?.length > 0) {
            const variant = product.variants.find((v) => v.availableForSale) || product.variants[0];
            addToCart(product, variant, 1);
        }
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div className="group relative flex flex-col">
            {/* Image */}
            <Link
                href={`/product/${product.handle}`}
                className="relative aspect-[3/4] bg-bg-muted rounded-xl overflow-hidden"
            >
                <Image
                    src={product.images[0]?.url || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"}
                    alt={product.images[0]?.altText || product.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Wishlist */}
                <button
                    onClick={handleWishlistToggle}
                    className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all"
                    aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        className={`h-4 w-4 ${isFavorite ? "fill-sale text-sale" : "text-text-secondary"}`}
                    />
                </button>

                {/* Quick add — visible on hover */}
                {product.availableForSale && (
                    <button
                        onClick={handleQuickAdd}
                        className="absolute bottom-3 left-3 right-3 z-10 py-2.5 bg-white/95 backdrop-blur-sm text-text-primary text-xs font-semibold uppercase tracking-wider rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-1.5 hover:bg-accent hover:text-text-inverse"
                    >
                        <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
                    </button>
                )}

                {/* Sold out badge */}
                {!product.availableForSale && (
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 text-text-secondary text-[10px] font-semibold uppercase tracking-wider rounded-md">
                        Sold Out
                    </div>
                )}
            </Link>

            {/* Info */}
            <div className="mt-3 space-y-1">
                <Link href={`/product/${product.handle}`}>
                    <h3 className="text-sm font-medium text-text-primary leading-snug line-clamp-2 group-hover:underline underline-offset-2">
                        {product.title}
                    </h3>
                </Link>
                <p className="text-sm font-semibold text-text-primary">{formattedPrice}</p>
            </div>
        </div>
    );
}
