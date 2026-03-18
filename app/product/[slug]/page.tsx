import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ProductDetail } from "@/components/product/product-detail";
import { RelatedProducts } from "@/components/product/related-products";
import { CartProvider } from "@/lib/cart-context";
import { getProductBySlug } from "@/lib/products";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

async function fetchProduct(slugOrId: string) {
  // Try Firebase Document ID first
  try {
    const docRef = doc(db, "products", slugOrId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
       return { id: snap.id, ...snap.data() } as any;
    }
  } catch(e) {}

  // Fallback to local static legacy data
  return getProductBySlug(slugOrId);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  
  if (!product) {
    return { title: "Product Not Found | COCO&CO" };
  }

  return {
    title: `${product.name} - Natural Soap | COCO&CO`,
    description: product.description || product.shortDescription || `Buy ${product.name}`,
    openGraph: {
      title: product.name,
      description: product.description || product.shortDescription,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    notFound();
  }

  const fullProduct = {
    ...product,
    ingredients: product.ingredients || ["Pure Natural Ingredients"],
    benefits: product.benefits || ["Nourishing"],
    reviews: product.reviews || 0,
    rating: product.rating || 5,
    slug: product.slug || product.id,
    shortDescription: product.shortDescription || product.description,
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <ProductDetail product={fullProduct} />
          {/* <RelatedProducts currentProduct={fullProduct} /> */}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
