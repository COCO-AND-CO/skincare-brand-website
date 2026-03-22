import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Brightening",
    description: "For radiant, glowing skin",
    href: "/shop?category=Brightening",
    color: "bg-amber-50",
    accent: "text-amber-700",
  },
  {
    name: "Hydrating",
    description: "Deep moisture & nourishment",
    href: "/shop?category=Hydrating",
    color: "bg-blue-50",
    accent: "text-blue-700",
  },
  {
    name: "Acne Care",
    description: "Clear & healthy skin",
    href: "/shop?category=Acne+Care",
    color: "bg-green-50",
    accent: "text-green-700",
  },
  {
    name: "Hair Care",
    description: "Natural hair wellness",
    href: "/shop?category=Hair+Care",
    color: "bg-orange-50",
    accent: "text-orange-700",
  },
  {
    name: "Premium",
    description: "Luxury skincare experience",
    href: "/shop?category=Premium",
    color: "bg-rose-50",
    accent: "text-rose-700",
  },
  {
    name: "Aromatherapy",
    description: "Relaxation & wellness",
    href: "/shop?category=Aromatherapy",
    color: "bg-purple-50",
    accent: "text-purple-700",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Shop by Category
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
            Find Your Perfect Match
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Discover soaps tailored to your unique skin needs and preferences
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group block relative p-6 md:p-8 rounded-2xl ${category.color} hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer`}
            >
              <div className="relative z-10">
                <h3 className={`font-serif text-xl md:text-2xl font-bold ${category.accent}`}>
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.description}
                </p>
                <div className={`inline-flex items-center gap-1 mt-4 text-sm font-medium ${category.accent}`}>
                  Shop Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
