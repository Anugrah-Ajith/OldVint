"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function CartPage() {
    const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, initiateCheckout } = useCart();

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary mb-8">
                    Shopping Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 space-y-5 max-w-md mx-auto">
                        <ShoppingBag className="h-14 w-14 text-text-muted mx-auto stroke-1" />
                        <h2 className="font-serif text-xl text-text-primary">Your cart is empty</h2>
                        <p className="text-sm text-text-secondary">Looks like you haven&apos;t added anything yet.</p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-text-inverse text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                        >
                            Continue Shopping <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-3 lg:gap-12 items-start">
                        {/* Cart items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 sm:gap-5 py-5 border-b border-border">
                                    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-bg-muted rounded-lg overflow-hidden shrink-0 relative">
                                        <Image
                                            src={item.product.images[0]?.url || "/placeholder.png"}
                                            alt={item.product.title}
                                            fill
                                            className="object-cover"
                                            sizes="100px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-3">
                                            <div>
                                                <Link
                                                    href={`/product/${item.product.handle}`}
                                                    className="text-sm font-medium text-text-primary hover:underline underline-offset-2 line-clamp-2 leading-snug"
                                                >
                                                    {item.product.title}
                                                </Link>
                                                <p className="text-xs text-text-muted mt-0.5">{item.variant.title}</p>
                                            </div>
                                            <p className="text-sm font-semibold text-text-primary shrink-0">
                                                ₹{(parseFloat(item.variant.price.amount) * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-border rounded-lg">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-bg-muted transition-colors" aria-label="Decrease">
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-bg-muted transition-colors" aria-label="Increase">
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-xs text-text-muted hover:text-sale flex items-center gap-1 transition-colors"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="mt-8 lg:mt-0 bg-bg-muted rounded-xl p-6 space-y-5 lg:sticky lg:top-24">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                                Order Summary
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-text-secondary">
                                    <span>Subtotal ({cartCount} items)</span>
                                    <span className="font-medium text-text-primary">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>Shipping</span>
                                    <span className="text-success font-medium">Free</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-border">
                                    <span className="font-semibold text-text-primary">Total</span>
                                    <span className="text-lg font-bold text-text-primary">₹{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                            <button
                                onClick={initiateCheckout}
                                className="w-full py-3.5 bg-accent text-text-inverse text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
                            >
                                Checkout <ArrowRight className="h-4 w-4" />
                            </button>
                            <Link href="/shop" className="block text-center text-sm text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
