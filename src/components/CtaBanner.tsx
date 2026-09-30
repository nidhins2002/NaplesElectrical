"use client";

import React from "react";
import Image from "next/image";
import { Phone, ArrowRight, MapPin, Zap } from "lucide-react";

interface CtaBannerProps {
  onOpenQuote: () => void;
}

export default function CtaBanner({ onOpenQuote }: CtaBannerProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/naples-banner.jpg"
              alt="Naples FL Aerial View"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/96 via-slate-950/80 to-slate-950/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-10 sm:p-16 lg:p-20">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase rounded-full">
                <MapPin className="w-3.5 h-3.5" />
                NAPLES, FL &amp; SURROUNDING AREAS
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Need an Electrician in Naples, FL?{" "}
                <span className="text-amber-400">Get a Free Estimate Today.</span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Contact us today to schedule a consultation or get a free estimate. We serve all of Naples, FL and surrounding areas including Marco Island and Collier County.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <a
                  href="tel:2395551234"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-base rounded-full shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Phone className="w-5 h-5 fill-slate-950" />
                  <span>Call (239) 555-1234</span>
                </a>

                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-base rounded-full border border-white/20 hover:border-white/40 transition-all duration-200"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
