"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const pages = [
  {
    title: "Home Page",
    href: "/admin/dashboard/cms/home",
    desc: "Edit hero text, slogan, services list, stats, testimonials and newsletter section.",
    fields: ["Hero Heading", "Hero Subtext", "Stats", "Services", "Testimonials"],
    color: "border-[#D4AF37]/30",
    glow: "bg-[#D4AF37]/5",
  },
  {
    title: "About Page",
    href: "/admin/dashboard/cms/about",
    desc: "Edit company story, mission, vision, team members and core values.",
    fields: ["Story Text", "Mission", "Vision", "Team Members", "Values"],
    color: "border-blue-500/30",
    glow: "bg-blue-500/5",
  },
  {
    title: "Services Page",
    href: "/admin/dashboard/cms/services",
    desc: "Edit all service titles, descriptions and bullet points.",
    fields: ["Service Names", "Descriptions", "Bullet Points", "CTA Text"],
    color: "border-purple-500/30",
    glow: "bg-purple-500/5",
  },
  {
    title: "Contact Page",
    href: "/admin/dashboard/cms/contact",
    desc: "Edit contact info, FAQ questions and booking availability.",
    fields: ["Phone", "Email", "FAQ Items", "Office Hours"],
    color: "border-green-500/30",
    glow: "bg-green-500/5",
  },
  {
    title: "Navbar",
    href: "/admin/dashboard/cms/navbar",
    desc: "Edit logo text, navigation links and CTA button.",
    fields: ["Logo", "Nav Links", "CTA Button"],
    color: "border-orange-500/30",
    glow: "bg-orange-500/5",
  },
  {
    title: "Blog Posts",
    href: "/admin/dashboard/cms/blog",
    desc: "Create, edit, delete and publish blog articles with full SEO settings.",
    fields: ["Blog Titles", "Keywords", "Draft/Publish Status", "SEO Settings"],
    color: "border-red-500/30",
    glow: "bg-red-500/5",
  },
  {
    title: "Footer",
    href: "/admin/dashboard/cms/footer",
    desc: "Edit footer description, contact info, links and social media URLs.",
    fields: ["Logo", "Contact Info", "Quick Links", "Social URLs", "Copyright"],
    color: "border-pink-500/30",
    glow: "bg-pink-500/5",
  },
];

export default function AdminCMS() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Content Management</h1>
        <p className="text-gray-400 text-sm mt-1">
          Select a page to edit its content
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {pages.map((page, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={page.href}>
              <div className={`relative p-7 rounded-2xl border ${page.color} ${page.glow} bg-[#111] hover:scale-[1.02] transition-all duration-300 group cursor-pointer overflow-hidden`}>

                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-white font-bold text-lg group-hover:text-[#D4AF37] transition">
                    {page.title}
                  </h3>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-[#D4AF37] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>

                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{page.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {page.fields.map((field, j) => (
                    <span key={j} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 text-xs">
                      {field}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}