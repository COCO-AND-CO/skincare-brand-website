// Product image mapping based on product slug
const productImages: Record<string, string> = {
  "coffee-soap": "/images/soap-coffee.jpg",
  "aloe-vera-soap": "/images/soap-aloe.jpg",
  "rose-soap": "/images/soap-rose.jpg",
  "charcoal-soap": "/images/soap-charcoal.jpg",
  "jasmine-soap": "/images/soap-jasmine.jpg",
  "lavender-soap": "/images/soap-lavender.jpg",
  "cow-milk-soap": "/images/soap-milk.jpg",
  "goat-milk-soap": "/images/soap-goat-milk.jpg",
  "herbal-hair-soap": "/images/keshya-hair-soap.png",
  "orange-peel-papaya-soap": "/images/soap-orange.jpg",
  "neem-haldi-soap": "/images/soap-neem.jpg",
  "almond-soap": "/images/soap-almond.jpg",
  "kesar-chandan-soap": "/images/soap-kesar.jpg",
  "honey-soap": "/images/soap-honey.jpg",
  "multani-mitti-soap": "/images/soap-multani.jpg",
};

// Default placeholder if product image not found
const defaultImage = "/images/products-grid-1.jpg";

export function getProductImage(slug: string): string {
  return productImages[slug] || defaultImage;
}

// Get color accent based on product category
export function getProductAccent(category: string): string {
  const accents: Record<string, string> = {
    "Brightening": "#FFEBD6",
    "Hydrating": "#E8F4E8",
    "Nourishing": "#FFF5E6",
    "Detox": "#2D3B2D",
    "Acne Care": "#E8F4E8",
    "Aromatherapy": "#F5E6FF",
    "Hair Care": "#D4A574",
    "Premium": "#FFE4C4",
    "Oil Control": "#E5DFD6",
    "Exfoliating": "#D4A574",
  };
  return accents[category] || "#F5EFE6";
}
