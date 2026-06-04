"use client";

import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
  images?:  Record<string, string>;
}

export default function AboutTeam({ content = {}, images = {} }: Props) {
  const team = [
    {
      name:     content.member1Name  || "Mashood Tahir",
      role:     content.member1Role  || "Founder & CEO",
      bio:      content.member1Bio   || "Visionary entrepreneur with a passion for building remote-first businesses that deliver real results for clients worldwide.",
      image:    images.member1Photo  || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name:     content.member2Name  || "Sarah Mitchell",
      role:     content.member2Role  || "Head of Operations",
      bio:      content.member2Bio   || "Operations expert with 8+ years scaling remote teams. Ensures every client gets seamless onboarding and consistent delivery.",
      image:    images.member2Photo  || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      linkedin: "#",
    },
  ];

  return (
    <section className="py-28 px-6 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm tracking-widest uppercase">The People Behind It</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3">
            Meet the{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">A small but mighty team obsessed with helping businesses grow through smart remote execution.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.7 }} viewport={{ once: true }} whileHover={{ y: -8 }} className="relative rounded-3xl border border-[#D4AF37]/20 bg-[#111] overflow-hidden group">
              <div className="relative h-72 overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/20 to-transparent" />
              </div>
              <div className="relative p-7">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition">{member.name}</h3>
                <p className="text-[#D4AF37] text-sm font-medium tracking-wide mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{member.bio}</p>
                <a href={member.linkedin} className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-[#D4AF37] transition border border-white/10 hover:border-[#D4AF37]/40 px-4 py-2 rounded-lg">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn Profile
                </a>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                <span className="text-[#D4AF37] text-xs font-bold">0{i + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}