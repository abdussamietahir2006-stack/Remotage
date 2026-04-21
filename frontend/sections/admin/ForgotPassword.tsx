"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await api.post("/api/auth/forgot-password", { email });
      setStatus("sent");
      setMessage("Check your email for the reset link (or check the backend console for testing).");
      // For testing: get token from response
      if (res.data.data?.resetToken) {
        setResetToken(res.data.data.resetToken);
      }
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Error sending reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 overflow-hidden relative">
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/8 blur-[160px] rounded-full top-[-200px] left-[-200px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/8 blur-[160px] rounded-full bottom-[-200px] right-[-200px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#D4AF37_1px,transparent_1px),linear-gradient(to_right,#D4AF37_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold tracking-widest mb-2">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              REMOTAGE
            </span>
          </h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase">Reset Password</p>
        </motion.div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111] p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-1">Forgot Password?</h2>
          <p className="text-gray-400 text-sm mb-8">
            Enter your email and we'll send you a password reset link.
          </p>

          {status === "sent" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3 mb-6"
            >
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{message}</span>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 mb-6"
            >
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{message}</span>
            </motion.div>
          )}

          {status !== "sent" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 tracking-wide uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="mashood.tahir@remotage.com"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-[1.02] active:scale-[0.99] transition disabled:opacity-60 disabled:scale-100 text-sm tracking-wide"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link →"
                )}
              </button>
            </form>
          )}

          {status === "sent" && resetToken && (
            <div className="mt-6 p-4 rounded-lg bg-[#0A0A0A] border border-white/10">
              <p className="text-gray-400 text-xs mb-2">Testing only - Reset link:</p>
              <Link href={`/admin/reset-password?token=${resetToken}&email=${email}`}>
                <p className="text-[#D4AF37] text-xs break-all hover:underline">
                  Click here to reset password
                </p>
              </Link>
            </div>
          )}

          <p className="text-center text-gray-600 text-xs mt-6">
            Check backend console or email for reset link
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/admin" className="text-gray-500 hover:text-[#D4AF37] transition text-sm">
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}