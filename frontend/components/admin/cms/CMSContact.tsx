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
  heroHeading: "Let's Talk",
  heroSubtext: "Send us a message or book a free discovery call. We respond within 24 hours.",
  email: "Mashood.tahir@remotage.com",
  phone: "+1 (628) 265-7358",
  responseTime: "Within 24 hours",
  availability: "Mon–Sat, Available 24 Hours",
  faq1Q: "How quickly can I get a VA?",
  faq1A: "Most clients are matched with a VA within 24–48 hours of onboarding.",
  faq2Q: "Do I need to sign a long-term contract?",
  faq2A: "No long-term contracts required. We offer flexible month-to-month arrangements.",
  faq3Q: "What hours do your VAs work?",
  faq3A: "Our VAs work within your preferred timezone and business hours.",
  faq4Q: "What tools do your VAs know?",
  faq4A: "Our VAs are proficient in Google Workspace, Slack, Trello, HubSpot, QuickBooks and more.",
  faq5Q: "What if my VA isn't a good fit?",
  faq5A: "We offer a replacement guarantee at no additional charge.",
  faq6Q: "How do you ensure data security?",
  faq6A: "All VAs sign NDAs before starting and we follow strict data privacy protocols.",
};

export default function CMSContact() {
  const [saved, setSaved]     = useState(false);
  const [saving, setSaving]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState(defaultForm);

  useEffect(() => {
    api.get("/api/cms/contact")
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
      await api.put("/api/cms/contact", { content: form });
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
          <h1 className="text-2xl font-bold text-white">Edit Contact Page</h1>
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
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Contact Information</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Email Address" name="email"        value={form.email}        onChange={handleFormChange} />
          <Field label="Phone Number"  name="phone"        value={form.phone}        onChange={handleFormChange} />
          <Field label="Response Time" name="responseTime" value={form.responseTime} onChange={handleFormChange} />
          <Field label="Availability"  name="availability" value={form.availability} onChange={handleFormChange} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-white font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" />FAQ Section</h2>
        {[1,2,3,4,5,6].map(n => (
          <div key={n} className="space-y-3 pb-5 border-b border-white/[0.06] last:border-0">
            <Field label={`FAQ ${n} Question`} name={`faq${n}Q`} value={form[`faq${n}Q` as keyof typeof form]} onChange={handleFormChange} />
            <Field label={`FAQ ${n} Answer`}   name={`faq${n}A`} value={form[`faq${n}A` as keyof typeof form]} onChange={handleFormChange} multiline />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <SaveButton className="px-8" />
      </div>
    </div>
  );
}