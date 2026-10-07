"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueBar from "@/components/ValueBar";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

// Lazy-load QuoteModal code chunk until opened by user
const QuoteModal = dynamic(() => import("@/components/QuoteModal"), {
  ssr: false,
});

export default function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openQuote = useCallback((service?: string) => {
    setSelectedService(service);
    setQuoteOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    setQuoteOpen(false);
    setSelectedService(undefined);
  }, []);

  return (
    <>
      <Header onOpenQuote={openQuote} />

      <main>
        {/* Hero with image + headline */}
        <Hero onOpenQuote={openQuote} />

        {/* Feature pillars bar */}
        <ValueBar />

        {/* Services cards grid */}
        <div className="pt-12 sm:pt-16">
          <ServicesSection onOpenQuote={openQuote} />
        </div>

        {/* Why Choose Us split section */}
        <WhyChooseUs onOpenQuote={openQuote} />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* Full-width CTA Banner */}
        <CtaBanner onOpenQuote={openQuote} />
      </main>

      <Footer onOpenQuote={openQuote} />

      {/* Global Quote Modal - rendered conditionally */}
      {quoteOpen && (
        <QuoteModal
          isOpen={quoteOpen}
          onClose={closeQuote}
          defaultService={selectedService}
        />
      )}
    </>
  );
}
