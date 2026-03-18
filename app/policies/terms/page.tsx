import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart-context";
import { FileText, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | COCO&CO",
  description: "Read the terms and conditions for using COCO&CO's website and services.",
};

export default function TermsPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Terms & Conditions
              </h1>
              <p className="mt-4 text-muted-foreground">
                Last updated: January 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral max-w-none">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-8">
                {/* Introduction */}
                <section>
                  <p className="text-muted-foreground">
                    Welcome to COCO&CO. By accessing or using our website (cocoandco.in) and purchasing our products, you agree to be bound by these Terms & Conditions. Please read them carefully before using our services.
                  </p>
                </section>

                {/* General Terms */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    1. General Terms
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>These terms apply to all users of the website, including browsers, customers, and merchants.</li>
                    <li>We reserve the right to update or modify these terms at any time without prior notice.</li>
                    <li>By continuing to use the website after changes, you accept the revised terms.</li>
                    <li>You must be at least 18 years old to make a purchase or have parental/guardian consent.</li>
                  </ul>
                </section>

                {/* Products */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    2. Products & Services
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>All products are handmade with natural ingredients. Slight variations in color, texture, or appearance are normal and expected.</li>
                    <li>Product images are for illustration purposes. Actual products may vary slightly.</li>
                    <li>We make every effort to display accurate product information, but we do not warrant that descriptions, prices, or other content is error-free.</li>
                    <li>We reserve the right to limit quantities, refuse orders, or discontinue products at any time.</li>
                  </ul>
                </section>

                {/* Pricing */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    3. Pricing & Payments
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>All prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes.</li>
                    <li>Prices are subject to change without notice.</li>
                    <li>We accept various payment methods including credit/debit cards, UPI, net banking, and COD.</li>
                    <li>Payment processing is handled by secure third-party payment gateways.</li>
                    <li>We are not responsible for any additional charges imposed by your bank or payment provider.</li>
                  </ul>
                </section>

                {/* Orders */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    4. Orders & Cancellation
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>An order confirmation email does not constitute acceptance of your order. We reserve the right to cancel orders due to stock unavailability, pricing errors, or suspected fraud.</li>
                    <li>Orders can be cancelled before dispatch. Contact us immediately if you wish to cancel.</li>
                    <li>Once an order is shipped, it cannot be cancelled. Please refer to our Return Policy.</li>
                    <li>We may refuse orders that appear to be placed for resale purposes without prior agreement.</li>
                  </ul>
                </section>

                {/* Shipping */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    5. Shipping & Delivery
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    Please refer to our <Link href="/policies/shipping" className="text-primary hover:underline">Shipping Policy</Link> for detailed information about shipping timelines, charges, and delivery terms.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Delivery timelines are estimates and may vary due to factors beyond our control.</li>
                    <li>Risk of loss passes to you upon delivery to the shipping carrier.</li>
                    <li>Ensure accurate delivery information. We are not responsible for delays or non-delivery due to incorrect addresses.</li>
                  </ul>
                </section>

                {/* Returns */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    6. Returns & Refunds
                  </h2>
                  <p className="text-muted-foreground">
                    Please refer to our <Link href="/policies/returns" className="text-primary hover:underline">Return & Refund Policy</Link> for detailed information about returns, exchanges, and refunds.
                  </p>
                </section>

                {/* Intellectual Property */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    7. Intellectual Property
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>All content on this website, including text, images, logos, and designs, is the property of COCO&CO and protected by intellectual property laws.</li>
                    <li>You may not reproduce, distribute, modify, or use our content without prior written permission.</li>
                    <li>The COCO&CO name and logo are registered trademarks.</li>
                  </ul>
                </section>

                {/* User Conduct */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    8. User Conduct
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Use the website for any unlawful purpose</li>
                    <li>Violate any laws or regulations</li>
                    <li>Infringe on the rights of others</li>
                    <li>Transmit harmful code or interfere with the {"website's"} functionality</li>
                    <li>Attempt to gain unauthorized access to any part of the website</li>
                    <li>Engage in fraudulent activities</li>
                  </ul>
                </section>

                {/* Disclaimer */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    9. Disclaimer
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Our products are not intended to diagnose, treat, cure, or prevent any disease.</li>
                    <li>If you have specific skin conditions or allergies, consult a dermatologist before use.</li>
                    <li>Individual results may vary. We make no guarantees about specific outcomes.</li>
                    <li>The website is provided {"'as is'"} without warranties of any kind.</li>
                  </ul>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    10. Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground">
                    To the fullest extent permitted by law, COCO&CO shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or products, even if we have been advised of the possibility of such damages.
                  </p>
                </section>

                {/* Governing Law */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    11. Governing Law
                  </h2>
                  <p className="text-muted-foreground">
                    These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                  </p>
                </section>

                {/* Contact */}
                <section className="bg-primary/5 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Questions?
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms & Conditions, please contact us:
                  </p>
                  <ul className="text-muted-foreground space-y-1">
                    <li><strong className="text-foreground">Email:</strong> hello@cocoandco.in</li>
                    <li><strong className="text-foreground">Phone:</strong> +91 98765 43210</li>
                  </ul>
                </section>
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
