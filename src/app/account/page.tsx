"use client";

import React from "react";
import Link from "next/link";
import { User as UserIcon, ArrowRight } from "lucide-react";

export default function AccountPage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                <div className="text-center space-y-5">
                    <div className="h-16 w-16 bg-bg-muted rounded-full flex items-center justify-center mx-auto">
                        <UserIcon className="h-7 w-7 text-text-muted" />
                    </div>
                    <h1 className="font-serif text-2xl font-medium text-text-primary">My Account</h1>
                    <p className="text-sm text-text-secondary">
                        Account management will be available once Shopify customer accounts are connected.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-text-inverse text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                    >
                        Continue Shopping <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
