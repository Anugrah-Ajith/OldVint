"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            onClose();
        }
    };

    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 z-50 animate-fade-in"
                onClick={onClose}
            />
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl animate-scale-up">
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <form onSubmit={handleSubmit} className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-12 pr-12 py-4 text-base bg-bg-muted border border-border rounded-xl focus:outline-none focus:border-text-primary transition-colors placeholder:text-text-muted"
                        />
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-text-muted hover:text-text-primary transition-colors"
                            aria-label="Close search"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </form>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-xs text-text-muted font-medium">Popular:</span>
                        {["Shirts", "T-Shirts", "Jeans", "Accessories"].map((term) => (
                            <button
                                key={term}
                                onClick={() => {
                                    router.push(`/search?q=${term}`);
                                    onClose();
                                }}
                                className="px-3 py-1 text-xs bg-bg-muted border border-border rounded-full text-text-secondary hover:text-text-primary hover:border-border-dark transition-colors"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
