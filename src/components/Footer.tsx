"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-stone-950 border-t border-stone-850 text-stone-300 pt-16 pb-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-stone-850">

                    {/* Brand Col */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl font-bold tracking-widest text-[#D4AF37]">
                            OldVint
                        </h3>
                        <p className="text-sm text-stone-400 font-light leading-relaxed">
                            Curators of premium vintage timepieces, heritage leather goods, and refined lifestyle accessories. Each article is meticulously selected, serviced, and verified for absolute craftsmanship integrity.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 text-stone-400 hover:text-[#D4AF37] transition-all bg-stone-900 border border-stone-800 rounded"
                            >
                                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </a>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-[#D4AF37]">
                                <ShieldCheck className="h-4 w-4" />
                                100% Certified Authentic
                            </span>
                        </div>
                    </div>

                    {/* Catalog Navigation */}
                    <div>
                        <h4 className="font-serif text-[#D4AF37] text-sm uppercase tracking-widest mb-6">Store Archives</h4>
                        <ul className="space-y-3.5 text-sm">
                            <li>
                                <Link href="/shop?collection=timepieces" className="hover:text-white transition-colors">
                                    Mechanical Timepieces
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?collection=leather-goods" className="hover:text-white transition-colors">
                                    Heritage Leather Goods
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?collection=accessories" className="hover:text-white transition-colors">
                                    Collector Accessories
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-white transition-colors font-medium">
                                    View All Archives
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal / Policy links */}
                    <div>
                        <h4 className="font-serif text-[#D4AF37] text-sm uppercase tracking-widest mb-6">Assistance & Policies</h4>
                        <ul className="space-y-3.5 text-sm">
                            <li>
                                <Link href="/faq" className="hover:text-white transition-colors">
                                    Authenticity & Servicing
                                </Link>
                            </li>
                            <li>
                                <Link href="/policies/refund" className="hover:text-white transition-colors">
                                    Refund & Insured Shipping
                                </Link>
                            </li>
                            <li>
                                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/policies/terms" className="hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-[#D4AF37] text-sm uppercase tracking-widest">OldVint Journal</h4>
                        <p className="text-sm text-stone-400 font-light leading-relaxed">
                            Join our exclusive registry. Receive notifications regarding newly sourced vintage articles and private collector sales events.
                        </p>
                        {subscribed ? (
                            <div className="bg-stone-900 border border-[#D4AF37]/30 rounded p-4 text-center">
                                <p className="text-[#D4AF37] text-sm font-serif italic font-semibold">Registered Successfully</p>
                                <p className="text-xs text-stone-400 mt-1">You are now part of our collector circle.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                                    />
                                    <Mail className="absolute right-3 top-3 h-4 w-4 text-stone-500" />
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#B4902F] text-stone-950 rounded font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                                >
                                    Join <ArrowRight className="h-3 w-3" />
                                </button>
                            </form>
                        )}
                    </div>

                </div>

                {/* Bottom Credits & Shopify handoff status */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
                    <p>© {currentYear} OldVint Boutique. All rights reserved.</p>
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center gap-1">
                            Shopify Secure Handoff <ExternalLink className="h-3 w-3" />
                        </span>
                        <Link href="/about" className="hover:text-stone-300">
                            Heritage Origins
                        </Link>
                        <Link href="/contact" className="hover:text-stone-300">
                            Private Inquiries
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
