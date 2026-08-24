"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary mb-8">Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 space-y-5 max-w-md mx-auto">
                        <Heart className="h-14 w-14 text-text-muted mx-auto stroke-1" />
                        <h2 className="font-serif text-xl text-text-primary">Your wishlist is empty</h2>
                        <p className="text-sm text-text-secondary">Save items you love for later.</p>
                        <Link href="/shop" className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-text-inverse text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors">
                            Browse Products <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {wishlist.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
