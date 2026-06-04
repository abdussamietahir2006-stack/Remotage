"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Discovery",
    desc: "We deeply understand your goals, business model, and current challenges.",
  },
  {
    title: "Strategy",
    desc: "We craft a tailored plan combining systems, marketing, and automation.",
  },
  {
    title: "Execution",
    desc: "Our team implements everything with precision and speed.",
  },
  {
    title: "Growth",
    desc: "We optimize, scale, and continuously improve your results.",
  },
];

export default function Process() {
  return (
    <section className="relative py-28 px-6 bg-[#0A0A0A] overflow-hidden">

      {/* GOLD GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[160px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[160px] rounded-full bottom-[-200px] right-[-200px]" />

      {/* HEADING */}
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white">
          How We Work
        </h2>
        <p className="text-gray-400 mt-4 text-lg">
          A refined process designed for consistent growth.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-6xl mx-auto">

        {/* CENTER LINE */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent transform -translate-x-1/2" />

        {/* STEPS */}
        <div className="space-y-16">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div
                key={i}
                className={`relative flex items-center ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* DOT */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#D4AF37] rounded-full z-20 shadow-lg shadow-[#D4AF37]/50" />

                {/* CARD */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{
                    rotateX: 8,
                    rotateY: isLeft ? -10 : 10,
                    scale: 1.05,
                  }}
                  className={`w-full md:w-[45%] p-8 rounded-3xl bg-[#111] border border-[#D4AF37]/20 shadow-2xl group relative overflow-hidden ${
                    isLeft ? "mr-auto" : "ml-auto"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >

                  {/* HOVER GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#D4AF37]/20" />

                  {/* NUMBER */}
                  <div className="mb-5 flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#D4AF37] text-black font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>

                  {/* TEXT */}
                  <p className="text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>

                  {/* BORDER GLOW */}
                  <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[#D4AF37]/40 transition pointer-events-none" />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}