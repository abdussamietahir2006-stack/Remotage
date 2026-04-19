"use client";

import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
  images?:  Record<string, string>;
}

const defaultBullets = [
  "Reply to customers via email, chat, and phone",
  "Manage orders, returns, and refunds",
  "Gather and manage customer feedback",
  "Resolve customer complaints and issues",
];

const CheckIcon = () => (
  <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center">
    <svg className="w-2.5 h-2.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  </span>
);

export default function CustomerSupport({ content = {}, images = {} }: Props) {
  const title   = content.service2Title  || "Customer Support";
  const desc    = content.service2Desc   || "Your customers deserve fast, professional responses at every touchpoint. Our support specialists handle every interaction with care — keeping your clients happy and your reputation strong.";
  const bullets = [
    content.service2Bullet1 || defaultBullets[0],
    content.service2Bullet2 || defaultBullets[1],
    content.service2Bullet3 || defaultBullets[2],
    content.service2Bullet4 || defaultBullets[3],
  ];
  const image = images.service2Image || "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1400&auto=format&fit=crop";

  return (
    <section className="py-28 px-6 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <span className="text-[#D4AF37] text-sm tracking-widest uppercase">Service Two</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
            {title.split(" ")[0]}<br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              {title.split(" ").slice(1).join(" ") || "Support"}
            </span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">{desc}</p>
          <ul className="space-y-4">
            {bullets.map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="flex items-start gap-3 text-gray-300">
                <CheckIcon />{item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="relative group rounded-3xl overflow-hidden h-[480px]">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-tl from-[#D4AF37]/20 via-transparent to-transparent" />
          <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition pointer-events-none" />
          <div className="absolute bottom-6 right-6">
            <span className="px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm tracking-widest uppercase">02</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}