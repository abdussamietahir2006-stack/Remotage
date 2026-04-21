"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "@/lib/api";

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalBookings: number;
  pendingBookings: number;
  totalSubscribers: number;
  pagesManaged: number;
}

interface ChartDay {
  label: string;
  leads: number;
  bookings: number;
  subscribers: number;
  isToday: boolean;
}

const quickLinks = [
  { label: "Edit Home Page",     href: "/admin/dashboard/cms/home",     desc: "Update hero text, services, stats" },
  { label: "Edit About Page",    href: "/admin/dashboard/cms/about",    desc: "Update team, story, mission" },
  { label: "Edit Services Page", href: "/admin/dashboard/cms/services", desc: "Update service details" },
  { label: "Edit Contact Page",  href: "/admin/dashboard/cms/contact",  desc: "Update contact info and FAQ" },
];

// Custom tooltip styled to match the dark gold theme
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111] border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-[#D4AF37] text-xs font-semibold mb-2">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats]       = useState<Stats | null>(null);
  const [chartData, setChartData] = useState<ChartDay[]>([]);
  const [loadingStats, setLoadingStats]   = useState(true);
  const [loadingChart, setLoadingChart]   = useState(true);

  useEffect(() => {
    api
      .get("/api/dashboard/stats")
      .then((res) => setStats(res.data.data))
      .catch(() =>
        setStats({
          totalLeads: 0, newLeads: 0,
          totalBookings: 0, pendingBookings: 0,
          totalSubscribers: 0, pagesManaged: 4,
        })
      )
      .finally(() => setLoadingStats(false));

    api
      .get("/api/dashboard/weekly-chart")
      .then((res) => setChartData(res.data.data))
      .catch(() => setChartData([]))
      .finally(() => setLoadingChart(false));
  }, []);

  const statCards = [
    {
      label: "Total Leads",
      value: stats?.totalLeads ?? 0,
      sub: `${stats?.newLeads ?? 0} new`,
      color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
      border: "border-[#D4AF37]/30",
      href: "/admin/dashboard/leads",
    },
    {
      label: "Total Bookings",
      value: stats?.totalBookings ?? 0,
      sub: `${stats?.pendingBookings ?? 0} pending`,
      color: "from-blue-500/20 to-blue-500/5",
      border: "border-blue-500/30",
      href: "/admin/dashboard/bookings",
    },
    {
      label: "Subscribers",
      value: stats?.totalSubscribers ?? 0,
      sub: "newsletter",
      color: "from-purple-500/20 to-purple-500/5",
      border: "border-purple-500/30",
      href: "/admin/dashboard/subscribers",
    },
    {
      label: "Pages Managed",
      value: stats?.pagesManaged ?? 4,
      sub: "via CMS",
      color: "from-green-500/20 to-green-500/5",
      border: "border-green-500/30",
      href: "/admin/dashboard/cms",
    },
  ];

  // Format X-axis labels shorter for small bars
  const formatXAxis = (label: string) => {
    const parts = label.split(", ");
    return parts[0]; // just "Mon", "Tue", etc.
  };

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            Admin
          </span>
        </h1>
        <p className="text-gray-400 text-sm">
          Here&apos;s what&apos;s happening with Remotage today.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={stat.href}>
              <div
                className={`relative p-6 rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.color} bg-[#111] hover:scale-[1.02] transition-all duration-300 group cursor-pointer`}
              >
                <p className="text-4xl font-bold text-white mb-1">
                  {loadingStats ? (
                    <span className="animate-pulse text-gray-600">—</span>
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-gray-600 text-xs mt-1">{stat.sub}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 7-Day Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl border border-white/[0.06] bg-[#111] p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg">Weekly Activity</h3>
            <p className="text-gray-500 text-xs mt-0.5">
                Leads, bookings, and subscribers over the past 7 days
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-3 rounded-sm bg-[#D4AF37] inline-block" />
              Leads
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-3 rounded-sm bg-[#1F2937] inline-block" />
              Bookings
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-3 rounded-sm bg-[#FFFFFF] inline-block" />
              Subscribers
            </span>
          </div>
        </div>

        {loadingChart ? (
          <div className="h-[280px] flex items-center justify-center">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#D4AF37]/40 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={chartData}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              barCategoryGap="30%"
              barGap={3}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tickFormatter={formatXAxis}
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />

              <Bar
                dataKey="leads"
                name="Leads"
                fill="#D4AF37"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="bookings"
                name="Bookings"
                fill="#1F2937"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="subscribers"
                name="Subscribers"
                fill="#FFFFFF"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Today indicator */}
        {!loadingChart && chartData.length > 0 && (
          <p className="text-center text-gray-600 text-xs mt-3">
            Today is{" "}
            <span className="text-[#D4AF37]">
              {chartData.find((d) => d.isToday)?.label ?? "—"}
            </span>
          </p>
        )}
      </motion.div>

      {/* Quick CMS Access */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="rounded-2xl border border-[#D4AF37]/15 bg-[#111] p-6"
      >
        <h3 className="text-white font-semibold mb-5">Quick CMS Access</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, i) => (
            <Link key={i} href={link.href}>
              <div className="p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0A] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition group">
                <p className="text-white text-sm font-semibold mb-1 group-hover:text-[#D4AF37] transition">
                  {link.label}
                </p>
                <p className="text-gray-500 text-xs">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}