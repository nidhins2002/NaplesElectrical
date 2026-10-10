import siteConfigData from "@/data/siteConfig.json";

export interface SiteConfig {
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
}

export const siteConfig: SiteConfig = siteConfigData as SiteConfig;
