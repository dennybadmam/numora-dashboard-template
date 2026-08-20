export const siteConfig = {
  name: "Numora",
  tagline: "Global numbers. Instant OTPs. One wallet.",
  description:
    "Enterprise-grade virtual numbers and real-time verification for teams that operate across borders.",
  logoUrl: "/logo.svg",
  faviconUrl: "/favicon.svg",
  bannerUrl: "/banner.svg",
  contact: {
    email: "official@vernex.com.ng",
    hireCta: "Need a custom build or white-label? Talk to our engineers.",
  },
  currencies: [
    { code: "USD", symbol: "$", label: "US Dollar", locale: "en-US" },
    { code: "EUR", symbol: "€", label: "Euro", locale: "de-DE" },
    { code: "GBP", symbol: "£", label: "British Pound", locale: "en-GB" },
    { code: "CAD", symbol: "$", label: "Canadian Dollar", locale: "en-CA" },
    { code: "NGN", symbol: "₦", label: "Nigerian Naira", locale: "en-NG" },
  ],
  /** Demo rates vs USD for display formatting */
  fxToUsd: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36,
    NGN: 1600,
  } as Record<string, number>,
  countryCodes: [
    { iso: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria" },
    { iso: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
    { iso: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { iso: "CA", dial: "+1", flag: "🇨🇦", name: "Canada" },
    { iso: "DE", dial: "+49", flag: "🇩🇪", name: "Germany" },
    { iso: "FR", dial: "+33", flag: "🇫🇷", name: "France" },
    { iso: "IN", dial: "+91", flag: "🇮🇳", name: "India" },
    { iso: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
  ],
  servers: {
    usa: [
      { id: "us-1", label: "US East · Virginia", flag: "🇺🇸", latencyMs: 18, uptime: "99.98%" },
      { id: "us-2", label: "US West · Oregon", flag: "🇺🇸", latencyMs: 24, uptime: "99.95%" },
    ],
    global: [
      { id: "gl-1", label: "EU · Frankfurt", flag: "🇪🇺", latencyMs: 32, uptime: "99.97%" },
      { id: "gl-2", label: "APAC · Singapore", flag: "🇸🇬", latencyMs: 41, uptime: "99.94%" },
    ],
  },
  coverage: ["US", "GB", "CA", "DE", "FR", "NL", "SE", "AU", "SG", "AE", "NG", "IN", "BR", "MX", "JP"],
  pricingUsd: {
    starter: 0,
    growth: 29,
    scale: 99,
    whatsapp: 2.4,
    telegram: 1.8,
    google: 3.1,
    instagram: 2.2,
  },
} as const;

export type CurrencyCode = (typeof siteConfig.currencies)[number]["code"];
