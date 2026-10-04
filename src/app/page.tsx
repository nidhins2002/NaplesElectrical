"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueBar from "@/components/ValueBar";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";

import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

export default function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openQuote = (service?: string) => {
    setSelectedService(service);
    setQuoteOpen(true);
  };

  const closeQuote = () => {
    setQuoteOpen(false);
    setSelectedService(undefined);
  };

  return (
    <>
      <Header onOpenQuote={openQuote} />

      <main>
        {/* Hero with image + headline */}
        <Hero onOpenQuote={openQuote} />

        {/* Feature pillars bar, slightly overlapping hero */}
        <ValueBar />

        {/* Services cards grid */}
        <div className="pt-12 sm:pt-16">
          <ServicesSection onOpenQuote={openQuote} />
        </div>

        {/* Why Choose Us split section */}
        <WhyChooseUs onOpenQuote={() => openQuote()} />



        {/* Customer Testimonials */}
        <Testimonials />

        {/* Full-width CTA Banner */}
        <CtaBanner onOpenQuote={() => openQuote()} />
      </main>

      <Footer onOpenQuote={() => openQuote()} />

      {/* Global Quote Modal */}
      <QuoteModal
        isOpen={quoteOpen}
        onClose={closeQuote}
        defaultService={selectedService}
      />
    </>
  );
}
