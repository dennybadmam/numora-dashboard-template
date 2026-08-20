import { Link } from "react-router-dom";
import { siteConfig } from "../../site.config";
import { demoWallet } from "../lib/demo-data";
import { useAuth } from "../lib/auth";

export function OverviewPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Hi, {user?.name}</h1>
        <p className="text-sm text-muted">Demo dashboard — wire your APIs when ready</p>
      </div>

      <div className="rounded-2xl bg-primary text-white p-5 shadow-sm">
        <p className="text-sm text-white/80">Wallet balance</p>
        <p className="text-3xl font-bold mt-1">{demoWallet.balance}</p>
        <Link
          to="/app/wallet"
          className="inline-block mt-4 text-sm font-semibold bg-white/15 hover:bg-white/25 rounded-lg px-3 py-1.5"
        >
          View wallet
        </Link>
      </div>

      <div>
        <h2 className="font-semibold mb-3">Servers</h2>
        <div className="grid grid-cols-2 gap-3">
          {[...siteConfig.servers.usa, ...siteConfig.servers.global].map((s) => (
            <Link
              key={s.id}
              to="/app/numbers"
              className="rounded-2xl border border-border bg-white p-4 hover:border-primary/40"
            >
              <span className="text-xl">{s.flag}</span>
              <p className="text-sm font-medium mt-2">{s.label}</p>
              <p className="text-xs text-accent mt-0.5">{s.status}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
