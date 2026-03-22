"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [categories, setCategories] = useState<{name:string, value:string}[]>([]);
  const [skinTypes, setSkinTypes] = useState<{name:string, value:string}[]>([]);
  const [concerns, setConcerns] = useState<{name:string, value:string}[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    skinType: "",
    concern: "",
    stock: "100",
    imageUrl: ""
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Load filters
        const { getDoc: gd, doc: d } = await import("firebase/firestore");
        const filtersSnap = await gd(d(db, "settings", "filters"));
        if (filtersSnap.exists()) {
          const data = filtersSnap.data();
          if (data.categories) setCategories(data.categories);
          if (data.skinTypes) setSkinTypes(data.skinTypes);
          if (data.concerns) setConcerns(data.concerns);
        }

        // Load existing product
        const productSnap = await gd(d(db, "products", productId));
        if (productSnap.exists()) {
          const data = productSnap.data();
          setFormData({
            name: data.name || "",
            price: String(data.price || ""),
            description: data.description || "",
            category: data.category || "",
            skinType: Array.isArray(data.skinType) ? data.skinType[0] : (data.skinType || ""),
            concern: Array.isArray(data.concern) ? data.concern[0] : (data.concern || ""),
            stock: String(data.stock || "100"),
            imageUrl: data.imageUrl || data.image || ""
          });
        } else {
          alert("Product not found.");
          router.push("/admin/products");
        }
      } catch (e) {
        console.error(e);
        alert("Error loading product.");
      }
      setFetching(false);
    }
    loadData();
  }, [productId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, "products", productId), {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        skinType: [formData.skinType],
        concern: [formData.concern],
        stock: Number(formData.stock),
        imageUrl: formData.imageUrl,
        updatedAt: serverTimestamp()
      });
      router.push("/admin/products");
    } catch (e) {
      console.error(e);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8 text-center text-muted-foreground animate-pulse">
        Loading product...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground mt-2">Update the details for this product.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 border rounded-xl shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Goat Milk Glow Soap" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input id="price" type="number" required min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="299" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Available Stock</Label>
            <Input id="stock" type="number" required min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select 
              id="category" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="" disabled>Select...</option>
              {categories.map(c => (
                <option key={c.value} value={c.value}>{c.name}</option>
              ))}
              {/* Fallback if no dynamic categories */}
              {categories.length === 0 && (
                <>
                  <option value="Brightening">Brightening</option>
                  <option value="Hydrating">Hydrating</option>
                  <option value="Nourishing">Nourishing</option>
                  <option value="Detox">Detox</option>
                  <option value="Acne Care">Acne Care</option>
                  <option value="Aromatherapy">Aromatherapy</option>
                  <option value="Hair Care">Hair Care</option>
                  <option value="Premium">Premium</option>
                  <option value="Oil Control">Oil Control</option>
                  <option value="Exfoliating">Exfoliating</option>
                </>
              )}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skinType">Skin Type</Label>
            <select 
              id="skinType" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={formData.skinType} 
              onChange={e => setFormData({...formData, skinType: e.target.value})}
            >
              <option value="" disabled>Select...</option>
              {skinTypes.map(s => (
                <option key={s.value} value={s.value}>{s.name}</option>
              ))}
              {skinTypes.length === 0 && (
                <>
                  <option value="All Skin Types">All Skin Types</option>
                  <option value="Oily">Oily</option>
                  <option value="Dry">Dry</option>
                  <option value="Normal">Normal</option>
                  <option value="Combination">Combination</option>
                  <option value="Sensitive">Sensitive</option>
                  <option value="Acne-Prone">Acne-Prone</option>
                </>
              )}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="concern">Skin Concern</Label>
            <select 
              id="concern" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={formData.concern} 
              onChange={e => setFormData({...formData, concern: e.target.value})}
            >
              <option value="" disabled>Select...</option>
              {concerns.map(c => (
                <option key={c.value} value={c.value}>{c.name}</option>
              ))}
              {concerns.length === 0 && (
                <>
                  <option value="Brightening">Brightening</option>
                  <option value="Hydration">Hydration</option>
                  <option value="Acne">Acne</option>
                  <option value="Tan Removal">Tan Removal</option>
                  <option value="Oil Control">Oil Control</option>
                  <option value="Nourishment">Nourishment</option>
                  <option value="Relaxation">Relaxation</option>
                  <option value="Hair Fall">Hair Fall</option>
                </>
              )}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." />
          </div>

          {formData.imageUrl && (
            <div className="space-y-2 col-span-2">
              <Label>Image Preview</Label>
              <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          )}
          
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Tell customers about this product..." />
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
        </div>
      </form>
    </div>
  );
}
