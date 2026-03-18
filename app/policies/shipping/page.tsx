import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart-context";
import { Truck, Clock, MapPin, Package, CreditCard, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Policy | COCO&CO",
  description: "Learn about COCO&CO's shipping policy, delivery times, and shipping charges.",
};

export default function ShippingPolicyPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Shipping Policy
              </h1>
              <p className="mt-4 text-muted-foreground">
                Last updated: January 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral max-w-none">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-8">
                {/* Shipping Coverage */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Shipping Coverage
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    We currently ship to all locations within India. We deliver to all states and union territories, including remote areas. International shipping is not available at this time but is planned for the future.
                  </p>
                </section>

                {/* Delivery Timeline */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Delivery Timeline
                    </h2>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Order Processing:</strong> 1-2 business days
                    </p>
                    <p>
                      <strong className="text-foreground">Metro Cities (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad):</strong> 3-5 business days
                    </p>
                    <p>
                      <strong className="text-foreground">Tier 2 & 3 Cities:</strong> 5-7 business days
                    </p>
                    <p>
                      <strong className="text-foreground">Remote Areas:</strong> 7-10 business days
                    </p>
                    <p className="text-sm italic">
                      Note: These are estimated delivery times. Actual delivery may vary based on courier partner performance, weather conditions, or unforeseen circumstances.
                    </p>
                  </div>
                </section>

                {/* Shipping Charges */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Shipping Charges
                    </h2>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 space-y-2">
                    <p className="text-foreground font-medium">Prepaid Orders:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Orders above Rs. 499: <strong className="text-primary">FREE SHIPPING</strong></li>
                      <li>Orders below Rs. 499: Rs. 49 flat shipping charge</li>
                    </ul>
                    <p className="text-foreground font-medium mt-4">Cash on Delivery (COD):</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>COD charge: Rs. 40 (in addition to shipping charges if applicable)</li>
                      <li>Orders above Rs. 499: Rs. 40 COD charge only (free shipping)</li>
                    </ul>
                  </div>
                </section>

                {/* Payment Options */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Payment Options
                    </h2>
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Credit/Debit Cards (Visa, Mastercard, RuPay)</li>
                    <li>UPI (Google Pay, PhonePe, Paytm, BHIM)</li>
                    <li>Net Banking</li>
                    <li>Wallets (Paytm, Amazon Pay, etc.)</li>
                    <li>Cash on Delivery (COD)</li>
                  </ul>
                </section>

                {/* Order Tracking */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Order Tracking
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    Once your order is shipped, you will receive an SMS and email with the tracking details. You can track your order using the tracking link provided. For any issues with tracking, please contact us on WhatsApp or email.
                  </p>
                </section>

                {/* Questions */}
                <section className="bg-primary/5 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Have Questions?
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about shipping, please {"don't"} hesitate to contact us.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/contact" className="text-primary hover:underline font-medium">
                      Contact Us
                    </Link>
                    <Link href="/faq" className="text-primary hover:underline font-medium">
                      View FAQ
                    </Link>
                  </div>
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
