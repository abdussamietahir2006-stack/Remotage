"use client";

import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
}

export default function AboutStats({ content = {} }: Props) {
  const stats = [
    { value: content.stat1  || "150+",  label: content.stat1Label  || "Clients Served" },
    { value: content.stat2  || "$2M+",  label: content.stat2Label  || "Revenue Generated" },
    { value: content.stat3  || "98%",   label: content.stat3Label  || "Client Satisfaction" },
    { value: content.stat4  || "24/7",  label: content.stat4Label  || "Support Available" },
  ];

  return (
    <section className="py-16 px-6 bg-[#0D0D0D] border-y border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }} className="text-center group">
            <motion.p initial={{ scale: 0.5 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 150 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent mb-2">
              {stat.value}
            </motion.p>
            <p className="text-gray-400 text-sm tracking-widest uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}