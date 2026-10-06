"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

interface ServicePageWrapperProps {
  children: React.ReactNode;
  serviceTitle?: string;
}

export default function ServicePageWrapper({
  children,
  serviceTitle,
}: ServicePageWrapperProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(serviceTitle);

  useEffect(() => {
    // Instantly reset scroll to top when service page mounts
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const openQuote = (service?: string) => {
    setSelectedService(service || serviceTitle);
    setQuoteOpen(true);
  };

  const closeQuote = () => {
    setQuoteOpen(false);
  };

  return (
    <>
      <Header onOpenQuote={openQuote} />
      {children}
      <Footer onOpenQuote={() => openQuote()} />
      <QuoteModal
        isOpen={quoteOpen}
        onClose={closeQuote}
        defaultService={selectedService || serviceTitle}
      />
    </>
  );
}
