"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap, Home, Building2 } from "lucide-react";
import { SERVICES } from "@/lib/services";

interface ServicesSectionProps {
  onOpenQuote: (serviceName?: string) => void;
}

const RESIDENTIAL = SERVICES.filter((s) => s.category === "residential").map((s) => ({
  slug: s.slug,
  title: s.title,
  desc: s.description,
  image: s.heroImage,
  badge: s.badge,
  disabled: s.disabled,
}));

const COMMERCIAL = SERVICES.filter((s) => s.category === "commercial").map((s) => ({
  slug: s.slug,
  title: s.title,
  desc: s.description,
  image: s.heroImage,
  badge: s.badge,
  disabled: s.disabled,
}));

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");

  const services = activeTab === "residential" ? RESIDENTIAL : COMMERCIAL;

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            OUR SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How We Can Help
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-1">
            Full-spectrum electrical services for homeowners and businesses across Naples, FL. Click any service to explore detailed specs & FAQs.
          </p>
        </div>

        {/* Category Toggle Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-col xs:flex-row items-stretch xs:items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm gap-1.5">
            <button
              id="tab-residential"
              onClick={() => setActiveTab("residential")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeTab === "residential"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Home className="w-4 h-4" />
              Residential Services
            </button>
            <button
              id="tab-commercial"
              onClick={() => setActiveTab("commercial")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeTab === "commercial"
                  ? "bg-slate-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Commercial Services
            </button>
          </div>
        </div>

        {/* Category Intro Strip */}
        <div
          className={`mb-8 p-4 rounded-2xl border flex items-center gap-4 transition-all duration-300 ${
            activeTab === "residential"
              ? "bg-amber-50 border-amber-200"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              activeTab === "residential" ? "bg-amber-500 text-white" : "bg-slate-600 text-white"
            }`}
          >
            {activeTab === "residential" ? (
              <Home className="w-5 h-5" />
            ) : (
              <Building2 className="w-5 h-5" />
            )}
          </div>
          <div>
            <p
              className={`font-extrabold text-sm ${
                activeTab === "residential" ? "text-amber-900" : "text-slate-900"
              }`}
            >
              {activeTab === "residential"
                ? "Residential Electrical Services"
                : "Commercial Electrical Services"}
            </p>
            <p
              className={`text-xs leading-relaxed mt-0.5 ${
                activeTab === "residential" ? "text-amber-800/70" : "text-slate-800/70"
              }`}
            >
              {activeTab === "residential"
                ? "Everything your home needs — from simple repairs to full panel upgrades. Licensed, insured, and owner-operated."
                : "Professional electrical solutions for businesses of all sizes. Serving offices, retail, hospitality, and industrial clients in Naples, FL."}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {services.map((item: { slug: string; title: string; desc: string; image: string; badge: string; disabled?: boolean }) => {
            const isCardDisabled = Boolean(item.disabled);

            const CardContent = (
              <>
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={`object-cover ${isCardDisabled ? "" : "group-hover:scale-105"} transition-transform duration-500`}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-[11px] rounded-lg border border-slate-700/50">
                      {item.badge}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className={`text-lg font-extrabold text-slate-900 ${isCardDisabled ? "" : "group-hover:text-amber-600"} transition-colors`}>
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Action Button Footer */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-50">
                  <span className={`text-xs font-bold ${isCardDisabled ? "text-slate-400" : "text-slate-900 group-hover:text-amber-600"} transition-colors`}>
                    {isCardDisabled ? "Available on Request" : "View Service Details"}
                  </span>
                  {!isCardDisabled && (
                    <div className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-amber-400 group-hover:bg-amber-400 text-slate-700 group-hover:text-slate-950 flex items-center justify-center transition-all duration-200">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </>
            );

            if (isCardDisabled) {
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 flex flex-col justify-between cursor-default opacity-85 select-none"
                >
                  {CardContent}
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={`/services/${item.slug}`}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {CardContent}
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition"
          >
            <span>
              {activeTab === "residential"
                ? "Need Custom Residential Work?"
                : "Need a Commercial Estimate?"}{" "}
              Contact Us Today
            </span>
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </section>
  );
}
