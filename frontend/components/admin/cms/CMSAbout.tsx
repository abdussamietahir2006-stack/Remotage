"use client";

import { useState, useEffect, useCallback } from "react";
import ImageDropZone from "./ImageDropZone";
import api from "@/lib/api";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  multiline?: boolean;
}

function Field({ label, name, value, onChange, multiline = false }: FieldProps) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5 tracking-wide uppercase">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(name, e.target.value)}
          rows={3} className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm resize-none" />
      ) : (
        <input value={value} onChange={e => onChange(name, e.target.value)}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm" />
      )}
    </div>
  );
}

const defaultForm = {
  heroHeading: "We Are Remotage",
  heroSubtext: "A remote-first team built to give businesses the advantage they need to scale.",
  storyHeading: "How It All Began",
  storyText: "Remotage was born from a simple observation — businesses were spending too much time and money on tasks that could be handled remotely.",
  missionHeading: "Empowering Businesses to Scale Without Limits",
  missionText: "Our mission is to give every business access to world-class remote talent that drives real growth.",
  visionHeading: "The Global Standard for Remote Business Excellence",
  visionText: "We envision a world where geography is never a barrier to business success.",
  member1Name: "Mashood Tahir", member1Role: "Founder & CEO",
  member1Bio: "Visionary entrepreneur with a passion for building remote-first businesses.",
  member2Name: "Sarah Mitchell", member2Role: "Head of Operations",
  member2Bio: "Operations expert with 8+ years scaling remote teams.",
  stat1: "150+", stat1Label: "Clients Served",
  stat2: "$2M+", stat2Label: "Revenue Generated",
  stat3: "98%",  stat3Label: "Client Satisfaction",
  stat4: "24/7", stat4Label: "Support Available",
};

const defaultImages = {
  storyImage:   "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400",
  member1Photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
  member2Photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
};

export default function CMSAbout() {
  const [saved, setSaved]     = useState(false);
  const [saving, setSaving]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [form, setForm]       = useState(defaultForm);
  const [images, setImages]   = useState(defaultImages);

  useEffect(() => {
    api.get("/api/cms/about")
      .then(res => {
        if (res.data.data?.content) setForm(prev => ({ ...prev, ...res.data.data.content }));
        if (res.data.data?.images)  setImages(prev => ({ ...prev, ...res.data.data.images }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFormChange = useCallback((name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((key: string) => async (previewUrl: string | null, file: File | null) => {
    if (!file) {
      setImages(prev => ({ ...prev, [key]: "" }));
      return;
    }
    setUploadingKey(key);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await api.post("/api/cms/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res.data.data?.url;
      if (url) setImages(prev => ({ ...prev, [key]: url }));
    } catch {
      alert("Image upload failed. Check Cloudinary credentials.");
    } finally {
      setUploadingKey(null);
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/api/cms/about", { content: form, images });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to save. Make sure backend is running.");
    } finally {
      setSaving(false);
    }
  };

  const SaveButton = ({ className = "" }: { className?: string }) => (
    <button onClick={handleSave} disabled={saving || !!uploadingKey}
      className={`px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold text-sm hover:scale-[1.02] transition disabled:opacity-60 ${className}`}>
      {uploadingKey ? "Uploading..." : saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
    </button>
  );

  const ImgZone = ({ imgKey, label, aspectRatio }: { imgKey: keyof typeof images; label: string; aspectRatio: "landscape" | "portrait" | "square" | "logo" }) => (
    <div className="relative">
      <ImageDropZone label={label} currentImage={images[imgKey]} onImageChange={handleImageChange(imgKey)} aspectRatio={aspectRatio} />
      {uploadingKey === imgKey && (
        <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
          <p className="text-[#D4AF37] text-xs font-semibold">Uploading...</p>
        </div>
      )}
    </div>
  );

  if (loading) return <div className="text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit About Page</h1>
          <p className="text-gray-400 text-sm mt-1">Changes save to database and reflect on the live website</p>
        </div>
        <SaveButton />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Hero Section</h2>
        <Field label="Heading" name="heroHeading" value={form.heroHeading} onChange={handleFormChange} />
        <Field label="Subtext" name="heroSubtext" value={form.heroSubtext} onChange={handleFormChange} multiline />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Stats</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Stat 1 Value" name="stat1" value={form.stat1} onChange={handleFormChange} />
          <Field label="Stat 1 Label" name="stat1Label" value={form.stat1Label} onChange={handleFormChange} />
          <Field label="Stat 2 Value" name="stat2" value={form.stat2} onChange={handleFormChange} />
          <Field label="Stat 2 Label" name="stat2Label" value={form.stat2Label} onChange={handleFormChange} />
          <Field label="Stat 3 Value" name="stat3" value={form.stat3} onChange={handleFormChange} />
          <Field label="Stat 3 Label" name="stat3Label" value={form.stat3Label} onChange={handleFormChange} />
          <Field label="Stat 4 Value" name="stat4" value={form.stat4} onChange={handleFormChange} />
          <Field label="Stat 4 Label" name="stat4Label" value={form.stat4Label} onChange={handleFormChange} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Our Story</h2>
        <ImgZone imgKey="storyImage" label="Story Section Image" aspectRatio="landscape" />
        <Field label="Section Heading" name="storyHeading" value={form.storyHeading} onChange={handleFormChange} />
        <Field label="Story Text" name="storyText" value={form.storyText} onChange={handleFormChange} multiline />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Mission & Vision</h2>
        <Field label="Mission Heading" name="missionHeading" value={form.missionHeading} onChange={handleFormChange} />
        <Field label="Mission Text" name="missionText" value={form.missionText} onChange={handleFormChange} multiline />
        <Field label="Vision Heading" name="visionHeading" value={form.visionHeading} onChange={handleFormChange} />
        <Field label="Vision Text" name="visionText" value={form.visionText} onChange={handleFormChange} multiline />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-6">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Team Members</h2>
        <div className="space-y-4 pb-6 border-b border-white/[0.06]">
          <p className="text-gray-400 text-xs uppercase tracking-widest">Member 1</p>
          <ImgZone imgKey="member1Photo" label="Member 1 Photo" aspectRatio="portrait" />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" name="member1Name" value={form.member1Name} onChange={handleFormChange} />
            <Field label="Role" name="member1Role" value={form.member1Role} onChange={handleFormChange} />
          </div>
          <Field label="Bio" name="member1Bio" value={form.member1Bio} onChange={handleFormChange} multiline />
        </div>
        <div className="space-y-4">
          <p className="text-gray-400 text-xs uppercase tracking-widest">Member 2</p>
          <ImgZone imgKey="member2Photo" label="Member 2 Photo" aspectRatio="portrait" />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" name="member2Name" value={form.member2Name} onChange={handleFormChange} />
            <Field label="Role" name="member2Role" value={form.member2Role} onChange={handleFormChange} />
          </div>
          <Field label="Bio" name="member2Bio" value={form.member2Bio} onChange={handleFormChange} multiline />
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton className="px-8" />
      </div>
    </div>
  );
}