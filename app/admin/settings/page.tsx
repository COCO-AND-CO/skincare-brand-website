"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Save, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function StoreSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    businessHours: "",
    instagram: "",
    facebook: ""
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const docRef = doc(db, "settings", "contact");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    try {
      await setDoc(doc(db, "settings", "contact"), formData, { merge: true });
      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  if (loading) return <div className="p-8 flex items-center justify-center min-h-[50vh]"><Loader2 className="h-6 w-6 animate-spin text-emerald-600" /></div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Store Settings</h1>
        <p className="text-gray-500 mt-2">Manage your contact information, social links, and business details.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-8">
        
        {success && (
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-2 border border-emerald-100">
            <Info className="h-5 w-5" />
            <p className="font-medium">{success}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Contact Details</h2>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="919876543210 (No + sign)" />
              <p className="text-xs text-gray-400">Used for the floating WhatsApp chat button. Include country code without '+'</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="hello@cocoandco.in" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessHours">Business Hours</Label>
              <Textarea id="businessHours" value={formData.businessHours} onChange={handleChange} rows={3} placeholder="Mon - Sat: 10:00 AM - 7:00 PM&#10;Sunday: Closed" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Physical Address</Label>
              <Textarea id="address" value={formData.address} onChange={handleChange} rows={3} placeholder="123 Natural Lane, Mumbai..." />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Social Media</h2>
            
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input id="instagram" type="url" value={formData.instagram} onChange={handleChange} placeholder="https://instagram.com/..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input id="facebook" type="url" value={formData.facebook} onChange={handleChange} placeholder="https://facebook.com/..." />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button type="submit" disabled={saving} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[150px]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
