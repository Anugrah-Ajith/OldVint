import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsOfService() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-6">
            <h1 className="font-serif text-3xl font-medium text-text-primary">Terms of Service</h1>
            <div className="prose prose-sm text-text-secondary leading-relaxed space-y-4">
                <p>By using OldVint, you agree to these terms. Please read them carefully before making a purchase.</p>
                <h2 className="text-lg font-medium text-text-primary">Orders & Payments</h2>
                <p>All prices are listed in INR and include applicable taxes. We reserve the right to cancel fraudulent orders.</p>
                <h2 className="text-lg font-medium text-text-primary">Shipping</h2>
                <p>We offer free standard shipping across India. Delivery times vary by location.</p>
                <h2 className="text-lg font-medium text-text-primary">Intellectual Property</h2>
                <p>All content on this website, including images and text, is owned by OldVint and may not be reproduced without permission.</p>
            </div>
        </div>
    );
}
