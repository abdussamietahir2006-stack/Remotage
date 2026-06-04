"use client";

import { useState, useEffect, useCallback } from "react";
import ImageDropZone from "./ImageDropZone";
import api from "@/lib/api";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

function Field({ label, name, value, onChange }: FieldProps) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5 tracking-wide uppercase">{label}</label>
      <input value={value} onChange={e => onChange(name, e.target.value)}
        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm" />
    </div>
  );
}

interface ServiceBlockProps {
  num: string;
  fields: { label: string; name: string; value: string }[];
  imageKey: string;
  imageUrl: string;
  uploadingKey: string | null;
  onChange: (name: string, value: string) => void;
  onImageChange: (key: string) => (_preview: string, file: File) => Promise<void>;
}

function ServiceBlock({ num, fields, imageKey, imageUrl, uploadingKey, onChange, onImageChange }: ServiceBlockProps) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
      <h2 className="text-white font-semibold flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-xs">{num}</span>
        Service {num}
      </h2>
      <div className="relative">
        <ImageDropZone label={`Service ${num} Image`} currentImage={imageUrl} onImageChange={onImageChange(imageKey)} aspectRatio="landscape" />
        {uploadingKey === imageKey && (
          <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
            <p className="text-[#D4AF37] text-xs font-semibold">Uploading...</p>
          </div>
        )}
      </div>
      {fields.map(f => (
        <Field key={f.name} label={f.label} name={f.name} value={f.value} onChange={onChange} />
      ))}
    </div>
  );
}

const defaultForm = {
  heroHeading: "Our Services",
  heroSubtext: "Everything your business needs to scale — handled remotely by experts.",
  service1Title: "Administrative Support", service1Desc: "Expert virtual assistants to handle your day-to-day operations.",
  service1Bullet1: "Email and calendar management", service1Bullet2: "Data entry and organization",
  service1Bullet3: "Document preparation", service1Bullet4: "Travel and meeting coordination",
  service2Title: "Customer Support", service2Desc: "Keep your clients happy with responsive, professional support.",
  service2Bullet1: "Live chat and email support", service2Bullet2: "Ticket management",
  service2Bullet3: "Customer follow-ups", service2Bullet4: "Complaint resolution",
  service3Title: "Marketing & Social Media", service3Desc: "Grow your brand with expert marketing and social media management.",
  service3Bullet1: "Social media posting and scheduling", service3Bullet2: "Content creation and strategy",
  service3Bullet3: "Ad campaign management", service3Bullet4: "Analytics and reporting",
  service4Title: "Finance & Bookkeeping", service4Desc: "Keep your finances organized and accurate without the stress.",
  service4Bullet1: "Enter and organize financial data", service4Bullet2: "Create invoices and track payments",
  service4Bullet3: "Record and categorize expenses", service4Bullet4: "Create financial summaries and reports",
  service5Title: "Real Estate Services", service5Desc: "Specialized support for real estate agents and brokers.",
  service5Bullet1: "Calling FSBO and expired leads", service5Bullet2: "Lead qualification and prospecting",
  service5Bullet3: "Appointment setting", service5Bullet4: "CRM and pipeline management",
  service6Title: "Web Development", service6Desc: "Fast, beautiful websites that turn visitors into clients.",
  service6Bullet1: "Custom websites and landing pages", service6Bullet2: "E-commerce development",
  service6Bullet3: "Mobile-first responsive design", service6Bullet4: "SEO optimization and maintenance",
};

const defaultImages = {
  service1Image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1400",
  service2Image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1400",
  service3Image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1400",
  service4Image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1400",
  service5Image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400",
  service6Image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1400",
};

export default function CMSServices() {
  const [saved, setSaved]     = useState(false);
  const [saving, setSaving]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [form, setForm]       = useState(defaultForm);
  const [images, setImages]   = useState(defaultImages);

  useEffect(() => {
    api.get("/api/cms/services")
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

  const handleImageChange = useCallback((key: string) => async (_previewUrl: string, file: File) => {
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
      await api.put("/api/cms/services", { content: form, images });
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

  const serviceBlocks = [1,2,3,4,5,6].map(n => ({
    num: String(n),
    imageKey: `service${n}Image`,
    imageUrl: images[`service${n}Image` as keyof typeof images],
    fields: [
      { label: "Title",    name: `service${n}Title`,   value: form[`service${n}Title`   as keyof typeof form] },
      { label: "Description", name: `service${n}Desc`, value: form[`service${n}Desc`    as keyof typeof form] },
      { label: "Bullet 1", name: `service${n}Bullet1`, value: form[`service${n}Bullet1` as keyof typeof form] },
      { label: "Bullet 2", name: `service${n}Bullet2`, value: form[`service${n}Bullet2` as keyof typeof form] },
      { label: "Bullet 3", name: `service${n}Bullet3`, value: form[`service${n}Bullet3` as keyof typeof form] },
      { label: "Bullet 4", name: `service${n}Bullet4`, value: form[`service${n}Bullet4` as keyof typeof form] },
    ],
  }));

  if (loading) return <div className="text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Services Page</h1>
          <p className="text-gray-400 text-sm mt-1">Changes save to database and reflect on the live website</p>
        </div>
        <SaveButton />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Hero Section</h2>
        <Field label="Heading" name="heroHeading" value={form.heroHeading} onChange={handleFormChange} />
        <Field label="Subtext" name="heroSubtext" value={form.heroSubtext} onChange={handleFormChange} />
      </div>

      {serviceBlocks.map(block => (
        <ServiceBlock key={block.num} {...block}
          uploadingKey={uploadingKey}
          onChange={handleFormChange}
          onImageChange={handleImageChange}
        />
      ))}

      <div className="flex justify-end">
        <SaveButton className="px-8" />
      </div>
    </div>
  );
}