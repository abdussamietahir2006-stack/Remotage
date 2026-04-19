"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import api from "@/lib/api";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  status: string;
  source: string;
  createdAt: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/leads", { params: { status: filter === "all" ? undefined : filter, limit: 50 } });
      setLeads(res.data.data || []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, [filter]);

  const markContacted = async (id: string) => {
    try {
      await api.patch(`/api/leads/${id}/status`, { status: "contacted" });
      fetchLeads();
      setSelected(null);
    } catch {}
  };

  const deleteLead = async (id: string) => {
    try {
      await api.delete(`/api/leads/${id}`);
      setDeleteConfirm(null);
      setSelected(null);
      fetchLeads();
    } catch {}
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-gray-400 text-sm mt-1">All contact form submissions</p>
        </div>
        <div className="flex items-center gap-2">
          {["all", "new", "contacted"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition capitalize ${filter === f ? "bg-[#D4AF37] text-black" : "border border-white/10 text-gray-400 hover:text-white"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: leads.length, color: "text-white" },
          { label: "New", value: leads.filter(l => l.status === "new").length, color: "text-[#D4AF37]" },
          { label: "Contacted", value: leads.filter(l => l.status === "contacted").length, color: "text-green-400" },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/[0.06] bg-[#111] text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Name", "Email", "Service", "Date", "Status", "Actions"].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-500 text-sm">Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-500 text-sm">No leads found.</td></tr>
              ) : leads.map((lead, i) => (
                <motion.tr key={lead._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{lead.name}</p>
                    <p className="text-gray-500 text-xs">{lead.company || "—"}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{lead.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-medium">
                      {lead.source || "contact_form"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(lead.createdAt)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${lead.status === "new" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(lead)}
                        className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition text-xs">View</button>
                      {lead.status === "new" && (
                        <button onClick={() => markContacted(lead._id)}
                          className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition text-xs">Contacted</button>
                      )}
                      <button onClick={() => setDeleteConfirm(lead._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition text-xs">Delete</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111] border border-[#D4AF37]/20 rounded-3xl p-8 max-w-lg w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">Lead Details</h3>
                <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Name", value: selected.name },
                  { label: "Email", value: selected.email },
                  { label: "Company", value: selected.company || "—" },
                  { label: "Phone", value: selected.phone || "—" },
                  { label: "Source", value: selected.source },
                  { label: "Date", value: formatDate(selected.createdAt) },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="text-gray-500 text-sm">{item.label}</span>
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  </div>
                ))}
                <div className="py-2">
                  <p className="text-gray-500 text-sm mb-2">Message</p>
                  <p className="text-gray-300 text-sm leading-relaxed bg-[#0A0A0A] rounded-xl p-4">{selected.message}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                {selected.status === "new" && (
                  <button onClick={() => markContacted(selected._id)}
                    className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold text-sm hover:scale-[1.02] transition">
                    Mark as Contacted
                  </button>
                )}
                <button onClick={() => { setSelected(null); setDeleteConfirm(selected._id); }}
                  className="flex-1 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition">Delete</button>
                <button onClick={() => setSelected(null)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition text-sm">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111] border border-red-500/20 rounded-3xl p-8 max-w-sm w-full text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Delete Lead?</h3>
              <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => deleteLead(deleteConfirm)}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition">Yes, Delete</button>
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition text-sm">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}