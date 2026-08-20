import { Link } from "react-router-dom";
import { siteConfig } from "../../site.config";
import { useAuth } from "../lib/auth";
import { formatMoney } from "../lib/currency";

export function OverviewPage() {
  const { user } = useAuth();
  const currency = user?.currency ?? "USD";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-cyan-400 font-medium">Workspace</p>
        <h1 className="text-xl font-semibold tracking-tight mt-1">Good day, {user?.name}</h1>
        <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          All systems nominal · Ping 18ms · 99.9% uptime
        </p>
      </div>

      <div className="gradient-wallet rounded-3xl p-5 shadow-lg shadow-blue-900/30 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <p className="text-sm text-white/80">Available balance</p>
        <p className="text-3xl font-semibold tracking-tight mt-1">{formatMoney(124.5, currency)}</p>
        <p className="text-xs text-white/70 mt-2 font-mono">VA · {user?.dialCode} •••• {user?.phone?.slice(-4) || "0000"}</p>
        <div className="mt-5 flex gap-2">
          <Link
            to="/app/wallet"
            className="rounded-xl bg-white/15 hover:bg-white/25 px-4 py-2 text-sm font-semibold backdrop-blur"
          >
            Top up
          </Link>
          <Link
            to="/app/numbers"
            className="rounded-xl bg-black/20 hover:bg-black/30 px-4 py-2 text-sm font-medium"
          >
            Get number
          </Link>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">Routing nodes</h2>
          <span className="text-[11px] text-slate-500">Live capacity</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[...siteConfig.servers.usa, ...siteConfig.servers.global].map((s) => (
            <Link
              key={s.id}
              to="/app/numbers"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-cyan-400/30 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{s.flag}</span>
                <span className="text-[10px] font-medium text-emerald-400">{s.uptime}</span>
              </div>
              <p className="text-sm font-medium mt-2 leading-snug">{s.label}</p>
              <p className="text-[11px] text-slate-400 mt-1">Ping {s.latencyMs}ms</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
