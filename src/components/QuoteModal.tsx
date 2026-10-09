"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Phone, ShieldCheck, Zap, ArrowRight, Clock, Loader2, AlertCircle } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const RESIDENTIAL_SERVICES = [
  "Custom Lighting & Chandeliers Installation",
  "Troubleshooting & Fast Repairs",
  "Electrical Panel Replacements & Upgrades",
  "Ceiling Fan Installation",
  "EV Charger Installation (Level 2)",
  "Outlet, Switch & GFCI Upgrades",
  "Smart Home & Automation Infrastructure",
  "Safety Inspections and 4 Point Repairs",
  "Whole‑Home Surge Protection",
  "Generator, Inlet & Transfer Switch Installation",
  "Pool & Spa Wiring and Repairs",
  "Boat Dock Electrical",
];

const COMMERCIAL_SERVICES = [
  "Commercial Electrical Contracting & Builds",
  "3-Phase Commercial Panel & Service Upgrades",
  "Commercial LED Retrofits & Exterior Lighting",
  "Commercial Code Compliance & Safety Audits",
  "Commercial & Fleet EV Charging Stations",
  "Tenant Improvement & Space Remodel Wiring",
  "Commercial Preventative Electrical Maintenance",
  "24/7 Commercial Emergency Electrical Repairs",
];

export default function QuoteModal({
  isOpen,
  onClose,
  defaultService = "General Electrical",
}: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(defaultService);
  const [propertyType, setPropertyType] = useState(
    COMMERCIAL_SERVICES.includes(defaultService) ? "Commercial" : "Residential"
  );
  const [urgency, setUrgency] = useState("Normal (Within a few days)");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [prevDefaultService, setPrevDefaultService] = useState(defaultService);
  if (defaultService !== prevDefaultService) {
    setPrevDefaultService(defaultService);
    setService(defaultService);
    if (COMMERCIAL_SERVICES.includes(defaultService)) {
      setPropertyType("Commercial");
    }
  }

  const resetAndClose = React.useCallback(() => {
    setSubmitted(false);
    setSubmitError(null);
    setStep(1);
    onClose();
  }, [onClose]);

  // Handle ESC key and background body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, resetAndClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          propertyType,
          urgency,
          ...formData,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit quote request");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please call us directly.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#333333]/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden border border-slate-100">
        {/* Header bar */}
        <div className="bg-[#333333] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-[#444444] transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
              <Zap className="w-4 h-4 fill-amber-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Naples Electrical
            </span>
          </div>
          <h3 id="quote-modal-title" className="text-xl sm:text-2xl font-extrabold text-white">
            {submitted ? "Estimate Requested!" : "Get Your Free Quote"}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {submitted
              ? "We&apos;ll be in touch with you shortly."
              : "No obligation, 100% upfront pricing & fast local response."}
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 md:p-8 overflow-y-auto overscroll-contain">
          {submitted ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">
                Thank You, {formData.name || "Valued Customer"}!
              </h4>
              <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                Your request for <strong>{service}</strong> has been received by our Naples team. An electrician will review your details and contact you shortly.
              </p>
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/60 mb-6 text-left">
                <div className="flex items-center gap-3 text-amber-900 font-medium text-sm mb-1">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  Need emergency help right now?
                </div>
                <p className="text-xs text-amber-800">
                  Call our direct Naples hotline:{" "}
                  <a href="tel:+12394841808" className="font-bold underline text-amber-900">
                    (239) 484-1808
                  </a>
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="w-full py-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-600 font-bold text-sm rounded-full border border-amber-400/30 transition shadow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {submitError && (
                <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{submitError}</span>
                </div>
              )}

              {step === 1 ? (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="quote-service" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      1. Select Required Service
                    </label>
                    <select
                      id="quote-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-900 text-sm"
                    >
                      <optgroup label="Residential Services">
                        {RESIDENTIAL_SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Commercial Services">
                        {COMMERCIAL_SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      2. Property Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Residential", "Commercial"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          className={`py-3 px-4 rounded-full font-bold border text-sm transition flex items-center justify-center gap-2 ${
                            propertyType === type
                              ? "bg-amber-400/10 text-amber-600 border-amber-400/30 shadow-sm"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 font-medium"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      3. Timeline / Urgency
                    </label>
                    <div className="space-y-2">
                      {[
                        "Emergency (Need help today)",
                        "Normal (Within a few days)",
                        "Planning ahead (Next 2 weeks+)",
                      ].map((time) => (
                        <label
                          key={time}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium cursor-pointer transition ${
                            urgency === time
                              ? "bg-amber-50/80 border-amber-400 text-slate-900"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
                          }`}
                        >
                          <input
                            type="radio"
                            name="urgency"
                            checked={urgency === time}
                            onChange={() => setUrgency(time)}
                            className="accent-amber-500 w-4 h-4"
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full mt-4 py-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-600 font-bold text-sm sm:text-base rounded-full border border-amber-400/30 transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Contact Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="quote-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="quote-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        required
                        placeholder="(239) 484-1808"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        placeholder="john@gmail.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quote-address" className="block text-xs font-semibold text-slate-700 mb-1">
                      Address / Neighborhood (Optional)
                    </label>
                    <input
                      id="quote-address"
                      type="text"
                      placeholder="e.g. Pelican Bay, Naples FL"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-details" className="block text-xs font-semibold text-slate-700 mb-1">
                      Brief Description of Job (Optional)
                    </label>
                    <textarea
                      id="quote-details"
                      rows={2}
                      placeholder="Tell us a little bit about what you need done..."
                      value={formData.details}
                      onChange={(e) =>
                        setFormData({ ...formData, details: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-sm"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setStep(1)}
                      className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full border border-slate-300 transition text-sm disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-600 font-bold text-sm rounded-full border border-amber-400/30 transition shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Free Quote Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> State Licensed EC13016758
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" /> Fast Response Guaranteed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
