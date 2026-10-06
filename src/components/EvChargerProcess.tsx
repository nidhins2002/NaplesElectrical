"use client";

import React from "react";
import Image from "next/image";
import { Zap, CheckCircle2, ArrowRight } from "lucide-react";

interface EvChargerProcessProps {
  onOpenQuote: (service?: string) => void;
}

export default function EvChargerProcess({ onOpenQuote }: EvChargerProcessProps) {
  const steps = [
    {
      num: 1,
      title: "Consultation",
      desc: "We assess your home's electrical capacity and recommend the best EV charging solution for your vehicle.",
    },
    {
      num: 2,
      title: "Electrical Setup",
      desc: "We ensure your electrical panel can support the charger or provide a panel upgrade if required.",
    },
    {
      num: 3,
      title: "Professional Installation",
      desc: "Our licensed electricians install the charger safely, neatly, and 100% compliant with local Naples building codes.",
    },
    {
      num: 4,
      title: "Testing & Support",
      desc: "We test the entire charging system thoroughly and make sure your vehicle charges effortlessly at top speed.",
    },
  ];

  const brands = [
    "Tesla",
    "ChargePoint",
    "Emporia",
    "Grizzl-E",
    "JuiceBox",
    "Wallbox",
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Step Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 text-amber-400 font-extrabold text-xs tracking-wider uppercase rounded-full border border-amber-400/20">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                EV CHARGER INSTALLATION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-3">
                Our EV Charger Installation Process
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
                Fast, code-compliant, and safe EV home charger installation in Naples, FL. Charge your electric vehicle conveniently overnight!
              </p>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6 pt-2">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-slate-600 text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-lg shadow-slate-600/30 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Supported Brands */}
            <div className="pt-6 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                EV Charger Brands We Install & Service
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="px-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-400 transition"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => onOpenQuote("EV Charger Installation")}
                className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-base rounded-full shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition"
              >
                <span>Book EV Charger Installation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Right Column: EV Charger Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
              <Image
                src="/images/ev-charger.jpg"
                alt="EV Charger Installation Naples FL"
                width={600}
                height={550}
                className="w-full h-[280px] sm:h-[380px] lg:h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
                  <div className="text-xs sm:text-sm text-slate-200 font-medium">
                    All major EV brands supported. Includes safety inspection and breaker testing.
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
