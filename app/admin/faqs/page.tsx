"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { HelpCircle, Trash2, Plus, Loader2, ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  createdAt: any;
}

const CATEGORIES = [
  "About Our Products",
  "Ordering & Shipping",
  "Returns & Refunds",
  "Product Usage"
];

export default function FAQsAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: CATEGORIES[0],
    order: 0,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "faqs"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FAQ[];
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "faqs"), {
        ...formData,
        createdAt: Timestamp.now(),
      });
      setFormData({ question: "", answer: "", category: formData.category, order: formData.order + 1 });
      setShowForm(false);
      fetchFaqs();
    } catch (error) {
      console.error("Error adding FAQ:", error);
      alert("Failed to add FAQ");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await deleteDoc(doc(db, "faqs", id));
      fetchFaqs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Failed to delete FAQ");
    }
  };

  const groupedFaqs = CATEGORIES.reduce((acc, cat) => {
    const catFaqs = faqs.filter(f => f.category === cat);
    if (catFaqs.length > 0) acc[cat] = catFaqs;
    return acc;
  }, {} as Record<string, FAQ[]>);

  // Add misc category for any orphans
  const orphans = faqs.filter(f => !CATEGORIES.includes(f.category));
  if (orphans.length > 0) groupedFaqs["Other"] = orphans;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage FAQs</h1>
          <p className="text-gray-500 mt-1">Organise questions and answers for your customers.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          {showForm ? "Cancel" : <><Plus className="h-4 w-4" /> Add FAQ</>}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Order (Higher = Later)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Question</label>
            <input
              required
              className="w-full p-2 border rounded-md"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g. How long does the soap last?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Answer</label>
            <textarea
              required
              rows={4}
              className="w-full p-2 border rounded-md"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Detailed answer for the customer..."
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full md:w-auto">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save FAQ"}
          </Button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading FAQs...</div>
      ) : Object.keys(groupedFaqs).length === 0 ? (
        <div className="p-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No FAQs found. Let's add some common questions!</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedFaqs).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                {category}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {items.map((faq) => (
                  <div key={faq.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start group hover:border-primary/20 transition-all">
                    <div className="space-y-2 pr-4">
                      <p className="text-gray-900 font-bold text-lg">{faq.question}</p>
                      <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">{faq.answer}</p>
                      <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Order: {faq.order}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(faq.id)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
