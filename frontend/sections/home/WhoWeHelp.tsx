"use client";

import { motion } from "framer-motion";

interface Props {
  images?: Record<string, string>;
}

const defaultData = [
  {
    title: "Startups",
    desc: "Launch faster, scale smarter, and execute without hiring full teams.",
    imgKey: "whoWeAssist1",
    defaultImg: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Small & Medium Businesses",
    desc: "Streamline operations, boost marketing, and unlock consistent growth.",
    imgKey: "whoWeAssist2",
    defaultImg: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Industry Professionals",
    desc: "Build authority, manage reputation, and grow your personal brand.",
    imgKey: "whoWeAssist3",
    defaultImg: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function WhoWeHelp({ images = {} }: Props) {
  return (
    <section className="relative py-28 px-6 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[160px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[160px] rounded-full bottom-[-200px] right-[-200px]" />

      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white">Who We Assist</h2>
        <p className="text-gray-400 mt-4 text-lg">We partner with ambitious people ready to scale.</p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 relative z-10">
        {defaultData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
            className="relative group rounded-3xl overflow-hidden bg-[#111] border border-[#D4AF37]/20 shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative h-[420px] overflow-hidden">
              <img
                src={images[item.imgKey] || item.defaultImg}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-[#D4AF37]/20" />
            </div>
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
            <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[#D4AF37]/40 transition pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}