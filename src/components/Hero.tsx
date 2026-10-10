"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Users, Award, Zap, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

interface HeroProps {
  onOpenQuote: (service?: string) => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden py-10 sm:py-14 md:py-20 lg:py-24 border-b border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-slate-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 md:space-y-8">

            {/* Tagline Badge - Highlight Owner Operated */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-[11px] sm:text-xs font-extrabold tracking-wider uppercase backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{siteConfig.heroBadge || "100% OWNER-OPERATED & LICENSED CONTRACTOR"}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              {siteConfig.heroTitle || "Professional Electrical Services in"}{" "}
              <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                {siteConfig.heroTitleHighlight || "Naples, FL"}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-xl font-normal leading-relaxed max-w-2xl">
              {siteConfig.heroSubtitle || "Safe, reliable and high-quality electrical services for homes and businesses. From small repairs to complete installations, Naples Electrical is here to keep your property powered and safe."}
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={() => onOpenQuote()}
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 font-bold text-xs sm:text-sm rounded-full border border-amber-400/30 transition flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                <span>Get Free Quote</span>
              </button>

              <a
                href="#services"
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-full border border-white/20 transition flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
                <span>Our Services</span>
              </a>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-3 pt-1">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 font-bold text-xs sm:text-sm rounded-full border border-amber-400/30 transition flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                <span>Call</span>
              </a>

              <a
                href={`sms:${siteConfig.phoneRaw}`}
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-full border border-white/20 transition flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                <span>Text</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 sm:pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 max-w-2xl">
              <a
                href="#why-us"
                className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
              >
                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-white leading-tight group-hover:text-amber-400 transition-colors">{siteConfig.licenseNumber}</div>
                  <div className="text-[10px] sm:text-xs text-amber-400/90 font-medium">State Licensed</div>
                </div>
              </a>

              <a
                href="#why-us"
                className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
              >
                <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 shrink-0 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-white leading-tight group-hover:text-emerald-400 transition-colors">$2M Coverage</div>
                  <div className="text-[10px] sm:text-xs text-emerald-400/90 font-medium">Fully Insured</div>
                </div>
              </a>

              <a
                href="#why-us"
                className="hidden sm:flex items-center gap-2 sm:gap-3 group cursor-pointer"
              >
                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-400/15 text-amber-400 border border-amber-400/30 shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:text-slate-950" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-white leading-tight group-hover:text-amber-400 transition-colors">Owner-Operated</div>
                  <div className="text-[10px] sm:text-xs text-amber-400/90 font-semibold">Direct Service</div>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Image with Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">

              {/* Outer Glow / Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/30 to-slate-700 rounded-3xl blur-lg opacity-30 pointer-events-none" />

              {/* Image Container */}
              <div className="relative w-fit mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 group">
                <Image
                  src="/images/hero-electrician.jpg"
                  alt="Professional Electrician in Naples FL"
                  width={700}
                  height={500}
                  className="w-full h-auto max-h-[500px] block group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Overlay Badge ON the image */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-slate-950/85 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 shadow-lg">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0 shadow-sm">
                      <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-extrabold text-white truncate">
                        {siteConfig.heroGuaranteeTitle || "100% Satisfaction Guarantee"}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-300 truncate">
                        {siteConfig.heroGuaranteeSubtitle || "Fast Same-Day Service Available"}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 font-bold text-xs rounded-full border border-amber-400/30 transition shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" /> Call
                    </a>
                    <a
                      href={`sms:${siteConfig.phoneRaw}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-full border border-white/20 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Text
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
