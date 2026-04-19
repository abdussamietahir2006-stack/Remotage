"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import api from "@/lib/api";

interface Booking {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  preferredTime?: string;
  timezone?: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/bookings", { params: { status: filter === "all" ? undefined : filter, limit: 50 } });
      setBookings(res.data.data || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const markCompleted = async (id: string) => {
    try {
      await api.patch(`/api/bookings/${id}/status`, { status: "completed" });
      fetchBookings();
      setSelected(null);
    } catch {}
  };

  const deleteBooking = async (id: string) => {
    try {
      await api.delete(`/api/bookings/${id}`);
      setDeleteConfirm(null);
      setSelected(null);
      fetchBookings();
    } catch {}
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">All discovery call bookings</p>
        </div>
        <div className="flex items-center gap-2">
          {["all", "pending", "completed"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition capitalize ${filter === f ? "bg-[#D4AF37] text-black" : "border border-white/10 text-gray-400 hover:text-white"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: bookings.length, color: "text-white" },
          { label: "Pending", value: bookings.filter(b => b.status === "pending").length, color: "text-blue-400" },
          { label: "Completed", value: bookings.filter(b => b.status === "completed").length, color: "text-green-400" },
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
                {["Name", "Email", "Preferred Time", "Status", "Date", "Actions"].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-500 text-sm">Loading...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-500 text-sm">No bookings found.</td></tr>
              ) : bookings.map((booking, i) => (
                <motion.tr key={booking._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{booking.name}</p>
                    <p className="text-gray-500 text-xs">{booking.company || "—"}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{booking.email}</td>
                  <td className="px-6 py-4">
                    <p className="text-white text-sm">{booking.preferredTime || "—"}</p>
                    <p className="text-gray-500 text-xs">{booking.timezone || ""}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${booking.status === "pending" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(booking.createdAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(booking)}
                        className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition text-xs">View</button>
                      {booking.status === "pending" && (
                        <button onClick={() => markCompleted(booking._id)}
                          className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition text-xs">Done</button>
                      )}
                      <button onClick={() => setDeleteConfirm(booking._id)}
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
                <h3 className="text-white font-bold text-xl">Booking Details</h3>
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
                  { label: "Preferred Time", value: selected.preferredTime || "—" },
                  { label: "Timezone", value: selected.timezone || "—" },
                  { label: "Date", value: formatDate(selected.createdAt) },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="text-gray-500 text-sm">{item.label}</span>
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  </div>
                ))}
                {selected.notes && (
                  <div className="py-2">
                    <p className="text-gray-500 text-sm mb-2">Notes</p>
                    <p className="text-gray-300 text-sm leading-relaxed bg-[#0A0A0A] rounded-xl p-4">{selected.notes}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                {selected.status === "pending" && (
                  <button onClick={() => markCompleted(selected._id)}
                    className="flex-1 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-semibold text-sm hover:bg-green-500/30 transition">Mark Completed</button>
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
              <h3 className="text-white font-bold text-lg mb-2">Delete Booking?</h3>
              <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => deleteBooking(deleteConfirm)}
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