import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Naples Electrical | Licensed & Professional Electricians in Naples, FL",
  description:
    "Safe, reliable, and high-quality electrical services for homes and businesses in Naples, FL. Emergency repairs, panel upgrades, EV chargers, lighting & more.",
  keywords: [
    "Naples Electrician",
    "Electrical Services Naples FL",
    "Electrician Naples Florida",
    "Panel Upgrades Naples",
    "EV Charger Installation Naples",
    "Emergency Electrician Naples",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
