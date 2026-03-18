"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { getBestSellers } from "@/lib/products";

export function BestSellers() {
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Customer Favorites
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
              Our Best Sellers
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl">
              The most loved soaps by our customers. Tried, tested, and absolutely adored.
            </p>
          </div>
          <Button variant="outline" asChild className="shrink-0 bg-transparent">
            <Link href="/shop?sort=popular" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
