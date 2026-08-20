import { demoMessages } from "../lib/demo-data";

export function InboxPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">OTP inbox</h1>
        <p className="text-sm text-muted">Demo messages — connect SMS webhooks later</p>
      </div>

      <ul className="space-y-3">
        {demoMessages.map((m) => (
          <li key={m.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-sm">{m.from}</p>
              <p className="text-xs text-muted">{m.time}</p>
            </div>
            <p className="text-xs text-muted mt-1">{m.number}</p>
            <p className="mt-2 text-sm leading-relaxed">{m.body}</p>
            <button
              type="button"
              className="mt-3 text-xs font-semibold text-primary"
              onClick={() => {
                const code = m.body.match(/\d{4,8}/)?.[0];
                if (code) void navigator.clipboard?.writeText(code);
              }}
            >
              Copy code
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
