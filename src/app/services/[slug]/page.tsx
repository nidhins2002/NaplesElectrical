import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceBySlug, getAllSlugs } from "@/lib/services";
import ServicePageWrapper from "@/components/ServicePageWrapper";
import { Check, Phone, ArrowUpRight, ShieldCheck, Zap, HelpCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return {
      title: "Service Not Found | Naples Electrical",
    };
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://naples-electrical.vercel.app";
  const canonicalUrl = `${SITE_URL}/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: "Naples Electrical",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Schema for FAQ structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Schema for Service structured data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.category === "residential" ? "Residential Electrical Service" : "Commercial Electrical Service",
    provider: {
      "@type": "ElectricalContractor",
      name: "Naples Electrical",
      telephone: "+1-239-484-1808",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://naples-electrical.vercel.app",
    },
    areaServed: [
      { "@type": "City", name: "Naples" },
      { "@type": "City", name: "Marco Island" },
      { "@type": "City", name: "Bonita Springs" },
    ],
    description: service.description,
  };

  return (
    <ServicePageWrapper serviceTitle={service.title}>
      <main className="min-h-screen bg-slate-50 text-slate-900 pt-6 sm:pt-10 pb-20">
        {/* Inject JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Card Section (Light Theme) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-lg mb-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                {service.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {service.title}
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
                {service.tagline}
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {service.longDescription}
              </p>

              {/* Quick Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Request Free Quote
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href="tel:+12394841808"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 mr-2 text-amber-600" />
                  Call (239) 484-1808
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-white backdrop-blur-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Licensed EC#13015315
                  </span>
                  <span className="text-slate-300 font-medium">Naples & SWFL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features & Capabilities */}
          <section className="mb-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Key Features & Service Capabilities
              </h2>
              <p className="text-slate-600 text-base">
                Our licensed master electricians deliver precise, code-compliant workmanship tailored to Southwest Florida properties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all duration-200 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <p className="text-slate-800 font-semibold text-sm sm:text-base leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Why Property Owners Choose Naples Electrical
              </h2>
              <p className="text-slate-600 text-base">
                Dependable service, upfront pricing, and top-rated electrical craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <div className="text-slate-900 text-lg font-extrabold flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-sm">
                      0{idx + 1}
                    </span>
                    {benefit.title}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs Section */}
          <section className="mb-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                Got Questions?
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-base">
                Clear, transparent answers from our master electricians about {service.title.toLowerCase()} in SWFL.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {service.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl bg-white border border-slate-200/80 p-6 [&_summary::-webkit-details-marker]:none transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <summary className="flex items-center justify-between cursor-pointer text-slate-900 font-bold text-base sm:text-lg group-hover:text-amber-600 transition-colors">
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base border-t border-slate-100 pt-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom Call to Action */}
          <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center shadow-xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ready to Schedule {service.title}?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Get upfront pricing, fast scheduling, and guaranteed code-compliant electrical work across Naples, Marco Island, and Bonita Springs.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/20 transition-all duration-200"
                >
                  Request Free Quote
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href="tel:+12394841808"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 mr-2 text-amber-400" />
                  Call (239) 484-1808
                </a>
              </div>
              <p className="text-xs text-slate-400 pt-2">
                State Certified Electrical Contractor #EC13016758 • Fully Insured & Bonded
              </p>
            </div>
          </section>
        </div>
      </main>
    </ServicePageWrapper>
  );
}
