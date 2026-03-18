export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  skinType: string[];
  concern: string[];
  fragrance: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  weight: string;
  shelfLife: string;
  storage: string;
  shortDescription: string;
  featured?: boolean;
  bestSeller?: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Coffee Revive",
    slug: "coffee-soap",
    price: 179,
    image: "/images/img-20250921-wa0004.jpg",
    category: "Exfoliating",
    skinType: ["Oily", "Normal", "Combination"],
    concern: ["Tan Removal", "Dullness", "Exfoliation"],
    fragrance: "Coffee",
    ingredients: ["Arabica Coffee", "Coconut Oil", "Glycerin", "Coffee Powder", "Coffee Extract"],
    benefits: ["Deep cleansing", "Natural exfoliation", "Tan removal", "Fresh glow", "Energizes skin"],
    howToUse: "Wet the soap and lather in your hands. Gently massage onto wet skin in circular motions. Rinse thoroughly with water.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Store in a cool, dry place. Keep away from direct sunlight. Use a soap dish with drainage.",
    shortDescription: "Energizing coffee soap for deep cleansing and tan removal",
    featured: true,
    bestSeller: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: "2",
    name: "Aloe Pure",
    slug: "aloe-vera-soap",
    price: 159,
    image: "/images/img-20250921-wa0004.jpg",
    category: "Hydrating",
    skinType: ["All Skin Types", "Sensitive", "Dry"],
    concern: ["Hydration", "Sun Damage", "Soothing"],
    fragrance: "Fresh Aloe",
    ingredients: ["White Aloe Vera Extract", "Coconut Oil", "Glycerin"],
    benefits: ["Deep hydration", "Soothing relief", "Sun damage repair", "Calming effect", "Gentle cleansing"],
    howToUse: "Create lather with water and apply to face and body. Massage gently and rinse off. Use daily for best results.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Store in a cool, dry place away from direct sunlight.",
    shortDescription: "Soothing aloe vera soap for hydration and healing",
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviews: 203
  },
  {
    id: "3",
    name: "Rose Reverie",
    slug: "rose-soap",
    price: 199,
    image: "/images/img-20250921-wa0004.jpg",
    category: "Brightening",
    skinType: ["All Skin Types", "Dry", "Normal"],
    concern: ["Brightening", "Moisturizing", "Glow"],
    fragrance: "Rose",
    ingredients: ["Rose Oil", "Coconut Oil", "Almond Oil", "Rose Flower Petals", "Rose Extract", "Glycerin"],
    benefits: ["Skin brightening", "Deep moisturizing", "Natural glow boost", "Romantic fragrance", "Soft skin"],
    howToUse: "Lather the soap and apply to damp skin. Massage in circular motions and rinse thoroughly.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Keep in a dry soap dish. Store away from humidity.",
    shortDescription: "Luxurious rose soap for brightening and moisturizing",
    featured: true,
    bestSeller: true,
    rating: 4.7,
    reviews: 178
  },
  {
    id: "4",
    name: "Pur Noir",
    slug: "charcoal-soap",
    price: 159,
    image: "/images/2.png",
    category: "Detox",
    skinType: ["Oily", "Acne-Prone", "Combination"],
    concern: ["Acne", "Pores", "Detox", "Oil Control"],
    fragrance: "Mild Charcoal",
    ingredients: ["Charcoal Powder", "Coconut Oil", "Glycerin", "Sweet Almond Oil"],
    benefits: ["Deep detoxification", "Acne control", "Pore cleansing", "Oil balance", "Impurity removal"],
    howToUse: "Use on wet skin. Create rich lather and apply on face avoiding eye area. Rinse with lukewarm water.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Store in cool, dry conditions.",
    shortDescription: "Activated charcoal soap for deep detox and acne control",
    featured: true,
    rating: 4.6,
    reviews: 142
  },
  {
    id: "5",
    name: "Jasmine Ritual",
    slug: "jasmine-soap",
    price: 189,
    image: "/images/img-20250921-wa0004.jpg",
    category: "Aromatherapy",
    skinType: ["All Skin Types", "Normal", "Dry"],
    concern: ["Relaxation", "Softening", "Glow"],
    fragrance: "Jasmine",
    ingredients: ["Coconut Oil", "Glycerin", "Jasmine Flower Petals", "Jasmine Extract"],
    benefits: ["Relaxing fragrance", "Skin softening", "Natural glow", "Stress relief", "Gentle cleansing"],
    howToUse: "Wet skin and lather soap between hands. Apply and massage gently. Rinse thoroughly.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Keep in a ventilated soap dish away from moisture.",
    shortDescription: "Aromatic jasmine soap for relaxation and soft skin",
    rating: 4.5,
    reviews: 98
  },
  {
    id: "6",
    name: "Lavender Calm",
    slug: "lavender-soap",
    price: 189,
    image: "/images/img-20250921-wa0004.jpg",
    category: "Aromatherapy",
    skinType: ["All Skin Types", "Sensitive"],
    concern: ["Stress Relief", "Calming", "Soothing"],
    fragrance: "Lavender",
    ingredients: ["Coconut Oil", "Glycerin", "Lavender Flower Petals", "Lavender Extract"],
    benefits: ["Stress relief", "Calming effect", "Skin soothing", "Better sleep", "Relaxation"],
    howToUse: "Best used during evening bath. Lather and apply to body, inhale the calming aroma while bathing.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Store in cool, dry place.",
    shortDescription: "Calming lavender soap for stress relief and relaxation",
    bestSeller: true,
    rating: 4.8,
    reviews: 167
  },
  {
    id: "7",
    name: "Milk Silk",
    slug: "cow-milk-soap",
    price: 179,
    image: "/images/2.png",
    category: "Nourishing",
    skinType: ["Dry", "Normal", "All Skin Types"],
    concern: ["Nourishment", "Moisturizing", "Softening"],
    fragrance: "Mild Milk",
    ingredients: ["Milk Powder", "Raw Cow Milk", "Coconut Oil", "Glycerin"],
    benefits: ["Deep nourishment", "Intense moisturizing", "Baby-soft skin", "Gentle cleansing", "Skin repair"],
    howToUse: "Use daily. Create lather and apply to wet skin. Massage gently and rinse off.",
    weight: "100g",
    shelfLife: "10 months from manufacturing date",
    storage: "Store in a cool, dry place. Keep refrigerated in hot weather.",
    shortDescription: "Nourishing cow milk soap for baby-soft skin",
    rating: 4.7,
    reviews: 134
  },
  {
    id: "8",
    name: "Goat Milk Glow",
    slug: "goat-milk-soap",
    price: 199,
    image: "/images/2.png",
    category: "Nourishing",
    skinType: ["Sensitive", "Dry", "Eczema-Prone"],
    concern: ["Sensitive Skin", "Hydration", "Eczema"],
    fragrance: "Mild",
    ingredients: ["Raw Goat Milk", "Milk Powder", "Coconut Oil", "Glycerin"],
    benefits: ["Sensitive skin care", "Deep hydration", "Eczema friendly", "Gentle formula", "Skin barrier repair"],
    howToUse: "Perfect for sensitive skin. Lather gently and apply without rubbing harshly. Rinse with cool water.",
    weight: "100g",
    shelfLife: "10 months from manufacturing date",
    storage: "Store in cool conditions. Refrigerate if necessary.",
    shortDescription: "Gentle goat milk soap for sensitive and eczema-prone skin",
    rating: 4.9,
    reviews: 89
  },
  {
    id: "9",
    name: "Keshya",
    slug: "herbal-hair-soap",
    price: 219,
    image: "/images/we.png",
    category: "Hair Care",
    skinType: ["All Hair Types"],
    concern: ["Hair Fall", "Scalp Health", "Dandruff"],
    fragrance: "Herbal",
    ingredients: ["Amla", "Reetha", "Shikakai", "Bhringraj", "Coconut Oil", "Glycerin"],
    benefits: ["Hair fall control", "Scalp cleansing", "Natural shine", "Dandruff control", "Hair strengthening"],
    howToUse: "Wet hair thoroughly. Rub soap directly on scalp and hair. Massage and create lather. Rinse completely.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Keep dry between uses. Store in ventilated area.",
    shortDescription: "Ayurvedic herbal soap for healthy, shiny hair",
    featured: true,
    rating: 4.6,
    reviews: 112
  },
  {
    id: "10",
    name: "Orange Papaya",
    slug: "orange-peel-papaya-soap",
    price: 179,
    image: "/images/2.png",
    category: "Brightening",
    skinType: ["All Skin Types", "Dull Skin"],
    concern: ["Tan Removal", "Brightening", "Polishing"],
    fragrance: "Citrus Fruity",
    ingredients: ["Orange Peel Powder", "Papaya Powder", "Raw Papaya", "Coconut Oil", "Glycerin"],
    benefits: ["Skin brightening", "Tan removal", "Natural polishing", "Vitamin C boost", "Even skin tone"],
    howToUse: "Apply on wet skin. Massage in gentle circular motions focusing on tanned areas. Rinse thoroughly.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Store away from direct sunlight in a cool place.",
    shortDescription: "Citrus soap for brightening and tan removal",
    rating: 4.5,
    reviews: 95
  },
  {
    id: "11",
    name: "Neem Sanctuary",
    slug: "neem-haldi-soap",
    price: 179,
    image: "/images/img-20250921-wa0004.jpg",
    category: "Acne Care",
    skinType: ["Oily", "Acne-Prone", "Combination"],
    concern: ["Acne", "Pimples", "Antibacterial"],
    fragrance: "Herbal Neem",
    ingredients: ["Neem Powder", "Aloe Vera", "Haldi Powder", "Coconut Oil", "Glycerin"],
    benefits: ["Anti-acne action", "Antibacterial protection", "Pimple control", "Skin purification", "Natural healing"],
    howToUse: "Use twice daily. Lather and apply on affected areas. Let sit for 30 seconds before rinsing.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Store in cool, dry conditions.",
    shortDescription: "Antibacterial neem & turmeric soap for acne control",
    bestSeller: true,
    rating: 4.7,
    reviews: 189
  },
  {
    id: "12",
    name: "Almond Scrub",
    slug: "almond-soap",
    price: 199,
    image: "/images/2.png",
    category: "Nourishing",
    skinType: ["Dry", "Normal", "Mature"],
    concern: ["Nourishment", "Glow", "Dry Skin Repair"],
    fragrance: "Nutty Almond",
    ingredients: ["Raw Milk", "Milk Powder", "Coconut Oil", "Glycerin", "Sweet Almond Oil", "Crushed Almond"],
    benefits: ["Deep nourishment", "Natural glow", "Dry skin repair", "Gentle exfoliation", "Vitamin E boost"],
    howToUse: "Wet skin and create lather. Apply with gentle scrubbing motion. Rinse with lukewarm water.",
    weight: "100g",
    shelfLife: "10 months from manufacturing date",
    storage: "Store in cool place. Avoid humidity.",
    shortDescription: "Luxurious almond soap for deep nourishment and glow",
    rating: 4.6,
    reviews: 78
  },
  {
    id: "13",
    name: "Kesar Chandan",
    slug: "kesar-chandan-soap",
    price: 249,
    image: "/images/img-20250921-wa0004.jpg",
    category: "Premium",
    skinType: ["All Skin Types", "Dry", "Normal"],
    concern: ["Radiance", "Brightening", "Luxury"],
    fragrance: "Sandalwood Saffron",
    ingredients: ["Raw Milk", "Coconut Oil", "Glycerin", "Kesar (Saffron)", "Chandan Oil & Powder", "Kesar Oil"],
    benefits: ["Skin radiance", "Natural brightening", "Luxury skincare", "Cooling effect", "Traditional beauty"],
    howToUse: "Best used during morning bath. Lather and apply to face and body. Massage gently and rinse.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Store in cool, dry place away from sunlight.",
    shortDescription: "Premium saffron & sandalwood soap for radiant skin",
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviews: 234
  },
  {
    id: "14",
    name: "Honey Soothe",
    slug: "honey-soap",
    price: 189,
    image: "/images/img-20250921-wa0004.jpg",
    category: "Hydrating",
    skinType: ["All Skin Types", "Dry", "Normal"],
    concern: ["Hydration", "Glow", "Antibacterial"],
    fragrance: "Sweet Honey",
    ingredients: ["Raw Honey", "Coconut Oil", "Glycerin"],
    benefits: ["Deep hydration", "Natural glow", "Antibacterial properties", "Skin softening", "Natural humectant"],
    howToUse: "Create rich lather and apply to wet skin. Can be used as a face mask - leave for 2 minutes before rinsing.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Store in cool, dry place.",
    shortDescription: "Natural honey soap for hydration and antibacterial care",
    rating: 4.7,
    reviews: 145
  },
  {
    id: "15",
    name: "Multani Purite",
    slug: "multani-mitti-soap",
    price: 169,
    image: "/images/img-20250921-wa0004.jpg",
    category: "Oil Control",
    skinType: ["Oily", "Combination", "Acne-Prone"],
    concern: ["Oil Control", "Acne", "Deep Cleansing"],
    fragrance: "Earthy",
    ingredients: ["Multani Mitti Powder", "Coconut Oil", "Glycerin"],
    benefits: ["Oil control", "Acne care", "Deep cleansing", "Pore tightening", "Mattifying effect"],
    howToUse: "Use on oily areas. Lather and apply. Can leave on for 1 minute for enhanced effect. Rinse thoroughly.",
    weight: "100g",
    shelfLife: "12 months from manufacturing date",
    storage: "Keep dry. Store in ventilated area.",
    shortDescription: "Clay soap for oil control and deep cleansing",
    rating: 4.5,
    reviews: 167
  }
];

export const categories = [
  { name: "All", value: "all" },
  { name: "Brightening", value: "Brightening" },
  { name: "Hydrating", value: "Hydrating" },
  { name: "Nourishing", value: "Nourishing" },
  { name: "Detox", value: "Detox" },
  { name: "Acne Care", value: "Acne Care" },
  { name: "Aromatherapy", value: "Aromatherapy" },
  { name: "Hair Care", value: "Hair Care" },
  { name: "Premium", value: "Premium" },
  { name: "Oil Control", value: "Oil Control" },
  { name: "Exfoliating", value: "Exfoliating" },
];

export const skinTypes = [
  { name: "All Skin Types", value: "All Skin Types" },
  { name: "Oily", value: "Oily" },
  { name: "Dry", value: "Dry" },
  { name: "Normal", value: "Normal" },
  { name: "Combination", value: "Combination" },
  { name: "Sensitive", value: "Sensitive" },
  { name: "Acne-Prone", value: "Acne-Prone" },
];

export const concerns = [
  { name: "Brightening", value: "Brightening" },
  { name: "Hydration", value: "Hydration" },
  { name: "Acne", value: "Acne" },
  { name: "Tan Removal", value: "Tan Removal" },
  { name: "Oil Control", value: "Oil Control" },
  { name: "Nourishment", value: "Nourishment" },
  { name: "Relaxation", value: "Relaxation" },
  { name: "Hair Fall", value: "Hair Fall" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.bestSeller);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter(p => p.category === category);
}

export function filterProducts(filters: {
  category?: string;
  skinType?: string;
  concern?: string;
  sort?: string;
}): Product[] {
  let filtered = [...products];

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.skinType) {
    filtered = filtered.filter(p => p.skinType.includes(filters.skinType!));
  }

  if (filters.concern) {
    filtered = filtered.filter(p => p.concern.includes(filters.concern!));
  }

  if (filters.sort) {
    switch (filters.sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }
  }

  return filtered;
}
