/**
 * NUMORA — edit this file to rebrand the entire template.
 * Buyers: change name, logo, colors, email, and links here only.
 */
export const siteConfig = {
  name: "Numora",
  tagline: "Virtual numbers & wallet dashboard",
  description:
    "Rent virtual numbers, receive OTPs, and manage your wallet from one clean dashboard.",

  logoUrl: "/logo.svg",
  faviconUrl: "/favicon.svg",
  bannerUrl: "/banner.svg",

  colors: {
    primary: "#2563EB",
    accent: "#06B6D4",
    background: "#FFFFFF",
    foreground: "#0F172A",
    muted: "#64748B",
    border: "#E2E8F0",
    card: "#F8FAFC",
  },

  contact: {
    email: "official@vernex.com.ng",
    hireCta: "Need a developer to customize this? Email us.",
  },

  social: {
    twitter: "",
    telegram: "",
  },

  /** Demo-only server slots (2 USA + 2 multi-country). */
  servers: {
    usa: [
      { id: "us-1", label: "USA Server 1", flag: "🇺🇸", status: "online" as const },
      { id: "us-2", label: "USA Server 2", flag: "🇺🇸", status: "online" as const },
    ],
    global: [
      { id: "gl-1", label: "Global Server 1", flag: "🌍", status: "online" as const },
      { id: "gl-2", label: "Global Server 2", flag: "🌍", status: "online" as const },
    ],
  },

  navigation: [
    { label: "Features", href: "#features" },
    { label: "Numbers", href: "#numbers" },
    { label: "Pricing", href: "#pricing" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
