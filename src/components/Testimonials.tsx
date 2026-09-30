"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react";

interface Review {
  name: string;
  initials: string;
  text: string;
  rating: number;
  date: string;
}

// Avatar colour palette (cycles by index)
const AVATAR_COLORS = [
  "from-amber-400 to-orange-500",
  "from-blue-500 to-indigo-600",
  "from-emerald-400 to-teal-600",
  "from-rose-400 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-sky-400 to-cyan-500",
  "from-lime-400 to-green-600",
  "from-fuchsia-500 to-pink-500",
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400 fill-amber-400" : "text-slate-300"
            }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [overallRating] = useState(5.0);
  const [totalReviews] = useState(94);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => {
        setReviews(d.reviews ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (isAnimating || reviews.length === 0) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(idx);
        setIsAnimating(false);
      }, 200);
    },
    [isAnimating, reviews.length]
  );

  const prev = () =>
    goTo(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1);
  const next = () =>
    goTo(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1);

  // Visible cards: current ±1 wrapped
  const getVisible = () => {
    if (reviews.length === 0) return [];
    const total = reviews.length;
    return [
      (currentIndex - 1 + total) % total,
      currentIndex,
      (currentIndex + 1) % total,
    ];
  };

  const visibleIndices = getVisible();

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs tracking-wider uppercase rounded-full mb-3">
              Google Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              What Our Customers Say
            </h2>

            {/* Aggregate rating bar */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-2xl font-black text-slate-900">{overallRating.toFixed(1)}</span>
              <span className="text-sm text-slate-500 font-medium">
                Based on <strong className="text-slate-700">{totalReviews}+</strong> Google reviews
              </span>
            </div>
          </div>

          {/* Controls + Google link */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://share.google/ajgIMIhTjVB5ZnTDq"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-amber-400 hover:text-amber-600 transition shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              See All Reviews
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
            <button
              onClick={prev}
              className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-900 hover:text-white hover:border-slate-900 transition shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 bg-slate-900 text-white border border-slate-900 rounded-full hover:bg-amber-400 hover:border-amber-400 hover:text-slate-950 transition shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-slate-200 animate-pulse space-y-4">
                <div className="flex gap-1">{[...Array(5)].map((_, j) => <div key={j} className="w-4 h-4 bg-slate-200 rounded-sm" />)}</div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-5/6" />
                  <div className="h-4 bg-slate-200 rounded w-4/6" />
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="space-y-1.5">
                    <div className="h-3 bg-slate-200 rounded w-24" />
                    <div className="h-3 bg-slate-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 3-card carousel ── */}
        {!loading && reviews.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleIndices.map((revIdx, slot) => {
                const review = reviews[revIdx];
                const isCentre = slot === 1;
                return (
                  <div
                    key={`${revIdx}-${slot}`}
                    onClick={() => !isCentre && goTo(revIdx)}
                    className={`
                      relative bg-white rounded-2xl border transition-all duration-300 cursor-pointer
                      ${isCentre
                        ? "border-amber-400 shadow-xl shadow-amber-400/10 ring-1 ring-amber-400/30 scale-[1.02]"
                        : "border-slate-200 shadow-md hover:shadow-lg hover:border-slate-300 opacity-80 hover:opacity-100"
                      }
                      ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}
                      p-7 space-y-5 overflow-hidden
                    `}
                  >
                    {/* Large quote icon */}
                    <Quote className="absolute top-5 right-5 w-12 h-12 text-slate-100 pointer-events-none" />

                    {/* Stars + date */}
                    <div className="flex items-center justify-between relative z-10">
                      <StarRow count={review.rating} />
                      {review.date && (
                        <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                      )}
                    </div>

                    {/* Review text */}
                    <p className={`relative z-10 text-slate-700 leading-relaxed font-medium line-clamp-5 ${isCentre ? "text-base" : "text-sm"}`}>
                      "{review.text}"
                    </p>

                    {/* Reviewer */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 relative z-10">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-tr ${AVATAR_COLORS[revIdx % AVATAR_COLORS.length]} text-white font-black text-sm flex items-center justify-center shrink-0 shadow`}
                      >
                        {review.initials}
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-slate-900">{review.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {/* Google G icon */}
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                          </svg>
                          <span className="text-xs text-slate-400">Google Review</span>
                        </div>
                      </div>
                    </div>

                    {/* Centre badge */}
                    {isCentre && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-black tracking-widest uppercase rounded-full shadow">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-10">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx
                    ? "w-8 bg-amber-400"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            {/* Trust footer strip */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2 font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Live Google Reviews
              </span>
              <span>•</span>
              <span>{totalReviews}+ Verified Customers</span>
              <span>•</span>
              <span>5.0 ★ Average Rating</span>
              <span>•</span>
              <a
                href="https://www.google.com/maps/place/Naples+Electrical"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 font-semibold transition"
              >
                View on Google Maps ↗
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
