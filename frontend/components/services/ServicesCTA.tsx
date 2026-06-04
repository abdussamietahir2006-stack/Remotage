"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesCTA() {
  return (
    <section className="py-28 px-6 bg-[#0D0D0D] relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[140px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#D4AF37_1px,transparent_1px),linear-gradient(to_right,#D4AF37_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-sm tracking-widest uppercase"
        >
          Get Started Today
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Ready to Scale with
          <br />
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            Your Remote Advantage?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
        >
          Book a free discovery call today and let us show you exactly how
          Remotage can transform your business operations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/contact">
            <button className="px-10 py-4 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-105 transition shadow-lg shadow-[#D4AF37]/20 text-lg">
              Book a Free Call
            </button>
          </Link>

          <Link href="/about">
            <button className="px-10 py-4 border border-[#D4AF37]/40 text-[#D4AF37] rounded-xl hover:bg-[#D4AF37]/10 transition text-lg">
              Learn About Us
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}