"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductVariant } from "@/lib/products-data";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import {
    Heart,
    Minus,
    Plus,
    ShoppingBag,
    ChevronDown,
    Truck,
    RotateCcw,
    ShieldCheck,
} from "lucide-react";

interface ProductDetailsClientProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetailsClient({
    product,
    relatedProducts,
}: ProductDetailsClientProps) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isFavorite = isInWishlist(product.id);

    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
        product.variants?.find((v) => v.availableForSale) || product.variants?.[0]
    );
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        selectedVariant?.selectedOptions?.forEach((opt) => {
            initial[opt.name] = opt.value;
        });
        return initial;
    });
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [openSection, setOpenSection] = useState<string | null>("description");

    const handleOptionChange = (optionName: string, value: string) => {
        const newOptions = { ...selectedOptions, [optionName]: value };
        setSelectedOptions(newOptions);

        const matchingVariant = product.variants?.find((v) =>
            v.selectedOptions?.every((opt) => newOptions[opt.name] === opt.value)
        );
        if (matchingVariant) setSelectedVariant(matchingVariant);
    };

    const handleAddToCart = () => {
        if (selectedVariant) addToCart(product, selectedVariant, quantity);
    };

    const price = parseFloat(selectedVariant?.price?.amount || "0");
    const currency = selectedVariant?.price?.currencyCode || "INR";
    const formattedPrice = price.toLocaleString("en-IN", {
        style: "currency",
        currency: currency === "INR" ? "INR" : currency,
        minimumFractionDigits: 0,
    });

    const uniqueOptions: { name: string; values: string[] }[] = [];
    if (product.options) {
        product.options.forEach((opt: { name: string; values: string[] }) => {
            if (opt.values.length > 1 || (opt.values.length === 1 && opt.values[0] !== "Default Title")) {
                uniqueOptions.push(opt);
            }
        });
    }

    const infoSections = [
        { id: "description", title: "Description", content: product.description },
        { id: "shipping", title: "Shipping & Delivery", content: "Free standard shipping on all orders. Express delivery available at checkout. Orders are processed within 1-2 business days." },
        { id: "returns", title: "Returns & Exchanges", content: "Easy returns within 7 days of delivery. Items must be unused with original tags. Exchanges subject to availability." },
    ];

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-xs text-text-muted">
                    <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-text-primary transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-text-secondary truncate">{product.title}</span>
                </nav>
            </div>

            {/* Product section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                    {/* Gallery */}
                    <div className="space-y-3">
                        <div className="relative aspect-square bg-bg-muted rounded-xl overflow-hidden">
                            <Image
                                src={product.images[activeImage]?.url || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"}
                                alt={product.images[activeImage]?.altText || product.title}
                                fill
                                priority
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.slice(0, 4).map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`relative aspect-square bg-bg-muted rounded-lg overflow-hidden border-2 transition-colors ${activeImage === i ? "border-text-primary" : "border-transparent hover:border-border-dark"
                                            }`}
                                    >
                                        <Image src={img.url} alt={img.altText || ""} fill className="object-cover" sizes="100px" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product info */}
                    <div className="mt-8 lg:mt-0 space-y-6">
                        <div>
                            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary leading-tight">
                                {product.title}
                            </h1>
                            <p className="text-2xl font-semibold text-text-primary mt-3">{formattedPrice}</p>
                        </div>

                        {/* Variant selectors */}
                        {uniqueOptions.map((option) => (
                            <div key={option.name}>
                                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2 block">
                                    {option.name}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {option.values.map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleOptionChange(option.name, value)}
                                            className={`px-4 py-2.5 text-sm font-medium border rounded-lg transition-all ${selectedOptions[option.name] === value
                                                ? "bg-text-primary text-text-inverse border-text-primary"
                                                : "bg-white text-text-primary border-border hover:border-border-dark"
                                                }`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Quantity + Add to Cart */}
                        <div className="flex items-center gap-3 pt-2">
                            <div className="flex items-center border border-border rounded-lg">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-bg-muted transition-colors" aria-label="Decrease">
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 text-sm font-semibold min-w-[40px] text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-bg-muted transition-colors" aria-label="Increase">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedVariant?.availableForSale}
                                className="flex-1 py-3.5 bg-accent text-text-inverse text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                {selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
                            </button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`p-3.5 border rounded-lg transition-all ${isFavorite ? "border-sale text-sale bg-sale/5" : "border-border text-text-secondary hover:border-border-dark"
                                    }`}
                                aria-label="Wishlist"
                            >
                                <Heart className={`h-5 w-5 ${isFavorite ? "fill-sale" : ""}`} />
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-border">
                            {[
                                { icon: Truck, label: "Free Shipping" },
                                { icon: RotateCcw, label: "Easy Returns" },
                                { icon: ShieldCheck, label: "Secure Checkout" },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                                    <Icon className="h-4 w-4 text-text-muted" />
                                    <span className="text-[11px] text-text-secondary font-medium">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Info accordions */}
                        <div className="space-y-0 border-b border-border">
                            {infoSections.map((section) => (
                                <div key={section.id} className="border-t border-border">
                                    <button
                                        onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                                        className="w-full flex items-center justify-between py-4 text-sm font-medium text-text-primary hover:text-text-secondary transition-colors"
                                    >
                                        {section.title}
                                        <ChevronDown className={`h-4 w-4 transition-transform ${openSection === section.id ? "rotate-180" : ""}`} />
                                    </button>
                                    {openSection === section.id && (
                                        <div className="pb-4 text-sm text-text-secondary leading-relaxed animate-fade-in">
                                            {section.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related products */}
            {relatedProducts.length > 0 && (
                <div className="border-t border-border py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-serif text-2xl font-medium text-text-primary mb-8">
                            You may also like
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.slice(0, 4).map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 flex items-center gap-3 lg:hidden z-40">
                <div>
                    <p className="text-lg font-semibold">{formattedPrice}</p>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={!selectedVariant?.availableForSale}
                    className="flex-1 py-3 bg-accent text-text-inverse text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
                >
                    {selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
                </button>
            </div>
        </div>
    );
}
