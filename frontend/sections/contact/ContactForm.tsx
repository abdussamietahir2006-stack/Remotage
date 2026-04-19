"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  content?: Record<string, string>;
}

const services = [
  "Administrative Support",
  "Customer Support",
  "Marketing & Social Media",
  "Finance & Bookkeeping",
  "Real Estate Services",
  "Web Development",
  "Other",
];

export default function ContactForm({ content = {} }: Props) {
  const email        = content.email        || "Mashood.tahir@remotage.com";
  const phone        = content.phone        || "+1 (628) 265-7358";
  const responseTime = content.responseTime || "Within 24 hours";
  const availability = content.availability || "Mon–Sat, Available 24 Hours";

  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, company: form.company,
          phone: form.phone, message: `Service: ${form.service || "Not specified"}\n\n${form.message}`,
          source: "contact_form",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", company: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactItems = [
    { label: "Email",         value: email,        href: `mailto:${email}` },
    { label: "Phone",         value: phone,        href: `tel:${phone.replace(/\D/g,'')}` },
    { label: "Response Time", value: responseTime, href: null },
    { label: "Availability",  value: availability, href: null },
  ];

  return (
    <section className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="rounded-3xl border border-[#D4AF37]/20 bg-[#111] p-8 md:p-10">
          <h2 className="text-3xl font-bold text-white mb-1">Send a Message</h2>
          <p className="text-gray-400 text-sm mb-8">Fill in the form and we&apos;ll get back to you within 24 hours.</p>

          {status === "success" ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-6">
                <svg className="w-9 h-9 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Message Received!</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto">Thank you for reaching out. Our team will contact you within 24 hours.</p>
              <button onClick={() => setStatus("idle")} className="px-6 py-2.5 border border-[#D4AF37]/40 text-[#D4AF37] rounded-xl hover:bg-[#D4AF37]/10 transition text-sm">Send Another Message</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">Full Name <span className="text-[#D4AF37]">*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">Email Address <span className="text-[#D4AF37]">*</span></label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">Company</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Your Company" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">Service Interested In</label>
                <div className="relative">
                  <select name="service" value={form.service} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm appearance-none">
                    <option value="">Select a service...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">Message <span className="text-[#D4AF37]">*</span></label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your business and what you need help with..." className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm resize-none" />
              </div>
              {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>}
              <button type="submit" disabled={status === "loading"} className="w-full py-4 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-[1.02] transition disabled:opacity-60 text-sm tracking-wide">
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="space-y-5">
          <h3 className="text-2xl font-bold text-white mb-6">Other Ways to Reach Us</h3>
          {contactItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="flex items-center gap-5 p-5 rounded-2xl border border-white/[0.06] bg-[#111] hover:border-[#D4AF37]/30 transition group">
              <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-white hover:text-[#D4AF37] transition font-medium text-sm">{item.value}</a>
                ) : (
                  <p className="text-white font-medium text-sm">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}