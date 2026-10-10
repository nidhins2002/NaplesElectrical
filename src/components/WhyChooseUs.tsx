"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Users, Clock, Star, X, FileCheck2, FileText, Zap, Phone, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

interface WhyChooseUsProps {
  onOpenQuote: () => void;
}

function CredentialsModal({
  initialTab = "license",
  onClose,
}: {
  initialTab?: "license" | "insurance";
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"license" | "insurance">(initialTab);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-xl font-black text-slate-900">Our Credentials</h2>
            <p className="text-sm text-slate-500 mt-0.5">State-licensed & fully insured in Florida</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition text-slate-500"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-4 shrink-0">
          <button
            onClick={() => setActiveTab("license")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "license"
              ? "bg-slate-600 text-white shadow-lg shadow-slate-600/30"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
          >
            <FileCheck2 className="w-4 h-4" />
            State License
          </button>
          <button
            onClick={() => setActiveTab("insurance")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "insurance"
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
          >
            <FileText className="w-4 h-4" />
            Insurance Certificate
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "license" && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-wrap gap-4">
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">License Number</div>
                  <div className="text-lg font-black text-slate-800 mt-0.5">{siteConfig.licenseNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Issued To</div>
                  <div className="text-lg font-black text-slate-800 mt-0.5">Naples Electrical, LLC</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Expiration Date</div>
                  <div className="text-lg font-black text-slate-800 mt-0.5">August 31, 2028</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Issuing Authority</div>
                  <div className="text-base font-bold text-slate-800 mt-0.5">State of Florida DBPR</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <Image
                  src="/images/license.jpg"
                  alt="Florida Electrical Contractors License EC13016758 - Naples Electrical LLC"
                  width={900}
                  height={500}
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-slate-400 text-center">
                Verify at{" "}
                <a
                  href="https://www.myfloridalicense.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-slate-600 transition"
                >
                  MyFloridaLicense.com
                </a>
              </p>
            </div>
          )}

          {activeTab === "insurance" && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-wrap gap-4">
                <div>
                  <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">Insured</div>
                  <div className="text-lg font-black text-emerald-900 mt-0.5">Naples Electrical LLC</div>
                </div>
                <div>
                  <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">General Liability</div>
                  <div className="text-lg font-black text-emerald-900 mt-0.5">$1M / $2M</div>
                </div>
                <div>
                  <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">Umbrella</div>
                  <div className="text-lg font-black text-emerald-900 mt-0.5">$1M</div>
                </div>
                <div>
                  <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">Provider</div>
                  <div className="text-base font-bold text-emerald-900 mt-0.5">Berkshire Hathaway / NLFIC</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <Image
                  src="/images/insurance.jpg"
                  alt="Naples Electrical LLC Insurance Certificate - BiBerk"
                  width={900}
                  height={700}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs({ onOpenQuote }: WhyChooseUsProps) {
  const [credentialsTab, setCredentialsTab] = useState<"license" | "insurance" | null>(null);

  const points = [
    {
      icon: ShieldCheck,
      title: siteConfig.whyPoint1Title || "Licensed & Insured",
      desc: siteConfig.whyPoint1Desc || `State-certified electrical contractor — License #${siteConfig.licenseNumber}, fully insured with $2M general liability coverage.`,
      color: "text-slate-600 bg-slate-50 border-slate-100",
      action: () => setCredentialsTab("license"),
    },
    {
      icon: Users,
      title: siteConfig.whyPoint2Title || "100% Owner-Operated",
      desc: siteConfig.whyPoint2Desc || "Direct master electrician oversight on every job — no subcontractors or inexperienced sales reps.",
      color: "text-amber-600 bg-amber-50 border-amber-100",
      action: null,
    },
    {
      icon: Clock,
      title: siteConfig.whyPoint3Title || "Reliable & On Time",
      desc: siteConfig.whyPoint3Desc || "We respect your busy schedule and show up right when we say we will, guaranteed.",
      color: "text-amber-600 bg-amber-50 border-amber-100",
      action: null,
    },
    {
      icon: Star,
      title: siteConfig.whyPoint4Title || "Customer Focused",
      desc: siteConfig.whyPoint4Desc || "Quality work and excellent service on every job, backed by 5-star customer reviews.",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      action: null,
    },
  ];

  return (
    <>
      {credentialsTab && (
        <CredentialsModal
          initialTab={credentialsTab}
          onClose={() => setCredentialsTab(null)}
        />
      )}

      <section id="why-us" className="py-14 sm:py-20 lg:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">

            {/* Left Column: Media & Highlights */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-lg lg:max-w-none">

                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                  <Image
                    src="/images/why-choose-us-van.jpg"
                    alt="Naples Electrical Service Van and Owner"
                    width={600}
                    height={500}
                    className="w-full h-[280px] sm:h-[380px] md:h-[480px] object-cover object-center"
                  />

                  {/* Floating Badge overlay */}
                  <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-md px-3 sm:px-5 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 flex items-center gap-1.5 sm:gap-3">
                    <div className="flex -space-x-0.5 sm:-space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs font-extrabold text-slate-900 whitespace-nowrap">5-Star Rated</span>
                  </div>
                </div>

                {/* Floating Stat Card */}
                <div className="absolute -bottom-4 left-3 sm:-bottom-6 sm:left-6 bg-slate-900/95 backdrop-blur-md text-white p-2.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl max-w-[140px] xs:max-w-[170px] sm:max-w-xs border border-slate-700/80">
                  <div className="text-lg sm:text-3xl font-black text-amber-400">{siteConfig.whyYearsExperience || "15+ Years"}</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 font-medium mt-0.5 leading-tight">
                    {siteConfig.whyExperienceLabel || "Trusted Electrical Experience in Naples"}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Text & Features List */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 mt-6 sm:mt-8 lg:mt-0">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-slate-50 text-slate-700 font-extrabold text-xs tracking-wider uppercase rounded-full border border-slate-100">
                  {siteConfig.whyBadge || "WHY CHOOSE US"}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {siteConfig.whyTitle || "Quality Electrical Work You Can Trust"}
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-1">
                  {siteConfig.whySubtitle || "We're committed to providing safe, reliable and professional electrical services for homeowners and businesses in Naples, FL."}
                </p>
              </div>

              {/* List */}
              <div className="space-y-4 pt-2">
                {points.map((pt) => {
                  const Icon = pt.icon;
                  const isClickable = !!pt.action;
                  return (
                    <div
                      key={pt.title}
                      onClick={pt.action ?? undefined}
                      className={`p-4 rounded-2xl bg-slate-50 border border-slate-150 transition-all duration-200 flex items-start gap-4 ${isClickable
                        ? "cursor-pointer hover:bg-slate-50 hover:border-slate-200 hover:shadow-md group"
                        : "hover:bg-white hover:shadow-md"
                        }`}
                    >
                      <div className={`p-3 rounded-xl border shrink-0 ${pt.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">
                            {pt.title}
                          </h3>
                          {isClickable && (
                            <span className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full group-hover:bg-slate-600 group-hover:text-white transition-colors">
                              View Documents →
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-10">
                <button
                  onClick={onOpenQuote}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-600 font-bold text-xs sm:text-sm rounded-full border border-amber-400/30 transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Schedule Service Today</span>
                </button>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="flex-1 sm:flex-initial px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-full border border-slate-200 transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`sms:${siteConfig.phoneRaw}`}
                    className="flex-1 sm:flex-initial px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-full border border-slate-200 transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    <span>Text Us</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Direct On-Page License & Insurance Credentials Showcase */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-500" />
                VERIFIED & PROTECTED CONTRACTOR
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Official State License & Insurance Verification
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Work with confidence. Naples Electrical is fully licensed by the State of Florida DBPR and backed by $2,000,000 in General Liability insurance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {/* Card 1: State License */}
              <div
                onClick={() => setCredentialsTab("license")}
                className="group cursor-pointer bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 font-bold">
                        <FileCheck2 className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-lg leading-tight">State Electrical License</h4>
                        <p className="text-xs font-bold text-amber-600">DBPR License #{siteConfig.licenseNumber}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-full">
                      Active & Verified
                    </span>
                  </div>

                  {/* License Document Preview Image */}
                  <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-slate-200 bg-white mb-4 shadow-inner">
                    <Image
                      src="/images/license.jpg"
                      alt="Florida Electrical License EC13016758 - Naples Electrical"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#333333]/30 group-hover:bg-[#333333]/10 transition-colors flex items-center justify-center">
                      <span className="px-4 py-2 bg-[#333333]/90 text-white font-bold text-xs rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5 group-hover:scale-105 transition">
                        <FileText className="w-3.5 h-3.5 text-amber-400" /> Click to Expand License
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span>Issuing Agency: State of Florida DBPR</span>
                  <span className="font-bold text-slate-800">Naples Electrical, LLC</span>
                </div>
              </div>

              {/* Card 2: Insurance Certificate */}
              <div
                onClick={() => setCredentialsTab("insurance")}
                className="group cursor-pointer bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 font-bold">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 fill-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-lg leading-tight">General Liability Insurance</h4>
                        <p className="text-xs font-bold text-emerald-600">$2,000,000 Coverage Limit</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-full">
                      $2M Insured
                    </span>
                  </div>

                  {/* Insurance Certificate Preview Image */}
                  <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-slate-200 bg-white mb-4 shadow-inner">
                    <Image
                      src="/images/insurance.jpg"
                      alt="Naples Electrical Insurance Certificate - biBERK Berkshire Hathaway"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#333333]/30 group-hover:bg-[#333333]/10 transition-colors flex items-center justify-center">
                      <span className="px-4 py-2 bg-[#333333]/90 text-white font-bold text-xs rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5 group-hover:scale-105 transition">
                        <FileText className="w-3.5 h-3.5 text-emerald-400" /> Click to Expand Certificate
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span>Provider: Berkshire Hathaway / biBERK</span>
                  <span className="font-bold text-slate-800">Liability &amp; Worker&apos;s Comp</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
