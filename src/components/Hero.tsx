"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Users, Award, Zap, Phone, CheckCircle } from "lucide-react";

interface HeroProps {
  onOpenQuote: (service?: string) => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-10 sm:py-14 md:py-20 lg:py-24">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-slate-600/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 md:space-y-8">

            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[11px] sm:text-xs font-extrabold tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span>LICENSED. RELIABLE. LOCAL.</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Professional Electrical Services in{" "}
              <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Naples, FL
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-xl font-normal leading-relaxed max-w-2xl">
              Safe, reliable and high-quality electrical services for homes and businesses. From small repairs to complete installations, Naples Electrical is here to keep your property powered and safe.
            </p>

            {/* CTAs */}
            <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 pt-1">
              <button
                onClick={() => onOpenQuote()}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm sm:text-base rounded-full shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <a
                href="#services"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base rounded-full border border-slate-700 hover:border-slate-500 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Our Services</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 sm:pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-3 sm:gap-6 max-w-xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 text-amber-400 border border-slate-700/60 shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Licensed</div>
                  <div className="text-[10px] sm:text-xs text-slate-400">& Insured</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 text-amber-400 border border-slate-700/60 shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Trusted in</div>
                  <div className="text-[10px] sm:text-xs text-slate-400">Naples, FL</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 text-amber-400 border border-slate-700/60 shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Quality</div>
                  <div className="text-[10px] sm:text-xs text-slate-400">Workmanship</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image with Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">

              {/* Outer Glow / Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-slate-500 rounded-3xl blur-lg opacity-25" />

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 group">
                <Image
                  src="/images/hero-electrician.jpg"
                  alt="Professional Electrician in Naples FL"
                  width={700}
                  height={500}
                  className="w-full h-[260px] xs:h-[300px] sm:h-[380px] md:h-[420px] lg:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Overlay Badge */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-white truncate">100% Satisfaction Guarantee</div>
                      <div className="text-[10px] sm:text-xs text-slate-300 truncate">Fast Same-Day Service Available</div>
                    </div>
                  </div>
                  <a
                    href="tel:+12394841808"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Now
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

