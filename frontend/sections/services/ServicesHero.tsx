"use client";

import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
}

export default function ServicesHero({ content = {} }: Props) {
  const heading = content.heroHeading || "Premium Remote Services";
  const subtext  = content.heroSubtext  || "From administrative support to full-scale digital marketing — we handle the execution so you can focus on growth.";

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center px-6 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[140px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#D4AF37_1px,transparent_1px),linear-gradient(to_right,#D4AF37_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-sm tracking-widest uppercase"
        >
          What We Offer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white/20">Premium</span>{" "}
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            {heading.replace("Premium Remote Services", "Remote Services").replace("Premium ", "") || "Remote Services"}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          {subtext}
        </motion.p>
      </div>
    </section>
  );
}