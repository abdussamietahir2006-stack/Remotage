"use client";

import { useState, useEffect, useCallback } from "react";
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
  logo: "REMOTAGE",
  description: "Your remote advantage — helping businesses scale faster with expert digital services, automation, and execution.",
  phone: "+1 (628) 265-7358",
  email: "Mashood.tahir@remotage.com",
  link1Label: "Home",     link1Href: "/",
  link2Label: "About",    link2Href: "/about",
  link3Label: "Services", link3Href: "/services",
  link4Label: "Contact",  link4Href: "/contact",
  facebookUrl:  "https://facebook.com",
  instagramUrl: "https://instagram.com",
  linkedinUrl:  "https://linkedin.com",
  copyright: "Remotage. All rights reserved.",
};

export default function CMSFooter() {
  const [saved, setSaved]     = useState(false);
  const [saving, setSaving]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState(defaultForm);

  useEffect(() => {
    api.get("/api/cms/footer")
      .then(res => {
        if (res.data.data?.content) setForm(prev => ({ ...prev, ...res.data.data.content }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFormChange = useCallback((name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/api/cms/footer", { content: form });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to save. Make sure backend is running.");
    } finally {
      setSaving(false);
    }
  };

  const SaveButton = ({ className = "" }: { className?: string }) => (
    <button onClick={handleSave} disabled={saving}
      className={`px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold text-sm hover:scale-[1.02] transition disabled:opacity-60 ${className}`}>
      {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
    </button>
  );

  if (loading) return <div className="text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Footer</h1>
          <p className="text-gray-400 text-sm mt-1">Changes save to database and reflect on the live website</p>
        </div>
        <SaveButton />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Brand</h2>
        <Field label="Logo Text"   name="logo"        value={form.logo}        onChange={handleFormChange} />
        <Field label="Description" name="description" value={form.description} onChange={handleFormChange} multiline />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Contact Info</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Phone" name="phone" value={form.phone} onChange={handleFormChange} />
          <Field label="Email" name="email" value={form.email} onChange={handleFormChange} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Quick Links</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Link 1 Label" name="link1Label" value={form.link1Label} onChange={handleFormChange} />
          <Field label="Link 1 URL"   name="link1Href"  value={form.link1Href}  onChange={handleFormChange} />
          <Field label="Link 2 Label" name="link2Label" value={form.link2Label} onChange={handleFormChange} />
          <Field label="Link 2 URL"   name="link2Href"  value={form.link2Href}  onChange={handleFormChange} />
          <Field label="Link 3 Label" name="link3Label" value={form.link3Label} onChange={handleFormChange} />
          <Field label="Link 3 URL"   name="link3Href"  value={form.link3Href}  onChange={handleFormChange} />
          <Field label="Link 4 Label" name="link4Label" value={form.link4Label} onChange={handleFormChange} />
          <Field label="Link 4 URL"   name="link4Href"  value={form.link4Href}  onChange={handleFormChange} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Social Media URLs</h2>
        <Field label="Facebook URL"  name="facebookUrl"  value={form.facebookUrl}  onChange={handleFormChange} />
        <Field label="Instagram URL" name="instagramUrl" value={form.instagramUrl} onChange={handleFormChange} />
        <Field label="LinkedIn URL"  name="linkedinUrl"  value={form.linkedinUrl}  onChange={handleFormChange} />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Copyright</h2>
        <Field label="Copyright Text" name="copyright" value={form.copyright} onChange={handleFormChange} />
      </div>

      <div className="flex justify-end">
        <SaveButton className="px-8" />
      </div>
    </div>
  );
}