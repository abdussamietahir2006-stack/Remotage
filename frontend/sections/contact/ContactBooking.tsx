"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ── helpers ──────────────────────────────────────────
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

type BookingStatus = "idle" | "loading" | "success" | "error";

export default function ContactBooking() {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1); // 1 = pick date/time, 2 = fill form

  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", notes: "" });
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");

  // ── calendar logic ──
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
    setSelectedDate(null); setSelectedTime(null);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
    setSelectedDate(null); setSelectedTime(null);
  };

  const isDisabled = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const dow = d.getDay();
    return d < new Date(today.setHours(0,0,0,0)) || dow === 0; // past or Sunday
  };

  const isSelected = (day: number) =>
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === currentMonth &&
    selectedDate?.getFullYear() === currentYear;

  const handleDayClick = (day: number) => {
    if (isDisabled(day)) return;
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setSelectedTime(null);
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;
    setStep(2);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setBookingStatus("loading");

    const dateStr = selectedDate.toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          preferredTime: `${dateStr} at ${selectedTime}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error();
      setBookingStatus("success");
    } catch {
      setBookingStatus("error");
    }
  };

  return (
    <section className="py-24 px-6 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm tracking-widest uppercase">Free Discovery Call</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
            Book a{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              Call
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Pick a date and time that works for you. 15 minutes, no pressure, no commitment.
          </p>
        </motion.div>

        {bookingStatus === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center py-16 rounded-3xl border border-[#D4AF37]/30 bg-[#111] px-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-9 h-9 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-3">You&apos;re Booked!</h3>
            <p className="text-gray-400 mb-2">
              Your discovery call is confirmed for:
            </p>
            <p className="text-[#D4AF37] font-semibold text-lg mb-6">
              {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
            </p>
            <p className="text-gray-500 text-sm mb-8">
              A confirmation will be sent to <span className="text-gray-300">{form.email}</span>. We look forward to speaking with you.
            </p>
            <button
              onClick={() => { setBookingStatus("idle"); setStep(1); setSelectedDate(null); setSelectedTime(null); setForm({ name:"", email:"", company:"", phone:"", notes:"" }); }}
              className="px-6 py-2.5 border border-[#D4AF37]/40 text-[#D4AF37] rounded-xl hover:bg-[#D4AF37]/10 transition text-sm"
            >
              Book Another Call
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">

            {/* ── STEP 1: CALENDAR + TIME ── */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-[#D4AF37]/20 bg-[#111] p-6 md:p-8"
            >
              {/* Month nav */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-white font-semibold">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </h3>
                <button
                  onClick={nextMonth}
                  className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day labels */}
              <div className="grid grid-cols-7 mb-2">
                {DAY_NAMES.map(d => (
                  <div key={d} className="text-center text-xs text-gray-600 py-1 font-medium tracking-wide">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const disabled = isDisabled(day);
                  const selected = isSelected(day);
                  const isToday =
                    day === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear();

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      disabled={disabled}
                      className={`
                        relative h-9 w-full rounded-lg text-sm font-medium transition
                        ${disabled ? "text-gray-700 cursor-not-allowed" : "hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] cursor-pointer"}
                        ${selected ? "bg-[#D4AF37] text-black hover:bg-[#D4AF37] hover:text-black" : "text-gray-300"}
                        ${isToday && !selected ? "ring-1 ring-[#D4AF37]/40" : ""}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 overflow-hidden"
                  >
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                      Available times —{" "}
                      <span className="text-[#D4AF37]">
                        {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </span>
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`
                            py-2 rounded-lg text-xs font-medium transition border
                            ${selectedTime === slot
                              ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                              : "border-white/10 text-gray-400 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                            }
                          `}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Continue button */}
              <AnimatePresence>
                {selectedDate && selectedTime && step === 1 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={handleContinue}
                    className="mt-6 w-full py-3.5 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-[1.02] transition text-sm"
                  >
                    Continue →
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── STEP 2: BOOKING FORM ── */}
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/5 via-[#111] to-[#D4AF37]/5 p-7">
                    <h3 className="text-xl font-bold text-white mb-4">What to Expect</h3>
                    <ul className="space-y-4">
                      {[
                        { icon: "🕐", text: "15-minute call — fast and focused" },
                        { icon: "🎯", text: "We learn about your business and goals" },
                        { icon: "💡", text: "You get a custom service recommendation" },
                        { icon: "✅", text: "No pressure, no commitment required" },
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                          <span className="text-base">{item.icon}</span>
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Select a date and time on the calendar to continue booking your call.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl border border-[#D4AF37]/20 bg-[#111] p-8"
                >
                  {/* Selected slot summary */}
                  <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-[#D4AF37] font-semibold text-sm">
                        {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </p>
                      <p className="text-gray-400 text-xs">{selectedTime} · 15 min discovery call</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="ml-auto text-xs text-gray-500 hover:text-[#D4AF37] transition underline"
                    >
                      Change
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-5">Your Details</h3>

                  <form onSubmit={handleBook} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">
                          Full Name <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
                          placeholder="John Smith"
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">
                          Email <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required
                          placeholder="john@company.com"
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">Company</label>
                        <input
                          value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                          placeholder="Your Company"
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">Phone</label>
                        <input
                          value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">Notes (optional)</label>
                      <textarea
                        value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                        rows={3} placeholder="Anything you'd like us to know before the call..."
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm resize-none"
                      />
                    </div>

                    {bookingStatus === "error" && (
                      <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                    )}

                    <button
                      type="submit" disabled={bookingStatus === "loading"}
                      className="w-full py-4 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-[1.02] transition disabled:opacity-60 disabled:scale-100 text-sm tracking-wide"
                    >
                      {bookingStatus === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Booking...
                        </span>
                      ) : "Confirm Booking →"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}