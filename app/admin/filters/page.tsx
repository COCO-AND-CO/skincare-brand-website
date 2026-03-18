"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";

interface FilterOption {
  name: string;
  value: string;
}

interface FilterSettings {
  categories: FilterOption[];
  skinTypes: FilterOption[];
  concerns: FilterOption[];
}

const DEFAULT_FILTERS: FilterSettings = {
  categories: [
    { name: "All", value: "all" },
    { name: "Brightening", value: "brightening" },
    { name: "Hydrating", value: "hydrating" },
    { name: "Nourishing", value: "nourishing" },
    { name: "Detox", value: "detox" },
    { name: "Acne Care", value: "acne-care" },
    { name: "Aromatherapy", value: "aromatherapy" },
    { name: "Hair Care", value: "hair-care" },
    { name: "Premium", value: "premium" },
    { name: "Oil Control", value: "oil-control" },
    { name: "Exfoliating", value: "exfoliating" },
  ],
  skinTypes: [
    { name: "All Skin Types", value: "all" },
    { name: "Oily", value: "oily" },
    { name: "Dry", value: "dry" },
    { name: "Normal", value: "normal" },
    { name: "Combination", value: "combination" },
    { name: "Sensitive", value: "sensitive" },
    { name: "Acne-Prone", value: "acne-prone" },
  ],
  concerns: [
    { name: "Brightening", value: "brightening" },
    { name: "Hydration", value: "hydration" },
    { name: "Acne", value: "acne" },
    { name: "Tan Removal", value: "tan-removal" },
    { name: "Oil Control", value: "oil-control" },
    { name: "Nourishment", value: "nourishment" },
    { name: "Relaxation", value: "relaxation" },
    { name: "Hair Fall", value: "hair-fall" },
  ],
};

export default function FiltersAdminPage() {
  const [filters, setFilters] = useState<FilterSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // New item inputs
  const [newCat, setNewCat] = useState("");
  const [newSkinType, setNewSkinType] = useState("");
  const [newConcern, setNewConcern] = useState("");

  useEffect(() => {
    async function loadFilters() {
      try {
        const docRef = doc(db, "settings", "filters");
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Connection timed out. Did you create the Firestore Database in your Firebase Console?")), 6000)
        );
        const docSnap: any = await Promise.race([
          getDoc(docRef),
          timeoutPromise
        ]);

        if (docSnap.exists()) {
          setFilters(docSnap.data() as FilterSettings);
        } else {
          // If not exists, save default
          await setDoc(docRef, DEFAULT_FILTERS);
          setFilters(DEFAULT_FILTERS);
        }
      } catch (e: any) {
        console.error("Error loading filters", e);
        setErrorMsg("Firestore permission denied or database not created. Please ensure you clicked 'Create database' in the Firebase Console! (" + e.message + ")");
        setFilters(DEFAULT_FILTERS); // fallback so we can see UI
      } finally {
        setLoading(false);
      }
    }
    loadFilters();
  }, []);

  const saveToFirebase = async (updatedFilters: FilterSettings) => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "filters"), updatedFilters);
      setFilters(updatedFilters);
    } catch (e) {
      alert("Failed to save filters");
    }
    setSaving(false);
  };

  const removeFilter = (listName: keyof FilterSettings, index: number) => {
    if (!filters) return;
    const updatedList = [...filters[listName]];
    updatedList.splice(index, 1);
    saveToFirebase({ ...filters, [listName]: updatedList });
  };

  const addFilter = (listName: keyof FilterSettings, value: string, setValue: (val: string) => void) => {
    if (!filters || !value.trim()) return;
    const slug = value.trim().toLowerCase().replace(/\s+/g, '-');
    const updatedList = [...filters[listName], { name: value.trim(), value: slug }];
    saveToFirebase({ ...filters, [listName]: updatedList });
    setValue(""); // clear input
  };

  if (loading) return <div className="p-8 text-muted-foreground animate-pulse font-medium">Loading filters from database...</div>;
  if (errorMsg && !filters) return <div className="p-8 text-red-500 font-bold max-w-2xl bg-red-50 rounded-lg m-8">Error: {errorMsg}</div>;
  if (!filters) return <div className="p-8">No filters available.</div>;

  const renderFilterSection = ( 
    title: string, listName: keyof FilterSettings, inputValue: string, setInputValue: (v: string) => void
  ) => (
    <div className="bg-white border p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex gap-2 mb-6">
        <Input 
          placeholder={`Add new ${title.toLowerCase()}`} 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") addFilter(listName, inputValue, setInputValue); }}
        />
        <Button onClick={(e) => { e.preventDefault(); addFilter(listName, inputValue, setInputValue); }}><Plus className="h-4 w-4 mr-1"/> Add</Button>
      </div>
      <div className="space-y-2">
        {filters[listName] && filters[listName].map((item, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 border rounded-lg">
            <div>
              <span className="font-medium mr-2">{item.name}</span>
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">value: {item.value}</span>
            </div>
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={(e) => { e.preventDefault(); removeFilter(listName, index); }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Filters</h1>
        <p className="text-muted-foreground mt-2">Add or remove categories, skin types, and skin concerns dynamically.</p>
        {saving && <p className="text-sm text-blue-600 mt-2">Saving to database...</p>}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {renderFilterSection("Categories", "categories", newCat, setNewCat)}
        {renderFilterSection("Skin Types", "skinTypes", newSkinType, setNewSkinType)}
        {renderFilterSection("Skin Concerns", "concerns", newConcern, setNewConcern)}
      </div>
    </div>
  );
}
