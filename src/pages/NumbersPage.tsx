import { useState } from "react";
import { siteConfig } from "../../site.config";
import { demoServices } from "../lib/demo-data";

export function NumbersPage() {
  const [tab, setTab] = useState<"usa" | "global">("usa");
  const servers = tab === "usa" ? siteConfig.servers.usa : siteConfig.servers.global;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">Virtual numbers</h1>
        <p className="text-sm text-muted">2 USA · 2 Global — demo catalog</p>
      </div>

      <div className="flex rounded-xl bg-card p-1 border border-border">
        {(
          [
            ["usa", "USA"],
            ["global", "Other countries"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={[
              "flex-1 rounded-lg py-2 text-sm font-semibold",
              tab === key ? "bg-primary text-white" : "text-muted",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {servers.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{s.flag}</span>
                <div>
                  <p className="font-medium text-sm">{s.label}</p>
                  <p className="text-xs text-accent">{s.status}</p>
                </div>
              </div>
            </div>
            <ul className="space-y-2">
              {demoServices.map((svc) => (
                <li
                  key={svc.id}
                  className="flex items-center justify-between text-sm rounded-xl bg-card px-3 py-2"
                >
                  <span>{svc.name}</span>
                  <span className="font-semibold text-primary">{svc.price}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-3 w-full rounded-xl border border-border py-2 text-sm font-medium text-muted"
            >
              Demo only — connect your API
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
