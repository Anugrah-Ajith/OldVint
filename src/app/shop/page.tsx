import React from "react";
import Link from "next/link";
import { shopifyClient } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop All Products",
    description: "Browse our complete collection of fashion, clothing, and accessories at OldVint.",
};

export const revalidate = 0;

interface ShopPageProps {
    searchParams: Promise<{
        collection?: string;
        sort?: string;
        priceMin?: string;
        priceMax?: string;
        availability?: string;
    }>;
}

export default async function Shop({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const activeCollection = params.collection || "";
    const activeSort = params.sort || "BEST_SELLING";
    const priceMin = params.priceMin || "";
    const priceMax = params.priceMax || "";
    const availability = params.availability || "";

    const collectionsPromise = shopifyClient.getCollections();

    let sortKey = "BEST_SELLING";
    let reverse = false;
    if (activeSort === "PRICE_LTOH") { sortKey = "PRICE"; }
    else if (activeSort === "PRICE_HTOL") { sortKey = "PRICE"; reverse = true; }
    else if (activeSort === "NEWEST") { sortKey = "NEWEST"; }
    else if (activeSort === "TITLE_AZ") { sortKey = "TITLE"; }
    else if (activeSort === "TITLE_ZA") { sortKey = "TITLE"; reverse = true; }

    const productsPromise = shopifyClient.getProducts({
        collectionHandle: activeCollection,
        sortKey,
        reverse,
    });

    const [collections, allProducts] = await Promise.all([collectionsPromise, productsPromise]);

    let filteredProducts = [...allProducts];
    if (priceMin) {
        const min = parseFloat(priceMin);
        if (!isNaN(min)) filteredProducts = filteredProducts.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) >= min);
    }
    if (priceMax) {
        const max = parseFloat(priceMax);
        if (!isNaN(max)) filteredProducts = filteredProducts.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) <= max);
    }
    if (availability === "in_stock") {
        filteredProducts = filteredProducts.filter((p) => p.availableForSale);
    }

    const selectedColName = collections.find((c) => c.handle === activeCollection)?.title || "All Products";

    const getFilterUrl = (filters: Record<string, string | null>) => {
        const merged = { collection: activeCollection, sort: activeSort, priceMin, priceMax, availability, ...filters };
        const paramsList: string[] = [];
        Object.entries(merged).forEach(([k, v]) => {
            if (v !== null && v !== "") paramsList.push(`${k}=${encodeURIComponent(v)}`);
        });
        return `/shop${paramsList.length > 0 ? "?" + paramsList.join("&") : ""}`;
    };

    const sortOptions = [
        { key: "BEST_SELLING", label: "Popular" },
        { key: "NEWEST", label: "Newest" },
        { key: "PRICE_LTOH", label: "Price: Low to High" },
        { key: "PRICE_HTOL", label: "Price: High to Low" },
        { key: "TITLE_AZ", label: "A–Z" },
    ];

    return (
        <div className="min-h-screen">
            {/* Page header */}
            <div className="bg-bg-muted/50 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                    <h1 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary">{selectedColName}</h1>
                    <p className="text-sm text-text-secondary mt-1">
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-5 lg:gap-10">
                    {/* Sidebar Filters */}
                    <aside className="lg:col-span-1 hidden lg:block space-y-8">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
                                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                            </span>
                            {(activeCollection || priceMin || priceMax || availability) && (
                                <Link href="/shop" className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors">
                                    <RotateCcw className="h-3 w-3" /> Clear
                                </Link>
                            )}
                        </div>

                        {/* Collections */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">Collection</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href={getFilterUrl({ collection: "" })} className={`text-sm transition-colors ${!activeCollection ? "text-text-primary font-medium" : "text-text-muted hover:text-text-primary"}`}>
                                        All Products
                                    </Link>
                                </li>
                                {collections.map((col) => (
                                    <li key={col.id}>
                                        <Link href={getFilterUrl({ collection: col.handle })} className={`text-sm transition-colors ${activeCollection === col.handle ? "text-text-primary font-medium" : "text-text-muted hover:text-text-primary"}`}>
                                            {col.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">Price Range</h3>
                            <form action="/shop" method="GET" className="space-y-2">
                                {activeCollection && <input type="hidden" name="collection" value={activeCollection} />}
                                {activeSort && <input type="hidden" name="sort" value={activeSort} />}
                                {availability && <input type="hidden" name="availability" value={availability} />}
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="number" name="priceMin" placeholder="Min" defaultValue={priceMin} className="px-3 py-2 border border-border rounded-lg text-xs bg-white focus:outline-none focus:border-text-primary transition-colors" />
                                    <input type="number" name="priceMax" placeholder="Max" defaultValue={priceMax} className="px-3 py-2 border border-border rounded-lg text-xs bg-white focus:outline-none focus:border-text-primary transition-colors" />
                                </div>
                                <button type="submit" className="w-full py-2 border border-border rounded-lg text-xs font-medium text-text-secondary hover:border-border-dark hover:text-text-primary transition-colors">
                                    Apply
                                </button>
                            </form>
                        </div>

                        {/* Availability */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">Availability</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href={getFilterUrl({ availability: "" })} className={`text-sm transition-colors ${!availability ? "text-text-primary font-medium" : "text-text-muted hover:text-text-primary"}`}>
                                        All
                                    </Link>
                                </li>
                                <li>
                                    <Link href={getFilterUrl({ availability: "in_stock" })} className={`text-sm transition-colors ${availability === "in_stock" ? "text-text-primary font-medium" : "text-text-muted hover:text-text-primary"}`}>
                                        In Stock
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    {/* Main content */}
                    <main className="lg:col-span-4">
                        {/* Sort bar */}
                        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
                            <span className="text-xs text-text-muted font-medium shrink-0">Sort:</span>
                            {sortOptions.map((item) => (
                                <Link
                                    key={item.key}
                                    href={getFilterUrl({ sort: item.key })}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors whitespace-nowrap ${activeSort === item.key
                                            ? "bg-text-primary text-text-inverse border-text-primary"
                                            : "bg-white text-text-secondary border-border hover:border-border-dark"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Product grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 space-y-4">
                                <p className="text-text-secondary">No products found matching your filters.</p>
                                <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-medium text-text-primary underline underline-offset-4">
                                    Clear Filters
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
