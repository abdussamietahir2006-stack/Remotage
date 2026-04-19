"use client";

import AdminSidebar from "@/sections/admin/AdminSidebar";
import AdminHeader from "@/sections/admin/AdminHeader";
import AdminCMS from "@/sections/admin/AdminCMS";

export default function CMSPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="pt-16 p-8">
          <AdminCMS />
        </main>
      </div>
    </div>
  );
}