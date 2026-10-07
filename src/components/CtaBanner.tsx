"use client";

import React from "react";
import Image from "next/image";
import { Phone, MessageSquare, ArrowRight, MapPin, Zap } from "lucide-react";

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
            <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/96 via-[#333333]/85 to-[#333333]/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-20">
            <div className="max-w-2xl space-y-4 sm:space-y-5">
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

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <a
                  href="tel:+12394841808"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 font-bold text-sm rounded-full border border-amber-400/30 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call (239) 484-1808</span>
                </a>

                <a
                  href="sms:+12394841808"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-full border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Text Us</span>
                </a>

                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 font-bold text-sm rounded-full border border-amber-400/30 transition-all duration-200"
                >
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
