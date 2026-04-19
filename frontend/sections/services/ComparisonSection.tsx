"use client";

import { motion } from "framer-motion";

const remotageFeatures = [
  "Half the cost — Save $30k yearly per assistant",
  "Calendar optimization and efficient scheduling",
  "Content Calendar Planning — strategic posting schedule",
  "Regular Reporting and Analytics with strategy adjustments",
  "Social Media Posting — engaging posts and reels",
  "Targeted Advertising Campaigns on Facebook and Instagram",
  "Lead Generation Ads to capture potential clients",
  "Email Management — organized correspondence",
  "Client Follow-Up and Engagement beyond transactions",
  "CRM Management — set up and manage client systems",
  "Real Estate Property Showcasing and promotion",
];

const diyProblems = [
  "Inconsistent branding across social media platforms",
  "Manually planning and scheduling posts",
  "Developing engaging content without expertise",
  "Unable to respond to comments and messages effectively",
  "Failing to capture leads through social media",
  "Not re-engaging users who showed interest",
  "Limited support channels for clients",
  "Disorganized email management",
  "Inefficient use of CRM software",
  "Ineffective lead qualification process",
  "Poor property showcasing",
];

const realEstateFeatures = [
  { icon: "📞", title: "Calling FSBO", desc: "Reach out to property owners directly" },
  { icon: "🔄", title: "Expired Leads", desc: "Contact and revive lapsed listings" },
  { icon: "🎯", title: "Lead Qualification", desc: "Assess and qualify high-value leads" },
  { icon: "🔍", title: "Prospecting", desc: "Identify and reach potential clients" },
  { icon: "📣", title: "Cold Calling", desc: "Outreach campaigns to new prospects" },
  { icon: "📅", title: "Appointment Setting", desc: "Book meetings with prospective clients" },
  { icon: "📊", title: "Pipeline Management", desc: "Track and manage your sales pipeline" },
  { icon: "🏠", title: "Event Promotion", desc: "Promote open houses and real estate events" },
];

export default function ComparisonSection() {
  return (
    <section className="py-28 px-6 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── HEADING ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-sm tracking-widest uppercase"
          >
            The Difference
          </motion.span>

          <h2 className="text-5xl md:text-7xl font-bold text-white mt-2 mb-5 leading-tight">
            Remotage{" "}
            <span className="text-white/20">vs</span>
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              Do It Yourself
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See the clear difference between scaling with Remotage versus
            doing it all yourself.
          </p>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 h-[1px] max-w-xs mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          />
        </motion.div>

        {/* ── COMPARISON CARDS ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* REMOTAGE COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border border-[#D4AF37]/30 bg-[#111] p-8 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center gap-4 mb-8 pb-6 border-b border-[#D4AF37]/15">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-2xl bg-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#D4AF37]/20"
              >
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-[#D4AF37]">Remotage</h3>
                <p className="text-gray-500 text-xs tracking-wide">What you get with us</p>
              </div>
              <div className="ml-auto px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold">
                ✓ Recommended
              </div>
            </div>

            <ul className="relative space-y-3">
              {remotageFeatures.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-gray-300 text-sm group/item"
                >
                  <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center group-hover/item:bg-[#D4AF37]/20 transition">
                    <svg className="w-2.5 h-2.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="group-hover/item:text-white transition">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* DIY COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border border-red-900/30 bg-[#111] p-8 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center gap-4 mb-8 pb-6 border-b border-red-900/20">
              <div className="w-12 h-12 rounded-2xl bg-red-900/30 border border-red-700/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-400">Do It Yourself</h3>
                <p className="text-gray-500 text-xs tracking-wide">Common struggles without us</p>
              </div>
              <div className="ml-auto px-3 py-1 rounded-full bg-red-900/20 border border-red-800/30 text-red-400 text-xs font-semibold">
                ✗ Not Scalable
              </div>
            </div>

            <ul className="relative space-y-3">
              {diyProblems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-gray-500 text-sm"
                >
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500/50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="line-through decoration-red-900/50">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── VS BADGE ── */}
        <div className="flex items-center justify-center -mt-2 mb-16 relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-14 h-14 rounded-full bg-[#0A0A0A] border-2 border-[#D4AF37]/40 flex items-center justify-center shadow-xl"
          >
            <span className="text-[#D4AF37] font-black text-sm tracking-widest">VS</span>
          </motion.div>
        </div>

        {/* ── REAL ESTATE SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-[#D4AF37]/30 bg-[#111] p-10 overflow-hidden"
        >
          {/* Background glow orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#D4AF37_1px,transparent_1px),linear-gradient(to_right,#D4AF37_1px,transparent_1px)] bg-[size:40px_40px] rounded-3xl" />

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-xs tracking-widest uppercase font-semibold">
              Exclusively for Real Estate Agents
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative mb-10"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Built for{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
                Real Estate Agents
              </span>
            </h3>
            <p className="text-gray-400 max-w-xl">
              Specialized services designed to help agents close more deals,
              fill their pipeline, and scale faster.
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <div className="relative grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {realEstateFeatures.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative p-5 rounded-2xl bg-[#0A0A0A] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-300 group overflow-hidden"
              >
                {/* Card glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-2xl" />

                <div className="relative">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#D4AF37] transition">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-400 transition">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative mt-10 pt-8 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-gray-400 text-sm">
              Ready to close more deals with less effort?
            </p>
            <a
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold text-sm hover:scale-[1.03] transition tracking-wide"
            >
              Get Started for Real Estate →
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}