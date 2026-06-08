"use client";

import { motion } from "framer-motion";

interface Props {
  images?: Record<string, string>;
}

const placeholders = [1, 2, 3, 4, 5, 6];

export default function Clients({ images = {} }: Props) {
  const logos = placeholders.map(n => ({
    key: `clientLogo${n}`,
    url: images[`clientLogo${n}`] || null,
    label: `Client ${n}`,
  }));

  const filled = logos.filter(l => l.url);
  const shouldScroll = filled.length >= 4;
  const display = shouldScroll ? [...filled, ...filled] : filled;

  if (display.length === 0) {
    return (
      <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              Trusted by Premium Brands
            </span>
          </motion.h2>
          <p className="text-gray-500 text-sm"></p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#0A0A0A] overflow-hidden relative">
      <div className="absolute w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            Trusted by Premium Brands
          </span>
        </motion.h2>
        <p className="text-gray-400 mb-12">We collaborate with ambitious brands worldwide.</p>
        <div className="relative w-full overflow-hidden flex justify-center">
          {shouldScroll ? (
            <motion.div
              className="flex gap-10 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {display.map((client, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center w-28 h-28 rounded-2xl border border-[#D4AF37]/20 bg-white/5 backdrop-blur-md shadow-lg flex-shrink-0"
                >
                  <img src={client.url!} alt={client.label} className="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition" />
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="flex gap-10 justify-center flex-wrap">
              {display.map((client, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center w-28 h-28 rounded-2xl border border-[#D4AF37]/20 bg-white/5 backdrop-blur-md shadow-lg"
                >
                  <img src={client.url!} alt={client.label} className="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}