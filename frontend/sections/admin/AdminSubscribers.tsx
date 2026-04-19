"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import api from "@/lib/api";

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/subscribers", { params: { limit: 100 } });
      setSubscribers(res.data.data || []);
    } catch {
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubscribers(); }, []);

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteSubscriber = async (id: string) => {
    try {
      await api.delete(`/api/subscribers/${id}`);
      setDeleteConfirm(null);
      fetchSubscribers();
    } catch {}
  };

  const deleteAll = async () => {
    try {
      await api.delete("/api/subscribers");
      setDeleteAllConfirm(false);
      fetchSubscribers();
    } catch {}
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscribers</h1>
          <p className="text-gray-400 text-sm mt-1">Newsletter email subscribers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
            <span className="text-[#D4AF37] font-bold text-lg">{subscribers.length}</span>
            <span className="text-gray-400 text-sm ml-2">Total</span>
          </div>
          {subscribers.length > 0 && (
            <button onClick={() => setDeleteAllConfirm(true)}
              className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition text-xs font-medium">
              Delete All
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input type="text" placeholder="Search by email..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm" />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["#", "Email Address", "Subscribed On", "Actions"].map(h => (
                <th key={h} className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-widest font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-16 text-center text-gray-500 text-sm">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-16 text-center text-gray-500 text-sm">No subscribers found.</td></tr>
            ) : filtered.map((sub, i) => (
              <motion.tr key={sub._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                <td className="px-6 py-4 text-gray-500 text-sm">{i + 1}</td>
                <td className="px-6 py-4 text-white text-sm font-medium">{sub.email}</td>
                <td className="px-6 py-4 text-gray-400 text-sm">{formatDate(sub.createdAt)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${sub.email}`}
                      className="px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition text-xs">Email</a>
                    <button onClick={() => setDeleteConfirm(sub._id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition text-xs">Delete</button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111] border border-red-500/20 rounded-3xl p-8 max-w-sm w-full text-center">
              <h3 className="text-white font-bold text-lg mb-2">Delete Subscriber?</h3>
              <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => deleteSubscriber(deleteConfirm)}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition">Yes, Delete</button>
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition text-sm">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteAllConfirm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111] border border-red-500/20 rounded-3xl p-8 max-w-sm w-full text-center">
              <h3 className="text-white font-bold text-lg mb-2">Delete All Subscribers?</h3>
              <p className="text-gray-400 text-sm mb-6">This will permanently delete all {subscribers.length} subscribers.</p>
              <div className="flex gap-3">
                <button onClick={deleteAll}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition">Delete All</button>
                <button onClick={() => setDeleteAllConfirm(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition text-sm">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}