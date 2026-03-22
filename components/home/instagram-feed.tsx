import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

const instagramPosts = [
  { id: 1, image: "/images/products-grid-1.jpg", likes: 234 },
  { id: 2, image: "/images/products-grid-2.png", likes: 189 },
  { id: 3, image: "/images/keshya-hair-soap.png", likes: 312 },
  { id: 4, image: "/images/hero-soaps.png", likes: 276 },
];

export function InstagramFeed() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Follow Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
            @cocoandco_organics
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Join our community for skincare tips, behind-the-scenes, and exclusive offers
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/cocoandco_organics?igsh=MXAxcHlpejdvbW9xNA=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="h-8 w-8 text-primary-foreground" />
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/cocoandco_organics?igsh=MXAxcHlpejdvbW9xNA=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4"
          >
            <Instagram className="h-5 w-5" />
            Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
