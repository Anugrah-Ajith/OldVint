"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

const NAV_LINKS = [
    { href: "/shop", label: "Shop" },
    { href: "/shop?sort=NEWEST", label: "New Arrivals" },
    { href: "/shop?sort=BEST_SELLING", label: "Best Sellers" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const pathname = usePathname();
    const { cartCount, isOpen: cartOpen, setIsOpen: setCartOpen } = useCart();
    const { wishlist } = useWishlist();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 -ml-2 text-text-primary hover:text-text-secondary transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-1.5 shrink-0">
                            <span className="font-serif text-xl font-semibold tracking-tight text-text-primary">
                                OldVint
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-[13px] font-medium tracking-wide uppercase transition-colors hover:text-text-primary ${pathname === link.href
                                            ? "text-text-primary"
                                            : "text-text-secondary"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2.5 text-text-primary hover:text-text-secondary transition-colors"
                                aria-label="Search"
                            >
                                <Search className="h-[18px] w-[18px]" />
                            </button>

                            <Link
                                href="/account"
                                className="hidden sm:flex p-2.5 text-text-primary hover:text-text-secondary transition-colors"
                                aria-label="Account"
                            >
                                <User className="h-[18px] w-[18px]" />
                            </Link>

                            <Link
                                href="/wishlist"
                                className="p-2.5 text-text-primary hover:text-text-secondary transition-colors relative"
                                aria-label="Wishlist"
                            >
                                <Heart className="h-[18px] w-[18px]" />
                                {wishlist.length > 0 && (
                                    <span className="absolute top-1 right-1 h-4 w-4 bg-text-primary text-text-inverse text-[10px] font-bold flex items-center justify-center rounded-full">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            <button
                                onClick={() => setCartOpen(true)}
                                className="p-2.5 text-text-primary hover:text-text-secondary transition-colors relative"
                                aria-label="Cart"
                            >
                                <ShoppingBag className="h-[18px] w-[18px]" />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 h-4 w-4 bg-text-primary text-text-inverse text-[10px] font-bold flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="lg:hidden border-t border-border bg-white animate-fade-in">
                        <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`py-3 px-3 text-sm font-medium rounded-lg transition-colors ${pathname === link.href
                                            ? "bg-bg-muted text-text-primary"
                                            : "text-text-secondary hover:bg-bg-muted hover:text-text-primary"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/account"
                                onClick={() => setMobileOpen(false)}
                                className="py-3 px-3 text-sm font-medium text-text-secondary hover:bg-bg-muted hover:text-text-primary rounded-lg transition-colors sm:hidden"
                            >
                                My Account
                            </Link>
                        </nav>
                    </div>
                )}
            </header>

            {/* Modals */}
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
