"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard Overview",
  "/admin/dashboard/leads": "Leads",
  "/admin/dashboard/bookings": "Bookings",
  "/admin/dashboard/subscribers": "Subscribers",
  "/admin/dashboard/cms": "Content Management",
  "/admin/dashboard/cms/home": "CMS — Home Page",
  "/admin/dashboard/cms/about": "CMS — About Page",
  "/admin/dashboard/cms/services": "CMS — Services Page",
  "/admin/dashboard/cms/contact": "CMS — Contact Page",
  "/admin/dashboard/cms/navbar": "CMS — Navbar",
  "/admin/dashboard/cms/footer": "CMS — Footer",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Admin Dashboard";

  return (
    <header className="h-16 bg-[#0D0D0D] border-b border-[#D4AF37]/10 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-30">
      <div>
        <h2 className="text-white font-semibold text-lg">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-400/10 border border-green-400/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">Live</span>
        </div>

        {/* Date */}
        <span className="text-gray-500 text-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </header>
  );
}