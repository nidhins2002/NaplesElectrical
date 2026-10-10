"use client";

import React from "react";
import { Home, Building2, Wrench, Zap } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function ValueBar() {
  const features = [
    {
      icon: Home,
      title: siteConfig.value1Title || "Residential Services",
      desc: siteConfig.value1Desc || "Safe and reliable electrical solutions for your home",
    },
    {
      icon: Building2,
      title: siteConfig.value2Title || "Commercial Services",
      desc: siteConfig.value2Desc || "Powering local businesses in Naples",
    },
    {
      icon: Wrench,
      title: siteConfig.value3Title || "Repairs & Installations",
      desc: siteConfig.value3Desc || "From small fixes to large projects",
    },
    {
      icon: Zap,
      title: siteConfig.value4Title || "Safety & Compliance",
      desc: siteConfig.value4Desc || "Work that meets all codes and safety standards",
    },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  index !== 0 ? "pt-6 md:pt-0 md:pl-6 lg:pl-8" : ""
                } group hover:transform hover:-translate-y-1 transition-all duration-200`}
              >
                <div className="p-3 bg-slate-50 text-slate-900 rounded-xl group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors duration-200 shrink-0 border border-slate-100">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
