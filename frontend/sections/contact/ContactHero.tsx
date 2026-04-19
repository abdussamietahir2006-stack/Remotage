"use client";

import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
}

export default function ContactHero({ content = {} }: Props) {
  const heading = content.heroHeading  || "Let's Talk";
  const subtext  = content.heroSubtext  || "Send us a message or book a free discovery call. We respond within 24 hours.";

  return (
    <section className="relative min-h-[52vh] flex items-center justify-center text-center px-6 bg-[#0A0A0A] overflow-hidden pt-24">
      <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[140px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#D4AF37_1px,transparent_1px),linear-gradient(to_right,#D4AF37_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-sm tracking-widest uppercase">
          Get In Touch
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          <span className="text-white/20">Let&apos;s</span>{" "}
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            {heading.replace("Let's ", "").replace("Lets ", "") || "Talk"}
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto">
          {subtext}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { label: "Response Time", value: content.responseTime || "< 24 hrs" },
            { label: "Discovery Call",  value: "Free" },
            { label: "No Commitment",   value: "Required" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F5E6A3] bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}