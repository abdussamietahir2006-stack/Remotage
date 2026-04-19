"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  content?: Record<string, string>;
}

const defaultFaqs = [
  { q: "How quickly can I get a VA?",            a: "Most clients are matched with a VA within 24–48 hours of onboarding." },
  { q: "Do I need to sign a long-term contract?", a: "No long-term contracts required. We offer flexible month-to-month arrangements." },
  { q: "What hours do your VAs work?",            a: "Our VAs work within your preferred timezone and business hours." },
  { q: "What tools do your VAs know?",            a: "Our VAs are proficient in Google Workspace, Slack, Trello, HubSpot, QuickBooks and more." },
  { q: "What if my VA isn't a good fit?",         a: "We offer a replacement guarantee at no additional charge." },
  { q: "How do you ensure data security?",        a: "All VAs sign NDAs before starting and we follow strict data privacy protocols." },
];

export default function ContactFAQ({ content = {} }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = defaultFaqs.map((faq, i) => ({
    q: content[`faq${i + 1}Q`] || faq.q,
    a: content[`faq${i + 1}A`] || faq.a,
  }));

  return (
    <section className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-[#D4AF37] text-sm tracking-widest uppercase">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Common{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }} className="rounded-2xl border border-white/[0.06] bg-[#111] overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left group">
                <span className="text-white font-medium group-hover:text-[#D4AF37] transition pr-4 text-sm">{faq.q}</span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:border-[#D4AF37]/40 group-hover:text-[#D4AF37] transition">
                  <motion.svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </motion.svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/[0.04] pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}