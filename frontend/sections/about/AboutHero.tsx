"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center text-center px-6 bg-[#0A0A0A] overflow-hidden pt-24">

      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[160px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[160px] rounded-full bottom-[-200px] right-[-200px]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#D4AF37_1px,transparent_1px),linear-gradient(to_right,#D4AF37_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-sm tracking-widest uppercase"
        >
          Our Story
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white/20">We Are</span>
          <br />
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            Remotage
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
        >
          A remote-first team built to give businesses the advantage they need
          to scale — faster, smarter, and without the overhead.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/contact"
            className="px-8 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-105 transition inline-block text-sm tracking-wide"
          >
            Work With Us
          </Link>
          <Link
            href="/services"
            className="px-8 py-3 border border-[#D4AF37]/40 text-[#D4AF37] rounded-xl hover:bg-[#D4AF37]/10 transition inline-block text-sm"
          >
            Our Services
          </Link>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 h-[1px] max-w-xs mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
        />
      </div>
    </section>
  );
}