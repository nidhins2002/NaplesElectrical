"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Phone, ShieldCheck, Zap, ArrowRight, Clock } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function QuoteModal({
  isOpen,
  onClose,
  defaultService = "General Electrical",
}: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(defaultService);
  const [propertyType, setPropertyType] = useState("Residential");
  const [urgency, setUrgency] = useState("Normal (Within a few days)");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header bar */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition"
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
          <h3 className="text-2xl font-extrabold text-white">
            {submitted ? "Estimate Requested!" : "Get Your Free Quote"}
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            {submitted
              ? "We'll be in touch with you shortly."
              : "No obligation, 100% upfront pricing & fast local response."}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">
                Thank You, {formData.name || "Valued Customer"}!
              </h4>
              <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                Your request for <strong>{service}</strong> has been received by our Naples team. An electrician will review your details and call you back within 15 minutes.
              </p>
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/60 mb-6 text-left">
                <div className="flex items-center gap-3 text-amber-900 font-medium text-sm mb-1">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  Need emergency help right now?
                </div>
                <p className="text-xs text-amber-800">
                  Call our direct Naples hotline:{" "}
                  <a href="tel:2395551234" className="font-bold underline text-amber-900">
                    (239) 555-1234
                  </a>
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      1. Select Required Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-900"
                    >
                      <option value="Lighting Installation">Lighting Installation & Fixtures</option>
                      <option value="Electrical Repairs">Electrical Repairs & Troubleshooting</option>
                      <option value="Panel Upgrades">Panel Upgrades & Breakers</option>
                      <option value="Ceiling Fans">Ceiling Fan Installation</option>
                      <option value="EV Charger Installation">EV Charger Station Installation</option>
                      <option value="Whole Home Wiring">Whole Home Wiring & Rewiring</option>
                      <option value="Emergency Service">Emergency Electrical Service</option>
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
                          className={`py-3 px-4 rounded-xl font-semibold border text-sm transition flex items-center justify-center gap-2 ${
                            propertyType === type
                              ? "bg-slate-900 text-white border-slate-900 shadow-md"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
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
                    className="w-full mt-4 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition"
                  >
                    Next: Contact Details <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(239) 555-0199"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Naples Area / Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pelican Bay, Naples FL"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brief Description of Job (Optional)
                    </label>
                    <textarea
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
                      onClick={() => setStep(1)}
                      className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition text-sm"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition"
                    >
                      Submit Free Quote Request <ArrowRight className="w-5 h-5" />
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
