import React from "react";
import Link from "next/link";
import Image from "next/image";
import { shopifyClient } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, CreditCard } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const [collections, products] = await Promise.all([
    shopifyClient.getCollections(),
    shopifyClient.getProducts({ sortKey: "BEST_SELLING" }),
  ]);

  const featuredProducts = products.slice(0, 8);
  const newArrivals = [...products].reverse().slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative bg-bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[70vh]">
          {/* Text side */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-24 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold mb-4">
              New Season Collection
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight">
              Fashion That{" "}
              <span className="italic text-accent-gold">Defines</span> You
            </h1>
            <p className="mt-5 text-base text-white/60 max-w-md leading-relaxed">
              Discover curated fashion essentials designed for comfort,
              confidence, and everyday style.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="px-7 py-3.5 bg-white text-bg-dark text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors tracking-wide"
              >
                Shop Collection
              </Link>
              <Link
                href="/shop?sort=NEWEST"
                className="px-7 py-3.5 border border-white/25 text-white text-sm font-medium rounded-lg hover:border-white/60 hover:bg-white/5 transition-all tracking-wide"
              >
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Image side */}
          <div className="relative hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
              alt="Fashion collection showcase"
              fill
              priority
              className="object-cover object-center"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/20 to-transparent" />
          </div>
        </div>

        {/* Mobile hero bg */}
        <div className="absolute inset-0 lg:hidden opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, text: "Free Shipping" },
              { icon: RotateCcw, text: "Easy Returns" },
              { icon: ShieldCheck, text: "Secure Checkout" },
              { icon: CreditCard, text: "COD Available" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-2 py-1">
                <Icon className="h-4 w-4 text-text-muted" />
                <span className="text-xs font-medium text-text-secondary">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED COLLECTIONS ===== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary">
                Shop by Category
              </h2>
              <p className="text-sm text-text-secondary mt-1">Find what suits your style</p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:underline underline-offset-4"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {collections.slice(0, 3).map((col) => (
              <Link
                key={col.id}
                href={`/shop?collection=${col.handle}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-bg-muted"
              >
                <Image
                  src={col.imageUrl}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-medium text-white">
                    {col.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">
                    Shop Now <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="py-16 sm:py-20 bg-bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary">
                Best Sellers
              </h2>
              <p className="text-sm text-text-secondary mt-1">Our most loved pieces</p>
            </div>
            <Link
              href="/shop?sort=BEST_SELLING"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:underline underline-offset-4"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRAND STATEMENT ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-text-primary leading-snug">
              Style without compromise.{" "}
              <span className="text-text-secondary">Quality you can feel.</span>
            </h2>
            <p className="text-base text-text-secondary leading-relaxed max-w-xl mx-auto">
              OldVint brings you carefully selected fashion that balances modern
              design with lasting quality. No fast fashion. No shortcuts. Just
              clothes and accessories you&apos;ll actually want to keep.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
            >
              Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      {newArrivals.length > 0 && (
        <section className="py-16 sm:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary">
                  New Arrivals
                </h2>
                <p className="text-sm text-text-secondary mt-1">Fresh drops for your wardrobe</p>
              </div>
              <Link
                href="/shop?sort=NEWEST"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:underline underline-offset-4"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== NEWSLETTER ===== */}
      <section className="py-16 sm:py-20 bg-bg-dark text-white">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium">
            Stay in the loop
          </h2>
          <p className="text-sm text-white/50">
            Get early access to new drops, exclusive offers, and style updates.
          </p>
          <form
            className="flex gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/15 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-bg-dark text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
