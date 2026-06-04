"use client";

import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
  images?:  Record<string, string>;
}

export default function AboutStory({ content = {}, images = {} }: Props) {
  const heading   = content.storyHeading || "How It All Began";
  const storyText = content.storyText    || "Remotage was born from a simple observation — businesses were spending too much time and money on tasks that could be handled remotely, by the right people, at a fraction of the cost.";
  const image     = images.storyImage    || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop";

  return (
    <section className="py-28 px-6 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative group rounded-3xl overflow-hidden h-[500px]">
          <img src={image} alt="Our Story" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-[#D4AF37]/20 via-transparent to-transparent" />
          <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition pointer-events-none" />
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: "spring" }} viewport={{ once: true }} className="absolute bottom-6 left-6 px-5 py-3 rounded-2xl bg-[#0A0A0A]/80 border border-[#D4AF37]/30 backdrop-blur-sm">
            <p className="text-[#D4AF37] font-bold text-lg">Founded 2023</p>
            <p className="text-gray-400 text-xs">Built with purpose</p>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="text-[#D4AF37] text-sm tracking-widest uppercase">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
            {heading.split(" ").slice(0, -1).join(" ") || "How It All"}<br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              {heading.split(" ").slice(-1)[0] || "Began"}
            </span>
          </h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>{storyText}</p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm tracking-widest uppercase font-semibold">Remote-first since day one</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}