"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, ArrowRight, Loader2 } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

const STATIC_FAQ_CATEGORIES = [
  {
    title: "About Our Products",
    faqs: [
      {
        question: "Are your soaps 100% chemical-free?",
        answer: "Yes, all our soaps are made with 100% natural ingredients. We never use parabens, sulfates, synthetic fragrances, artificial colors, or any harsh chemicals.",
      },
    ],
  },
];

export default function FAQPage() {
  const [faqCategories, setFaqCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const q = query(collection(db, "faqs"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const dynamicFaqs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (dynamicFaqs.length > 0) {
          // Group by category
          const categories = ["About Our Products", "Ordering & Shipping", "Returns & Refunds", "Product Usage"];
          const grouped = categories.map(cat => ({
            title: cat,
            faqs: dynamicFaqs.filter((f: any) => f.category === cat)
          })).filter(c => c.faqs.length > 0);
          
          setFaqCategories(grouped);
        } else {
          setFaqCategories(STATIC_FAQ_CATEGORIES);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setFaqCategories(STATIC_FAQ_CATEGORIES);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, []);

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi! I have a question that's not covered in the FAQ.",
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                Find answers to the most common questions about our products, shipping, and more.
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq: any, faqIndex: number) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border-b border-border last:border-0"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium text-foreground">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="mt-12 bg-primary/5 rounded-xl p-8 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {"Can't find the answer you're looking for? Our support team is here to help!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleWhatsAppClick} className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
