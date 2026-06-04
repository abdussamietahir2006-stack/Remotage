"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Leads",
    href: "/admin/dashboard/leads",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Bookings",
    href: "/admin/dashboard/bookings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Subscribers",
    href: "/admin/dashboard/subscribers",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "CMS",
    href: "/admin/dashboard/cms",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    submenu: [
      { label: "Home Page", href: "/admin/dashboard/cms/home" },
      { label: "About Page", href: "/admin/dashboard/cms/about" },
      { label: "Services Page", href: "/admin/dashboard/cms/services" },
      { label: "Contact Page", href: "/admin/dashboard/cms/contact" },
      { label: "Navbar", href: "/admin/dashboard/cms/navbar" },
      { label: "Footer", href: "/admin/dashboard/cms/footer" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [cmsOpen, setCmsOpen] = useState(pathname?.startsWith("/admin/dashboard/cms"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0D0D0D] border-r border-[#D4AF37]/10 flex flex-col z-40">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#D4AF37]/10">
        <h1 className="text-xl font-bold tracking-widest">
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            REMOTAGE
          </span>
        </h1>
        <p className="text-gray-600 text-xs tracking-widest mt-0.5">ADMIN PANEL</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const hasSub = item.submenu && item.submenu.length > 0;

          return (
            <div key={i}>
              {hasSub ? (
                <button
                  onClick={() => setCmsOpen(!cmsOpen)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${cmsOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    pathname === item.href
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}

              {/* Submenu */}
              {hasSub && cmsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-4 mt-1 space-y-1 border-l border-[#D4AF37]/10 pl-4"
                >
                  {item.submenu!.map((sub, j) => (
                    <Link
                      key={j}
                      href={sub.href}
                      className={`block px-3 py-2 rounded-lg text-xs font-medium transition ${
                        pathname === sub.href
                          ? "text-[#D4AF37] bg-[#D4AF37]/10"
                          : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom — logout */}
      <div className="px-4 py-6 border-t border-[#D4AF37]/10">
        <div className="flex items-center gap-3 px-4 py-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
            <span className="text-[#D4AF37] text-xs font-bold">A</span>
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Admin</p>
            <p className="text-gray-500 text-xs">mashood.tahir@remotage.com</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}