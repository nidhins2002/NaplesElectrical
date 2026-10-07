"use client";

import React from "react";
import NextImage from "next/image";
import { Phone, MessageSquare, Mail, MapPin, ArrowRight } from "lucide-react";

// Inline social SVG icons (lucide-react doesn't export social icons)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface FooterProps {
  onOpenQuote: () => void;
}

export default function Footer({ onOpenQuote }: FooterProps) {
  const services = [
    "Custom Lighting & Chandeliers",
    "Troubleshooting & Fast Repairs",
    "Panel Replacements & Upgrades",
    "Ceiling Fan Installation",
    "EV Charger Installation (Level 2)",
    "Outlet, Switch & GFCI Upgrades",
    "Smart Home Infrastructure",
    "Safety Inspections & 4 Point Repairs",
    "Whole-Home Surge Protection",
    "Generator & Transfer Switches",
    "Pool & Spa Wiring and Repairs",
    "Boat Dock Electrical",
  ];

  const serviceAreas = [
    "Naples, FL",
    "Marco Island, FL",
    "Bonita Springs, FL",
    "Estero, FL",
    "Ave Maria, FL",
    "Fort Myers, FL",
    "Collier County, FL",
    "Lee County, FL",
  ];

  return (
    <footer id="contact" className="bg-[#333333] text-slate-300 border-t border-white/10">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-5">
            {/* Logo (Increased Size for Clear Visibility) */}
            <div className="flex items-center gap-3">
              <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] shrink-0">
                <NextImage
                  src="/Logo.png"
                  alt="Naples Electrical Logo"
                  width={100}
                  height={100}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-brand text-2xl sm:text-3xl font-black text-amber-500 tracking-tight leading-none">NAPLES</span>
                <span className="font-brand text-[10px] sm:text-xs font-extrabold tracking-[0.25em] text-amber-400 uppercase mt-1">ELECTRICAL</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Licensed, bonded & insured electricians serving Naples, FL and surrounding Collier County areas since 2010.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="tel:+12394841808"
                className="flex items-center gap-3 text-sm font-semibold text-white hover:text-amber-400 transition"
              >
                <div className="p-2 rounded-lg bg-[#444444] border border-white/10 shrink-0">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                (239) 484-1808
              </a>

              <a
                href="mailto:info@napleselectrical.com"
                className="flex items-center gap-3 text-sm font-semibold text-slate-300 hover:text-amber-400 transition"
              >
                <div className="p-2 rounded-lg bg-[#444444] border border-white/10 shrink-0">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                info@napleselectrical.com
              </a>

              <div className="flex items-start gap-3 text-sm text-slate-400">
                <div className="p-2 rounded-lg bg-[#444444] border border-white/10 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <span>Naples, FL 34102<br />Collier County, Florida</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-xl bg-[#444444] hover:bg-amber-400 border border-white/10 hover:border-amber-400 text-slate-400 hover:text-slate-950 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={onOpenQuote}
                    className="text-sm text-slate-400 hover:text-amber-400 transition flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-amber-400 transition" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-6">Service Areas</h4>
            <ul className="space-y-3">
              {serviceAreas.map((a) => (
                <li key={a}>
                  <span className="text-sm text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500/60 shrink-0" />
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div className="space-y-5">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Get a Free Quote</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ready to get started? Contact us today for a free, no-obligation estimate on your electrical project.
            </p>

            <button
              onClick={onOpenQuote}
              className="w-full py-3.5 px-5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-400/10"
            >
              Request a Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex gap-2.5">
              <a
                href="tel:+12394841808"
                className="flex-1 py-3.5 px-4 bg-[#444444] hover:bg-[#555555] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition border border-white/10"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call
              </a>

              <a
                href="sms:+12394841808"
                className="flex-1 py-3.5 px-4 bg-[#444444] hover:bg-[#555555] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition border border-white/10"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Text Us
              </a>
            </div>

            {/* License Badge */}
            <div className="bg-[#282828] border border-white/10 rounded-xl p-4">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">State Licensed</div>
              <div className="text-sm font-bold text-white">#EC13016758</div>
              <div className="text-xs text-slate-400 mt-1">Licensed Electrical Contractor<br />State of Florida</div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Naples Electrical. All rights reserved. Serving Naples, FL and surrounding areas.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
