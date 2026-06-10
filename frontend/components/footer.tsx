"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface FooterContent {
  logo: string;
  description: string;
  phone: string;
  email: string;
  link1Label: string; link1Href: string;
  link2Label: string; link2Href: string;
  link3Label: string; link3Href: string;
  link4Label: string; link4Href: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  copyright: string;
}

const defaults: FooterContent = {
  logo: "REMOTAGE",
  description: "Your remote advantage — helping businesses scale faster with expert digital services, automation, and execution.",
  phone: "+1 (628) 265-7358",
  email: "Mashood.tahir@remotage.com",
  link1Label: "Home",     link1Href: "/",
  link2Label: "About",    link2Href: "/about",
  link3Label: "Services", link3Href: "/services",
  link4Label: "Contact",  link4Href: "/contact",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  linkedinUrl:  "https://linkedin.com",
  copyright: "Remotage. All rights reserved.",
};

export default function Footer() {
  const [footer, setFooter] = useState<FooterContent>(defaults);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/cms/footer`)
      .then(r => r.json())
      .then(data => {
        if (data?.data?.content) setFooter(prev => ({ ...prev, ...data.data.content }));
      })
      .catch(() => {});
  }, []);

  const links = [
    { label: footer.link1Label, href: footer.link1Href },
    { label: footer.link2Label, href: footer.link2Href },
    { label: footer.link3Label, href: footer.link3Href },
    { label: footer.link4Label, href: footer.link4Href },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/10 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* LOGO + DESCRIPTION */}
        <div>
          <Link href="/">
            <h2 className="text-2xl font-bold tracking-widest mb-4 cursor-pointer">
              <span className="font-[Orbitron] bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
                {footer.logo}
              </span>
            </h2>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">{footer.description}</p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4">Contact Info</h3>
          <p className="text-sm mb-2">
            Phone:{" "}
            <a href={`tel:${footer.phone.replace(/\D/g, "")}`} className="text-gray-400 hover:text-[#D4AF37] transition">
              {footer.phone}
            </a>
          </p>
          <p className="text-sm">
            Email:{" "}
            <a href={`mailto:${footer.email}`} className="text-gray-400 hover:text-[#D4AF37] transition">
              {footer.email}
            </a>
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {links.map((link, i) => (
              <li key={i}>
                <Link href={link.href} className="hover:text-[#D4AF37] transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4">Social Media</h3>
          <div className="flex gap-4">
            <a href={footer.facebookUrl} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition">
              <FaFacebookF />
            </a>
            <a href={footer.instagramUrl} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition">
              <FaInstagram />
            </a>
            <a href={footer.linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#D4AF37]/10 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} {footer.copyright}
      </div>

    </footer>
  );
}