import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Leaf,
  Shield,
  Recycle,
  Award,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | COCO&CO Natural Soaps",
  description:
    "Learn about COCO&CO's journey in creating 100% handmade natural soaps. Our mission, values, and commitment to sustainable skincare.",
};

const values = [
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Every soap is handcrafted with care and attention by our skilled artisans who pour their heart into each creation.",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "We use only plant-based, natural ingredients sourced from trusted local farmers across India.",
  },
  {
    icon: Shield,
    title: "Safe & Gentle",
    description:
      "Our formulas are free from harsh chemicals, parabens, and sulfates. Safe for all skin types including sensitive skin.",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    description:
      "Sustainable packaging, biodegradable ingredients, and eco-conscious practices are at the core of everything we do.",
  },
];

const milestones = [
  { year: "2019", title: "The Beginning", description: "Started making soaps at home for family and friends" },
  { year: "2020", title: "First Online Sale", description: "Launched our first online store with 5 soap variants" },
  { year: "2021", title: "Growing Family", description: "Reached 1000+ happy customers across India" },
  { year: "2022", title: "Expanded Range", description: "Introduced 15+ natural soap variants and hair care" },
  { year: "2023", title: "Community Impact", description: "Partnered with local farmers for sustainable sourcing" },
  { year: "2024", title: "5000+ Customers", description: "Became a trusted name in natural skincare" },
];

export default function AboutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-secondary" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    Our Story
                  </span>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 text-balance">
                    {"Nature's Touch For You"}
                  </h1>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    {"COCO&CO was born from a simple belief – that skincare should be pure, natural, and accessible to everyone. What started as a passion project in a small kitchen has grown into a movement of conscious beauty."}
                  </p>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {"Every soap we create is a labor of love, handmade using traditional techniques passed down through generations, combined with the finest natural ingredients that India has to offer."}
                  </p>
                  <Button asChild className="mt-8">
                    <Link href="/shop">
                      Explore Our Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/hero-soaps.png"
                      alt="COCO&CO handmade soaps"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
                    <p className="font-serif text-3xl font-bold text-primary">5+</p>
                    <p className="text-muted-foreground">Years of Crafting Natural Soaps</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="py-16 md:py-24" id="values">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Our Values
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
                  What We Stand For
                </h2>
                <p className="mt-4 text-muted-foreground text-lg">
                  Our core values guide everything we do, from ingredient sourcing to packaging.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Handmade Process */}
          <section className="py-16 md:py-24 bg-secondary" id="process">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    Our Process
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
                    Handcrafted with Care
                  </h2>
                  <p className="mt-4 text-muted-foreground text-lg">
                    Each soap goes through a meticulous process to ensure the highest quality and effectiveness.
                  </p>

                  <div className="mt-8 space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Ingredient Sourcing</h3>
                        <p className="text-muted-foreground mt-1">
                          We carefully source natural ingredients from trusted local farmers and suppliers.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Cold Process Method</h3>
                        <p className="text-muted-foreground mt-1">
                          We use the traditional cold process method to preserve the natural benefits of ingredients.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">4-6 Week Curing</h3>
                        <p className="text-muted-foreground mt-1">
                          Each soap cures for 4-6 weeks to become milder and longer-lasting.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Quality Check</h3>
                        <p className="text-muted-foreground mt-1">
                          Every soap is inspected for quality before being hand-wrapped in eco-friendly packaging.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                      <Image
                        src="/images/products-grid-1.jpg"
                        alt="Soap making process"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                      <Image
                        src="/images/products-grid-2.png"
                        alt="Natural ingredients"
                        width={300}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                      <Image
                        src="/images/keshya-hair-soap.png"
                        alt="Handmade soaps"
                        width={300}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-2xl bg-primary text-primary-foreground flex items-center justify-center p-6">
                      <div className="text-center">
                        <Award className="h-12 w-12 mx-auto mb-2" />
                        <p className="font-semibold">Quality Assured</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ingredients */}
          <section className="py-16 md:py-24" id="ingredients">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Pure Ingredients
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
                  {"Nature's Finest for Your Skin"}
                </h2>
                <p className="mt-4 text-muted-foreground text-lg">
                  We believe in complete transparency. Here are some of the key ingredients we use.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Base Oils</h3>
                  <ul className="space-y-2">
                    {["Coconut Oil", "Sweet Almond Oil", "Olive Oil", "Castor Oil"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Natural Additives</h3>
                  <ul className="space-y-2">
                    {["Pure Honey", "Goat & Cow Milk", "Aloe Vera", "Turmeric (Haldi)"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Essential Oils & Extracts</h3>
                  <ul className="space-y-2">
                    {["Rose Extract", "Lavender Oil", "Coffee Extract", "Sandalwood (Chandan)"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 bg-primary/5 p-8 rounded-2xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">What We Never Use</h3>
                    <p className="text-muted-foreground mt-1">
                      Our soaps are free from parabens, sulfates, synthetic fragrances, artificial colors, palm oil, and any animal-derived ingredients (except milk variants).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sustainability */}
          <section className="py-16 md:py-24 bg-secondary" id="sustainability">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    Sustainability
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
                    Kind to Your Skin, Kind to Earth
                  </h2>
                  <p className="mt-4 text-muted-foreground text-lg">
                    {"We're committed to minimizing our environmental footprint at every step."}
                  </p>

                  <div className="mt-8 space-y-4">
                    {[
                      "100% biodegradable ingredients",
                      "Recyclable and minimal packaging",
                      "No plastic in product wrapping",
                      "Local sourcing to reduce carbon footprint",
                      "Support for local farming communities",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-card p-8 rounded-2xl border border-border">
                  <Recycle className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                    Our Green Promise
                  </h3>
                  <p className="text-muted-foreground">
                    {"For every order placed, we commit to planting one tree through our partnership with local environmental organizations. Together, we've planted over 2,000 trees and counting."}
                  </p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-4">
                      <Users className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-serif text-2xl font-bold text-primary">2,000+</p>
                        <p className="text-sm text-muted-foreground">Trees Planted</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Our Journey
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
                  Milestones Along the Way
                </h2>
              </div>

              <div className="relative">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex-1 ${
                          index % 2 === 0 ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <div className="bg-card p-6 rounded-xl border border-border inline-block">
                          <span className="text-sm font-medium text-primary">
                            {milestone.year}
                          </span>
                          <h3 className="font-semibold text-lg text-foreground mt-1">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:flex w-4 h-4 rounded-full bg-primary relative z-10" />
                      <div className="flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">
                Ready to Experience the Difference?
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                {"Join thousands of happy customers who've made the switch to natural, handmade skincare."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/shop">
                    Shop Our Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
