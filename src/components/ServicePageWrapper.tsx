"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const QuoteModal = dynamic(() => import("@/components/QuoteModal"), {
  ssr: false,
});

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

  const openQuote = useCallback((service?: string) => {
    setSelectedService(service || serviceTitle);
    setQuoteOpen(true);
  }, [serviceTitle]);

  const closeQuote = useCallback(() => {
    setQuoteOpen(false);
  }, []);

  return (
    <>
      <Header onOpenQuote={openQuote} />
      {children}
      <Footer onOpenQuote={openQuote} />
      {quoteOpen && (
        <QuoteModal
          isOpen={quoteOpen}
          onClose={closeQuote}
          defaultService={selectedService || serviceTitle}
        />
      )}
    </>
  );
}
