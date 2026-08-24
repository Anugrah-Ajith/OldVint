import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-6">
            <h1 className="font-serif text-3xl font-medium text-text-primary">Privacy Policy</h1>
            <div className="prose prose-sm text-text-secondary leading-relaxed space-y-4">
                <p>At OldVint, we are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.</p>
                <h2 className="text-lg font-medium text-text-primary">Information We Collect</h2>
                <p>We collect information you provide directly, such as your name, email, shipping address, and payment details when you place an order.</p>
                <h2 className="text-lg font-medium text-text-primary">How We Use Your Information</h2>
                <p>Your information is used to process orders, communicate updates, and improve your shopping experience. We do not sell your personal data to third parties.</p>
                <h2 className="text-lg font-medium text-text-primary">Data Security</h2>
                <p>We use industry-standard encryption to protect your data during transactions. Payment processing is handled by secure third-party providers.</p>
            </div>
        </div>
    );
}
