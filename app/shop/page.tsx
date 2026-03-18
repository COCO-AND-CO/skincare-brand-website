import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ShopContent } from "@/components/shop/shop-content";
import { CartProvider } from "@/lib/cart-context";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Natural Soaps | COCO&CO",
  description: "Browse our collection of 100% handmade natural soaps. Filter by skin type, concern, and fragrance. Chemical-free and skin-safe.",
};

export default function ShopPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Our Natural Soaps
              </h1>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Discover our complete range of handmade soaps crafted with pure, natural ingredients for every skin type and concern.
              </p>
            </div>

            {/* Shop Content with Filters */}
            <Suspense fallback={<ShopSkeleton />}>
              <ShopContent />
            </Suspense>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}

function ShopSkeleton() {
  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <div className="h-96 bg-muted rounded-lg animate-pulse" />
      </div>
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
