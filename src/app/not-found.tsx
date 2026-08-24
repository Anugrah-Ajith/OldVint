import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center space-y-5 max-w-md">
                <p className="text-7xl font-serif font-bold text-text-primary">404</p>
                <h1 className="text-xl font-medium text-text-primary">Page not found</h1>
                <p className="text-sm text-text-secondary">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-text-inverse text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                >
                    Back to Home <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
