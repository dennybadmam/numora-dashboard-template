import { useState } from "react";
import { siteConfig } from "../../site.config";
import { useAuth } from "../lib/auth";
import { formatMoney } from "../lib/currency";

const services = [
  { id: "wa", name: "WhatsApp", key: "whatsapp" as const },
  { id: "tg", name: "Telegram", key: "telegram" as const },
  { id: "go", name: "Google", key: "google" as const },
  { id: "ig", name: "Instagram", key: "instagram" as const },
];

export function NumbersPage() {
  const { user } = useAuth();
  const currency = user?.currency ?? "USD";
  const [tab, setTab] = useState<"usa" | "global">("usa");
  const servers = tab === "usa" ? siteConfig.servers.usa : siteConfig.servers.global;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Virtual numbers</h1>
        <p className="text-sm text-slate-400 mt-1">2 USA · 2 Global nodes · prices in {currency}</p>
      </div>

      <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
        {(
          [
            ["usa", "United States"],
            ["global", "International"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={[
              "flex-1 rounded-lg py-2 text-sm font-semibold transition",
              tab === key ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-slate-400",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {servers.map((s) => (
          <div key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{s.flag}</span>
                <div>
                  <p className="font-medium text-sm">{s.label}</p>
                  <p className="text-[11px] text-slate-400">
                    {s.latencyMs}ms · {s.uptime} uptime
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                Online
              </span>
            </div>
            <ul className="space-y-2">
              {services.map((svc) => (
                <li
                  key={svc.id}
                  className="flex items-center justify-between text-sm rounded-xl bg-black/20 px-3 py-2.5 border border-white/5"
                >
                  <span>{svc.name}</span>
                  <span className="font-semibold text-cyan-300">
                    {formatMoney(siteConfig.pricingUsd[svc.key], currency)}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-3 w-full rounded-xl border border-white/10 py-2.5 text-sm font-medium text-slate-400"
            >
              Connect provider API to activate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
