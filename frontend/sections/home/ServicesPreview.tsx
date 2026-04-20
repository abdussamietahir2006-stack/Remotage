"use client";

import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
}

const defaultServices = [
  "Lead Generation",
  "Customer Support",
  "Marketing & Social Media",
  "Finance & Bookkeeping",
  "Real Estate Services",
  "Web Development",
  "CRM Management",
  "Online Reputation Management",
];

export default function ServicesPreview({ content = {} }: Props) {
  const services = [
    content.service1 || defaultServices[0],
    content.service2 || defaultServices[1],
    content.service3 || defaultServices[2],
    content.service4 || defaultServices[3],
    content.service5 || defaultServices[4],
    content.service6 || defaultServices[5],
    content.service7 || defaultServices[6],
    content.service8 || defaultServices[7],
  ];

  return (
    <section className="relative py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full top-10 left-10" />
      <div className="absolute w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full bottom-10 right-10" />

      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold">
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            What Can We Assist You With?
          </span>
        </h2>
        <p className="text-gray-400 mt-4">Premium digital solutions designed to scale your business.</p>
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-wrap justify-center gap-6 px-6">
        {services.map((title, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ delay: i * 0.1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="flex items-center gap-4 px-6 py-4 rounded-full bg-[#111111] border border-[#D4AF37]/20 backdrop-blur-xl shadow-lg hover:shadow-[#D4AF37]/20 transition">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-semibold text-sm">
                {String(i + 1).padStart(2, '0')}
              </div>
              <span className="text-white font-medium group-hover:text-[#D4AF37] transition">{title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}