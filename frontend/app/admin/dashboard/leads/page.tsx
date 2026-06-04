"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminLeads from "@/components/admin/AdminLeads";

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="pt-16 p-8">
          <AdminLeads />
        </main>
      </div>
    </div>
  );
}