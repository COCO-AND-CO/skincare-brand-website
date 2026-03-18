import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart-context";
import { RefreshCw, Package, AlertCircle, CheckCircle, Clock, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Return & Refund Policy | COCO&CO",
  description: "Learn about COCO&CO's return and refund policy for natural soaps.",
};

export default function ReturnsPolicyPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Return & Refund Policy
              </h1>
              <p className="mt-4 text-muted-foreground">
                Last updated: January 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral max-w-none">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-8">
                {/* Important Notice */}
                <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h2 className="font-semibold text-amber-800 m-0 mb-2">Important Notice</h2>
                      <p className="text-amber-700 m-0 text-sm">
                        Due to the personal hygiene nature of our products (bath soaps), we cannot accept returns on used or opened products. Please read this policy carefully before making a purchase.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Eligible for Return/Replacement */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Eligible for Return/Replacement
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    We accept returns or provide replacements in the following cases:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li><strong className="text-foreground">Damaged Products:</strong> If you receive a product that is damaged during transit</li>
                    <li><strong className="text-foreground">Defective Products:</strong> If the product has manufacturing defects</li>
                    <li><strong className="text-foreground">Wrong Product:</strong> If you receive a product different from what you ordered</li>
                    <li><strong className="text-foreground">Missing Items:</strong> If any items from your order are missing</li>
                  </ul>
                </section>

                {/* Not Eligible */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Not Eligible for Return
                    </h2>
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Products that have been used or opened</li>
                    <li>Products without original packaging</li>
                    <li>Products returned after 48 hours of delivery</li>
                    <li>{"Change of mind"} returns (we {"don't"} accept returns if you simply {"don't"} like the product)</li>
                    <li>Products damaged due to misuse or improper storage by the customer</li>
                  </ul>
                </section>

                {/* How to Request */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      How to Request a Return/Replacement
                    </h2>
                  </div>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-3">
                    <li>
                      <strong className="text-foreground">Contact Us Within 48 Hours:</strong> Reach out to us via WhatsApp (+91 98765 43210) or email (hello@cocoandco.in) within 48 hours of receiving your order.
                    </li>
                    <li>
                      <strong className="text-foreground">Provide Details:</strong> Share your order number, photos of the damaged/defective product, and a brief description of the issue.
                    </li>
                    <li>
                      <strong className="text-foreground">Verification:</strong> Our team will review your request and verify the issue within 24-48 hours.
                    </li>
                    <li>
                      <strong className="text-foreground">Resolution:</strong> Once verified, {"we'll"} process a replacement or refund as per your preference.
                    </li>
                  </ol>
                </section>

                {/* Refund Process */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Refund Process
                    </h2>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Refund Timeline:</strong> Refunds are processed within 5-7 business days after approval.
                    </p>
                    <p>
                      <strong className="text-foreground">Refund Method:</strong> Refunds will be credited to the original payment method:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Credit/Debit Card: 5-7 business days</li>
                      <li>UPI: 3-5 business days</li>
                      <li>Net Banking: 5-7 business days</li>
                      <li>COD Orders: Bank transfer (NEFT/IMPS) within 7 business days</li>
                    </ul>
                    <p>
                      <strong className="text-foreground">Partial Refunds:</strong> If only some items in your order are eligible for return, {"we'll"} process a partial refund for those items only.
                    </p>
                  </div>
                </section>

                {/* Replacement */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Replacement Policy
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    For damaged or defective products, we offer free replacement. The replacement will be shipped within 2-3 business days after approval. If the same product is out of stock, you can choose a different product of equal value or opt for a refund.
                  </p>
                </section>

                {/* Questions */}
                <section className="bg-primary/5 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Need Help?
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about our return policy, please contact us.
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
