"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
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
    async function loadFilters() {
      try {
        const snap = await getDoc(doc(db, "settings", "filters"));
        if (snap.exists()) {
          const data = snap.data();
          
          if (data.categories) {
            setCategories(data.categories);
            if (data.categories.length > 0) setFormData(prev => ({ ...prev, category: data.categories[0].value }));
          }
          if (data.skinTypes) {
            setSkinTypes(data.skinTypes);
            if (data.skinTypes.length > 0) setFormData(prev => ({ ...prev, skinType: data.skinTypes[0].value }));
          }
          if (data.concerns) {
            setConcerns(data.concerns);
            if (data.concerns.length > 0) setFormData(prev => ({ ...prev, concern: data.concerns[0].value }));
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadFilters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        // Shop component expects arrays for advanced filtering mapping
        skinType: [formData.skinType],
        concern: [formData.concern],
        stock: Number(formData.stock),
        imageUrl: formData.imageUrl,
        createdAt: serverTimestamp()
      });
      router.push("/admin/products");
    } catch (e) {
      console.error(e);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground mt-2">Create a new item in your catalog.</p>
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
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" type="url" required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." />
          </div>
          
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Tell customers about this product..." />
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t">
          <Button type="button" variant="outline" className="mr-4" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Product"}</Button>
        </div>
      </form>
    </div>
  );
}
