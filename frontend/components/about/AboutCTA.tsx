"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="py-28 px-6 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-[#D4AF37]/25 bg-[#111] p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Glows */}
          <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/8 blur-[120px] rounded-full top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] bg-[#D4AF37]/5 blur-[80px] rounded-full bottom-[-100px] right-[-100px] pointer-events-none" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#D4AF37_1px,transparent_1px),linear-gradient(to_right,#D4AF37_1px,transparent_1px)] bg-[size:40px_40px] rounded-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-6 px-5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-sm tracking-widest uppercase"
            >
              Ready to Scale?
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              Let&apos;s Build Something
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
                Great Together
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
              Join 150+ businesses already scaling smarter with Remotage.
              Book a free discovery call today — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-[1.03] transition text-sm tracking-wide inline-block"
              >
                Book a Free Call →
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] font-semibold hover:bg-[#D4AF37]/10 transition text-sm inline-block"
              >
                View Our Services
              </Link>
            </div>

            <p className="text-gray-600 text-xs mt-6">
              No commitment. No credit card. Just results.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}