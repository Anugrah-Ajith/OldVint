"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
    ShoppingBag,
    Heart,
    User,
    Search,
    Menu,
    X,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    Sparkles
} from "lucide-react";

export const Header: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { cart, cartCount, cartTotal, isOpen, setIsOpen, updateQuantity, removeFromCart, initiateCheckout } = useCart();
    const { wishlist } = useWishlist();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery("");
        }
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "FAQ", href: "/faq" },
    ];

    return (
        <>
            {/* Main Header Container */}
            <header className="sticky top-0 z-40 w-full border-b border-[#FAF9F6]/10 backdrop-blur-md bg-stone-900/90 text-stone-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-stone-300 hover:text-stone-100"
                            aria-label="Toggle mobile menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <Link
                            href="/"
                            className="ml-2 lg:ml-0 font-serif text-2xl font-bold tracking-widest text-[#D4AF37] hover:text-[#FAF9F6] transition-colors flex items-center gap-1.5"
                        >
                            <Sparkles className="h-5 w-5 animate-pulse" />
                            OldVint
                        </Link>
                    </div>

                    {/* Desktop Navigation links */}
                    <nav className="hidden lg:flex space-x-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium tracking-wider uppercase transition-colors hover:text-[#D4AF37] py-2 px-1 relative ${isActive ? "text-[#D4AF37]" : "text-stone-300"
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Icon Controls */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 text-stone-300 hover:text-[#D4AF37] transition-all"
                            aria-label="Search items"
                        >
                            <Search className="h-5.5 w-5.5" />
                        </button>

                        {/* Account */}
                        <Link
                            href="/account"
                            className="hidden sm:inline-flex p-2 text-stone-300 hover:text-[#D4AF37] transition-all"
                            aria-label="User Account"
                        >
                            <User className="h-5.5 w-5.5" />
                        </Link>

                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className="p-2 text-stone-300 hover:text-[#D4AF37] relative transition-all"
                            aria-label="Wishlist items"
                        >
                            <Heart className="h-5.5 w-5.5" />
                            {wishlist.length > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-stone-900 bg-[#D4AF37] rounded-full transform translate-x-1 -translate-y-1">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        {/* Shopping Bag / Cart */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-2 text-stone-300 hover:text-[#D4AF37] relative transition-all"
                            aria-label="Cart"
                        >
                            <ShoppingBag className="h-5.5 w-5.5" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-stone-900 bg-[#D4AF37] rounded-full transform translate-x-1 -translate-y-1">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Slide-out Search Overlay */}
            {searchOpen && (
                <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4 transition-all duration-300">
                    <div className="bg-stone-900 border border-stone-800 rounded-lg max-w-2xl w-full p-6 shadow-2xl relative">
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-stone-100"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <form onSubmit={handleSearchSubmit}>
                            <h3 className="font-serif text-xl text-[#D4AF37] mb-4">Search OldVint Archives</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Seach timepieces, leathers, collectibles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-stone-950 border border-stone-800 text-stone-100 px-4 py-3.5 pl-11 rounded focus:outline-none focus:border-[#D4AF37]"
                                    autoFocus
                                />
                                <Search className="absolute left-4 top-4 hover:text-[#D4AF37] h-5 w-5 text-stone-500" />
                            </div>
                            <p className="mt-2 text-xs text-stone-400">Press Enter or click Search icon to browse catalog</p>
                        </form>
                    </div>
                </div>
            )}

            {/* Mobile Drawer Navigation */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm lg:hidden transition-all duration-300">
                    <div className="fixed inset-y-0 left-0 w-80 bg-stone-900 shadow-2xl flex flex-col p-6 border-r border-stone-800 animate-slide-in">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-800">
                            <span className="font-serif text-xl font-bold text-[#D4AF37]">OldVint</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-1 text-stone-400 hover:text-stone-100"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-stone-300 hover:text-[#D4AF37] text-lg font-medium tracking-wide"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/account"
                                className="text-stone-300 hover:text-[#D4AF37] text-lg font-medium tracking-wide pt-4 border-t border-stone-800 flex items-center justify-between"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span>My Account</span>
                                <User className="h-5 w-5" />
                            </Link>
                        </nav>
                        <div className="mt-auto text-center border-t border-stone-800 pt-6">
                            <p className="font-serif text-[#D4AF37] italic text-sm">Est. 1978 — Curators of Heritage</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Slide-out Cart Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm transition-all duration-300">
                    <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 shadow-2xl flex flex-col animate-slide-in">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800 bg-stone-950/40">
                            <h2 className="text-lg font-serif font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Shopping Archives
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-stone-400 hover:text-stone-100 transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <ShoppingBag className="h-16 w-16 text-stone-700 stroke-1" />
                                    <p className="text-stone-400 font-serif">Your shopping archive is empty.</p>
                                    <Link
                                        href="/shop"
                                        onClick={() => setIsOpen(false)}
                                        className="inline-flex items-center text-sm font-medium text-[#D4AF37] hover:text-[#FAF9F6] border-b border-[#D4AF37]/45 tracking-widest uppercase transition-colors"
                                    >
                                        Acquire Items <ArrowRight className="h-4 w-4 ml-1.5" />
                                    </Link>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex py-4 border-b border-stone-800/80 last:border-0 hover:bg-stone-800/20 p-2 rounded transition-colors"
                                    >
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-stone-950 border border-stone-800 relative">
                                            <img
                                                src={item.product.images[0]?.url}
                                                alt={item.product.images[0]?.altText || item.product.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-sm font-medium">
                                                    <h3 className="font-serif text-stone-100 hover:text-[#D4AF37] line-clamp-1">
                                                        <Link href={`/product/${item.product.handle}`} onClick={() => setIsOpen(false)}>
                                                            {item.product.title}
                                                        </Link>
                                                    </h3>
                                                    <p className="ml-4 text-[#D4AF37] font-semibold">
                                                        ${(parseFloat(item.variant.price.amount) * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-xs text-stone-400 line-clamp-1 italic">
                                                    Variant: {item.variant.title}
                                                </p>
                                            </div>

                                            <div className="flex flex-1 items-end justify-between text-xs mt-3">
                                                {/* Quantity controls */}
                                                <div className="flex items-center border border-stone-800 rounded bg-stone-950">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-2 text-stone-400 hover:text-stone-100"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="px-2 text-stone-200">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-2 text-stone-400 hover:text-stone-100"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="font-medium text-[#5C2C35] hover:text-[#FAF9F6] transition-colors flex items-center gap-1"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer Summary */}
                        {cart.length > 0 && (
                            <div className="border-t border-stone-800 px-6 py-5 bg-stone-950/60 space-y-4">
                                <div className="flex justify-between text-base font-medium">
                                    <span className="text-stone-200 uppercase tracking-widest text-sm">Archival Subtotal</span>
                                    <span className="text-[#D4AF37] font-serif text-lg font-semibold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-stone-400 italic">
                                    Shipping, taxes, and duties calculated at Shopify Checkout.
                                </p>
                                <div className="space-y-2">
                                    <button
                                        onClick={initiateCheckout}
                                        className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded bg-[#D4AF37] text-stone-950 font-semibold tracking-widest uppercase hover:bg-[#B4902F] transition-colors"
                                    >
                                        Initiate Checkout Handoff
                                    </button>
                                    <Link
                                        href="/cart"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full flex items-center justify-center px-6 py-3 border border-stone-800 rounded bg-stone-900 text-stone-200 font-medium tracking-wide uppercase hover:bg-stone-800 transition-colors text-sm"
                                    >
                                        View Shopping Bag
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
export default Header;
