import { Link } from "react-router-dom";
import { siteConfig } from "../../site.config";

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <img src={siteConfig.logoUrl} alt="" className="h-9 w-9" />
          <span className="font-bold text-lg tracking-tight">{siteConfig.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="text-sm font-medium text-muted hover:text-foreground px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold text-white bg-primary hover:opacity-90 px-4 py-2 rounded-xl"
          >
            Open demo
          </Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 pt-8 pb-12 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold text-accent mb-2">Virtual numbers · Wallet · OTP</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 text-muted text-base md:text-lg leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl bg-primary text-white font-semibold px-6 py-3 hover:opacity-90"
            >
              Try live demo
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-white font-semibold px-6 py-3 text-foreground hover:bg-card"
            >
              Hire developer
            </a>
          </div>
          <p className="mt-4 text-xs text-muted">{siteConfig.contact.hireCta}</p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-card">
          <img
            src={siteConfig.bannerUrl}
            alt={`${siteConfig.name} banner`}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section id="features" className="border-t border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 py-14 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "2 USA + 2 Global servers",
              body: "Clean number catalog layout — demo data included, ready to wire to your API.",
            },
            {
              title: "OTP inbox UI",
              body: "Copy-ready message list with timestamps. Perfect for verification flows.",
            },
            {
              title: "Wallet screen",
              body: "Balance + transaction list UI. Connect Flutterwave or any gateway later.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-white p-5">
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="numbers" className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-6">Demo servers</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[...siteConfig.servers.usa, ...siteConfig.servers.global].map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{s.flag}</span>
                <div>
                  <p className="font-medium">{s.label}</p>
                  <p className="text-xs text-accent font-medium uppercase">{s.status}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-muted">Demo</span>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-t border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl font-bold">Template product</h2>
          <p className="mt-2 text-muted max-w-xl mx-auto">
            Rebrand via <code className="text-primary">site.config.ts</code>. Replace logo & banner in{" "}
            <code className="text-primary">/public</code>. No API keys included.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex mt-6 rounded-xl bg-primary text-white font-semibold px-6 py-3"
          >
            {siteConfig.contact.email}
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. Template support:{" "}
        <a className="text-primary" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
      </footer>
    </div>
  );
}
