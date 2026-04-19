"use client";

import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
}

export default function AboutMissionVision({ content = {} }: Props) {
  const missionHeading = content.missionHeading || "Empowering Businesses to Scale Without Limits";
  const missionText    = content.missionText    || "Our mission is to give every business — regardless of size — access to world-class remote talent that drives real growth.";
  const visionHeading  = content.visionHeading  || "The Global Standard for Remote Business Excellence";
  const visionText     = content.visionText     || "We envision a world where geography is never a barrier to business success.";

  return (
    <section className="py-28 px-6 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm tracking-widest uppercase">What Drives Us</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3">
            Mission &{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">Vision</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="relative rounded-3xl border border-[#D4AF37]/25 bg-[#111] p-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-semibold mb-3 block">Our Mission</span>
              <h3 className="text-2xl font-bold text-white mb-4">{missionHeading}</h3>
              <p className="text-gray-400 leading-relaxed">{missionText}</p>
              <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-[#D4AF37]/40 via-[#F5E6A3]/20 to-transparent" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="relative rounded-3xl border border-[#D4AF37]/25 bg-[#111] p-10 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-semibold mb-3 block">Our Vision</span>
              <h3 className="text-2xl font-bold text-white mb-4">{visionHeading}</h3>
              <p className="text-gray-400 leading-relaxed">{visionText}</p>
              <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-[#D4AF37]/40 via-[#F5E6A3]/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}