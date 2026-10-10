import servicesData from "@/data/services.json";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BenefitItem {
  title: string;
  desc: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  badge: string;
  category: "residential" | "commercial";
  metaTitle: string;
  metaDescription: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: BenefitItem[];
  faqs: FAQItem[];
  disabled?: boolean;
}

export const SERVICES: ServiceData[] = servicesData as ServiceData[];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}
