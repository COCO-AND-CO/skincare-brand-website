"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/product/product-card";
import { categories, skinTypes, concerns } from "@/lib/products";

const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
];

export function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSort = searchParams.get("sort") || "popular";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState(initialSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [dynamicCategories, setDynamicCategories] = useState<{name:string, value:string}[]>(categories);
  const [dynamicSkinTypes, setDynamicSkinTypes] = useState<{name:string, value:string}[]>(skinTypes);
  const [dynamicConcerns, setDynamicConcerns] = useState<{name:string, value:string}[]>(concerns);

  useEffect(() => {
    async function loadData() {
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Firebase connection timed out")), 6000)
        );

        const [productsSnap, filtersSnap]: any = await Promise.race([
          Promise.all([
            getDocs(collection(db, "products")),
            getDoc(doc(db, "settings", "filters"))
          ]),
          timeoutPromise
        ]);
        
        const data = productsSnap.docs.map((document: any) => {
          const productData = document.data();
          return {
            id: document.id,
            ...productData,
            reviews: productData.reviews || 0,
            skinType: productData.skinType || ["all"],
            concern: productData.concern || ["general"]
          };
        });
        setDbProducts(data);

        if (filtersSnap.exists()) {
          const fData = filtersSnap.data();
          if (fData.categories) setDynamicCategories(fData.categories);
          if (fData.skinTypes) setDynamicSkinTypes(fData.skinTypes);
          if (fData.concerns) setDynamicConcerns(fData.concerns);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...dbProducts];

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedSkinType) {
      filtered = filtered.filter((p) => p.skinType.includes(selectedSkinType));
    }

    if (selectedConcern) {
      filtered = filtered.filter((p) => p.concern.includes(selectedConcern));
    }

    // Sort
    switch (sortBy) {
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
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filtered;
  }, [selectedCategory, selectedSkinType, selectedConcern, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSkinType(null);
    setSelectedConcern(null);
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedSkinType ? 1 : 0) +
    (selectedConcern ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            All Products
          </button>
          {dynamicCategories.filter(c => c.value !== "all").map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Skin Type Filter */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">
          Skin Type
        </h3>
        <div className="space-y-2">
          {dynamicSkinTypes.map((type) => (
            <button
              key={type.value}
              onClick={() =>
                setSelectedSkinType(
                  selectedSkinType === type.value ? null : type.value
                )
              }
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedSkinType === type.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* Concern Filter */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">
          Skin Concern
        </h3>
        <div className="space-y-2">
          {dynamicConcerns.map((concern) => (
            <button
              key={concern.value}
              onClick={() =>
                setSelectedConcern(
                  selectedConcern === concern.value ? null : concern.value
                )
              }
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedConcern === concern.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {concern.name}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Desktop Filters Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Mobile Filter Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" className="gap-2 bg-transparent">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground hidden sm:block">
            Showing {filteredProducts.length} products
          </p>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory !== "all" && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() => setSelectedCategory("all")}
              >
                {selectedCategory}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {selectedSkinType && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() => setSelectedSkinType(null)}
              >
                {selectedSkinType}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {selectedConcern && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() => setSelectedConcern(null)}
              >
                {selectedConcern}
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground animate-pulse">Loading amazing products for you...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No products found with the selected filters.
            </p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
