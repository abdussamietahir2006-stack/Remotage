"use client";

import { useState, useEffect, useCallback } from "react";
import ImageDropZone from "./ImageDropZone";
import api from "@/lib/api";

// ✅ OUTSIDE the component — prevents remount on every keystroke
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
        <textarea
          value={value}
          onChange={e => onChange(name, e.target.value)}
          rows={3}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm resize-none"
        />
      ) : (
        <input
          value={value}
          onChange={e => onChange(name, e.target.value)}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
        />
      )}
    </div>
  );
}

const defaultForm = {
  heroHeading: "Your Remote Advantage",
  heroSubtext: "Scale faster with expert-led digital services, automation, and remote execution.",
  stat1Label: "Clients Served",    stat1Value: "150+",
  stat2Label: "Revenue Generated", stat2Value: "$2M+",
  stat3Label: "Client Satisfaction", stat3Value: "98%",
  stat4Label: "Support Available", stat4Value: "24/7",
  service1: "Lead Generation",
  service2: "Customer Support",
  service3: "Marketing & Social Media",
  service4: "Finance & Bookkeeping",
  service5: "Real Estate Services",
  service6: "Web Development",
  service7: "CRM Management",
  service8: "Online Reputation Management",
  newsletterHeading: "Subscribe to Get Special News",
  newsletterSubtext: "Stay updated with our latest services and offers.",
  clientLink1: "", clientLink2: "", clientLink3: "",
  clientLink4: "", clientLink5: "", clientLink6: "",
  clientLink7: "", clientLink8: "",
  testimonialName1: "John Carter",    testimonialRole1: "Startup Founder",    testimonialText1: "Remotage completely transformed our workflow. We scaled faster without hiring a full in-house team.",
  testimonialName2: "Sarah Williams", testimonialRole2: "Marketing Director", testimonialText2: "The automation and execution quality is next level. It feels like having an elite remote team.",
  testimonialName3: "Ali Khan",       testimonialRole3: "Business Owner",      testimonialText3: "From lead generation to operations, everything became smoother. Highly recommended.",
};

const defaultImages = {
  whoWeAssist1: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1400",
  whoWeAssist2: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400",
  whoWeAssist3: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1400",
  clientLogo1: "", clientLogo2: "", clientLogo3: "",
  clientLogo4: "", clientLogo5: "", clientLogo6: "",
  clientLogo7: "", clientLogo8: "",
};

export default function CMSHome() {
  const [saved, setSaved]     = useState(false);
  const [saving, setSaving]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const [form, setForm]       = useState(defaultForm);
  const [images, setImages]   = useState(defaultImages);

  useEffect(() => {
    api.get("/api/cms/home")
      .then(res => {
        if (res.data.data?.content) setForm(prev => ({ ...prev, ...res.data.data.content }));
        if (res.data.data?.images)  setImages(prev => ({ ...prev, ...res.data.data.images }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // ✅ Stable onChange handler — won't cause Field remount
  const handleFormChange = useCallback((name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  // ✅ Uploads to Cloudinary, saves the real URL (not blob URL)
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
      const cloudinaryUrl = res.data.data?.url;
      if (cloudinaryUrl) {
        setImages(prev => ({ ...prev, [key]: cloudinaryUrl }));
      }
    } catch {
      alert("Image upload failed. Check Cloudinary credentials.");
    } finally {
      setUploadingKey(null);
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/api/cms/home", { content: form, images });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to save. Make sure backend is running.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-400 text-sm">Loading...</div>;

  const SaveButton = ({ className = "" }: { className?: string }) => (
    <button onClick={handleSave} disabled={saving || !!uploadingKey}
      className={`px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold text-sm hover:scale-[1.02] transition disabled:opacity-60 ${className}`}>
      {uploadingKey ? "Uploading image..." : saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
    </button>
  );

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Home Page</h1>
          <p className="text-gray-400 text-sm mt-1">Changes save to database and reflect on the live website</p>
        </div>
        <SaveButton />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Hero Section
        </h2>
        <Field label="Main Heading" name="heroHeading" value={form.heroHeading} onChange={handleFormChange} />
        <Field label="Subtext" name="heroSubtext" value={form.heroSubtext} onChange={handleFormChange} multiline />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Stats Section
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Stat 1 Value" name="stat1Value" value={form.stat1Value} onChange={handleFormChange} />
          <Field label="Stat 1 Label" name="stat1Label" value={form.stat1Label} onChange={handleFormChange} />
          <Field label="Stat 2 Value" name="stat2Value" value={form.stat2Value} onChange={handleFormChange} />
          <Field label="Stat 2 Label" name="stat2Label" value={form.stat2Label} onChange={handleFormChange} />
          <Field label="Stat 3 Value" name="stat3Value" value={form.stat3Value} onChange={handleFormChange} />
          <Field label="Stat 3 Label" name="stat3Label" value={form.stat3Label} onChange={handleFormChange} />
          <Field label="Stat 4 Value" name="stat4Value" value={form.stat4Value} onChange={handleFormChange} />
          <Field label="Stat 4 Label" name="stat4Label" value={form.stat4Label} onChange={handleFormChange} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Who We Assist — Images
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {(["whoWeAssist1", "whoWeAssist2", "whoWeAssist3"] as const).map((key, i) => (
            <div key={key} className="relative">
              <ImageDropZone
                label={["Startups Image", "SMB Image", "Professionals Image"][i]}
                currentImage={images[key]}
                onImageChange={handleImageChange(key)}
                aspectRatio="portrait"
              />
              {uploadingKey === key && (
                <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                  <p className="text-[#D4AF37] text-xs font-semibold">Uploading...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Client Logos & Links
        </h2>
        <div className="space-y-6">
          {([1, 2, 3, 4, 5, 6, 7, 8] as const).map(n => {
            const imgKey = `clientLogo${n}` as keyof typeof images;
            const linkKey = `clientLink${n}` as keyof typeof form;
            return (
              <div key={n} className="grid sm:grid-cols-3 gap-5 items-start border-b border-white/[0.04] pb-5 last:border-b-0 last:pb-0">
                <div className="relative col-span-1">
                  <ImageDropZone
                    label={`Client Logo ${n}`}
                    currentImage={images[imgKey]}
                    onImageChange={handleImageChange(imgKey)}
                    aspectRatio="logo"
                  />
                  {uploadingKey === imgKey && (
                    <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                      <p className="text-[#D4AF37] text-xs font-semibold">Uploading...</p>
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <Field 
                    label={`Client Logo ${n} Website URL`} 
                    name={linkKey} 
                    value={(form[linkKey] as string) || ""} 
                    onChange={handleFormChange} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-6">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Testimonials
        </h2>
        <div className="space-y-6">
          {([1, 2, 3] as const).map(n => {
            const nameKey = `testimonialName${n}` as keyof typeof form;
            const roleKey = `testimonialRole${n}` as keyof typeof form;
            const textKey = `testimonialText${n}` as keyof typeof form;
            return (
              <div key={n} className="space-y-4 border-b border-white/[0.04] pb-6 last:border-b-0 last:pb-0">
                <p className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">Testimonial {n}</p>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Client Name" name={nameKey} value={(form[nameKey] as string) || ""} onChange={handleFormChange} />
                    <Field label="Client Role" name={roleKey} value={(form[roleKey] as string) || ""} onChange={handleFormChange} />
                  </div>
                  <Field label="Testimonial Text" name={textKey} value={(form[textKey] as string) || ""} onChange={handleFormChange} multiline />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Services List
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {([1,2,3,4,5,6,7,8] as const).map(n => (
            <Field key={n} label={`Service ${n}`} name={`service${n}`}
              value={form[`service${n}` as keyof typeof form]}
              onChange={handleFormChange} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Newsletter Section
        </h2>
        <Field label="Heading" name="newsletterHeading" value={form.newsletterHeading} onChange={handleFormChange} />
        <Field label="Subtext" name="newsletterSubtext" value={form.newsletterSubtext} onChange={handleFormChange} multiline />
      </div>

      <div className="flex justify-end">
        <SaveButton className="px-8" />
      </div>
    </div>
  );
}