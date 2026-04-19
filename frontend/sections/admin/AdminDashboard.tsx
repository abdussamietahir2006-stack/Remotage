"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalBookings: number;
  pendingBookings: number;
  totalSubscribers: number;
  pagesManaged: number;
}

const quickLinks = [
  { label: "Edit Home Page", href: "/admin/dashboard/cms/home", desc: "Update hero text, services, stats" },
  { label: "Edit About Page", href: "/admin/dashboard/cms/about", desc: "Update team, story, mission" },
  { label: "Edit Services Page", href: "/admin/dashboard/cms/services", desc: "Update service details" },
  { label: "Edit Contact Page", href: "/admin/dashboard/cms/contact", desc: "Update contact info and FAQ" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/dashboard/stats")
      .then(res => setStats(res.data.data))
      .catch(() => setStats({
        totalLeads: 0, newLeads: 0,
        totalBookings: 0, pendingBookings: 0,
        totalSubscribers: 0, pagesManaged: 4,
      }))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Total Leads", value: stats?.totalLeads ?? 0, color: "from-[#D4AF37]/20 to-[#D4AF37]/5", border: "border-[#D4AF37]/30", href: "/admin/dashboard/leads" },
    { label: "Total Bookings", value: stats?.totalBookings ?? 0, color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", href: "/admin/dashboard/bookings" },
    { label: "Subscribers", value: stats?.totalSubscribers ?? 0, color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/30", href: "/admin/dashboard/subscribers" },
    { label: "Pages Managed", value: stats?.pagesManaged ?? 4, color: "from-green-500/20 to-green-500/5", border: "border-green-500/30", href: "/admin/dashboard/cms" },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-1">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">Admin</span>
        </h1>
        <p className="text-gray-400 text-sm">Here&apos;s what&apos;s happening with Remotage today.</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={stat.href}>
              <div className={`relative p-6 rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.color} bg-[#111] hover:scale-[1.02] transition-all duration-300 group cursor-pointer`}>
                <p className="text-4xl font-bold text-white mb-1">
                  {loading ? <span className="animate-pulse">—</span> : stat.value}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl border border-[#D4AF37]/15 bg-[#111] p-6">
        <h3 className="text-white font-semibold mb-5">Quick CMS Access</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, i) => (
            <Link key={i} href={link.href}>
              <div className="p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0A] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition group">
                <p className="text-white text-sm font-semibold mb-1 group-hover:text-[#D4AF37] transition">{link.label}</p>
                <p className="text-gray-500 text-xs">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}