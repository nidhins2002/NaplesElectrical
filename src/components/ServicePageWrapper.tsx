"use client";

import React, { useState } from "react";
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
