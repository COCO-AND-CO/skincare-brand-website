"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";

export function BestSellers() {
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestSellers() {
      try {
        const q = query(
          collection(db, "products"),
          where("bestSeller", "==", true),
          limit(4)
        );
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBestSellers(products);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBestSellers();
  }, []);

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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : bestSellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground col-span-full">
            <p>More best sellers coming soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
