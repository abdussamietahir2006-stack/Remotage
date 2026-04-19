"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
  images?:  Record<string, string>;
}

export default function Hero({ content = {}, images = {} }: Props) {
  const heading = content.heroHeading || "Your Remote Advantage";
  const subtext  = content.heroSubtext  || "Scale faster with expert-led digital services, automation, and remote execution.";

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-[#0A0A0A] overflow-hidden">

      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[160px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[160px] rounded-full bottom-[-200px] right-[-200px]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#D4AF37_1px,transparent_1px),linear-gradient(to_right,#D4AF37_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* FLYING BIRD */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        animate={{ x: [100,300,500,420,250,80,100], y: [60,20,140,280,320,160,60] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          animate={{ scaleX: [1,1,1,-1,-1,-1,1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", times: [0,0.3,0.45,0.5,0.8,0.95,1] }}
        >
          <svg width="220" height="220" viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bodyG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1B4F8A" />
                <stop offset="60%" stopColor="#1A3F72" />
                <stop offset="100%" stopColor="#0F2A50" />
              </linearGradient>
              <linearGradient id="wingG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2460A7" />
                <stop offset="100%" stopColor="#173868" />
              </linearGradient>
              <linearGradient id="wingTipG" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1A3F72" />
                <stop offset="100%" stopColor="#0A1F40" />
              </linearGradient>
              <linearGradient id="goldG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8860B" />
                <stop offset="40%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#F5E6A3" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
              <linearGradient id="sheenG" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4A90D9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.g animate={{ rotate: [-25,15,-25] }} transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "148px 148px" }}>
              <path d="M 148 148 C 120 145, 80 130, 48 112 C 30 102, 18 92, 22 80 C 30 65, 55 72, 75 85 C 95 98, 118 118, 148 148 Z" fill="url(#wingG)" />
              <path d="M 48 112 C 32 108, 16 100, 10 88 C 8 82, 14 74, 22 80 Z" fill="url(#wingTipG)" />
            </motion.g>
            <path d="M 100 162 C 78 168, 55 178, 38 195 C 34 200, 36 205, 42 202 C 55 196, 72 186, 92 180 Z" fill="url(#wingG)" />
            <path d="M 118 166 C 100 178, 84 195, 72 215 C 69 221, 73 224, 79 219 C 92 208, 108 192, 122 175 Z" fill="url(#wingG)" opacity="0.9" />
            <ellipse cx="155" cy="152" rx="52" ry="30" fill="url(#bodyG)" transform="rotate(-18, 155, 152)" />
            <ellipse cx="155" cy="142" rx="38" ry="14" fill="url(#sheenG)" transform="rotate(-18, 155, 142)" />
            <circle cx="198" cy="112" r="28" fill="url(#bodyG)" />
            <ellipse cx="192" cy="102" rx="16" ry="10" fill="url(#sheenG)" transform="rotate(-20,192,102)" />
            <circle cx="208" cy="106" r="7" fill="white" />
            <circle cx="209" cy="106" r="5" fill="#1a1a2e" />
            <circle cx="209" cy="106" r="3" fill="#2E4A8A" />
            <circle cx="210" cy="106" r="1.8" fill="#050510" />
            <circle cx="211" cy="104" r="1" fill="white" />
            <path d="M 222 109 C 235 106, 248 105, 252 108 C 248 112, 235 113, 222 114 Z" fill="url(#goldG)" />
            <path d="M 222 114 C 234 113, 246 114, 250 117 C 244 119, 232 118, 222 116 Z" fill="#B8860B" />
            <path d="M 185 128 C 192 145, 175 162, 158 168" stroke="url(#goldG)" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9" />
            <motion.g animate={{ rotate: [-22,18,-22] }} transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "170px 138px" }}>
              <path d="M 170 138 C 155 118, 138 95, 120 75 C 108 60, 95 50, 85 55 C 72 62, 78 80, 92 95 C 110 114, 138 130, 170 138 Z" fill="url(#wingG)" />
              <path d="M 90 58 C 78 50, 65 48, 60 56 C 58 62, 66 70, 78 72 Z" fill="url(#wingTipG)" />
              <path d="M 108 68 C 98 58, 86 56, 83 64 C 81 70, 90 78, 102 79 Z" fill="url(#wingTipG)" opacity="0.7" />
            </motion.g>
            <motion.circle cx="196" cy="78" r="3.5" fill="#D4AF37" animate={{ opacity: [0.5,1,0.5] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0 }} />
            <motion.path d="M 180 70 Q 196 56 212 70" stroke="#D4AF37" strokeWidth="3" fill="none" strokeLinecap="round" animate={{ opacity: [0.15,1,0.15] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.22 }} />
            <motion.path d="M 168 58 Q 196 38 224 58" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" animate={{ opacity: [0.08,0.8,0.08] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.44 }} />
            <motion.path d="M 156 46 Q 196 20 236 46" stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round" animate={{ opacity: [0.04,0.55,0.04] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.66 }} />
          </svg>
        </motion.div>
      </motion.div>

      <div className="relative z-20 grid md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white/20">Your</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              {heading.replace("Your Remote Advantage", "Remote Advantage").replace("Your ", "") || "Remote Advantage"}
            </span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-lg">{subtext}</p>
          <div className="mt-10 flex gap-4 flex-wrap">
            <Link href="/contact">
              <button className="px-8 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-105 transition">
                Book a Call
              </button>
            </Link>
            <Link href="/services">
              <button className="px-8 py-3 border border-[#D4AF37]/40 text-[#D4AF37] rounded-xl hover:bg-[#D4AF37]/10 transition">
                Explore Services
              </button>
            </Link>
          </div>
        </div>
        <div className="hidden md:block h-[420px]" />
      </div>
    </section>
  );
}