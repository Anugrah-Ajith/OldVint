"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Phone, Mail } from "lucide-react";

const FOOTER_LINKS = {
    Shop: [
        { label: "All Products", href: "/shop" },
        { label: "New Arrivals", href: "/shop?sort=NEWEST" },
        { label: "Best Sellers", href: "/shop?sort=BEST_SELLING" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "/faq" },
    ],
    Policies: [
        { label: "Privacy Policy", href: "/policies/privacy" },
        { label: "Terms of Service", href: "/policies/terms" },
        { label: "Refund Policy", href: "/policies/refund" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-bg-dark text-white/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="font-serif text-xl font-semibold text-white tracking-tight">
                            OldVint
                        </Link>
                        <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
                            Premium fashion, curated for the modern individual.
                        </p>
                        <div className="flex gap-3 mt-6">
                            <a href="https://www.instagram.com/oldvint.in?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 border border-white/15 rounded-lg hover:border-white/40 transition-colors">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="tel:9482459303" aria-label="Phone" className="p-2 border border-white/15 rounded-lg hover:border-white/40 transition-colors">
                                <Phone className="h-4 w-4" />
                            </a>
                            <a href="mailto:oldvintofficial@gmail.com" aria-label="Email" className="p-2 border border-white/15 rounded-lg hover:border-white/40 transition-colors">
                                <Mail className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                                {title}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/60 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/30">
                        © {new Date().getFullYear()} OldVint. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-white/30">
                        <span>Secure Checkout</span>
                        <span>Free Shipping</span>
                        <span>Easy Returns</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
