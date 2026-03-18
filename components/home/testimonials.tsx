"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "I've been using the Kesar Chandan soap for 3 months now, and my skin has never looked better! The natural glow is real. Highly recommend to everyone looking for authentic natural skincare.",
    product: "Kesar Chandan Soap",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Delhi",
    rating: 5,
    text: "The Coffee soap is amazing for my oily skin. It controls excess oil without drying out my face. The fresh coffee fragrance is a bonus! Will definitely repurchase.",
    product: "Coffee Revive Soap",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore",
    rating: 5,
    text: "Finally found a soap that works for my sensitive skin! The Goat Milk soap is so gentle and moisturizing. No more irritation or dryness. Thank you COCO&CO!",
    product: "Goat Milk Glow Soap",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    text: "The Herbal Hair soap has significantly reduced my dandruff. My hair feels cleaner and healthier. Great alternative to chemical shampoos!",
    product: "Keshya Hair Soap",
  },
  {
    id: 5,
    name: "Meera Krishnan",
    location: "Chennai",
    rating: 5,
    text: "Ordered the Neem Haldi soap for my teenage son's acne, and it's working wonders! The pimples have reduced significantly. Natural and effective!",
    product: "Neem Sanctuary Soap",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Customer Love
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {"Real stories from real customers who've experienced the COCO&CO difference"}
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg relative">
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < current.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              {`"${current.text}"`}
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{current.name}</p>
                <p className="text-sm text-muted-foreground">
                  {current.location} • {current.product}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-primary/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-border">
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-primary">5000+</p>
            <p className="text-muted-foreground mt-1">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-primary">4.8</p>
            <p className="text-muted-foreground mt-1">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-primary">15+</p>
            <p className="text-muted-foreground mt-1">Natural Soaps</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-primary">100%</p>
            <p className="text-muted-foreground mt-1">Handmade</p>
          </div>
        </div>
      </div>
    </section>
  );
}
