// src/app/product/[handle]/page.tsx


import { notFound } from "next/navigation";
import { shopifyClient } from "@/lib/shopify";
import ProductDetail from "@/components/ProductDetail";

export const dynamic = "force-dynamic";

/** Generate static paths for existing products */
export async function generateStaticParams() {
  const products = await shopifyClient.getProducts({ first: 250 });
  return products.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await shopifyClient.getProduct(handle);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
