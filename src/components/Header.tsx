"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageSquare, ArrowRight, Menu, X, Shield, Zap } from "lucide-react";

interface HeaderProps {
  onOpenQuote: (service?: string) => void;
}

export default function Header({ onOpenQuote }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/#services" },
    { label: "Why Choose Us", href: "/#why-us" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#333333] text-slate-300 text-xs py-3 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Shield className="w-3.5 h-3.5" /> Licensed, Bonded & Insured (#EC13016758)
            </span>
            <span>Serving Naples, Marco Island, Fort Myers, Collier & Lee County</span>
          </div>
          <div className="flex items-center gap-4">
            <span>24/7 Emergency Service Available</span>
            <a
              href="tel:+12394841808"
              className="font-bold text-amber-400 hover:text-amber-300 transition"
            >
              Call: (239) 484-1808
            </a>
            <span className="text-slate-500">•</span>
            <a
              href="sms:+12394841808"
              className="font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-amber-400" />
              Text Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100"
          : "bg-white border-b border-slate-100"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group gap-2.5 sm:gap-3.5">
            <div className="relative w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[150px] md:h-[150px] group-hover:scale-120 transition-transform duration-200 shrink-0">
              <Image
                src="/Logo.png"
                alt="Naples Electrical Logo"
                width={150}
                height={150}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-brand text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-amber-600 leading-none">
                NAPLES
              </span>
              <span className="font-brand text-[9px] sm:text-xs md:text-sm font-extrabold tracking-[0.15em] sm:tracking-[0.28em] text-amber-500 uppercase leading-tight mt-0.5 sm:mt-1">
                ELECTRICAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveTab(item.label)}
                className={`relative text-sm font-semibold transition-colors duration-200 py-1 ${activeTab === item.label
                  ? "text-slate-950 font-bold"
                  : "text-slate-600 hover:text-slate-950"
                  }`}
              >
                {item.label}
                {activeTab === item.label && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-amber-400 rounded-full animate-fadeIn" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+12394841808"
              className="text-xs font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 hover:border-amber-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              Call
            </a>
            <a
              href="sms:+12394841808"
              className="text-xs font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 hover:border-amber-400 bg-slate-50 transition"
              title="Send Text/SMS Message"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              Text Us
            </a>
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400/10 hover:bg-amber-400/20 text-amber-600 font-bold text-xs rounded-full border border-amber-400/30 transition shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-fadeIn">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveTab(item.label);
                  setMobileMenuOpen(false);
                }}
                className={`block py-2.5 px-3 text-base font-semibold rounded-xl ${activeTab === item.label
                  ? "bg-amber-50 text-amber-900 font-bold"
                  : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-600 font-bold text-sm text-center rounded-full border border-amber-400/30 flex items-center justify-center gap-2 transition"
              >
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Get Free Quote</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
