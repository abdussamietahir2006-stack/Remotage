"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "John Carter",
    role: "Startup Founder",
    text: "Remotage completely transformed our workflow. We scaled faster without hiring a full in-house team.",
  },
  {
    name: "Sarah Williams",
    role: "Marketing Director",
    text: "The automation and execution quality is next level. It feels like having an elite remote team.",
  },
  {
    name: "Ali Khan",
    role: "Business Owner",
    text: "From lead generation to operations, everything became smoother. Highly recommended.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto change every 4 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full bottom-0 right-0" />

      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
            What Our Clients Say
          </span>
        </h2>

        {/* Animated Card */}
        <div className="relative h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full"
            >
              <div className="p-10 rounded-2xl border border-[#D4AF37]/20 bg-white/5 backdrop-blur-xl shadow-xl">

                {/* Text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  “{testimonials[index].text}”
                </p>

                {/* User */}
                <div>
                  <h4 className="text-[#D4AF37] font-semibold text-lg">
                    {testimonials[index].name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonials[index].role}
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition ${
                i === index ? "bg-[#D4AF37] w-6" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}