import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { siteConfig } from "../../site.config";
import { useAuth } from "../lib/auth";

export function LoginPage() {
  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@numora.app");
  const [password, setPassword] = useState("demo1234");
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
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={siteConfig.logoUrl} alt="" className="h-12 w-12 mb-3" />
          <h1 className="text-2xl font-bold">Welcome to {siteConfig.name}</h1>
          <p className="text-sm text-muted mt-1">Demo login — no API keys required</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div>
            <label className="text-xs font-medium text-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-xl bg-primary text-white font-semibold py-3 hover:opacity-90"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              loginDemo();
              navigate("/app");
            }}
            className="w-full rounded-xl border border-border bg-card font-semibold py-3 text-sm hover:bg-white"
          >
            One-click demo user
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          <Link to="/" className="text-primary font-medium">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
