"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, initiateCheckout } = useCart();

    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 z-50 animate-fade-in"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col animate-slide-in shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <h2 className="text-sm font-semibold uppercase tracking-wider">
                        Cart ({cartCount})
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Close cart"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                            <ShoppingBag className="h-12 w-12 text-text-muted stroke-1" />
                            <p className="text-text-secondary text-sm">Your cart is empty</p>
                            <Link
                                href="/shop"
                                onClick={onClose}
                                className="text-sm font-medium text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-24 bg-bg-muted rounded-lg overflow-hidden shrink-0 relative">
                                        <Image
                                            src={item.product.images[0]?.url || "/placeholder.png"}
                                            alt={item.product.title}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/product/${item.product.handle}`}
                                            onClick={onClose}
                                            className="text-sm font-medium text-text-primary hover:underline line-clamp-2 leading-snug"
                                        >
                                            {item.product.title}
                                        </Link>
                                        <p className="text-xs text-text-muted mt-0.5">{item.variant.title}</p>
                                        <p className="text-sm font-semibold mt-1.5">
                                            ₹{(parseFloat(item.variant.price.amount) * item.quantity).toLocaleString()}
                                        </p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border border-border rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1.5 hover:bg-bg-muted transition-colors"
                                                    aria-label="Decrease"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="px-3 text-xs font-semibold min-w-[28px] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1.5 hover:bg-bg-muted transition-colors"
                                                    aria-label="Increase"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-1.5 text-text-muted hover:text-sale transition-colors"
                                                aria-label="Remove"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t border-border px-6 py-5 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Subtotal</span>
                            <span className="text-lg font-semibold">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-text-muted">Shipping calculated at checkout</p>
                        <button
                            onClick={initiateCheckout}
                            className="w-full py-3.5 bg-accent text-text-inverse text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
                        >
                            Checkout <ArrowRight className="h-4 w-4" />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full text-center text-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
