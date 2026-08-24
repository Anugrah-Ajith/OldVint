"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
    { q: "How long does shipping take?", a: "Standard shipping takes 3-7 business days. Express delivery options are available at checkout." },
    { q: "What is your return policy?", a: "We offer easy returns within 7 days of delivery. Items must be in unused condition with original tags attached." },
    { q: "Do you offer Cash on Delivery?", a: "Yes, COD is available for most locations in India. You can select it at checkout." },
    { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking link via email and SMS." },
    { q: "Can I exchange for a different size?", a: "Yes, exchanges are available subject to stock availability. Contact our support team for assistance." },
    { q: "Are the products genuine?", a: "All products sold on OldVint are sourced directly from brands and verified manufacturers." },
];

export default function FAQPage() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="min-h-screen">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-10">
                <div className="text-center space-y-3">
                    <h1 className="font-serif text-3xl sm:text-4xl font-medium text-text-primary">FAQ</h1>
                    <p className="text-sm text-text-secondary">Common questions about orders, shipping, and returns.</p>
                </div>

                <div className="space-y-0 border-t border-border">
                    {FAQ_ITEMS.map((item, i) => (
                        <div key={i} className="border-b border-border">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between py-5 text-left text-sm font-medium text-text-primary hover:text-text-secondary transition-colors"
                            >
                                {item.q}
                                <ChevronDown className={`h-4 w-4 shrink-0 ml-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
                            </button>
                            {open === i && (
                                <div className="pb-5 text-sm text-text-secondary leading-relaxed animate-fade-in">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
