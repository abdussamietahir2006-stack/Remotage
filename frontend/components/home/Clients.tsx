"use client";

import { motion } from "framer-motion";

interface Props {
  images?: Record<string, string>;
  content?: Record<string, string>;
}

const placeholders = [1, 2, 3, 4, 5, 6];

export default function Clients({ images = {}, content = {} }: Props) {
  const logos = placeholders.map(n => ({
    key: `clientLogo${n}`,
    url: images[`clientLogo${n}`] || null,
    label: `Client ${n}`,
    link: content[`clientLink${n}`] || null,
  }));

  const filled = logos.filter(l => l.url);

  if (filled.length === 0) {
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

  // To build a seamless infinite horizontal carousel, we want at least 8 items
  const minItems = 8;
  const repeatCount = Math.ceil(minItems / filled.length);
  const repeatedList: typeof filled = [];
  for (let i = 0; i < repeatCount; i++) {
    repeatedList.push(...filled);
  }

  // Duplicate repeatedList to support seamless -50% translation wrapping
  const display = [...repeatedList, ...repeatedList];

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
          <motion.div
            className="flex gap-10 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {display.map((client, i) => {
              const card = (
                <motion.div
                  whileHover={{ 
                    scale: 1.08, 
                    borderColor: "rgba(212, 175, 55, 0.6)", 
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.15)"
                  }}
                  className="flex items-center justify-center w-52 h-24 rounded-2xl border border-[#D4AF37]/20 bg-[#111111]/90 backdrop-blur-md shadow-lg flex-shrink-0 cursor-pointer transition-all duration-300"
                >
                  <img 
                    src={client.url!} 
                    alt={client.label} 
                    className="w-44 h-16 object-contain opacity-90 hover:opacity-100 transition duration-300" 
                  />
                </motion.div>
              );

              if (client.link) {
                return (
                  <a 
                    key={i} 
                    href={client.link.startsWith('http') ? client.link : `https://${client.link}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block flex-shrink-0"
                  >
                    {card}
                  </a>
                );
              }

              return <div key={i} className="flex-shrink-0">{card}</div>;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}