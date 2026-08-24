import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about OldVint — premium fashion curated for the modern individual.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-14">
                <div className="text-center space-y-4">
                    <h1 className="font-serif text-3xl sm:text-4xl font-medium text-text-primary">About OldVint</h1>
                    <p className="text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
                        We believe great style shouldn&apos;t be complicated. OldVint curates premium fashion that balances modern design with everyday comfort.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-text-secondary leading-relaxed">
                    <div className="space-y-4">
                        <h2 className="font-serif text-xl font-medium text-text-primary">Our Story</h2>
                        <p>
                            OldVint started with a simple idea: make premium quality fashion accessible. We work directly with manufacturers to bring you well-designed, well-crafted clothing and accessories without the markup.
                        </p>
                        <p>
                            Every product in our collection is selected for its design, fit, and materials. We focus on pieces that work across occasions — from casual weekends to smart-casual workdays.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="font-serif text-xl font-medium text-text-primary">What We Stand For</h2>
                        <p>
                            No fast fashion gimmicks. No fake discounts. We price our products fairly from day one and stand behind the quality of everything we sell.
                        </p>
                        <p>
                            We offer free shipping, hassle-free returns, and a customer support team that actually helps. Our goal is to make your shopping experience as smooth as the clothes we sell.
                        </p>
                    </div>
                </div>

                <div className="bg-bg-muted rounded-xl p-8 sm:p-10 grid grid-cols-3 gap-6 text-center">
                    <div>
                        <p className="text-2xl sm:text-3xl font-semibold text-text-primary">Free</p>
                        <p className="text-xs text-text-muted mt-1">Shipping on all orders</p>
                    </div>
                    <div>
                        <p className="text-2xl sm:text-3xl font-semibold text-text-primary">7 Day</p>
                        <p className="text-xs text-text-muted mt-1">Easy returns</p>
                    </div>
                    <div>
                        <p className="text-2xl sm:text-3xl font-semibold text-text-primary">24/7</p>
                        <p className="text-xs text-text-muted mt-1">Customer support</p>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-text-inverse text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                    >
                        Shop Now <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
