'use client';

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
import { HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
const faqCategories = [
  {
    title: "About Our Products",
    faqs: [
      {
        question: "Are your soaps 100% chemical-free?",
        answer:
          "Yes, all our soaps are made with 100% natural ingredients. We never use parabens, sulfates, synthetic fragrances, artificial colors, or any harsh chemicals. Every ingredient is sourced from nature and carefully selected for its skin benefits.",
      },
      {
        question: "Are your soaps suitable for sensitive skin?",
        answer:
          "Absolutely! Our soaps are formulated to be gentle on all skin types, including sensitive skin. We especially recommend our Goat Milk Glow, Aloe Pure, and Lavender Calm soaps for sensitive skin. However, if you have specific skin conditions or allergies, we recommend doing a patch test first.",
      },
      {
        question: "What is the shelf life of your soaps?",
        answer:
          "Our soaps have a shelf life of 10-12 months from the manufacturing date when stored properly. Milk-based soaps (Cow Milk, Goat Milk) have a slightly shorter shelf life of 10 months. The exact shelf life is mentioned on each product page and packaging.",
      },
      {
        question: "How should I store my soap?",
        answer:
          "Store your soap in a cool, dry place away from direct sunlight. Use a soap dish with proper drainage to let the soap dry between uses. This helps extend the life of your soap and prevents it from becoming mushy.",
      },
      {
        question: "Are your products tested on animals?",
        answer:
          "No, we are proudly cruelty-free. We never test our products on animals. Our soaps are made with love for both your skin and our furry friends.",
      },
      {
        question: "Can I use your soaps on my face?",
        answer:
          "Yes, most of our soaps are gentle enough for facial use. For face-specific care, we recommend our Rose Reverie, Kesar Chandan, and Aloe Pure soaps. The Charcoal (Pur Noir) and Multani Mitti soaps are great for oily and acne-prone facial skin.",
      },
    ],
  },
  {
    title: "Ordering & Shipping",
    faqs: [
      {
        question: "What is the shipping timeline?",
        answer:
          "We typically dispatch orders within 1-2 business days. Delivery takes 3-5 business days for metro cities and 5-7 business days for other locations. You will receive tracking information once your order is shipped.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free shipping on all orders above Rs. 499. For orders below Rs. 499, a flat shipping fee of Rs. 49 is applicable.",
      },
      {
        question: "Is Cash on Delivery (COD) available?",
        answer:
          "Yes, we offer COD across India. A nominal COD fee of Rs. 40 is applicable on COD orders. Prepaid orders get priority dispatch and free shipping on orders above Rs. 499.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we ship only within India. We're working on expanding our shipping to international locations. Stay tuned to our newsletter for updates!",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order is shipped, you'll receive a tracking link via SMS and email. You can also reach out to us on WhatsApp for order updates.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "Due to the personal hygiene nature of our products, we don't accept returns on used soaps. However, if you receive a damaged or defective product, we'll replace it at no additional cost. Please contact us within 48 hours of delivery with photos of the damaged product.",
      },
      {
        question: "How do I request a refund?",
        answer:
          "For damaged or defective products, contact us via WhatsApp or email with your order details and photos. Once verified, we'll process a replacement or refund within 5-7 business days. Refunds are credited to the original payment method.",
      },
      {
        question: "What if I receive the wrong product?",
        answer:
          "If you receive the wrong product, please contact us immediately with your order details. We'll arrange for a return pickup and send you the correct product at no extra cost.",
      },
    ],
  },
  {
    title: "Product Usage",
    faqs: [
      {
        question: "How long does one soap last?",
        answer:
          "With regular use (daily bathing), one 100g soap typically lasts 3-4 weeks for an individual. If used with a loofah or soap saver bag, it may last even longer. Proper storage between uses also helps extend the life of your soap.",
      },
      {
        question: "Can pregnant women use your soaps?",
        answer:
          "Most of our soaps are safe for pregnant women as they're made with natural ingredients. However, we recommend consulting with your healthcare provider before using any new skincare product during pregnancy. Avoid soaps with strong fragrances if you're sensitive during pregnancy.",
      },
      {
        question: "Are your soaps safe for children?",
        answer:
          "Yes, our soaps are gentle and safe for children. For kids, we especially recommend our Milk Silk (Cow Milk) and Goat Milk Glow soaps as they're extra moisturizing and gentle. Always supervise young children during bath time.",
      },
      {
        question: "Can I use the Hair Soap as a regular shampoo?",
        answer:
          "Yes, our Keshya (Herbal Hair Soap) is designed as a natural alternative to chemical shampoos. It cleanses the scalp, reduces dandruff, and promotes healthy hair. Use it 2-3 times a week for best results. Follow up with a natural conditioner if needed.",
      },
    ],
  },
];

export default function FAQPage() {
  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi! I have a question that's not covered in the FAQ.",
      "_blank"
    );
  };

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
                    {category.faqs.map((faq, faqIndex) => (
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
