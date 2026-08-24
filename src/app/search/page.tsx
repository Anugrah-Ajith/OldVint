import React from "react";
import Link from "next/link";
import { shopifyClient } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import { Search as SearchIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Search" };
export const revalidate = 0;

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q?.toString().trim() || "";
    const products = query ? await shopifyClient.getProducts({ query }) : [];

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <div className="text-center mb-10 space-y-5">
                    <h1 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary">Search</h1>
                    <form action="/search" method="GET" className="max-w-xl mx-auto relative">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                        <input
                            type="text"
                            name="q"
                            defaultValue={query}
                            placeholder="Search products..."
                            className="w-full pl-12 pr-4 py-3.5 bg-bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-text-primary transition-colors"
                        />
                    </form>
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="text-xs text-text-muted">Popular:</span>
                        {["Shirts", "T-Shirts", "Casual", "Accessories"].map((term) => (
                            <Link key={term} href={`/search?q=${term}`} className="px-3 py-1 text-xs bg-bg-muted border border-border rounded-full text-text-secondary hover:text-text-primary hover:border-border-dark transition-colors">
                                {term}
                            </Link>
                        ))}
                    </div>
                </div>

                {query ? (
                    <div>
                        <div className="flex justify-between items-center mb-6 pb-3 border-b border-border">
                            <h2 className="text-sm font-medium text-text-primary">Results for &ldquo;{query}&rdquo;</h2>
                            <span className="text-xs text-text-muted">{products.length} found</span>
                        </div>
                        {products.length === 0 ? (
                            <div className="text-center py-16 space-y-4">
                                <p className="text-text-secondary">No products found for &ldquo;{query}&rdquo;</p>
                                <Link href="/shop" className="inline-flex text-sm font-medium text-text-primary underline underline-offset-4">
                                    Browse All Products
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16 text-text-muted text-sm">
                        Start typing to find products.
                    </div>
                )}
            </div>
        </div>
    );
}
