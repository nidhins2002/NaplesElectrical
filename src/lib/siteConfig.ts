import siteConfigData from "@/data/siteConfig.json";

export interface SiteConfig {
  // Company & Contact
  phone: string;
  phoneRaw: string;
  email: string;
  licenseNumber: string;
  licenseAuthority: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  address: string;
  serviceAreasText: string;
  emergencyText: string;

  // Hero Section
  heroBadge?: string;
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroSubtitle?: string;
  heroGuaranteeTitle?: string;
  heroGuaranteeSubtitle?: string;

  // Why Choose Us Section
  whyBadge?: string;
  whyTitle?: string;
  whySubtitle?: string;
  whyYearsExperience?: string;
  whyExperienceLabel?: string;
  whyPoint1Title?: string;
  whyPoint1Desc?: string;
  whyPoint2Title?: string;
  whyPoint2Desc?: string;
  whyPoint3Title?: string;
  whyPoint3Desc?: string;
  whyPoint4Title?: string;
  whyPoint4Desc?: string;

  // Value Pillars Bar
  value1Title?: string;
  value1Desc?: string;
  value2Title?: string;
  value2Desc?: string;
  value3Title?: string;
  value3Desc?: string;
  value4Title?: string;
  value4Desc?: string;

  // Call to Action Banner
  ctaBadge?: string;
  ctaTitle?: string;
  ctaTitleHighlight?: string;
  ctaSubtitle?: string;

  // Reviews / Testimonials Section
  reviewsBadge?: string;
  reviewsTitle?: string;
  reviewsSubtitle?: string;
}

export const siteConfig: SiteConfig = siteConfigData as SiteConfig;
