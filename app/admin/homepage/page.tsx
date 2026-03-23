"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

const DEFAULT_IMAGES = {
  image1: "/images/products-grid-1.jpg",
  image2: "/images/products-grid-2.png",
  image3: "/images/keshya-hair-soap.png",
};

export default function HomepageSettingsPage() {
  const [images, setImages] = useState(DEFAULT_IMAGES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const snap = await getDoc(doc(db, "settings", "homepage"));
        if (snap.exists()) {
          const data = snap.data();
          setImages({
            image1: data.ingredientsImage1 || DEFAULT_IMAGES.image1,
            image2: data.ingredientsImage2 || DEFAULT_IMAGES.image2,
            image3: data.ingredientsImage3 || DEFAULT_IMAGES.image3,
          });
        }
      } catch (e) {
        console.error("Failed to load homepage settings", e);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(
        doc(db, "settings", "homepage"),
        {
          ingredientsImage1: images.image1,
          ingredientsImage2: images.image2,
          ingredientsImage3: images.image3,
        },
        { merge: true }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error("Failed to save", e);
      alert("Error saving settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading settings...
      </div>
    );
  }

  const imageFields = [
    { key: "image1" as const, label: "Image 1 – Top Left (Square)", hint: "Best size: 300×300px" },
    { key: "image2" as const, label: "Image 2 – Bottom Left (4:3)", hint: "Best size: 300×225px" },
    { key: "image3" as const, label: "Image 3 – Top Right (4:3)", hint: "Best size: 300×225px" },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Homepage Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage the images shown in the <strong>"Pure Ingredients, Pure Results"</strong> section on the homepage.
        </p>
      </div>

      {/* Image URL Fields */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-8">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Ingredients Section Images
        </h2>

        <div className="space-y-8">
          {imageFields.map(({ key, label, hint }) => (
            <div key={key} className="grid sm:grid-cols-2 gap-6 items-start pb-8 border-b last:border-none last:pb-0">
              {/* Preview */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <div className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border">
                  {images[key] ? (
                    <Image
                      src={images[key]}
                      alt={label}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <ImageIcon className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400">{hint}</p>
              </div>

              {/* Input */}
              <div className="space-y-3 pt-6">
                <Label htmlFor={key} className="text-sm font-semibold">
                  Image URL
                </Label>
                <Input
                  id={key}
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={images[key]}
                  onChange={(e) => setImages({ ...images, [key]: e.target.value })}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Paste a public image URL (from Firebase Storage, Cloudinary, Imgur, etc.)
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4 pt-2">
          <Button onClick={handleSave} disabled={saving} className="min-w-[160px]">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <CheckCircle className="h-4 w-4" />
              Saved successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
