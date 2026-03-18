import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { HeroSection } from "@/components/home/hero-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CategoryGrid } from "@/components/home/category-grid";
import { BestSellers } from "@/components/home/best-sellers";
import { IngredientsPromise } from "@/components/home/ingredients-promise";
import { Testimonials } from "@/components/home/testimonials";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { CartProvider } from "@/lib/cart-context";

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <WhyChooseUs />
          <CategoryGrid />
          <BestSellers />
          <IngredientsPromise />
          <Testimonials />
          <InstagramFeed />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
