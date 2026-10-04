import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["700", "800", "900"],
});

const SITE_URL = "https://www.napleselectrical.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Naples Electrical | Licensed Electrician in Naples, FL",
    template: "%s | Naples Electrical",
  },
  description:
    "Naples Electrical — licensed, bonded & insured electrician serving Naples, Marco Island & Collier County, FL. Residential & commercial electrical services: panel upgrades, EV chargers, lighting, repairs & more. Call (239) 484-1808.",
  keywords: [
    "Naples Electrician",
    "Electrician Naples FL",
    "Electrical Contractor Naples Florida",
    "Residential Electrician Naples",
    "Commercial Electrician Naples",
    "Panel Upgrades Naples FL",
    "EV Charger Installation Naples",
    "Emergency Electrician Naples",
    "Lighting Installation Naples",
    "Collier County Electrician",
    "Marco Island Electrician",
    "Licensed Electrician Southwest Florida",
  ],
  authors: [{ name: "Naples Electrical" }],
  creator: "Naples Electrical",
  publisher: "Naples Electrical",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Naples Electrical",
    title: "Naples Electrical | Licensed Electrician in Naples, FL",
    description:
      "Licensed, bonded & insured electrician in Naples, FL. Residential & commercial electrical services — panel upgrades, EV chargers, lighting, repairs. Same-day service available. Call (239) 484-1808.",
    images: [
      {
        url: "/images/hero-electrician.jpg",
        width: 1200,
        height: 630,
        alt: "Naples Electrical — Professional Electrician in Naples, FL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naples Electrical | Licensed Electrician in Naples, FL",
    description:
      "Licensed, bonded & insured electrician in Naples, FL. Panel upgrades, EV chargers, lighting, repairs & more. Call (239) 484-1808.",
    images: ["/images/hero-electrician.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png?v=5", type: "image/png" },
      { url: "/favicon.ico?v=5" },
    ],
    shortcut: "/icon.png?v=5",
    apple: "/icon.png?v=5",
  },
};

// LocalBusiness JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  name: "Naples Electrical",
  image: `${SITE_URL}/images/hero-electrician.jpg`,
  logo: `${SITE_URL}/Logo.png`,
  url: SITE_URL,
  telephone: "+1-239-484-1808",
  email: "info@napleselectrical.com",
  description:
    "Naples Electrical is a licensed, bonded and insured electrical contractor serving Naples, Marco Island, and Collier County, FL. We provide residential and commercial electrical services including panel upgrades, EV charger installation, lighting, and emergency repairs.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Naples",
    addressLocality: "Naples",
    addressRegion: "FL",
    postalCode: "34101",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.142,
    longitude: -81.7948,
  },
  areaServed: [
    { "@type": "City", name: "Naples", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Marco Island", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "AdministrativeArea", name: "Collier County", containedInPlace: { "@type": "State", name: "Florida" } },
  ],
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "14:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Electrical Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lighting Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Repairs" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Panel Upgrades" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV Charger Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ceiling Fan Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Electrical Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Safety Inspections" } },
    ],
  },
  sameAs: [
    "https://share.google/SLZ3pgJS3V3KBJx0c",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-900">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
