"use client";

import { motion } from "framer-motion";

interface Props {
  content?: Record<string, string>;
  images?: Record<string, string>;
}

export default function Testimonials({ content = {}, images = {} }: Props) {
  const list = [1, 2, 3].map(n => {
    const defaultText = [
      "Remotage completely transformed our workflow. We scaled faster without hiring a full in-house team.",
      "The automation and execution quality is next level. It feels like having an elite remote team.",
      "From lead generation to operations, everything became smoother. Highly recommended."
    ][n - 1];
    
    const defaultName = ["John Carter", "Sarah Williams", "Ali Khan"][n - 1];
    const defaultRole = ["Startup Founder", "Marketing Director", "Business Owner"][n - 1];
    const defaultAvatar = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
    ][n - 1];

    return {
      name: content[`testimonialName${n}`] || defaultName,
      role: content[`testimonialRole${n}`] || defaultRole,
      text: content[`testimonialText${n}`] || defaultText,
      avatar: images[`testimonialAvatar${n}`] || defaultAvatar,
    };
  });

  return (
    <section className="py-28 bg-[#0A0A0A] relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] rounded-full top-[-100px] right-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] rounded-full bottom-[-100px] left-[-100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto">
            Discover how we help ambitious businesses worldwide streamline operations and achieve massive growth.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {list.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ 
                y: -6,
                borderColor: "rgba(212, 175, 55, 0.5)", 
                boxShadow: "0 15px 35px -5px rgba(212, 175, 55, 0.12)" 
              }}
              className="relative p-8 rounded-3xl border border-white/[0.06] bg-[#111111]/90 backdrop-blur-md shadow-2xl flex flex-col justify-between group transition-all duration-300 overflow-hidden"
            >
              {/* Background Quote Mark */}
              <span className="absolute right-6 top-4 text-8xl font-serif text-[#D4AF37]/5 select-none pointer-events-none group-hover:text-[#D4AF37]/10 transition duration-300">
                “
              </span>

              <div className="space-y-5">
                {/* Gold Rating Stars */}
                <div className="flex gap-1 text-[#D4AF37] text-sm">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx}>★</span>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-300 text-sm leading-relaxed relative z-10 italic">
                  “{item.text}”
                </p>
              </div>

              {/* Client Profile */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/[0.05]">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/30 shadow-md group-hover:border-[#D4AF37]/65 transition duration-300"
                />
                <div>
                  <h4 className="text-white font-bold text-sm group-hover:text-[#D4AF37] transition duration-300">
                    {item.name}
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}