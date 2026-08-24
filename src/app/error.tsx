"use client";

import React, { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Storefront runtime error:", error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
            <div className="bg-bg-muted p-8 rounded-2xl max-w-md w-full text-center space-y-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <AlertCircle className="h-8 w-8 text-text-primary" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-serif text-text-primary">Something went wrong</h2>
                    <p className="text-sm text-text-secondary">
                        We were unable to load the required store data. This might be a temporary connection issue.
                    </p>
                </div>

                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-accent text-text-inverse text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
