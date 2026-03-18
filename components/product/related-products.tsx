"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { products, type Product } from "@/lib/products";

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  // Get related products based on category or skin type
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category ||
          p.skinType.some((type) => currentProduct.skinType.includes(type)))
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              You May Also Like
            </h2>
            <p className="mt-2 text-muted-foreground">
              Similar products you might love
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex gap-2 bg-transparent">
            <Link href="/shop">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
