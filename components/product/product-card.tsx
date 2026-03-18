"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { getProductImage } from "@/lib/product-images";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.bestSeller && (
          <Badge className="bg-primary text-primary-foreground">Best Seller</Badge>
        )}
        {product.featured && !product.bestSeller && (
          <Badge variant="secondary">Featured</Badge>
        )}
      </div>

      {/* Image */}
      <Link href={`/shop/${(product as any).id || product.slug}`} className="block relative aspect-square overflow-hidden bg-muted">
        <Image
          src={(product as any).imageUrl || getProductImage(product.slug) || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/shop/${(product as any).id || product.slug}`}>
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">
              Rs. {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                Rs. {product.originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="sr-only md:not-sr-only">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
