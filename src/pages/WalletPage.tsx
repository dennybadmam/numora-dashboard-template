import { demoWallet } from "../lib/demo-data";

export function WalletPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">Wallet</h1>
        <p className="text-sm text-muted">Demo balance — connect payments later</p>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <p className="text-sm text-muted">Available balance</p>
        <p className="text-3xl font-bold text-primary mt-1">{demoWallet.balance}</p>
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-primary text-white font-semibold py-3 opacity-80"
        >
          Fund wallet (demo)
        </button>
      </div>

      <div>
        <h2 className="font-semibold mb-3">Recent activity</h2>
        <ul className="space-y-2">
          {demoWallet.transactions.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium">{t.label}</p>
                <p className="text-xs text-muted">{t.time}</p>
              </div>
              <span
                className={
                  t.amount.startsWith("+") ? "font-semibold text-accent" : "font-semibold text-foreground"
                }
              >
                {t.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
