"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Zap } from "lucide-react";

interface ServicesSectionProps {
  onOpenQuote: (serviceName?: string) => void;
}

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  const services = [
    {
      title: "Lighting Installation",
      desc: "Indoor and outdoor lighting installation and upgrades.",
      image: "/images/lighting-installation.jpg",
      badge: "Popular",
    },
    {
      title: "Electrical Repairs",
      desc: "Fixing outlets, switches, wiring issues and more.",
      image: "/images/electrical-repairs.jpg",
      badge: "Fast Repair",
    },
    {
      title: "Panel Upgrades",
      desc: "Upgrade your electrical panel for improved safety and capacity.",
      image: "/images/panel-upgrades.jpg",
      badge: "Safety First",
    },
    {
      title: "Ceiling Fans",
      desc: "Installation and replacement of ceiling fans and fixtures.",
      image: "/images/ceiling-fans.jpg",
      badge: "Efficiency",
    },
    {
      title: "EV Charger Installation",
      desc: "Professional home charging station setup for all EV brands.",
      image: "/images/ev-charger.jpg",
      badge: "Eco Tech",
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            OUR SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How We Can Help
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-1">
            We provide a full range of electrical services to meet the needs of homeowners and businesses in Naples, FL. No job is too big or too small.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((item) => (
            <div
              key={item.title}
              onClick={() => onOpenQuote(item.title)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-[11px] rounded-lg border border-slate-700/50">
                    {item.badge}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-50">
                <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Learn More / Quote
                </span>
                <div className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-amber-400 group-hover:bg-amber-400 text-slate-700 group-hover:text-slate-950 flex items-center justify-center transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition"
          >
            <span>Need Custom Electrical Work? Contact Us Today</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </section>
  );
}
