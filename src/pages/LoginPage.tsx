import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { siteConfig } from "../../site.config";
import { useAuth } from "../lib/auth";

export function LoginPage() {
  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/app");
  }

  return (
    <div className="min-h-dvh bg-[#070A12] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="flex items-center gap-2 mb-8">
          <img src={siteConfig.logoUrl} alt="" className="h-9 w-9" />
          <span className="font-semibold">{siteConfig.name}</span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <p className="text-xs font-medium text-cyan-400">Welcome back</p>
          <h1 className="text-2xl font-semibold mt-1 tracking-tight">Sign in to {siteConfig.name}</h1>
          <p className="text-sm text-slate-400 mt-2">Encrypted session · Demo mode available</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs text-slate-400">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm outline-none focus:border-cyan-400/50"
                placeholder="you@company.com"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm outline-none focus:border-cyan-400/50"
                placeholder="••••••••"
              />
            </label>
            {error ? <p className="text-sm text-rose-400">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-sm font-semibold"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                loginDemo();
                navigate("/app");
              }}
              className="w-full rounded-xl border border-white/10 py-3 text-sm font-medium text-slate-300 hover:bg-white/[0.04]"
            >
              Continue with demo workspace
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          New here?{" "}
          <Link to="/register" className="text-cyan-400 font-medium">
            Create account
          </Link>
          {" · "}
          <Link to="/" className="text-slate-400">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
