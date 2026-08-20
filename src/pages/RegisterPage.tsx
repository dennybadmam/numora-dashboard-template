import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { siteConfig, type CurrencyCode } from "../../site.config";
import { useAuth } from "../lib/auth";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialCode, setDialCode] = useState(siteConfig.countryCodes[0].dial);
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  function next(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || password.length < 6) {
      setError("Complete name, email, and a password (6+ characters).");
      return;
    }
    setError("");
    setStep(2);
  }

  function finish(e: FormEvent) {
    e.preventDefault();
    const result = register({ name, email, password, phone, dialCode, currency });
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/app");
  }

  return (
    <div className="min-h-dvh bg-[#070A12] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md animate-fade-up">
        <div className="flex items-center gap-2 mb-8">
          <img src={siteConfig.logoUrl} alt="" className="h-9 w-9" />
          <span className="font-semibold tracking-tight">{siteConfig.name}</span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <p className="text-xs font-medium text-cyan-400 mb-2">Create account · Step {step} of 2</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {step === 1 ? "Secure your workspace" : "Phone & funding currency"}
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            {step === 1
              ? "Institutional-grade access in under a minute."
              : "We’ll format balances and prices in your preferred currency."}
          </p>

          {step === 1 ? (
            <form onSubmit={next} className="mt-6 space-y-4">
              <Field label="Full name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="field"
                  placeholder="Alex Morgan"
                  autoComplete="name"
                />
              </Field>
              <Field label="Work email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </Field>
              {error ? <p className="text-sm text-rose-400">{error}</p> : null}
              <button type="submit" className="btn-primary w-full">
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={finish} className="mt-6 space-y-4">
              <Field label="Phone number">
                <div className="flex gap-2">
                  <select
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    className="field w-[7.5rem] shrink-0"
                  >
                    {siteConfig.countryCodes.map((c) => (
                      <option key={c.iso + c.dial} value={c.dial} className="bg-slate-900">
                        {c.flag} {c.dial}
                      </option>
                    ))}
                  </select>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="field flex-1"
                    placeholder="Mobile number"
                    inputMode="tel"
                  />
                </div>
              </Field>

              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">Default funding currency</p>
                <div className="grid grid-cols-1 gap-2">
                  {siteConfig.currencies.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setCurrency(c.code)}
                      className={[
                        "flex items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition",
                        currency === c.code
                          ? "border-cyan-400/50 bg-cyan-400/10 text-white"
                          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20",
                      ].join(" ")}
                    >
                      <span>
                        <span className="font-semibold">{c.code}</span>
                        <span className="text-slate-500"> · {c.label}</span>
                      </span>
                      <span className="text-cyan-300 font-medium">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>

              {error ? <p className="text-sm text-rose-400">{error}</p> : null}
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep(1)} className="btn-ghost flex-1">
                  Back
                </button>
                <button type="submit" className="btn-primary flex-[2]">
                  Create account
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 font-medium">
            Sign in
          </Link>
        </p>
      </div>

      <style>{`
        .field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(255 255 255 / 0.1);
          background: rgb(255 255 255 / 0.04);
          padding: 0.7rem 0.85rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
        }
        .field:focus { border-color: rgb(34 211 238 / 0.5); }
        .btn-primary {
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
        }
        .btn-ghost {
          border-radius: 0.75rem;
          border: 1px solid rgb(255 255 255 / 0.12);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #cbd5e1;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-400">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
