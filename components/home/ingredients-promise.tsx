"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ingredients = [
  "Coconut Oil", "Glycerin", "Essential Oils", "Aloe Vera",
  "Honey", "Rose Petals", "Activated Charcoal", "Goat Milk",
  "Turmeric", "Sandalwood", "Coffee", "Neem",
];

const promises = [
  "No parabens or sulfates",
  "No artificial fragrances",
  "No animal testing",
  "100% biodegradable",
];

const DEFAULTS = {
  image1: "/images/products-grid-1.jpg",
  image2: "/images/products-grid-2.png",
  image3: "/images/keshya-hair-soap.png",
};

export function IngredientsPromise() {
  const [images, setImages] = useState(DEFAULTS);

  useEffect(() => {
    async function fetchImages() {
      try {
        const snap = await getDoc(doc(db, "settings", "homepage"));
        if (snap.exists()) {
          const data = snap.data();
          setImages({
            image1: data.ingredientsImage1 || DEFAULTS.image1,
            image2: data.ingredientsImage2 || DEFAULTS.image2,
            image3: data.ingredientsImage3 || DEFAULTS.image3,
          });
        }
      } catch (e) {
        // silently fall back to defaults
      }
    }
    fetchImages();
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Our Promise
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
              Pure Ingredients, Pure Results
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              {"We source our ingredients from trusted local farmers and suppliers. Every element in our soaps is carefully selected for its natural benefits to your skin."}
            </p>

            {/* Promises */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {promises.map((promise, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{promise}</span>
                </div>
              ))}
            </div>

            {/* Ingredient Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary text-sm text-muted-foreground rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild>
                <Link href="/about#ingredients">
                  Learn More About Our Ingredients
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={images.image1}
                    alt="Natural ingredients"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={images.image2}
                    alt="Handmade soaps"
                    width={300}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={images.image3}
                    alt="Natural soap making"
                    width={300}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl bg-primary/10 flex items-center justify-center p-6">
                  <div className="text-center">
                    <span className="font-serif text-4xl font-bold text-primary">15+</span>
                    <p className="text-sm text-muted-foreground mt-1">Natural Soaps</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
