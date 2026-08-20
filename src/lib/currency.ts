import { siteConfig, type CurrencyCode } from "../../site.config";

/** Convert a USD base amount into the user's currency and format it. */
export function formatMoney(amountUsd: number, currency: CurrencyCode): string {
  const meta = siteConfig.currencies.find((c) => c.code === currency) ?? siteConfig.currencies[0];
  const rate = siteConfig.fxToUsd[currency] ?? 1;
  const local = amountUsd * rate;
  try {
    return new Intl.NumberFormat(meta.locale, {
      style: "currency",
      currency: meta.code,
      maximumFractionDigits: meta.code === "NGN" ? 0 : 2,
    }).format(local);
  } catch {
    return `${meta.symbol}${local.toFixed(meta.code === "NGN" ? 0 : 2)}`;
  }
}

export function currencySymbol(currency: CurrencyCode): string {
  return siteConfig.currencies.find((c) => c.code === currency)?.symbol ?? "$";
}
