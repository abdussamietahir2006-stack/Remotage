"use client";

import AdminSidebar from "@/sections/admin/AdminSidebar";
import AdminHeader from "@/sections/admin/AdminHeader";
import CMSHome from "@/sections/admin/cms/CMSHome";

export default function CMSHomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="pt-16 p-8">
          <CMSHome />
        </main>
      </div>
    </div>
  );
}