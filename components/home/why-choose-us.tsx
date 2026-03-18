import { Leaf, Heart, Shield, Droplets, Recycle, Sparkles } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural Ingredients",
    description: "We use only plant-based, natural ingredients sourced from trusted local farmers.",
  },
  {
    icon: Heart,
    title: "Handmade with Love",
    description: "Every soap is crafted by hand with care, attention, and traditional techniques.",
  },
  {
    icon: Shield,
    title: "No Harsh Chemicals",
    description: "Free from parabens, sulfates, and artificial fragrances. Safe for all skin types.",
  },
  {
    icon: Droplets,
    title: "Skin-Friendly Formulas",
    description: "Gentle, nourishing formulas that cleanse without stripping natural oils.",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Packaging",
    description: "Sustainable packaging that's biodegradable and kind to the environment.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Luxury skincare experience at affordable prices. Premium yet accessible.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 text-balance">
            {"Nature's Best for Your Skin"}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {"We believe in the power of nature to transform your skincare routine. Here's why thousands trust COCO&CO."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
