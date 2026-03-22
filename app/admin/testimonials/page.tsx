"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Star, Trash2, Plus, Loader2 } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  createdAt: any;
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    text: "",
    product: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Testimonial[];
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "testimonials"), {
        ...formData,
        createdAt: Timestamp.now(),
      });
      setFormData({ name: "", location: "", rating: 5, text: "", product: "" });
      setShowForm(false);
      fetchTestimonials();
    } catch (error) {
      console.error("Error adding testimonial:", error);
      alert("Failed to add testimonial");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Testimonials</h1>
          <p className="text-gray-500 mt-1">Add or remove customer feedback shown on the home page.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          {showForm ? "Cancel" : <><Plus className="h-4 w-4" /> Add Testimonial</>}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Name</label>
              <input
                required
                className="w-full p-2 border rounded-md"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Priya Sharma"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <input
                required
                className="w-full p-2 border rounded-md"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Mumbai"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating (1-5)</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} Stars</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Reviewed</label>
              <input
                required
                className="w-full p-2 border rounded-md"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="e.g. Kesar Chandan Soap"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Review Text</label>
            <textarea
              required
              rows={3}
              className="w-full p-2 border rounded-md"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="The customer's feedback..."
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full md:w-auto">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Testimonial"}
          </Button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="p-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No testimonials found. Add your first one above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start group">
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-gray-900 font-medium italic">"{t.text}"</p>
                <div className="text-sm text-gray-500">
                  <span className="font-bold text-gray-700">{t.name}</span> from {t.location} • {t.product}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(t.id)}
                className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
