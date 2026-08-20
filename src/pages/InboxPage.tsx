import { demoMessages } from "../lib/demo-data";

export function InboxPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">OTP inbox</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time stream UI · webhook-ready structure</p>
      </div>

      <ul className="space-y-3">
        {demoMessages.map((m) => (
          <li key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-sm">{m.from}</p>
              <p className="text-[11px] text-slate-500">{m.time}</p>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">{m.number}</p>
            <p className="mt-2 text-sm text-slate-200 leading-relaxed">{m.body}</p>
            <button
              type="button"
              className="mt-3 text-xs font-semibold text-cyan-300"
              onClick={() => {
                const code = m.body.match(/\d{4,8}/)?.[0];
                if (code) void navigator.clipboard?.writeText(code);
              }}
            >
              Copy verification code
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
