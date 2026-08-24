import React from "react";
import { notFound } from "next/navigation";
import { shopifyClient } from "@/lib/shopify";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import type { Metadata } from "next";

interface ProductPageProps {
    params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const product = await shopifyClient.getProduct(resolvedParams.handle);

    if (!product) {
        return { title: "Product Not Found" };
    }

    return {
        title: product.title,
        description: product.description?.slice(0, 160),
        openGraph: {
            title: product.title,
            description: product.description?.slice(0, 160),
            images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : [],
            type: "website",
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params;
    const product = await shopifyClient.getProduct(resolvedParams.handle);

    if (!product) {
        notFound();
    }

    const relatedProducts = await shopifyClient.getRecommendedProducts(product.id);

    return (
        <ProductDetailsClient
            product={product}
            relatedProducts={relatedProducts}
        />
    );
}
