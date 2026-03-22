import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Images - Mobile and Desktop versions */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Banner */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/images/hero-mobile.png"
            alt="COCO&CO Handmade Soaps Mobile"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
        </div>

        {/* Desktop Banner */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/hero-soaps.png"
            alt="COCO&CO Natural Handmade Soaps"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center justify-center text-center md:items-start md:text-left">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            100% Handmade in India
          </div>

          {/* Headline - Responsive Sizes */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
            Pure Handmade Natural Soaps
            <span className="block text-primary mt-1 md:mt-2">Crafted with Love & Nature</span>
          </h1>

          {/* Subheadline - Responsive alignment */}
          <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-foreground font-medium max-w-lg mx-auto md:mx-0">
            Chemical-free • Skin-safe • Made with real ingredients for healthy, glowing skin
          </p>

          {/* CTA Buttons - Responsive layout */}
          <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center md:justify-start w-full md:w-auto">
            <Button size="lg" asChild className="text-base h-12 md:h-auto w-full md:w-auto rounded-full md:rounded-md">
              <Link href="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base h-12 md:h-auto w-full md:w-auto rounded-full md:rounded-md bg-white/30 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border-primary/20 md:border-input">
              <Link href="/shop?category=all">
                Explore Our Soaps
              </Link>
            </Button>
          </div>

          {/* Trust Badges - Responsive grid/flex */}
          <div className="flex flex-wrap gap-4 md:gap-8 mt-12 pt-8 border-t border-border/50 justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-xs md:text-sm text-foreground">No Chemicals</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">100% Natural</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-xs md:text-sm text-foreground">Fast Delivery</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">3-5 Days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-xs md:text-sm text-foreground">COD Available</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Pay on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
