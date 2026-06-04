"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface NavContent {
  logo: string;
  link1Label: string; link1Href: string;
  link2Label: string; link2Href: string;
  link3Label: string; link3Href: string;
  link4Label: string; link4Href: string;
  ctaLabel: string;   ctaHref: string;
}

const defaults: NavContent = {
  logo: "REMOTAGE",
  link1Label: "Home",     link1Href: "/",
  link2Label: "About",    link2Href: "/about",
  link3Label: "Services", link3Href: "/services",
  link4Label: "Contact",  link4Href: "/contact",
  ctaLabel: "Book Call",  ctaHref: "/contact",
};

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [nav, setNav]         = useState<NavContent>(defaults);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/cms/navbar`)
      .then(r => r.json())
      .then(data => {
        if (data?.data?.content) setNav(prev => ({ ...prev, ...data.data.content }));
      })
      .catch(() => {});
  }, []);

  const links = [
    { label: nav.link1Label, href: nav.link1Href },
    { label: nav.link2Label, href: nav.link2Href },
    { label: nav.link3Label, href: nav.link3Href },
    { label: nav.link4Label, href: nav.link4Href },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <h1 className="relative text-2xl md:text-3xl font-bold tracking-widest group cursor-pointer">
            <span className="font-[Orbitron] bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              {nav.logo}
            </span>
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 transition origin-left duration-500" />
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-gray-300">
          {links.map((link, i) => (
            <Link key={i} href={link.href} className="hover:text-[#D4AF37] transition">
              {link.label}
            </Link>
          ))}
        </div>

        {/* DESKTOP CTA */}
        <Link href={nav.ctaHref} className="hidden md:block">
          <button className="px-5 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition font-semibold">
            {nav.ctaLabel}
          </button>
        </Link>

        {/* MOBILE HAMBURGER */}
        <button className="md:hidden text-[#D4AF37]" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#D4AF37]/10 px-6 py-6 flex flex-col gap-6">
          {links.map((link, i) => (
            <Link key={i} href={link.href} className="text-gray-300 hover:text-[#D4AF37] transition" onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href={nav.ctaHref} onClick={() => setIsOpen(false)}>
            <button className="w-full px-5 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition font-semibold">
              {nav.ctaLabel}
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}