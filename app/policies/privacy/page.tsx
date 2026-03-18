import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart-context";
import { Shield, Database, Lock, Eye, Bell, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | COCO&CO",
  description: "Learn how COCO&CO collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Privacy Policy
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
                    At COCO&CO {"('we', 'our', or 'us')"}, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Information We Collect
                    </h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="font-semibold text-foreground">Personal Information</h3>
                      <p>When you make a purchase or create an account, we collect:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Name and email address</li>
                        <li>Phone number</li>
                        <li>Shipping and billing address</li>
                        <li>Payment information (processed securely by our payment partners)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Automatically Collected Information</h3>
                      <p>When you visit our website, we may automatically collect:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Browser type and version</li>
                        <li>Device information</li>
                        <li>IP address</li>
                        <li>Pages visited and time spent</li>
                        <li>Referring website</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      How We Use Your Information
                    </h2>
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send promotional emails and newsletters (with your consent)</li>
                    <li>Improve our website and products</li>
                    <li>Detect and prevent fraud</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                {/* Data Security */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Data Security
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your personal information, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure payment processing through trusted partners</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal information by authorized personnel only</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                  </p>
                </section>

                {/* Sharing Your Information */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    Sharing Your Information
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    We do not sell, trade, or rent your personal information. We may share your information with:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li><strong className="text-foreground">Shipping Partners:</strong> To deliver your orders</li>
                    <li><strong className="text-foreground">Payment Processors:</strong> To process your payments securely</li>
                    <li><strong className="text-foreground">Analytics Providers:</strong> To analyze website usage (anonymized data)</li>
                    <li><strong className="text-foreground">Legal Authorities:</strong> When required by law or to protect our rights</li>
                  </ul>
                </section>

                {/* Your Rights */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Your Rights
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    To exercise any of these rights, please contact us at hello@cocoandco.in.
                  </p>
                </section>

                {/* Cookies */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    Cookies
                  </h2>
                  <p className="text-muted-foreground">
                    We use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences, analyze site traffic, and personalize content. You can disable cookies in your browser settings, but this may affect your experience on our website.
                  </p>
                </section>

                {/* Third-Party Links */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    Third-Party Links
                  </h2>
                  <p className="text-muted-foreground">
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any personal information.
                  </p>
                </section>

                {/* Changes to This Policy */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated {"'Last updated'"} date. We encourage you to review this policy periodically.
                  </p>
                </section>

                {/* Contact */}
                <section className="bg-primary/5 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground m-0">
                      Contact Us
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <ul className="text-muted-foreground space-y-1">
                    <li><strong className="text-foreground">Email:</strong> hello@cocoandco.in</li>
                    <li><strong className="text-foreground">Phone:</strong> +91 98765 43210</li>
                    <li><strong className="text-foreground">Address:</strong> 123 Natural Lane, Mumbai, Maharashtra 400001, India</li>
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
