"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";

interface Props {
  content?: Record<string, string>;
}

export default function Newsletter({ content = {} }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const heading = content.newsletterHeading || "Stay Updated";
  const subtext  = content.newsletterSubtext  || "Get insights, strategies, and updates to grow your business.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setMessage("Please enter your email."); return; }
    setLoading(true);
    try {
      await api.post("/api/subscribers", { email });
      setMessage("Subscribed successfully!");
      setEmail("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            {heading}
          </span>
        </motion.h2>
        <p className="text-gray-400 mb-10">{subtext}</p>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full md:w-2/3 px-6 py-3 rounded-xl bg-black border border-[#D4AF37]/30 text-white focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-105 transition shadow-lg shadow-[#D4AF37]/20 disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </motion.form>
        {message && <p className="mt-6 text-sm text-[#D4AF37]">{message}</p>}
      </div>
    </section>
  );
}