import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../site.config";

const faqs = [
  {
    q: "Is this a live telecom network?",
    a: "This package is a production-ready UI template. Wire your SMS/number providers and payment rails when you deploy.",
  },
  {
    q: "Can I rebrand Numora?",
    a: "Yes. Edit site.config.ts and replace assets in /public. Colors, name, and support email update globally.",
  },
  {
    q: "Which currencies are supported in the demo?",
    a: "USD, EUR, GBP, CAD, and NGN. Users pick a default funding currency at registration; balances format automatically.",
  },
];

export function LandingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [demoTab, setDemoTab] = useState<"numbers" | "inbox" | "wallet">("numbers");

  return (
    <div className="min-h-dvh bg-[#070A12] text-white">
      <header className="max-w-6xl mx-auto flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <img src={siteConfig.logoUrl} alt="" className="h-9 w-9" />
          <span className="font-semibold tracking-tight">{siteConfig.name}</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-400">
          <a href="#product" className="hover:text-white">
            Product
          </a>
          <a href="#pricing" className="hover:text-white">
            Pricing
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="text-sm text-slate-300 px-3 py-2">
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2"
          >
            Start free
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 pt-12 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-300 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            99.9% route uptime · 40+ corridors
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed max-w-xl">{siteConfig.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold"
            >
              Create workspace
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200"
            >
              Open demo
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">{siteConfig.contact.hireCta}</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-blue-600/30 to-cyan-500/20 blur-3xl rounded-full" />
          <div className="relative rounded-[2rem] border border-white/10 bg-[#0B0F19] p-4 shadow-2xl shadow-blue-950/50">
            <div className="flex gap-2 mb-4">
              {(["numbers", "inbox", "wallet"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDemoTab(t)}
                  className={[
                    "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize",
                    demoTab === t ? "bg-white/10 text-white" : "text-slate-500",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 min-h-[220px]">
              {demoTab === "numbers" && (
                <div className="space-y-2">
                  {siteConfig.servers.usa.map((s) => (
                    <div
                      key={s.id}
                      className="flex justify-between items-center rounded-xl bg-white/5 px-3 py-3 text-sm"
                    >
                      <span>
                        {s.flag} {s.label}
                      </span>
                      <span className="text-emerald-400 text-xs">{s.latencyMs}ms</span>
                    </div>
                  ))}
                </div>
              )}
              {demoTab === "inbox" && (
                <div className="space-y-3 text-sm">
                  <p className="text-slate-300">WhatsApp · code 847291</p>
                  <p className="text-slate-500 text-xs">Copied to clipboard in one tap</p>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-2/3 bg-cyan-400/80" />
                  </div>
                </div>
              )}
              {demoTab === "wallet" && (
                <div>
                  <p className="text-xs text-slate-400">Multi-currency ledger</p>
                  <p className="text-3xl font-semibold mt-2">$124.50</p>
                  <p className="text-xs text-cyan-300 mt-2">Card · Bank · Crypto · Local</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Virtual numbers",
              d: "Routable lines with latency and uptime signals — not static placeholder lists.",
            },
            {
              t: "OTP inbox",
              d: "Structured message stream with one-tap code capture for verification workflows.",
            },
            {
              t: "Treasury wallet",
              d: "Funding methods for card, bank, crypto, and local gateways in one surface.",
            },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-white/10 p-6 bg-[#0B0F19]">
              <h3 className="font-semibold">{f.t}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Coverage footprint</h2>
        <p className="text-slate-400 text-sm mt-2 mb-6">Flag grid for launch markets — expand in config.</p>
        <div className="flex flex-wrap gap-2">
          {siteConfig.coverage.map((c) => (
            <span
              key={c}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-semibold">Pricing</h2>
              <p className="text-slate-400 text-sm mt-1">Template demo tiers — replace with your commercial model.</p>
            </div>
            <div className="flex rounded-full border border-white/10 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setYearly(false)}
                className={!yearly ? "px-3 py-1.5 rounded-full bg-white/10" : "px-3 py-1.5 text-slate-500"}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setYearly(true)}
                className={yearly ? "px-3 py-1.5 rounded-full bg-white/10" : "px-3 py-1.5 text-slate-500"}
              >
                Yearly · save 20%
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Starter", price: 0, blurb: "Explore the console" },
              { name: "Growth", price: yearly ? 23 : 29, blurb: "Operators & agencies" },
              { name: "Scale", price: yearly ? 79 : 99, blurb: "High-volume routes" },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-white/10 bg-[#0B0F19] p-6 flex flex-col"
              >
                <p className="text-sm text-slate-400">{p.name}</p>
                <p className="text-3xl font-semibold mt-2">
                  ${p.price}
                  <span className="text-sm text-slate-500 font-normal">/mo</span>
                </p>
                <p className="text-sm text-slate-400 mt-2 flex-1">{p.blurb}</p>
                <Link
                  to="/register"
                  className="mt-6 text-center rounded-xl border border-white/15 py-2.5 text-sm font-semibold hover:bg-white/5"
                >
                  Choose {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-4 text-center text-sm text-slate-400">
        <div className="rounded-xl border border-white/10 py-4">SOC2-ready architecture patterns</div>
        <div className="rounded-xl border border-white/10 py-4">TLS everywhere · secret-free demo</div>
        <div className="rounded-xl border border-white/10 py-4">Built for CodeCanyon / white-label</div>
      </section>

      <section id="faq" className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-xl border border-white/10 overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm font-medium flex justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  {f.q}
                  <span className="text-slate-500">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i ? (
                  <p className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">{f.a}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. Support{" "}
        <a className="text-cyan-400" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
      </footer>
    </div>
  );
}
