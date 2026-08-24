import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicy() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-6">
            <h1 className="font-serif text-3xl font-medium text-text-primary">Refund Policy</h1>
            <div className="prose prose-sm text-text-secondary leading-relaxed space-y-4">
                <p>We want you to be completely satisfied with your purchase. If something isn&apos;t right, here&apos;s how our refund process works.</p>
                <h2 className="text-lg font-medium text-text-primary">Returns</h2>
                <p>Items can be returned within 7 days of delivery. Products must be in original, unused condition with all tags attached.</p>
                <h2 className="text-lg font-medium text-text-primary">Refund Timeline</h2>
                <p>Once we receive your return, refunds are processed within 5-7 business days to your original payment method.</p>
                <h2 className="text-lg font-medium text-text-primary">Non-Returnable Items</h2>
                <p>Innerwear, customized items, and items marked as final sale cannot be returned or exchanged.</p>
            </div>
        </div>
    );
}
