import { useState } from "react";
import { useAuth } from "../lib/auth";
import { formatMoney } from "../lib/currency";
import { siteConfig, type CurrencyCode } from "../../site.config";

const methods = [
  { id: "card", title: "Card", desc: "Visa, Mastercard, Amex" },
  { id: "bank", title: "Bank transfer", desc: "Direct local rails" },
  { id: "crypto", title: "Crypto", desc: "USDT · BTC" },
  { id: "local", title: "Local gateways", desc: "Region-optimized checkout" },
] as const;

const tx = [
  { id: "1", label: "Wallet top-up", usd: 50, sign: 1, time: "Yesterday" },
  { id: "2", label: "US East · WhatsApp", usd: 2.4, sign: -1, time: "Yesterday" },
  { id: "3", label: "Wallet top-up", usd: 100, sign: 1, time: "3 days ago" },
];

export function WalletPage() {
  const { user, setCurrency } = useAuth();
  const currency = user?.currency ?? "USD";
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("card");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Wallet</h1>
        <p className="text-sm text-slate-400 mt-1">Fund · settle · reconcile in {currency}</p>
      </div>

      <div className="gradient-wallet rounded-3xl p-5">
        <p className="text-sm text-white/80">Ledger balance</p>
        <p className="text-3xl font-semibold mt-1">{formatMoney(124.5, currency)}</p>
        <p className="text-xs text-white/70 mt-2 font-mono">Settlement currency · {currency}</p>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 mb-2">Display currency</p>
        <div className="flex flex-wrap gap-2">
          {siteConfig.currencies.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setCurrency(c.code as CurrencyCode)}
              className={[
                "rounded-lg px-3 py-1.5 text-xs font-semibold border transition",
                currency === c.code
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 text-slate-400",
              ].join(" ")}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 mb-2">Funding method</p>
        <div className="grid grid-cols-2 gap-2">
          {methods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id)}
              className={[
                "rounded-2xl border p-3 text-left transition",
                method === m.id
                  ? "border-cyan-400/40 bg-cyan-400/10"
                  : "border-white/10 bg-white/[0.03]",
              ].join(" ")}
            >
              <p className="text-sm font-semibold">{m.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{m.desc}</p>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-sm font-semibold"
        >
          Continue with {methods.find((m) => m.id === method)?.title}
        </button>
        <p className="text-[11px] text-slate-500 mt-2 text-center">
          Demo UI — connect Stripe, Flutterwave, or on-chain rails in production
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-sm mb-3">Recent activity</h2>
        <ul className="space-y-2">
          {tx.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium">{t.label}</p>
                <p className="text-[11px] text-slate-500">{t.time}</p>
              </div>
              <span className={t.sign > 0 ? "text-emerald-400 font-semibold" : "text-slate-200 font-semibold"}>
                {t.sign > 0 ? "+" : "−"}
                {formatMoney(t.usd, currency)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
