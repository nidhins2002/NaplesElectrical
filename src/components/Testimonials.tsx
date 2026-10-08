"use client";

import React, { useEffect } from "react";

export default function Testimonials() {
  useEffect(() => {
    // Remove old trustindex script if present
    const oldScript = document.getElementById("trustindex-loader-script");
    if (oldScript) {
      oldScript.remove();
    }

    // Inject new Trustindex loader script dynamically
    const scriptId = "trustindex-loader-script";
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://cdn.trustindex.io/loader.js?4db23c179290959012162a97e7c";
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="testimonials" className="py-14 sm:py-20 lg:py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs tracking-wider uppercase rounded-full">
            Verified Google Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-1">
            Real 5-star feedback from homeowners & commercial clients across Naples, FL.
          </p>
        </div>

        {/* Trustindex Live Widget Container */}
        <div className="min-h-[280px] w-full flex justify-center">
          {/* @ts-ignore - Trustindex widget container tag */}
          <div src="https://cdn.trustindex.io/loader.js?4db23c179290959012162a97e7c" className="w-full"></div>
        </div>
      </div>
    </section>
  );
}
