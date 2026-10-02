"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Users, Clock, Star, CheckCircle2 } from "lucide-react";

interface WhyChooseUsProps {
  onOpenQuote: () => void;
}

export default function WhyChooseUs({ onOpenQuote }: WhyChooseUsProps) {
  const points = [
    {
      icon: ShieldCheck,
      title: "Licensed & Insured",
      desc: "Your safety and peace of mind come first. Licensed state electrical contractor #EC13009982.",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      icon: Users,
      title: "Experienced Team",
      desc: "Skilled electricians with years of local experience in Naples and Collier County.",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      icon: Clock,
      title: "Reliable & On Time",
      desc: "We respect your busy schedule and show up right when we say we will, guaranteed.",
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      icon: Star,
      title: "Customer Focused",
      desc: "Quality work and excellent service on every job, backed by 5-star customer reviews.",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <section id="why-us" className="py-14 sm:py-20 lg:py-28 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">

          {/* Left Column: Media & Highlights */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-lg lg:max-w-none">

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <Image
                  src="/images/hero-electrician.jpg"
                  alt="Quality Electrical Work Naples FL"
                  width={600}
                  height={500}
                  className="w-full h-[280px] sm:h-[380px] md:h-[480px] object-cover"
                />
                
                {/* Floating Badge overlay */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-900">5-Star Rated Service</span>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-5 left-2 sm:-bottom-6 sm:left-6 bg-slate-900 text-white p-4 sm:p-6 rounded-2xl shadow-xl max-w-[200px] sm:max-w-xs border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">15+ Years</div>
                <div className="text-xs text-slate-300 font-medium mt-1">
                  Trusted Electrical Experience in Naples, Florida
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Text & Features List */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 mt-6 sm:mt-8 lg:mt-0">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 font-extrabold text-xs tracking-wider uppercase rounded-full border border-blue-100">
                WHY CHOOSE US
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Quality Electrical Work You Can Trust
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-1">
                We're committed to providing safe, reliable and professional electrical services for homeowners and businesses in Naples, FL.
              </p>
            </div>

            {/* List */}
            <div className="space-y-4 pt-2">
              {points.map((pt) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={pt.title}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-150 hover:bg-white hover:shadow-md transition-all duration-200 flex items-start gap-4"
                  >
                    <div className={`p-3 rounded-xl border shrink-0 ${pt.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {pt.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-base rounded-full shadow-lg shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98] transition"
              >
                Schedule Service Today
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
